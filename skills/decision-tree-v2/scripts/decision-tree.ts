const assert: typeof import("node:assert/strict") = require("node:assert/strict");
const { spawnSync }: typeof import("node:child_process") = require("node:child_process");
const fs: typeof import("node:fs") = require("node:fs");
const { tmpdir }: typeof import("node:os") = require("node:os");
const { basename, dirname, join }: typeof import("node:path") = require("node:path");
const { test }: typeof import("node:test") = require("node:test");
const { parseArgs }: typeof import("node:util") = require("node:util");

const {
  appendFileSync,
  chmodSync,
  closeSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readFileSync,
  readSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} = fs;

type ParseArgsOptionsConfig = import("node:util").ParseArgsOptionsConfig;

type ExclusionReason = "not-applicable" | "deferred";

type Meta = { eid: number; at: number; causedByEid?: number };

type CreatingEvent = Extract<
  Event,
  {
    type:
      | "add-question"
      | "add-option"
      | "add-follow-up"
      | "add-statement"
      | "promote-follow-up"
      | "supersede-question"
      | "supersede-option"
      | "supersede-statement";
  }
>;

type ItemContext = { creation?: string; createdBy?: CreatingEvent["type"]; exclusion?: string };

type QuestionContext = ItemContext & { selection?: string; clearing?: string };

type Event = (
  | { type: "add-question"; id: string; text: string; origin?: string; context?: string }
  | { type: "add-option"; id: string; text: string; origin: string; context?: string }
  | { type: "select-option"; targets: string[]; context?: string }
  | { type: "clear-selection"; target: string; context?: string }
  | { type: "add-follow-up"; id: string; text: string; origin?: string; context?: string }
  | { type: "add-statement"; id: string; text: string; origin?: string; context?: string }
  | { type: "promote-follow-up"; target: string; question: string; context?: string }
  | { type: "exclude"; target: string; reason: ExclusionReason; context?: string }
  | { type: "restore"; target: string }
  | { type: "supersede-question"; target: string; question: string; context?: string }
  | { type: "supersede-option"; target: string; option: string; context?: string }
  | { type: "supersede-statement"; target: string; statement: string; context?: string }
  | { type: "focus"; target: string }
  | { type: "tag"; target: string; tags: string[] }
  | { type: "untag"; target: string; tags: string[] }
) & { meta?: Meta };

type IdEvent = Extract<Event, { id: string }>;

type Log = {
  read(): Event[];
  append(...events: Event[]): void;
};

type OptionData = { id: string; text: string; context?: ItemContext };

type SelectionChange = { question: string; before: string[]; after: string[] };

type Created = { id: string; as?: string } & Partial<Placement>;

type Displaced = { id: string } & Required<Placement>;

type Change = { before: TreeNode; after: TargetNode };

type Placed = { id: string; state: "open" | "settled" };

type WriteResult = {
  created: Created[];
  selections: SelectionChange[];
  displaced: Displaced[];
  placed: Placed[];
};

type ItemState = "open" | "settled" | "off-path" | "deferred" | "not-applicable" | "frozen";

type NodeState = ItemState | "unset";

type SupersedeLinks = { supersedes?: string; supersededBy?: string };

type TreeEntryOption = OptionData &
  SupersedeLinks & {
    selected?: true;
    state?: ExclusionReason | "frozen";
    children: TreeEntry[];
  };

type TreeEntry = SupersedeLinks &
  (
    | {
        kind: "question";
        state: ItemState;
        hiddenBy?: Hiding;
        id: string;
        text: string;
        tags?: string[];
        context?: QuestionContext;
        options: TreeEntryOption[];
        children: TreeEntry[];
      }
    | {
        kind: "follow-up" | "statement";
        state: ItemState;
        hiddenBy?: Hiding;
        id: string;
        text: string;
        tags?: string[];
        context?: ItemContext;
        children: TreeEntry[];
      }
  );

type OpenQuestion = {
  kind: "question";
  id: string;
  text: string;
  tags?: string[];
  context?: QuestionContext;
  options: OptionData[];
};

type OpenFollowUp = { kind: "follow-up"; id: string; text: string; tags?: string[]; context?: ItemContext };

type OpenItem = OpenQuestion | OpenFollowUp;

type StatusItem =
  | { kind: "option"; state: "deferred"; id: string; text: string; context?: ItemContext }
  | { kind: "follow-up"; state: "open"; id: string; text: string; tags?: string[]; context?: ItemContext }
  | { kind: "follow-up" | "statement"; state: "deferred"; id: string; text: string; tags?: string[]; context?: ItemContext }
  | { kind: "question"; state: "deferred"; id: string; text: string; tags?: string[]; context?: QuestionContext }
  | {
      kind: "question";
      state: "open";
      id: string;
      text: string;
      tags?: string[];
      context?: QuestionContext;
      options: OptionData[];
      children: StatusItem[];
    }
  | {
      kind: "question";
      state: "settled";
      id: string;
      text: string;
      tags?: string[];
      context?: QuestionContext;
      decided: (OptionData & { children: StatusItem[] })[];
      children: StatusItem[];
    };

type Hiding = { state: ItemState; by: string };

type Placement = { state: ItemState; hiddenBy?: Hiding };

type Listed = { id: string; text: string; tags: string[]; trail?: TrailStep[] } & Placement;

type HiddenOption = OptionData & { state: ExclusionReason | "frozen"; supersededBy?: string };

type ListedQuestion = Listed & SupersedeLinks & {
  kind: "question";
  options: OptionData[];
  selected?: string[];
  hiddenOptions?: HiddenOption[];
  context?: QuestionContext;
};

type ListedItem =
  | ListedQuestion
  | (Listed & { kind: "follow-up"; context?: ItemContext })
  | (Listed & { kind: "statement"; context?: ItemContext } & SupersedeLinks);

type TrailStep = { kind: "question" | "option" | "follow-up" | "statement"; id: string; text: string };

type NextData = OpenItem & { trail?: TrailStep[]; focus?: string };

type QuestionNode = {
  kind: "question";
  id: string;
  text: string;
  state: NodeState;
  active: boolean | "unset";
  parent?: TreeNode;
  options: OptionNode[];
  children: (QuestionNode | StatementNode)[];
  followUps: FollowUpNode[];
  selected: OptionNode[];
  context: QuestionContext;
  supersededBy?: QuestionNode;
  supersedes?: QuestionNode;
  hiddenBy?: Hiding;
};

type OptionNode = {
  kind: "option";
  id: string;
  text: string;
  state: NodeState;
  active: boolean | "unset";
  hiddenBy?: Hiding;
  context: ItemContext;
  question: QuestionNode;
  supersededBy?: OptionNode;
  supersedes?: OptionNode;
  children: (QuestionNode | StatementNode)[];
  followUps: FollowUpNode[];
};

type FollowUpNode = {
  kind: "follow-up";
  id: string;
  text: string;
  state: NodeState;
  active: boolean | "unset";
  parent?: TreeNode;
  status: "open" | "promoted";
  hiddenBy?: Hiding;
  context: ItemContext;
  children: (QuestionNode | StatementNode)[];
  followUps: FollowUpNode[];
};

type StatementNode = {
  kind: "statement";
  id: string;
  text: string;
  state: NodeState;
  active: boolean | "unset";
  hiddenBy?: Hiding;
  context: ItemContext;
  parent?: TreeNode;
  children: (QuestionNode | StatementNode)[];
  followUps: FollowUpNode[];
  supersededBy?: StatementNode;
  supersedes?: StatementNode;
};

type TreeNode = QuestionNode | OptionNode | FollowUpNode | StatementNode;
type TargetNode = QuestionNode | FollowUpNode | StatementNode;
type NodeOfKind<K extends TreeNode["kind"]> = Extract<TreeNode, { kind: K }>;

type Graph = {
  nodes: Map<string, TreeNode>;
  roots: (QuestionNode | StatementNode)[];
  rootFollowUps: FollowUpNode[];
  exclusions: Map<string, ExclusionReason>;
  tags: Map<string, Set<string>>;
  focus?: { node: TargetNode; ended: boolean };
  walkOrder: TargetNode[];
};

class DecisionTreeError extends Error {}

const Log = (() => {
  type FieldKind = "string" | "optional string" | "strings" | "reason";

  const shapes: Record<Event["type"], Record<string, FieldKind>> = {
    "add-question": { id: "string", text: "string", origin: "optional string", context: "optional string" },
    "add-option": { id: "string", text: "string", origin: "string", context: "optional string" },
    "select-option": { targets: "strings", context: "optional string" },
    "clear-selection": { target: "string", context: "optional string" },
    "add-follow-up": { id: "string", text: "string", origin: "optional string", context: "optional string" },
    "add-statement": { id: "string", text: "string", origin: "optional string", context: "optional string" },
    "promote-follow-up": { target: "string", question: "string", context: "optional string" },
    exclude: { target: "string", reason: "reason", context: "optional string" },
    restore: { target: "string" },
    "supersede-question": { target: "string", question: "string", context: "optional string" },
    "supersede-option": { target: "string", option: "string", context: "optional string" },
    "supersede-statement": { target: "string", statement: "string", context: "optional string" },
    focus: { target: "string" },
    tag: { target: "string", tags: "strings" },
    untag: { target: "string", tags: "strings" },
  };

  function fieldFault(type: string, field: string, kind: FieldKind, value: unknown): string | undefined {
    switch (kind) {
      case "string":
        return typeof value === "string" ? undefined : `${type} needs a string as its ${field}`;

      case "optional string":
        return value === undefined || typeof value === "string" ? undefined : `${type}'s ${field} must be a string`;

      case "strings": {
        const strings = Array.isArray(value) && value.length > 0 && value.every((each) => typeof each === "string");

        return strings ? undefined : `${type} needs at least one string in its ${field}`;
      }

      case "reason":
        return value === "not-applicable" || value === "deferred"
          ? undefined
          : `${type}'s ${field} must be not-applicable or deferred`;
    }
  }

  function faultOf(line: unknown): string | undefined {
    if (typeof line !== "object" || line === null) return "not an event";

    const fields = line as Record<string, unknown>;
    const type = fields.type;
    if (typeof type !== "string") return "not an event";
    if (!Object.hasOwn(shapes, type)) return `unknown event type: ${type}`;

    return Object.entries(shapes[type as Event["type"]])
      .map(([field, kind]) => fieldFault(type, field, kind, fields[field]))
      .find((fault) => fault !== undefined);
  }

  function parseLine(line: string, number: number, path: string): Event {
    const parsed: unknown = (() => {
      try {
        return JSON.parse(line);
      } catch {
        throw new DecisionTreeError(`log line ${number} is not valid JSON: ${path}`);
      }
    })();

    const fault = faultOf(parsed);
    if (fault !== undefined) throw new DecisionTreeError(`log line ${number}: ${fault}`);

    return parsed as Event;
  }

  const lines = new WeakMap<Event, number>();

  function numbered(event: Event, line: number): Event {
    lines.set(event, line);

    return event;
  }

  function lineOf(event: Event): number | undefined {
    return lines.get(event);
  }

  function fileLog(path: string): Log {
    return {
      read() {
        if (!existsSync(path)) return [];

        return readFileSync(path, "utf8")
          .split("\n")
          .flatMap((line, index) => (line === "" ? [] : [numbered(parseLine(line, index + 1, path), index + 1)]));
      },

      append(...events) {
        const lines = events.map((event) => JSON.stringify(event) + "\n").join("");

        mkdirSync(dirname(path), { recursive: true });
        appendFileSync(path, endsMidLine(path) ? `\n${lines}` : lines);
      },
    };
  }

  function endsMidLine(path: string): boolean {
    const size = existsSync(path) ? statSync(path).size : 0;
    if (size === 0) return false;

    const file = openSync(path, "r");
    const last = Buffer.alloc(1);
    try {
      readSync(file, last, 0, 1, size - 1);
    } finally {
      closeSync(file);
    }

    return last.toString() !== "\n";
  }

  function memoryLog(events: Event[] = []): Log {
    return {
      read() {
        return [...events];
      },

      append(...added) {
        events.push(...added);
      },
    };
  }

  function sleep(milliseconds: number): void {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);
  }

  const lockLimits = { waitMs: 5_000, abandonedMs: 30_000 };

  function holderOf(lock: string): number | undefined {
    try {
      const written = readFileSync(lock, "utf8");

      return /^[0-9]+$/.test(written) ? Number(written) : undefined;
    } catch {
      return undefined;
    }
  }

  function isRunning(pid: number): boolean {
    try {
      process.kill(pid, 0);

      return true;
    } catch (error) {
      return (error as NodeJS.ErrnoException).code === "EPERM";
    }
  }

  function isAbandoned(lock: string, abandonedMs: number): boolean {
    const holder = holderOf(lock);
    if (holder !== undefined && !isRunning(holder)) return true;

    const stats = statSync(lock, { throwIfNoEntry: false });

    return stats !== undefined && Date.now() - stats.mtimeMs > abandonedMs;
  }

  function acquire(lock: string, limits: typeof lockLimits): void {
    const deadline = Date.now() + limits.waitMs;

    while (true) {
      try {
        writeFileSync(lock, String(process.pid), { flag: "wx" });
        return;
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      }

      if (isAbandoned(lock, limits.abandonedMs)) {
        rmSync(lock, { force: true });
        continue;
      }
      if (Date.now() > deadline) throw new DecisionTreeError(`log is locked by another writer: ${lock}`);

      sleep(10);
    }
  }

  function fileNamed(path: string): string {
    return existsSync(path) ? realpathSync(path) : join(realpathSync(dirname(path)), basename(path));
  }

  function locked<T>(path: string, work: () => T, limits = lockLimits): T {
    mkdirSync(dirname(path), { recursive: true });

    const lock = `${fileNamed(path)}.lock`;

    acquire(lock, limits);

    try {
      return work();
    } finally {
      rmSync(lock, { force: true });
    }
  }

  const fileErrorReasons: Record<string, string> = {
    EACCES: "permission denied",
    EPERM: "permission denied",
    EISDIR: "it is a directory",
    ENOTDIR: "part of its path is not a directory",
    EEXIST: "part of its path is not a directory",
    EROFS: "the file system is read-only",
  };

  function explainingFileErrors<T>(path: string, work: () => T): T {
    try {
      return work();
    } catch (error) {
      const { code, syscall } = error as NodeJS.ErrnoException;
      if (typeof code !== "string" || typeof syscall !== "string") throw error;

      const reason = Object.hasOwn(fileErrorReasons, code) ? fileErrorReasons[code] : code;

      throw new DecisionTreeError(`cannot use log ${path}: ${reason}`);
    }
  }

  const isRoot = process.getuid?.() === 0;

  function nextId(log: Log, type: IdEvent["type"], prefix: string): string {
    const numbers = log
      .read()
      .filter((event): event is IdEvent => event.type === type)
      .map((event) => Number(event.id.slice(prefix.length)));

    return `${prefix}${Math.max(0, ...numbers) + 1}`;
  }

  function stamp(
    added: Event[],
    call: { existing: number; op: Event["type"]; at: number; context?: string },
  ): Event[] {
    const own = added.findIndex((event) => event.type === call.op);
    if (own === -1) throw new Error(`${call.op} wrote no line of its own`);

    const ownEid = call.existing + own + 1;

    return added.map((event, index) => {
      const eid = call.existing + index + 1;
      if (index !== own) return { ...event, meta: { eid, at: call.at, causedByEid: ownEid } };

      const context = call.context === undefined ? {} : { context: call.context };

      return { ...event, ...context, meta: { eid, at: call.at } };
    });
  }

  function tests() {
    test("a lock held by another writer throws and does not run the work", (t) => {
      // given
      const dir = realpathSync(mkdtempSync(join(tmpdir(), "decision-tree-")));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(`${path}.lock`, "");
      let ran = false;

      // when
      const act = () =>
        locked(
          path,
          () => {
            ran = true;
          },
          { waitMs: 0, abandonedMs: 60_000 },
        );

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === `log is locked by another writer: ${path}.lock`,
      );
      assert.equal(ran, false);
    });

    test("an abandoned lock is taken over and removed afterwards", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(`${path}.lock`, "");

      // when
      const result = locked(path, () => "done", { waitMs: 0, abandonedMs: -1 });

      // then
      assert.equal(result, "done");
      assert.equal(existsSync(`${path}.lock`), false);
    });

    test("a log reached through a link is locked as the file it points to", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const link = join(dir, "link.jsonl");
      appendFileSync(path, "");
      symlinkSync(path, link);

      // when
      const locks = locked(link, () => [existsSync(`${realpathSync(path)}.lock`), existsSync(`${link}.lock`)]);

      // then
      assert.deepEqual(locks, [true, false]);
    });

    test("a lock names the process that holds it", (t) => {
      // given
      const dir = realpathSync(mkdtempSync(join(tmpdir(), "decision-tree-")));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");

      // when
      const holder = locked(path, () => readFileSync(`${path}.lock`, "utf8"));

      // then
      assert.equal(holder, String(process.pid));
    });

    test("a lock whose holder is still running is held while it is newer than the limit", (t) => {
      // given
      const dir = realpathSync(mkdtempSync(join(tmpdir(), "decision-tree-")));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(`${path}.lock`, String(process.pid));

      // when
      const act = () => locked(path, () => "done", { waitMs: 0, abandonedMs: 60_000 });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === `log is locked by another writer: ${path}.lock`,
      );
    });

    test("a lock whose holder is still running is taken over once it is older than the limit", (t) => {
      // given
      const dir = realpathSync(mkdtempSync(join(tmpdir(), "decision-tree-")));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(`${path}.lock`, String(process.pid));

      // when
      const result = locked(path, () => "done", { waitMs: 0, abandonedMs: -1 });

      // then
      assert.equal(result, "done");
    });

    test("a lock whose holder is gone is taken over at once, however new it is", (t) => {
      // given
      const dir = realpathSync(mkdtempSync(join(tmpdir(), "decision-tree-")));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const gone = spawnSync(process.execPath, ["-e", ""]).pid;
      appendFileSync(`${path}.lock`, String(gone));

      // when
      const result = locked(path, () => "done", { waitMs: 0, abandonedMs: 60_000 });

      // then
      assert.equal(result, "done");
    });

    test("the lock is released when the work throws", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");

      // when
      const act = () =>
        locked(path, () => {
          throw new DecisionTreeError("failed");
        });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "failed");
      assert.equal(existsSync(`${path}.lock`), false);
    });

    const linesMissingAField: [string, object, string][] = [
      ["add-question without its id", { type: "add-question", text: "q" }, "add-question needs a string as its id"],
      ["add-question without its text", { type: "add-question", id: "Q1" }, "add-question needs a string as its text"],
      [
        "add-option without its id",
        { type: "add-option", text: "a", origin: "Q1" },
        "add-option needs a string as its id",
      ],
      [
        "add-option without its text",
        { type: "add-option", id: "Q1a", origin: "Q1" },
        "add-option needs a string as its text",
      ],
      [
        "add-option without its origin",
        { type: "add-option", id: "Q1a", text: "a" },
        "add-option needs a string as its origin",
      ],
      [
        "select-option without its targets",
        { type: "select-option" },
        "select-option needs at least one string in its targets",
      ],
      [
        "clear-selection without its target",
        { type: "clear-selection" },
        "clear-selection needs a string as its target",
      ],
      ["add-follow-up without its id", { type: "add-follow-up", text: "f" }, "add-follow-up needs a string as its id"],
      [
        "add-follow-up without its text",
        { type: "add-follow-up", id: "F1" },
        "add-follow-up needs a string as its text",
      ],
      ["add-statement without its id", { type: "add-statement", text: "s" }, "add-statement needs a string as its id"],
      [
        "add-statement without its text",
        { type: "add-statement", id: "S1" },
        "add-statement needs a string as its text",
      ],
      [
        "promote-follow-up without its target",
        { type: "promote-follow-up", question: "Q1" },
        "promote-follow-up needs a string as its target",
      ],
      [
        "promote-follow-up without its question",
        { type: "promote-follow-up", target: "F1" },
        "promote-follow-up needs a string as its question",
      ],
      ["exclude without its target", { type: "exclude", reason: "deferred" }, "exclude needs a string as its target"],
      [
        "exclude without its reason",
        { type: "exclude", target: "Q1" },
        "exclude's reason must be not-applicable or deferred",
      ],
      ["restore without its target", { type: "restore" }, "restore needs a string as its target"],
      [
        "supersede-question without its target",
        { type: "supersede-question", question: "Q2" },
        "supersede-question needs a string as its target",
      ],
      [
        "supersede-question without its question",
        { type: "supersede-question", target: "Q1" },
        "supersede-question needs a string as its question",
      ],
      [
        "supersede-option without its target",
        { type: "supersede-option", option: "Q1b" },
        "supersede-option needs a string as its target",
      ],
      [
        "supersede-option without its option",
        { type: "supersede-option", target: "Q1a" },
        "supersede-option needs a string as its option",
      ],
      [
        "supersede-statement without its target",
        { type: "supersede-statement", statement: "S2" },
        "supersede-statement needs a string as its target",
      ],
      [
        "supersede-statement without its statement",
        { type: "supersede-statement", target: "S1" },
        "supersede-statement needs a string as its statement",
      ],
      ["focus without its target", { type: "focus" }, "focus needs a string as its target"],
      ["tag without its target", { type: "tag", tags: ["t"] }, "tag needs a string as its target"],
      ["tag without its tags", { type: "tag", target: "Q1" }, "tag needs at least one string in its tags"],
      ["untag without its target", { type: "untag", tags: ["t"] }, "untag needs a string as its target"],
      ["untag without its tags", { type: "untag", target: "Q1" }, "untag needs at least one string in its tags"],
    ];

    for (const [title, line, expected] of linesMissingAField) {
      test(`a log line that is ${title} is faulted`, () => {
        // when
        const fault = faultOf(line);

        // then
        assert.equal(fault, expected);
      });
    }

    const soundLines: Event[] = [
      { type: "add-question", id: "Q1", text: "q" },
      { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      { type: "select-option", targets: ["Q1a"] },
      { type: "clear-selection", target: "Q1" },
      { type: "add-follow-up", id: "F1", text: "f" },
      { type: "add-statement", id: "S1", text: "s" },
      { type: "promote-follow-up", target: "F1", question: "Q1" },
      { type: "exclude", target: "Q1", reason: "deferred" },
      { type: "restore", target: "Q1" },
      { type: "supersede-question", target: "Q1", question: "Q2" },
      { type: "supersede-option", target: "Q1a", option: "Q1b" },
      { type: "supersede-statement", target: "S1", statement: "S2" },
      { type: "focus", target: "Q1" },
      { type: "tag", target: "Q1", tags: ["t"] },
      { type: "untag", target: "Q1", tags: ["t"] },
    ];

    for (const line of soundLines) {
      test(`a sound ${line.type} line has no fault`, () => {
        // when
        const fault = faultOf(line);

        // then
        assert.equal(fault, undefined);
      });
    }

    test("a log line that is a number is not an event", () => {
      // given
      const line: unknown = 7;

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "not an event");
    });

    test("a log line that is null is not an event", () => {
      // given
      const line: unknown = null;

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "not an event");
    });

    test("a log line that is a list is not an event", () => {
      // given
      const line: unknown = [{ type: "focus", target: "Q1" }];

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "not an event");
    });

    test("a log line with no type is not an event", () => {
      // given
      const line: unknown = { target: "Q1" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "not an event");
    });

    test("a log line of an unknown type is faulted, naming the type", () => {
      // given
      const line: unknown = { type: "add-answer", text: "x" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "unknown event type: add-answer");
    });

    test("a log line whose type is the name of something every object has is of an unknown type", () => {
      // given
      const line: unknown = { type: "toString" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "unknown event type: toString");
    });

    test("a log line whose required field is not a string is faulted", () => {
      // given
      const line: unknown = { type: "add-question", id: "Q1", text: 7 };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "add-question needs a string as its text");
    });

    test("a log line whose origin is not a string is faulted", () => {
      // given
      const line: unknown = { type: "add-question", id: "Q1", text: "q", origin: 7 };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "add-question's origin must be a string");
    });

    test("a log line whose context is not a string is faulted", () => {
      // given
      const line: unknown = { type: "clear-selection", target: "Q1", context: ["why"] };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "clear-selection's context must be a string");
    });

    test("a log line with an empty list of targets is faulted", () => {
      // given
      const line: unknown = { type: "select-option", targets: [] };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "select-option needs at least one string in its targets");
    });

    test("a log line with a target that is not a string is faulted", () => {
      // given
      const line: unknown = { type: "select-option", targets: ["Q1a", 7] };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "select-option needs at least one string in its targets");
    });

    test("a log line whose targets are one string and not a list is faulted", () => {
      // given
      const line: unknown = { type: "select-option", targets: "Q1a" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "select-option needs at least one string in its targets");
    });

    test("a log line with an unknown reason is faulted", () => {
      // given
      const line: unknown = { type: "exclude", target: "Q1", reason: "later" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "exclude's reason must be not-applicable or deferred");
    });

    test("a log line with a field the CLI does not know has no fault", () => {
      // given
      const line: unknown = { type: "focus", target: "Q1", colour: "red" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, undefined);
    });

    test("a log line with two faults reports the first field's", () => {
      // given
      const line: unknown = { type: "add-option", origin: "Q1" };

      // when
      const fault = faultOf(line);

      // then
      assert.equal(fault, "add-option needs a string as its id");
    });

    test("file log with a line that is not an event it knows throws, naming the line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(path, '{"type":"add-question","id":"Q1","text":"q"}\n\n{"type":"select-option","targets":[]}\n');

      // when
      const act = () => fileLog(path).read();

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "log line 3: select-option needs at least one string in its targets",
      );
    });

    test("file log with a malformed line throws, naming the line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      appendFileSync(path, '{"type":"add-question","id":"Q1","text":"q"}\n{"type":"add-opt\n');

      // when
      const act = () => fileLog(path).read();

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === `log line 2 is not valid JSON: ${path}`,
      );
    });

    test("file log without a file reads as empty", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");

      // when
      const events = fileLog(path).read();

      // then
      assert.deepEqual(events, []);
      assert.equal(existsSync(path), false);
    });

    test("reading a log that is a directory says so", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));

      // when
      const act = () => explainingFileErrors(dir, () => fileLog(dir).read());

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === `cannot use log ${dir}: it is a directory`,
      );
    });

    test("appending to a log that is read-only says permission denied", { skip: isRoot }, (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      writeFileSync(path, "");
      chmodSync(path, 0o444);
      const question: Event = { type: "add-question", id: "Q1", text: "q" };

      // when
      const act = () => explainingFileErrors(path, () => fileLog(path).append(question));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === `cannot use log ${path}: permission denied`,
      );
    });

    test("locking a log in a read-only directory says permission denied", { skip: isRoot }, (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => {
        chmodSync(dir, 0o755);
        rmSync(dir, { recursive: true });
      });
      const path = join(dir, "decision-tree.jsonl");
      chmodSync(dir, 0o555);

      // when
      const act = () => explainingFileErrors(path, () => locked(path, () => undefined));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === `cannot use log ${path}: permission denied`,
      );
    });

    test("locking a log whose path runs through a file says so", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const file = join(dir, "file");
      writeFileSync(file, "");
      const path = join(file, "decision-tree.jsonl");

      // when
      const act = () => explainingFileErrors(path, () => locked(path, () => undefined));

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === `cannot use log ${path}: part of its path is not a directory`,
      );
    });

    test("a file error with a code that has no wording shows the code", () => {
      // given
      const failure = Object.assign(new Error("no space"), { code: "ENOSPC", syscall: "write" });

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "cannot use log log.jsonl: ENOSPC",
      );
    });

    test("a file error for an operation that is not permitted says permission denied", () => {
      // given
      const failure = Object.assign(new Error("x"), { code: "EPERM", syscall: "open" });

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "cannot use log log.jsonl: permission denied",
      );
    });

    test("a file error for a path through something that is not a directory says so", () => {
      // given
      const failure = Object.assign(new Error("x"), { code: "ENOTDIR", syscall: "open" });

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "cannot use log log.jsonl: part of its path is not a directory",
      );
    });

    test("a file error for a read-only file system says so", () => {
      // given
      const failure = Object.assign(new Error("x"), { code: "EROFS", syscall: "open" });

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "cannot use log log.jsonl: the file system is read-only",
      );
    });

    test("an error with a code that did not come from a file call passes through unchanged", () => {
      // given
      const failure = Object.assign(new TypeError("a fault in the code"), { code: "ERR_INVALID_ARG_TYPE" });

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(act, (error) => error === failure);
    });

    test("an error that is not a file error passes through unchanged", () => {
      // given
      const failure = new Error("a fault in the code");

      // when
      const act = () =>
        explainingFileErrors("log.jsonl", () => {
          throw failure;
        });

      // then
      assert.throws(act, (error) => error === failure);
    });

    test("an event read from a file knows its line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const lines = [
        '{"type":"add-question","id":"Q1","text":"a"}',
        '{"type":"add-question","id":"Q2","text":"b"}',
      ];
      writeFileSync(path, lines.map((line) => `${line}\n`).join(""));

      // when
      const numbers = fileLog(path).read().map(lineOf);

      // then
      assert.deepEqual(numbers, [1, 2]);
    });

    test("an event read after a blank line knows its line in the file", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const lines = [
        '{"type":"add-question","id":"Q1","text":"a"}',
        '',
        '{"type":"add-question","id":"Q2","text":"b"}',
      ];
      writeFileSync(path, lines.map((line) => `${line}\n`).join(""));

      // when
      const numbers = fileLog(path).read().map(lineOf);

      // then
      assert.deepEqual(numbers, [1, 3]);
    });

    test("an event that was not read from a file has no line", () => {
      // given
      const log = memoryLog([{ type: "add-question", id: "Q1", text: "a" }]);

      // when
      const numbers = log.read().map(lineOf);

      // then
      assert.deepEqual(numbers, [undefined]);
    });

    test("file log reads back what it appended", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const option: Event = { type: "add-option", id: "Q1a", text: "a", origin: "Q1" };

      // when
      const log = fileLog(path);
      log.append(question);
      log.append(option);

      // then
      assert.deepEqual(fileLog(path).read(), [question, option]);
      assert.equal(readFileSync(path, "utf8").split("\n").filter((line) => line !== "").length, 2);
    });

    test("appending to a file log whose last line has no newline starts on a new line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const option: Event = { type: "add-option", id: "Q1a", text: "a", origin: "Q1" };
      appendFileSync(path, JSON.stringify(question));

      // when
      fileLog(path).append(option);

      // then
      assert.equal(readFileSync(path, "utf8"), `${JSON.stringify(question)}\n${JSON.stringify(option)}\n`);
    });

    test("appending to a file log that ends with a newline adds no empty line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const option: Event = { type: "add-option", id: "Q1a", text: "a", origin: "Q1" };
      appendFileSync(path, `${JSON.stringify(question)}\n`);

      // when
      fileLog(path).append(option);

      // then
      assert.equal(readFileSync(path, "utf8"), `${JSON.stringify(question)}\n${JSON.stringify(option)}\n`);
    });

    test("memory log read returns a copy", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const log = memoryLog([question]);

      // when
      log.read().push({ type: "add-question", id: "Q2", text: "q2" });

      // then
      assert.deepEqual(log.read(), [question]);
    });

    test("stamping lines that hold none of the op's own type throws", () => {
      // given
      const added: Event[] = [{ type: "add-option", id: "Q1b", text: "b", origin: "Q1" }];

      // when
      const act = () => stamp(added, { existing: 2, op: "supersede-option", at: 1000 });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof Error &&
          !(error instanceof DecisionTreeError) &&
          error.message === "supersede-option wrote no line of its own",
      );
    });

    test("stamping with a context writes it on the op's own line only", () => {
      // given
      const added: Event[] = [
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ];

      // when
      const stamped = stamp(added, { existing: 1, op: "supersede-question", at: 1000, context: "the premise changed" });

      // then
      assert.deepEqual(stamped, [
        { type: "add-question", id: "Q2", text: "new", meta: { eid: 2, at: 1000, causedByEid: 3 } },
        {
          type: "supersede-question",
          target: "Q1",
          question: "Q2",
          context: "the premise changed",
          meta: { eid: 3, at: 1000 },
        },
      ]);
    });

    test("stamping numbers the lines after the existing ones, times them and points side effects at the op's line", () => {
      // given
      const added: Event[] = [
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "clear-selection", target: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ];

      // when
      const stamped = stamp(added, { existing: 2, op: "supersede-option", at: 1000 });

      // then
      assert.deepEqual(stamped, [
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1", meta: { eid: 3, at: 1000, causedByEid: 5 } },
        { type: "clear-selection", target: "Q1", meta: { eid: 4, at: 1000, causedByEid: 5 } },
        { type: "supersede-option", target: "Q1a", option: "Q1c", meta: { eid: 5, at: 1000 } },
      ]);
    });
  }

  return { fileLog, memoryLog, lineOf, locked, explainingFileErrors, nextId, stamp, tests };
})();

const Graph = (() => {
  function requireQuestion(nodes: Graph["nodes"], id: string): QuestionNode {
    const node = nodes.get(id);
    if (node?.kind !== "question") throw new DecisionTreeError(`question ${id} does not exist`);

    return node;
  }

  function requireOption(nodes: Graph["nodes"], id: string): OptionNode {
    const node = nodes.get(id);
    if (node?.kind !== "option") throw new DecisionTreeError(`option ${id} does not exist`);

    return node;
  }

  function requireFollowUp(nodes: Graph["nodes"], id: string): FollowUpNode {
    const node = nodes.get(id);
    if (node?.kind !== "follow-up") throw new DecisionTreeError(`follow-up ${id} does not exist`);

    return node;
  }

  function requireStatement(nodes: Graph["nodes"], id: string): StatementNode {
    const node = nodes.get(id);
    if (node?.kind !== "statement") throw new DecisionTreeError(`statement ${id} does not exist`);

    return node;
  }

  function requireNode(nodes: Graph["nodes"], id: string): TreeNode {
    const node = nodes.get(id);
    if (node === undefined) throw new DecisionTreeError(`item ${id} does not exist`);

    return node;
  }

  function requireSuperseded(nodes: Graph["nodes"], id: string): QuestionNode | OptionNode | StatementNode {
    const node = nodes.get(id);
    if (node === undefined || node.kind === "follow-up") throw new Error(`log has no question, option or statement ${id}`);

    return node;
  }

  function rejectFrozen(graph: Graph, node: TreeNode): void {
    if (node.state !== "frozen") return;

    const superseded = requireSuperseded(graph.nodes, node.hiddenBy?.by ?? node.id);
    const replacement = superseded.supersededBy?.id;
    if (superseded === node) {
      throw new DecisionTreeError(`${node.id} is frozen, as it was superseded by ${replacement}`);
    }
    throw new DecisionTreeError(
      `${node.id} is frozen, as its ancestor ${superseded.id} was superseded by ${replacement}`,
    );
  }

  function ownHidingOf(graph: Graph, option: OptionNode): "frozen" | ExclusionReason | undefined {
    if (option.supersededBy !== undefined) return "frozen";

    return graph.exclusions.get(option.id);
  }

  function isLiveOption(graph: Graph, option: OptionNode): boolean {
    return ownHidingOf(graph, option) === undefined;
  }

  function optionData(option: OptionNode): OptionData {
    return { id: option.id, text: option.text, ...itemContextOf(option) };
  }

  function liveOptions(graph: Graph, question: QuestionNode): OptionData[] {
    return question.options.filter((option) => isLiveOption(graph, option)).map(optionData);
  }

  function withContext<C extends QuestionContext>(context: C, changes: Partial<QuestionContext>): C {
    const entries = Object.entries({ ...context, ...changes }).filter(([, value]) => value !== undefined);

    return Object.fromEntries(entries) as C;
  }

  type ContextRule = { sets?: keyof QuestionContext; ends?: (keyof QuestionContext)[]; required?: true };

  const contextRules: Record<Event["type"], ContextRule> = {
    "add-question": { sets: "creation" },
    "add-option": { sets: "creation" },
    "add-follow-up": { sets: "creation" },
    "add-statement": { sets: "creation" },
    "promote-follow-up": { sets: "creation" },
    "supersede-question": { sets: "creation", required: true },
    "supersede-option": { sets: "creation", required: true },
    "supersede-statement": { sets: "creation", required: true },
    "select-option": { sets: "selection", ends: ["clearing"], required: true },
    "clear-selection": { sets: "clearing", ends: ["selection"], required: true },
    exclude: { sets: "exclusion", required: true },
    restore: { ends: ["exclusion"] },
    tag: {},
    untag: {},
    focus: {},
  };

  function takesContext(type: Event["type"]): boolean {
    return contextRules[type].sets !== undefined;
  }

  function requiresContext(type: Event["type"]): boolean {
    return contextRules[type].required === true;
  }

  function createsItem(type: Event["type"]): boolean {
    return contextRules[type].sets === "creation";
  }

  function createdWith<C extends ItemContext>(context: C, event: CreatingEvent): C {
    if (event.context === undefined) return context;

    return withContext(context, { creation: event.context, createdBy: event.type });
  }

  function contextAfter<C extends QuestionContext>(
    context: C,
    event: Extract<Event, { type: "select-option" | "clear-selection" | "exclude" | "restore" }>,
  ): C {
    const { sets, ends = [] } = contextRules[event.type];
    const ended = Object.fromEntries(ends.map((key) => [key, undefined]));
    const written = sets === undefined ? {} : { [sets]: "context" in event ? event.context : undefined };

    return withContext(context, { ...ended, ...written });
  }

  function hang(graph: Graph, node: QuestionNode | StatementNode, origin: string | undefined): void {
    if (origin === undefined) {
      graph.roots.push(node);
      return;
    }

    const parent = requireNode(graph.nodes, origin);
    node.parent = parent;
    parent.children.push(node);
  }

  function takePlaceOf<N extends QuestionNode | StatementNode>(graph: Graph, old: N, replacement: N): void {
    const siblings = old.parent === undefined ? graph.roots : old.parent.children;
    if (!siblings.includes(replacement)) {
      throw new DecisionTreeError(`${replacement.id} does not hang where ${old.id} hangs`);
    }

    siblings.splice(siblings.indexOf(replacement), 1);
    siblings.splice(siblings.indexOf(old), 1, replacement);
  }

  function linkSuperseded<N extends { supersededBy?: N; supersedes?: N; context: QuestionContext }>(
    old: N,
    replacement: N,
    event: Extract<Event, { type: "supersede-question" | "supersede-option" | "supersede-statement" }>,
  ): void {
    old.supersededBy = replacement;
    replacement.supersedes = old;
    replacement.context = createdWith(replacement.context, event);
  }

  function addNode(nodes: Graph["nodes"], node: TreeNode): void {
    if (nodes.has(node.id)) throw new DecisionTreeError(`${node.id} already exists`);

    nodes.set(node.id, node);
  }

  function replay(graph: Graph, event: Event): void {
    const { nodes, rootFollowUps, exclusions } = graph;

    switch (event.type) {
      case "add-question": {
        const node: QuestionNode = {
          kind: "question",
          id: event.id,
          text: event.text,
          state: "unset",
          active: "unset",
          options: [],
          selected: [],
          context: {},
          children: [],
          followUps: [],
        };
        node.context = createdWith(node.context, event);
        addNode(nodes, node);
        hang(graph, node, event.origin);
        break;
      }

      case "add-option": {
        const question = requireQuestion(nodes, event.origin);
        const node: OptionNode = {
          kind: "option",
          id: event.id,
          text: event.text,
          state: "unset",
          active: "unset",
          question,
          context: {},
          children: [],
          followUps: [],
        };
        node.context = createdWith(node.context, event);
        addNode(nodes, node);
        question.options.push(node);
        break;
      }

      case "select-option": {
        const options = event.targets.map((id) => requireOption(nodes, id));
        const question = options[0].question;
        question.selected = question.options.filter((option) => options.includes(option));
        question.context = contextAfter(question.context, event);
        break;
      }

      case "clear-selection": {
        const question = requireQuestion(nodes, event.target);
        question.selected = [];
        question.context = contextAfter(question.context, event);
        break;
      }

      case "add-follow-up": {
        const node: FollowUpNode = {
          kind: "follow-up",
          id: event.id,
          text: event.text,
          state: "unset",
          active: "unset",
          status: "open",
          context: {},
          children: [],
          followUps: [],
        };
        node.context = createdWith(node.context, event);
        addNode(nodes, node);

        if (event.origin === undefined) {
          rootFollowUps.push(node);
          break;
        }

        const parent = requireNode(nodes, event.origin);
        node.parent = parent;
        parent.followUps.push(node);
        break;
      }

      case "add-statement": {
        const node: StatementNode = {
          kind: "statement",
          id: event.id,
          text: event.text,
          state: "unset",
          active: "unset",
          context: {},
          children: [],
          followUps: [],
        };
        node.context = createdWith(node.context, event);
        addNode(nodes, node);
        hang(graph, node, event.origin);
        break;
      }

      case "promote-follow-up": {
        const followUp = requireFollowUp(nodes, event.target);
        const question = requireQuestion(nodes, event.question);
        if (question.parent !== followUp) {
          throw new DecisionTreeError(`${question.id} does not hang under ${followUp.id}`);
        }

        followUp.status = "promoted";
        question.context = createdWith(question.context, event);
        break;
      }

      case "exclude": {
        const excluded = requireNode(nodes, event.target);
        if (excluded.kind === "option" && excluded.question.selected.includes(excluded)) {
          throw new DecisionTreeError(
            `${excluded.id} is still selected: exclude needs a clear-selection on ${excluded.question.id} first`,
          );
        }

        exclusions.set(excluded.id, event.reason);
        excluded.context = contextAfter(excluded.context, event);
        break;
      }

      case "restore": {
        const restored = requireNode(nodes, event.target);
        exclusions.delete(restored.id);
        restored.context = contextAfter(restored.context, event);
        break;
      }

      case "supersede-question": {
        const old = requireQuestion(nodes, event.target);
        const replacement = requireQuestion(nodes, event.question);
        takePlaceOf(graph, old, replacement);
        linkSuperseded(old, replacement, event);
        break;
      }

      case "supersede-option": {
        const old = requireOption(nodes, event.target);
        const replacement = requireOption(nodes, event.option);
        if (replacement.question !== old.question) {
          throw new DecisionTreeError(
            `${replacement.id} cannot supersede ${old.id}: they belong to different questions`,
          );
        }
        if (old.question.selected.includes(old)) {
          throw new DecisionTreeError(
            `${old.id} is still selected: supersede-option needs a clear-selection on ${old.question.id} first`,
          );
        }

        linkSuperseded(old, replacement, event);
        break;
      }

      case "supersede-statement": {
        const old = requireStatement(nodes, event.target);
        const replacement = requireStatement(nodes, event.statement);
        takePlaceOf(graph, old, replacement);
        linkSuperseded(old, replacement, event);
        break;
      }

      case "tag": {
        const tags = graph.tags.get(event.target) ?? new Set<string>();
        event.tags.forEach((tag) => tags.add(tag));
        graph.tags.set(requireNode(nodes, event.target).id, tags);
        break;
      }

      case "untag": {
        event.tags.forEach((tag) => graph.tags.get(event.target)?.delete(tag));
        break;
      }

      case "focus": {
        const node = requireNode(nodes, event.target);
        if (node.kind === "option") throw new DecisionTreeError(
          `${node.id} is an option, and a focus needs a question, follow-up or statement`,
        );

        graph.focus = { node, ended: false };
        break;
      }

      default: {
        const unknown: never = event;
        throw new DecisionTreeError(`unknown event type: ${(unknown as { type: string }).type}`);
      }
    }
  }

  function namingLine<T>(event: Event, work: () => T): T {
    try {
      return work();
    } catch (error) {
      const line = Log.lineOf(event);
      if (!(error instanceof DecisionTreeError) || line === undefined) throw error;

      throw new DecisionTreeError(`log line ${line}: ${error.message}`);
    }
  }

  function build(log: Log): Graph {
    const graph: Graph = {
      nodes: new Map(),
      roots: [],
      rootFollowUps: [],
      exclusions: new Map(),
      tags: new Map(),
      walkOrder: [],
    };

    for (const event of log.read()) {
      namingLine(event, () => replay(graph, event));

      if (graph.focus !== undefined && !graph.focus.ended) {
        assignStates(graph);
        if (openWithin(graph, graph.focus.node).length === 0) graph.focus.ended = true;
      }
    }

    assignStates(graph);
    assertStatesAssigned(graph);

    return graph;
  }

  function assignStates(graph: Graph): void {
    graph.walkOrder = [];

    graph.roots.forEach((root) => assignChild(graph, root, undefined));
    graph.rootFollowUps.forEach((followUp) => assignFollowUp(graph, followUp, undefined));

    for (const node of graph.nodes.values()) {
      const superseded = (node.kind === "question" || node.kind === "statement") && node.supersededBy !== undefined;
      if (superseded) assignChild(graph, node, undefined);
    }
  }

  function hidingOf(
    graph: Graph,
    node: TreeNode,
    inherited: Hiding | undefined,
  ): Hiding | undefined {
    if (node.kind !== "follow-up" && node.supersededBy !== undefined) return { state: "frozen", by: node.id };
    if (inherited !== undefined) return inherited;

    const reason = graph.exclusions.get(node.id);

    return reason === undefined ? undefined : { state: reason, by: node.id };
  }

  function hiddenBy(node: TreeNode, hiding: Hiding | undefined): Hiding | undefined {
    return hiding === undefined || hiding.by === node.id ? undefined : hiding;
  }

  function offPathBelow(hiding: Hiding | undefined, by: string): Hiding {
    return hiding ?? { state: "off-path", by };
  }

  function stateWhenHidden(graph: Graph, node: TreeNode, hiding: Hiding): ItemState {
    if (hiding.state === "frozen") return "frozen";

    return graph.exclusions.get(node.id) ?? hiding.state;
  }

  function place(graph: Graph, node: TreeNode, hiding: Hiding | undefined, stateWhenActive: ItemState): void {
    node.state = hiding === undefined ? stateWhenActive : stateWhenHidden(graph, node, hiding);
    node.hiddenBy = hiddenBy(node, hiding);
    node.active = hiding === undefined;
  }

  function assignQuestion(graph: Graph, question: QuestionNode, inherited: Hiding | undefined): void {
    const hiding = hidingOf(graph, question, inherited);
    const selected = question.selected;

    place(graph, question, hiding, selected.length === 0 ? "open" : "settled");
    if (hiding === undefined) graph.walkOrder.push(question);

    question.options.forEach((option) => assignOption(graph, option, hiding, selected));
    question.children.forEach((child) => assignChild(graph, child, hiding));
    question.followUps.forEach((followUp) => assignFollowUp(graph, followUp, hiding));
  }

  function stateAmong(selected: OptionNode[], option: OptionNode): ItemState {
    if (selected.length === 0) return "open";

    return selected.includes(option) ? "settled" : "off-path";
  }

  function assignOption(
    graph: Graph,
    option: OptionNode,
    inherited: Hiding | undefined,
    selected: OptionNode[],
  ): void {
    const hiding = hidingOf(graph, option, inherited);
    const below = selected.includes(option) ? hiding : offPathBelow(hiding, option.id);

    place(graph, option, hiding, stateAmong(selected, option));

    option.children.forEach((child) => assignChild(graph, child, below));
    option.followUps.forEach((followUp) => assignFollowUp(graph, followUp, below));
  }

  function assignFollowUp(graph: Graph, followUp: FollowUpNode, inherited: Hiding | undefined): void {
    const hiding = hidingOf(graph, followUp, inherited);
    const below = followUp.status === "open" ? offPathBelow(hiding, followUp.id) : hiding;

    place(graph, followUp, hiding, followUp.status === "open" ? "open" : "settled");
    if (hiding === undefined) graph.walkOrder.push(followUp);

    followUp.children.forEach((child) => assignChild(graph, child, below));
    followUp.followUps.forEach((nested) => assignFollowUp(graph, nested, below));
  }

  function assignChild(graph: Graph, child: QuestionNode | StatementNode, inherited: Hiding | undefined): void {
    if (child.kind === "statement") assignStatement(graph, child, inherited);
    else assignQuestion(graph, child, inherited);
  }

  function assignStatement(graph: Graph, statement: StatementNode, inherited: Hiding | undefined): void {
    const hiding = hidingOf(graph, statement, inherited);

    place(graph, statement, hiding, "settled");
    if (hiding === undefined) graph.walkOrder.push(statement);

    statement.children.forEach((child) => assignChild(graph, child, hiding));
    statement.followUps.forEach((followUp) => assignFollowUp(graph, followUp, hiding));
  }

  function assignedState(node: TreeNode): ItemState {
    if (node.state === "unset") throw new Error(`node ${node.id} has no state`);

    return node.state;
  }

  function isActive(node: TreeNode): boolean {
    if (node.active === "unset") throw new Error(`node ${node.id} was not reached by the walk`);

    return node.active;
  }

  function assertStatesAssigned(graph: Graph): void {
    for (const node of graph.nodes.values()) {
      assignedState(node);
      isActive(node);
    }
  }

  function isWithin(node: QuestionNode | FollowUpNode, ancestor: TargetNode): boolean {
    let current: TreeNode | undefined = node;
    while (current !== undefined) {
      if (current.id === ancestor.id) return true;

      current = current.kind === "option" ? current.question : current.parent;
    }

    return false;
  }

  function openItem(graph: Graph, node: QuestionNode | FollowUpNode): OpenItem {
    if (node.kind === "follow-up") {
      return { kind: "follow-up", id: node.id, text: node.text, ...tagsOf(graph, node), ...itemContextOf(node) };
    }

    return {
      kind: "question",
      id: node.id,
      text: node.text,
      ...tagsOf(graph, node),
      ...questionContextOf(node),
      options: liveOptions(graph, node),
    };
  }

  function openWithin(graph: Graph, ancestor?: TargetNode): OpenItem[] {
    return graph.walkOrder.flatMap((node) => {
      if (node.kind === "statement" || node.state !== "open") return [];
      if (ancestor !== undefined && !isWithin(node, ancestor)) return [];

      return [openItem(graph, node)];
    });
  }

  function itemContextOf(node: OptionNode | FollowUpNode | StatementNode): { context?: ItemContext } {
    return Object.keys(node.context).length === 0 ? {} : { context: node.context };
  }

  function questionContextOf(question: QuestionNode): { context?: QuestionContext } {
    return Object.keys(question.context).length === 0 ? {} : { context: question.context };
  }

  function tagList(graph: Graph, id: string): string[] {
    return [...(graph.tags.get(id) ?? [])];
  }

  function tagsOf(graph: Graph, node: TargetNode): { tags?: string[] } {
    const tags = tagList(graph, node.id);

    return tags.length === 0 ? {} : { tags };
  }

  function childItems(graph: Graph, node: TreeNode): StatusItem[] {
    return [
      ...node.children.flatMap((child) => childItem(graph, child)),
      ...node.followUps.flatMap((followUp) => followUpItems(graph, followUp)),
    ];
  }

  function childItem(graph: Graph, child: QuestionNode | StatementNode): StatusItem[] {
    return child.kind === "question" ? questionItems(graph, child) : statementItems(graph, child);
  }

  function deferredItem(graph: Graph, node: TargetNode): StatusItem {
    const item = { state: "deferred" as const, id: node.id, text: node.text, ...tagsOf(graph, node) };

    return node.kind === "question"
      ? { kind: "question", ...item, ...questionContextOf(node) }
      : { kind: node.kind, ...item, ...itemContextOf(node) };
  }

  function statementItems(graph: Graph, statement: StatementNode): StatusItem[] {
    if (statement.state === "not-applicable") return [];
    if (statement.state === "deferred") return [deferredItem(graph, statement)];
    if (statement.state !== "settled") throw new Error(`status reached a ${statement.state} item: ${statement.id}`);

    return childItems(graph, statement);
  }

  function questionItems(graph: Graph, question: QuestionNode): StatusItem[] {
    if (question.state === "not-applicable") return [];
    if (question.state === "deferred") return [deferredItem(graph, question)];

    const deferredOptions = question.options
      .filter((option) => option.state === "deferred")
      .map((option) => ({
        kind: "option" as const,
        state: "deferred" as const,
        ...optionData(option),
      }));
    const children = [...childItems(graph, question), ...deferredOptions];

    if (question.state === "settled") {
      const decided = question.selected.map((option) => ({
        ...optionData(option),
        children: childItems(graph, option),
      }));

      const item: StatusItem = {
        kind: "question",
        state: "settled",
        id: question.id,
        text: question.text,
        ...tagsOf(graph, question),
        ...questionContextOf(question),
        decided,
        children,
      };

      return [item];
    }

    if (question.state !== "open") throw new Error(`status reached a ${question.state} item: ${question.id}`);

    return [
      {
        kind: "question",
        state: "open",
        id: question.id,
        text: question.text,
        ...tagsOf(graph, question),
        ...questionContextOf(question),
        options: liveOptions(graph, question),
        children,
      },
    ];
  }

  function followUpItems(graph: Graph, followUp: FollowUpNode): StatusItem[] {
    if (followUp.state === "not-applicable") return [];
    if (followUp.state === "deferred") return [deferredItem(graph, followUp)];
    if (followUp.state === "settled") return childItems(graph, followUp);

    if (followUp.state !== "open") throw new Error(`status reached a ${followUp.state} item: ${followUp.id}`);

    return [
      {
        kind: "follow-up",
        state: "open",
        id: followUp.id,
        text: followUp.text,
        ...tagsOf(graph, followUp),
        ...itemContextOf(followUp),
      },
    ];
  }

  function shownInStatus(node: TargetNode): boolean {
    if (node.state === "deferred") return node.hiddenBy === undefined;

    return isActive(node);
  }

  function status(log: Log, target?: string): StatusItem[] {
    const graph = build(log);

    if (target !== undefined) {
      const node = requireTarget(graph, target);
      if (!shownInStatus(node)) return [];
      if (node.kind === "follow-up") return followUpItems(graph, node);

      return childItem(graph, node);
    }

    return [
      ...graph.roots.flatMap((root) => childItem(graph, root)),
      ...graph.rootFollowUps.flatMap((followUp) => followUpItems(graph, followUp)),
    ];
  }

  function childEntry(graph: Graph, child: QuestionNode | StatementNode): TreeEntry[] {
    return child.kind === "statement" ? statementEntries(graph, child) : questionEntries(graph, child);
  }

  function childEntries(graph: Graph, node: TreeNode): TreeEntry[] {
    return [
      ...node.children.flatMap((child) => childEntry(graph, child)),
      ...node.followUps.map((followUp) => followUpEntry(graph, followUp)),
    ];
  }

  function supersedeLinks(node: QuestionNode | OptionNode | StatementNode): SupersedeLinks {
    return {
      ...(node.supersedes === undefined ? {} : { supersedes: node.supersedes.id }),
      ...(node.supersededBy === undefined ? {} : { supersededBy: node.supersededBy.id }),
    };
  }

  function questionEntries(graph: Graph, question: QuestionNode): TreeEntry[] {
    const selected = question.selected;
    const live = question.options
      .filter((option) => isLiveOption(graph, option))
      .map((option) => ({
        ...optionData(option),
        ...(selected.includes(option) ? { selected: true as const } : {}),
        ...supersedeLinks(option),
        children: childEntries(graph, option),
      }));
    const hidden = question.options.flatMap((option): TreeEntryOption[] => {
      const state = ownHidingOf(graph, option);
      if (state === undefined) return [];

      const children = childEntries(graph, option);

      return [
        {
          ...optionData(option),
          state,
          ...supersedeLinks(option),
          children,
        },
      ];
    });
    const options = [...live, ...hidden];

    const superseded = question.supersedes === undefined ? [] : questionEntries(graph, question.supersedes);

    return [
      {
        kind: "question",
        ...placementOf(question),
        id: question.id,
        text: question.text,
        ...tagsOf(graph, question),
        ...questionContextOf(question),
        ...supersedeLinks(question),
        options,
        children: childEntries(graph, question),
      },
      ...superseded,
    ];
  }

  function followUpEntry(graph: Graph, followUp: FollowUpNode): TreeEntry {
    return {
      kind: "follow-up",
      ...placementOf(followUp),
      id: followUp.id,
      text: followUp.text,
      ...tagsOf(graph, followUp),
      ...itemContextOf(followUp),
      children: childEntries(graph, followUp),
    };
  }

  function statementEntries(graph: Graph, statement: StatementNode): TreeEntry[] {
    const superseded = statement.supersedes === undefined ? [] : statementEntries(graph, statement.supersedes);

    return [
      {
        kind: "statement",
        ...placementOf(statement),
        id: statement.id,
        text: statement.text,
        ...tagsOf(graph, statement),
        ...itemContextOf(statement),
        ...supersedeLinks(statement),
        children: childEntries(graph, statement),
      },
      ...superseded,
    ];
  }

  function buildTree(log: Log, target?: string): TreeEntry[] {
    const graph = build(log);

    if (target !== undefined) {
      const node = requireTarget(graph, target);

      if (node.kind === "follow-up") return [followUpEntry(graph, node)];

      return childEntry(graph, node).slice(0, 1);
    }

    return [
      ...graph.roots.flatMap((root) => childEntry(graph, root)),
      ...graph.rootFollowUps.map((followUp) => followUpEntry(graph, followUp)),
    ];
  }

  function isInStates(placement: Placement, states: ItemState[]): boolean {
    const hider = placement.hiddenBy;

    return states.includes(placement.state) || (hider !== undefined && states.includes(hider.state));
  }

  function filterTree(entries: TreeEntry[], states: ItemState[]): TreeEntry[] {
    return entries.flatMap((entry) => {
      const children = filterTree(entry.children, states);
      const options =
        entry.kind === "question"
          ? entry.options.map((option) => ({ ...option, children: filterTree(option.children, states) }))
          : [];
      const holdsMatch = children.length > 0 || options.some((option) => option.children.length > 0);
      if (!isInStates(entry, states) && !holdsMatch) return [];

      return [entry.kind === "question" ? { ...entry, options, children } : { ...entry, children }];
    });
  }

  function firstQuestionEntry(log: Log): Extract<TreeEntry, { kind: "question" }> {
    const [item] = buildTree(log);
    if (item?.kind !== "question") throw new Error("the first entry of the built tree is not a question");

    return item;
  }

  function trail(log: Log, id: string): TrailStep[] {
    const steps: TrailStep[] = [];

    let current: TreeNode | undefined = requireNode(build(log).nodes, id);
    while (current !== undefined) {
      current = current.kind === "option" ? current.question : current.parent;
      if (current !== undefined) steps.unshift({ kind: current.kind, id: current.id, text: current.text });
    }

    return steps;
  }

  function hasOpen(log: Log, node: TargetNode): boolean {
    return openWithin(build(log), node).length > 0;
  }

  function focusedNode(graph: Graph): TargetNode | undefined {
    return graph.focus !== undefined && !graph.focus.ended ? graph.focus.node : undefined;
  }

  function activeFocus(graph: Graph): string | undefined {
    return focusedNode(graph)?.id;
  }

  function frontier(graph: Graph): OpenItem[] {
    return openWithin(graph, focusedNode(graph));
  }

  function hasAncestorIn(node: TargetNode, ids: Set<string>): boolean {
    let current: TreeNode | undefined = node.parent;
    while (current !== undefined) {
      if (ids.has(current.id)) return true;

      current = current.kind === "option" ? current.question : current.parent;
    }

    return false;
  }

  function changesBetween(before: Graph, after: Graph): Change[] {
    return [...after.nodes.values()].flatMap((node) => {
      const earlier = before.nodes.get(node.id);

      return node.kind === "option" || earlier === undefined ? [] : [{ before: earlier, after: node }];
    });
  }

  function topItems(changes: Change[], matches: (change: Change) => boolean): TargetNode[] {
    const matching = changes.filter(matches).map((change) => change.after);
    const ids = new Set(matching.map((node) => node.id));

    return matching.filter((node) => !hasAncestorIn(node, ids));
  }

  function isHiddenByAncestor(node: TreeNode): boolean {
    return node.hiddenBy !== undefined;
  }

  function openOrSettled(node: TreeNode): "open" | "settled" {
    const state = assignedState(node);
    if (state !== "open" && state !== "settled") throw new Error(`node ${node.id} is neither open nor settled`);

    return state;
  }

  function placedBetween(before: Graph, after: Graph): Placed[] {
    const placed = topItems(changesBetween(before, after), (change) => {
      return isHiddenByAncestor(change.before) && isActive(change.after);
    });

    return placed.map((node) => ({ id: node.id, state: openOrSettled(node) }));
  }

  function displacedBetween(before: Graph, after: Graph): Displaced[] {
    const displaced = topItems(changesBetween(before, after), (change) => {
      return isActive(change.before) && isHiddenByAncestor(change.after);
    });

    return displaced.map((node) => ({ id: node.id, ...placementOf(node), hiddenBy: hiderOf(node) }));
  }

  function selectionOf(question: QuestionNode): string[] {
    return question.selected.map((option) => option.id);
  }

  function selectionIn(graph: Graph, id: string): string[] {
    const question = graph.nodes.get(id);

    return question?.kind === "question" ? selectionOf(question) : [];
  }

  function sameSelection(before: string[], after: string[]): boolean {
    return before.length === after.length && before.every((id) => after.includes(id));
  }

  function selectionsChanged(before: Graph, after: Graph): SelectionChange[] {
    return [...after.nodes.values()].flatMap((node) => {
      if (node.kind !== "question") return [];

      const change = { question: node.id, before: selectionIn(before, node.id), after: selectionOf(node) };

      return sameSelection(change.before, change.after) ? [] : [change];
    });
  }

  function creates(event: Event): event is IdEvent {
    return "id" in event;
  }

  function createdBetween(before: Graph, after: Graph): Created[] {
    return [...after.nodes.values()].flatMap((node) => {
      if (before.nodes.has(node.id)) return [];

      return [node.kind === "option" && isActive(node) ? { id: node.id } : { id: node.id, ...placementOf(node) }];
    });
  }

  function resultOfWrite(log: Log, written: Event[]): WriteResult {
    const before = build(log);
    const after = build(Log.memoryLog([...log.read(), ...written]));

    return {
      created: createdBetween(before, after),
      selections: selectionsChanged(before, after),
      displaced: displacedBetween(before, after),
      placed: placedBetween(before, after),
    };
  }

  function selection(log: Log, id: string): string[] {
    const graph = build(log);

    return selectionOf(requireQuestion(graph.nodes, id));
  }

  function hiderOf(node: TreeNode): Hiding {
    if (node.hiddenBy === undefined) throw new Error(`node ${node.id} has nothing hiding it`);

    return node.hiddenBy;
  }

  function placementOf(node: TreeNode): Placement {
    const state = assignedState(node);

    return node.hiddenBy === undefined ? { state } : { state, hiddenBy: node.hiddenBy };
  }

  function listedItem(graph: Graph, node: TargetNode): ListedItem {
    const common = { id: node.id, text: node.text, tags: tagList(graph, node.id), ...placementOf(node) };

    if (node.kind === "follow-up") return { kind: "follow-up", ...common, ...itemContextOf(node) };
    if (node.kind === "statement") {
      return { kind: "statement", ...common, ...itemContextOf(node), ...supersedeLinks(node) };
    }

    const selected = selectionOf(node);
    const hidden = hiddenOptions(graph, node);

    return {
      kind: "question",
      ...common,
      options: liveOptions(graph, node),
      ...(selected.length === 0 ? {} : { selected }),
      ...questionContextOf(node),
      ...supersedeLinks(node),
      ...(hidden.length === 0 ? {} : { hiddenOptions: hidden }),
    };
  }

  function tags(log: Log, id: string): string[] {
    const graph = build(log);

    return tagList(graph, requireNode(graph.nodes, id).id);
  }

  function rejectHidden(node: TreeNode): void {
    if (isActive(node)) return;

    const hider = node.hiddenBy === undefined ? "" : `, hidden by ${node.hiddenBy.by}`;

    throw new DecisionTreeError(`${node.id} is ${assignedState(node)}${hider}`);
  }

  function hiddenOptions(graph: Graph, question: QuestionNode): HiddenOption[] {
    return question.options.flatMap((option): HiddenOption[] => {
      const state = ownHidingOf(graph, option);
      if (state === undefined) return [];

      const supersededBy = option.supersededBy === undefined ? {} : { supersededBy: option.supersededBy.id };

      return [{ ...optionData(option), state, ...supersededBy }];
    });
  }

  const targetKinds = ["question", "follow-up", "statement"] as const;

  function isOfKind<K extends TreeNode["kind"]>(node: TreeNode, kinds: readonly K[]): node is NodeOfKind<K> {
    return kinds.some((kind) => kind === node.kind);
  }

  function kindList(kinds: readonly TreeNode["kind"][]): string {
    const article = kinds[0] === "option" ? "an" : "a";
    const last = kinds.at(-1);
    const others = kinds.slice(0, -1);

    return others.length === 0 ? `${article} ${last}` : `${article} ${others.join(", ")} or ${last}`;
  }

  function requireKind<K extends TreeNode["kind"]>(
    node: TreeNode,
    role: "origin" | "target",
    kinds: readonly K[],
  ): NodeOfKind<K> {
    if (!isOfKind(node, kinds)) throw new DecisionTreeError(`${role} is not ${kindList(kinds)}: ${node.id}`);

    return node;
  }

  function requireTarget(graph: Graph, target: string): TargetNode {
    const wanted = graph.nodes.get(target);
    if (wanted === undefined) throw new DecisionTreeError(`target not found: ${target}`);

    return requireKind(wanted, "target", targetKinds);
  }

  function listed(log: Log, tag: string | undefined, states: ItemState[], target?: string): ListedItem[] {
    const graph = build(log);

    if (target !== undefined) requireTarget(graph, target);

    const nodes = [...new Set([...graph.walkOrder, ...graph.nodes.values()])];

    return nodes.flatMap((node) => {
      if (node.kind === "option") return [];
      if (tag !== undefined && !graph.tags.get(node.id)?.has(tag)) return [];
      if (target !== undefined && node.id !== target) return [];

      if (!isInStates(placementOf(node), states)) return [];

      return [listedItem(graph, node)];
    });
  }

  function unfrozen(graph: Graph, id: string, role: "origin" | "target"): TreeNode {
    const node = graph.nodes.get(id);
    if (node === undefined) throw new DecisionTreeError(`${role} not found: ${id}`);
    rejectFrozen(graph, node);

    return node;
  }

  function requireUnfrozen(log: Log, id: string, role: "origin" | "target"): TreeNode {
    return unfrozen(build(log), id, role);
  }

  function requireLive(log: Log, id: string, role: "origin" | "target"): TreeNode {
    const graph = build(log);
    const node = unfrozen(graph, id, role);
    if (graph.exclusions.has(id)) throw new DecisionTreeError(`${role} is excluded: ${id}`);

    return node;
  }

  function requireUnfrozenOfKind<K extends TreeNode["kind"]>(
    log: Log,
    id: string,
    role: "origin" | "target",
    kinds: readonly K[],
  ): NodeOfKind<K> {
    return requireKind(requireUnfrozen(log, id, role), role, kinds);
  }

  function requireLiveOfKind<K extends TreeNode["kind"]>(
    log: Log,
    id: string,
    role: "origin" | "target",
    kinds: readonly K[],
  ): NodeOfKind<K> {
    return requireKind(requireLive(log, id, role), role, kinds);
  }

  function requireExcluded(log: Log, id: string): TreeNode {
    const graph = build(log);
    const node = unfrozen(graph, id, "target");
    if (!graph.exclusions.has(id)) throw new DecisionTreeError(`target is not excluded: ${id}`);

    return node;
  }

  function tests() {
    test("a node left unset fails the state check", () => {
      // given
      const graph = build(Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]));
      requireQuestion(graph.nodes, "Q1").state = "unset";

      // when
      const act = () => assertStatesAssigned(graph);

      // then
      assert.throws(act, (error) => error instanceof Error && error.message === "node Q1 has no state");
    });

    test("a node the walk did not reach fails the state check", () => {
      // given
      const graph = build(Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]));
      requireQuestion(graph.nodes, "Q1").active = "unset";

      // when
      const act = () => assertStatesAssigned(graph);

      // then
      assert.throws(act, (error) => error instanceof Error && error.message === "node Q1 was not reached by the walk");
    });

    test("a question with no selection and its options are open", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual([graph.nodes.get("Q1")?.state, graph.nodes.get("Q1a")?.state], ["open", "open"]);
    });

    test("a selected option and its question are settled and an unchosen option is off-path", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(
        ["Q1", "Q1a", "Q1b"].map((id) => graph.nodes.get(id)?.state),
        ["settled", "settled", "off-path"],
      );
    });

    test("a question under an unchosen option is off-path, hidden by that option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q2");
      assert.deepEqual([question.state, question.hiddenBy], ["off-path", { state: "off-path", by: "Q1b" }]);
    });

    test("an off-path question is hidden by its outermost unchosen option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-option", id: "Q2a", text: "c", origin: "Q2" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(requireQuestion(graph.nodes, "Q3").hiddenBy, { state: "off-path", by: "Q1b" });
    });

    test("once the outer option is selected, the next unchosen option is the blocker", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-option", id: "Q2a", text: "c", origin: "Q2" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(requireQuestion(graph.nodes, "Q3").hiddenBy, { state: "off-path", by: "Q2a" });
    });

    test("a question under an open follow-up in an off-path branch is hidden by the outer option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1b" },
        { type: "add-question", id: "Q2", text: "q2", origin: "F1" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(requireQuestion(graph.nodes, "Q2").hiddenBy, { state: "off-path", by: "Q1b" });
    });

    test("an excluded question has its reason as its state and hides what is under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const graph = build(log);

      // then
      const excluded = requireQuestion(graph.nodes, "Q1");
      const child = requireQuestion(graph.nodes, "Q2");
      assert.deepEqual(
        [excluded.state, excluded.hiddenBy, child.state, child.hiddenBy],
        ["deferred", undefined, "deferred", { state: "deferred", by: "Q1" }],
      );
    });

    test("an exclusion above an unchosen option wins over off-path", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q2");
      assert.deepEqual([question.state, question.hiddenBy], ["deferred", { state: "deferred", by: "Q1" }]);
    });

    test("a superseded question and what is under it are frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // when
      const graph = build(log);

      // then
      const superseded = requireQuestion(graph.nodes, "Q1");
      const child = requireQuestion(graph.nodes, "Q2");
      assert.deepEqual(
        [superseded.state, superseded.hiddenBy, child.state, child.hiddenBy],
        ["frozen", undefined, "frozen", { state: "frozen", by: "Q1" }],
      );
    });

    test("a superseded option and what is under it are frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1b" },
      ]);

      // when
      const graph = build(log);

      // then
      const superseded = requireOption(graph.nodes, "Q1a");
      const child = requireQuestion(graph.nodes, "Q2");
      const replacement = requireOption(graph.nodes, "Q1b");
      assert.deepEqual(
        [superseded.state, superseded.hiddenBy, child.state, child.hiddenBy, replacement.state],
        ["frozen", undefined, "frozen", { state: "frozen", by: "Q1a" }, "open"],
      );
    });

    test("a supersede-option on a selected option without a clear-selection first throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"], context: "both" },
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1a is still selected: supersede-option needs a clear-selection on Q1 first",
      );
    });

    test("an exclude on a selected option without a clear-selection first throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"], context: "both" },
        { type: "exclude", target: "Q1b", reason: "deferred" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1b is still selected: exclude needs a clear-selection on Q1 first",
      );
    });

    test("a supersede-option naming a replacement from another question throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "supersede-option", target: "Q1a", option: "Q2a" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q2a cannot supersede Q1a: they belong to different questions",
      );
    });

    test("superseding an unselected option keeps its question's selection", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "supersede-option", target: "Q1b", option: "Q1c" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q1");
      const selected = requireOption(graph.nodes, "Q1a");
      assert.deepEqual([question.state, selected.state], ["settled", "settled"]);
    });

    test("a question under an open follow-up is off-path, hidden by the follow-up", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q1");
      assert.deepEqual([question.state, question.hiddenBy], ["off-path", { state: "off-path", by: "F1" }]);
    });

    test("a refusal while replaying a line of a file names the line", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const lines = [
        '{"type":"add-question","id":"Q1","text":"q"}',
        '',
        '{"type":"select-option","targets":["Q9a"]}',
      ];
      writeFileSync(path, lines.map((line) => `${line}\n`).join(""));

      // when
      const act = () => build(Log.fileLog(path));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "log line 3: option Q9a does not exist",
      );
    });

    test("a fault in the code while replaying a line of a file passes through unchanged", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      writeFileSync(path, '{"type":"add-question","id":"Q1","text":"q"}\n');
      const [event] = Log.fileLog(path).read();
      const failure = new Error("a fault in the code");

      // when
      const act = () =>
        namingLine(event, () => {
          throw failure;
        });

      // then
      assert.throws(act, (error) => error === failure);
    });

    test("a log that adds a question under an id it already holds fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q1", text: "again" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 already exists");
    });

    test("a log that adds an option under an id it already holds fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1a", text: "again", origin: "Q1" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1a already exists");
    });

    test("a log that adds a follow-up under an id it already holds fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-follow-up", id: "F1", text: "again" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "F1 already exists");
    });

    test("a log that adds a statement under an id it already holds fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-statement", id: "S1", text: "again" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "S1 already exists");
    });

    test("a log that adds an item under the id of an item of another kind fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "Q1", text: "s" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 already exists");
    });

    test("a log that adds an option to a question it does not hold fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-option", id: "Q9a", text: "a", origin: "Q9" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "question Q9 does not exist",
      );
    });

    test("a log that selects an option it does not hold fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "select-option", targets: ["Q9a"] },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "option Q9a does not exist",
      );
    });

    test("a log that promotes a follow-up it does not hold fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "promote-follow-up", target: "F9", question: "Q1" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "follow-up F9 does not exist",
      );
    });

    test("a log that supersedes a statement it does not hold fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "supersede-statement", target: "S9", statement: "S1" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "statement S9 does not exist",
      );
    });

    test("a log that excludes an item it does not hold fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q9", reason: "deferred" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "item Q9 does not exist");
    });

    test("a log that supersedes a question with one that hangs elsewhere fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "supersede-question", target: "Q2", question: "Q3" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q3 does not hang where Q2 hangs",
      );
    });

    test("a log that focuses on an option fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "focus", target: "Q1a" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1a is an option, and a focus needs a question, follow-up or statement",
      );
    });

    test("a promotion whose question hangs elsewhere fails to load", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1 does not hang under F1",
      );
    });

    test("an open follow-up is open and a promoted one is settled", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f1" },
        { type: "add-follow-up", id: "F2", text: "f2" },
        { type: "add-question", id: "Q1", text: "q", origin: "F2" },
        { type: "promote-follow-up", target: "F2", question: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual([graph.nodes.get("F1")?.state, graph.nodes.get("F2")?.state], ["open", "settled"]);
    });

    test("an excluded option has its reason as its state and hides what is under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
      ]);

      // when
      const graph = build(log);

      // then
      const child = requireQuestion(graph.nodes, "Q2");
      assert.deepEqual(
        [graph.nodes.get("Q1a")?.state, child.state, child.hiddenBy],
        ["deferred", "deferred", { state: "deferred", by: "Q1a" }],
      );
    });

    test("the walk order leaves out off-path and excluded questions", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "exclude", target: "Q3", reason: "deferred" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(
        graph.walkOrder.map((node) => node.id),
        ["Q1"],
      );
    });

    test("the walk order goes answer first, then the question's own, then the roots", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F3", text: "root follow-up" },
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q4", text: "second root" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-follow-up", id: "F2", text: "question follow-up", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "question child", origin: "Q1" },
        { type: "add-follow-up", id: "F1", text: "answer follow-up", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "answer child", origin: "Q1a" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(
        graph.walkOrder.map((node) => node.id),
        ["Q1", "Q2", "F1", "Q3", "F2", "Q4", "F3"],
      );
    });

    test("the walk order has a promoted follow-up before what came from it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(
        graph.walkOrder.map((node) => node.id),
        ["F1", "Q1"],
      );
    });

    test("a focus ends when its question leaves the current path", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "focus", target: "Q2" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const graph = build(log);

      // then
      assert.equal(graph.focus?.ended, true);
      assert.deepEqual(
        frontier(graph).map((item) => item.id),
        ["Q3"],
      );
    });

    test("an option under an excluded question is hidden by that question", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const graph = build(log);

      // then
      const option = requireOption(graph.nodes, "Q1a");
      assert.deepEqual([option.state, option.hiddenBy], ["deferred", { state: "deferred", by: "Q1" }]);
    });

    test("an item both excluded and frozen is refused as frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // when
      const act = () => requireLive(log, "Q2", "target");

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q2 is frozen, as its ancestor Q1 was superseded by Q3",
      );
    });

    test("the built tree of an empty log has no items", () => {
      // given
      const log = Log.memoryLog();

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, []);
    });

    test("the built tree nests a question under the selected option that holds it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          options: [
            {
              id: "Q1a",
              text: "a",
              selected: true,
              children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
            },
          ],
          children: [],
        },
      ]);
    });

    test("the built tree keeps a question-level child in the question's children", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q1",
          options: [],
          children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
        },
      ]);
    });

    test("the built tree lists every live option and marks only the chosen one", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.options, [
        { id: "Q1a", text: "a", children: [] },
        { id: "Q1b", text: "b", selected: true, children: [] },
      ]);
    });

    test("the built tree holds an off-path question inside its unchosen option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.options[1].children, [
        {
          kind: "question",
          state: "off-path",
          hiddenBy: { state: "off-path", by: "Q1b" },
          id: "Q2",
          text: "q2",
          options: [],
          children: [],
        },
      ]);
    });

    test("the built tree gives two selected options their own children", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(
        question.options.map((option) => option.children.map((child) => child.id)),
        [["Q2"], ["Q3"]],
      );
    });

    test("the built tree shows a promoted follow-up as a settled step holding its question", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "follow-up",
          state: "settled",
          id: "F1",
          text: "f",
          children: [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }],
        },
      ]);
    });

    test("the built tree places follow-ups after the questions at their level", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-follow-up", id: "F1", text: "answer follow-up", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "answer child", origin: "Q1a" },
        { type: "add-follow-up", id: "F2", text: "question follow-up", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "question child", origin: "Q1" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(
        question.options[0].children.map((child) => child.id),
        ["Q2", "F1"],
      );
      assert.deepEqual(
        question.children.map((child) => child.id),
        ["Q3", "F2"],
      );
    });

    test("the built tree keeps a deferred question in place with its exclusion's context and child", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred", context: "why" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "deferred",
          id: "Q1",
          text: "q1",
          context: { exclusion: "why" },
          options: [],
          children: [
            {
              kind: "question",
              state: "deferred",
              hiddenBy: { state: "deferred", by: "Q1" },
              id: "Q2",
              text: "q2",
              options: [],
              children: [],
            },
          ],
        },
      ]);
    });

    test("the built tree lists an excluded option after the live ones, with its state and exclusion's context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred", context: "why" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.options, [
        { id: "Q1b", text: "b", children: [] },
        { id: "Q1a", text: "a", state: "deferred", context: { exclusion: "why" }, children: [] },
      ]);
    });

    test("the built tree links a superseded option and its replacement, and lists the frozen one last", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.options, [
        { id: "Q1b", text: "b", children: [] },
        { id: "Q1c", text: "c", supersedes: "Q1a", children: [] },
        {
          id: "Q1a",
          text: "a",
          state: "frozen",
          supersededBy: "Q1c",
          children: [
            {
              kind: "question",
              state: "frozen",
              hiddenBy: { state: "frozen", by: "Q1a" },
              id: "Q2",
              text: "q2",
              options: [],
              children: [],
            },
          ],
        },
      ]);
    });

    test("the built tree holds a root statement as settled, in place among the root questions", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q2", text: "q2" },
      ]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(
        entries.map((entry) => [entry.kind, entry.id, entry.state]),
        [
          ["question", "Q1", "open"],
          ["statement", "S1", "settled"],
          ["question", "Q2", "open"],
        ],
      );
    });

    test("the built tree holds a statement under a question, an option and a follow-up, in place among their questions", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-statement", id: "S1", text: "under the option", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-statement", id: "S2", text: "under the question", origin: "Q1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1" },
        { type: "add-statement", id: "S3", text: "under the follow-up", origin: "F1" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(
        [
          question.options[0].children.map((child) => [child.id, child.state]),
          question.children.map((child) => [child.id, child.state]),
          question.children[1].children.map((child) => [child.id, child.state]),
        ],
        [
          [
            ["S1", "settled"],
            ["Q2", "open"],
          ],
          [
            ["S2", "settled"],
            ["F1", "open"],
          ],
          [["S3", "off-path"]],
        ],
      );
    });

    test("a statement under an excluded item takes the item's state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(
        question.children.map((child) => [child.id, child.state]),
        [["S1", "deferred"]],
      );
    });

    test("the built tree nests a question, a statement and a follow-up under a statement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s1" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
        { type: "add-statement", id: "S2", text: "s2", origin: "S1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "S1" },
      ]);

      // when
      const [statement] = buildTree(log);

      // then
      assert.deepEqual(
        statement.children.map((child) => [child.kind, child.id, child.state]),
        [
          ["question", "Q1", "open"],
          ["statement", "S2", "settled"],
          ["follow-up", "F1", "open"],
        ],
      );
    });

    test("what hangs under a statement that is off the path is off the path, hidden by the same option", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-statement", id: "S1", text: "s", origin: "Q1b" },
          { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
        ]),
      );

      // when
      const question = requireQuestion(graph.nodes, "Q2");

      // then
      assert.deepEqual([question.state, question.hiddenBy], ["off-path", { state: "off-path", by: "Q1b" }]);
    });

    test("an excluded statement takes the exclusion's state and passes it to what hangs under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
        { type: "exclude", target: "S1", reason: "deferred", context: "later" },
      ]);

      // when
      const [statement] = buildTree(log);

      // then
      assert.deepEqual(
        [statement.state, statement.context, statement.children.map((child) => [child.id, child.state])],
        ["deferred", { exclusion: "later" }, [["Q1", "deferred"]]],
      );
    });

    test("a restored statement is settled again, with what hangs under it back on the path", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
        { type: "exclude", target: "S1", reason: "deferred" },
        { type: "restore", target: "S1" },
      ]);

      // when
      const [statement] = buildTree(log);

      // then
      assert.deepEqual(
        [statement.state, statement.children.map((child) => [child.id, child.state])],
        ["settled", [["Q1", "open"]]],
      );
    });

    test("the built tree can be limited to a statement and what hangs under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
      ]);

      // when
      const entries = buildTree(log, "S1");

      // then
      assert.deepEqual(
        entries.map((entry) => [entry.id, entry.children.map((child) => child.id)]),
        [["S1", ["Q2"]]],
      );
    });

    test("a superseded statement is frozen with everything under it, and listed after its replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "before" },
        { type: "add-statement", id: "S1", text: "old" },
        { type: "add-question", id: "Q2", text: "under", origin: "S1" },
        { type: "add-question", id: "Q3", text: "after" },
        { type: "add-statement", id: "S2", text: "new" },
        { type: "supersede-statement", target: "S1", statement: "S2", context: "the fact changed" },
      ]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(
        entries.map((entry) => [entry.id, entry.state, entry.children.map((child) => [child.id, child.state])]),
        [
          ["Q1", "open", []],
          ["S2", "settled", []],
          ["S1", "frozen", [["Q2", "frozen"]]],
          ["Q3", "open", []],
        ],
      );
    });

    test("a superseding statement links to the one it replaced, and carries the context of the supersede", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "old", context: "first" },
        { type: "add-statement", id: "S2", text: "new" },
        { type: "supersede-statement", target: "S1", statement: "S2", context: "the fact changed" },
      ]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(entries, [
        {
          kind: "statement",
          state: "settled",
          id: "S2",
          text: "new",
          context: { creation: "the fact changed", createdBy: "supersede-statement" },
          supersedes: "S1",
          children: [],
        },
        {
          kind: "statement",
          state: "frozen",
          id: "S1",
          text: "old",
          context: { creation: "first", createdBy: "add-statement" },
          supersededBy: "S2",
          children: [],
        },
      ]);
    });

    test("the built tree carries a statement's tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "tag", target: "S1", tags: ["a", "b"] },
      ]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(entries, [
        { kind: "statement", state: "settled", id: "S1", text: "s", tags: ["a", "b"], children: [] },
      ]);
    });

    test("the built tree carries the context a statement was added with", () => {
      // given
      const log = Log.memoryLog([{ type: "add-statement", id: "S1", text: "s", context: "where it comes from" }]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(entries, [
        {
          kind: "statement",
          state: "settled",
          id: "S1",
          text: "s",
          context: { creation: "where it comes from", createdBy: "add-statement" },
          children: [],
        },
      ]);
    });

    test("the built tree carries the context a question was added with", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q", context: "what it means" }]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.context, { creation: "what it means", createdBy: "add-question" });
    });

    test("the built tree carries the context an option was added with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1", context: "what it means" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(question.options[0].context, { creation: "what it means", createdBy: "add-option" });
    });

    test("the built tree carries the context a follow-up was added with", () => {
      // given
      const log = Log.memoryLog([{ type: "add-follow-up", id: "F1", text: "f", context: "what it means" }]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(entries, [
        {
          kind: "follow-up",
          state: "open",
          id: "F1",
          text: "f",
          context: { creation: "what it means", createdBy: "add-follow-up" },
          children: [],
        },
      ]);
    });

    test("the built tree carries the context a question was promoted with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1", context: "why now" },
      ]);

      // when
      const [followUp] = buildTree(log);

      // then
      assert.deepEqual(
        followUp.children.map((child) => child.context),
        [{ creation: "why now", createdBy: "promote-follow-up" }],
      );
    });

    test("the built tree carries the context a question superseded another with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2", context: "the premise changed" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual([question.id, question.context], [
        "Q2",
        { creation: "the premise changed", createdBy: "supersede-question" },
      ]);
    });

    test("the built tree carries the context an option superseded another with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "old", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "new", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1b", context: "its meaning changed" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual(
        question.options.map((option) => [option.id, option.context]),
        [
          ["Q1b", { creation: "its meaning changed", createdBy: "supersede-option" }],
          ["Q1a", undefined],
        ],
      );
    });

    test("the built tree carries the context a selection was cleared with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
        { type: "clear-selection", target: "Q1", context: "in doubt" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual([question.context?.selection, question.context?.clearing], [undefined, "in doubt"]);
    });

    test("the built tree drops the context a selection was cleared with once the question is answered again", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "clear-selection", target: "Q1", context: "in doubt" },
        { type: "select-option", targets: ["Q1a"], context: "sure now" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.deepEqual([question.context?.selection, question.context?.clearing], ["sure now", undefined]);
    });

    test("the built tree carries the context of a question's selection", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
      ]);

      // when
      const question = firstQuestionEntry(log);

      // then
      assert.equal(question.context?.selection, "why");
    });

    test("the built tree puts a superseded question right after its replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "kid", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "other root" },
        { type: "add-question", id: "Q4", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q4" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(
        items.map((item) => [item.id, item.state]),
        [
          ["Q4", "open"],
          ["Q1", "frozen"],
          ["Q3", "open"],
        ],
      );
      assert.deepEqual(
        items[1].children.map((child) => [child.id, child.state]),
        [["Q2", "frozen"]],
      );
    });

    test("the built tree links a superseded question and its replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        { kind: "question", state: "open", id: "Q2", text: "new", supersedes: "Q1", options: [], children: [] },
        { kind: "question", state: "frozen", id: "Q1", text: "old", supersededBy: "Q2", options: [], children: [] },
      ]);
    });

    test("the built tree lists a question superseded twice newest first", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "first" },
        { type: "add-question", id: "Q2", text: "second" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
        { type: "add-question", id: "Q3", text: "third" },
        { type: "supersede-question", target: "Q2", question: "Q3" },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(
        items.map((item) => [item.id, item.state]),
        [
          ["Q3", "open"],
          ["Q2", "frozen"],
          ["Q1", "frozen"],
        ],
      );
    });

    test("the built tree leaves the tags out of a question whose last tag was removed", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "untag", target: "Q1", tags: ["t"] },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }]);
    });

    test("the built tree carries a question's tags, and none for a question without them", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "tagged" },
        { type: "add-question", id: "Q2", text: "untagged" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        { kind: "question", state: "open", id: "Q1", text: "tagged", tags: ["t", "u"], options: [], children: [] },
        { kind: "question", state: "open", id: "Q2", text: "untagged", options: [], children: [] },
      ]);
    });

    test("the built tree carries a follow-up's tags, and none for a follow-up without them", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "tagged" },
        { type: "add-follow-up", id: "F2", text: "untagged" },
        { type: "tag", target: "F1", tags: ["t", "u"] },
      ]);

      // when
      const items = buildTree(log);

      // then
      assert.deepEqual(items, [
        { kind: "follow-up", state: "open", id: "F1", text: "tagged", tags: ["t", "u"], children: [] },
        { kind: "follow-up", state: "open", id: "F2", text: "untagged", children: [] },
      ]);
    });

    test("filtering drops an entry whose state was not asked for", () => {
      // given
      const entries: TreeEntry[] = [
        { kind: "question", state: "settled", id: "Q1", text: "q", options: [], children: [] },
      ];

      // when
      const kept = filterTree(entries, ["open"]);

      // then
      assert.deepEqual(kept, []);
    });

    test("filtering keeps a settled question that holds an open child", () => {
      // given
      const open: TreeEntry = { kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] };
      const entries: TreeEntry[] = [
        { kind: "question", state: "settled", id: "Q1", text: "q1", options: [], children: [open] },
      ];

      // when
      const kept = filterTree(entries, ["open"]);

      // then
      assert.deepEqual(kept, entries);
    });

    test("filtering keeps the path through a selected option to an open child", () => {
      // given
      const open: TreeEntry = { kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          options: [{ id: "Q1a", text: "a", selected: true, children: [open] }],
          children: [],
        },
      ];

      // when
      const kept = filterTree(entries, ["open"]);

      // then
      assert.deepEqual(kept, entries);
    });

    test("filtering ignores an excluded option's own state", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          options: [{ id: "Q1a", text: "a", state: "deferred", children: [] }],
          children: [],
        },
      ];

      // when
      const kept = filterTree(entries, ["deferred"]);

      // then
      assert.deepEqual(kept, []);
    });

    test("filtering keeps an option but drops an off-path child under it", () => {
      // given
      const offPath: TreeEntry = {
        kind: "question",
        state: "off-path",
        id: "Q2",
        text: "q2",
        options: [],
        children: [],
      };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          options: [{ id: "Q1a", text: "a", children: [offPath] }],
          children: [],
        },
      ];

      // when
      const kept = filterTree(entries, ["settled"]);

      // then
      assert.deepEqual(kept, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          options: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
        },
      ]);
    });

    test("filtering keeps a promoted follow-up that holds an open question", () => {
      // given
      const open: TreeEntry = { kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] };
      const entries: TreeEntry[] = [{ kind: "follow-up", state: "settled", id: "F1", text: "f", children: [open] }];

      // when
      const kept = filterTree(entries, ["open"]);

      // then
      assert.deepEqual(kept, entries);
    });

    test("filtering by deferred keeps a deferred question and the settled one around it", () => {
      // given
      const deferred: TreeEntry = {
        kind: "question",
        state: "deferred",
        id: "Q2",
        text: "q2",
        context: { exclusion: "why" },
        options: [],
        children: [],
      };
      const entries: TreeEntry[] = [
        { kind: "question", state: "settled", id: "Q1", text: "q1", options: [], children: [deferred] },
      ];

      // when
      const kept = filterTree(entries, ["deferred"]);

      // then
      assert.deepEqual(kept, entries);
    });

    test("filtering by frozen keeps the frozen question and drops its open replacement", () => {
      // given
      const entries: TreeEntry[] = [
        { kind: "question", state: "open", id: "Q2", text: "new", options: [], children: [] },
        { kind: "question", state: "frozen", id: "Q1", text: "old", options: [], children: [] },
      ];

      // when
      const kept = filterTree(entries, ["frozen"]);

      // then
      assert.deepEqual(
        kept.map((entry) => entry.id),
        ["Q1"],
      );
    });

    test("filtering keeps an entry whose hider is in a state that was asked for", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "deferred",
          hiddenBy: { state: "off-path", by: "Q1b" },
          id: "Q2",
          text: "q2",
          options: [],
          children: [],
        },
      ];

      // when
      const kept = filterTree(entries, ["off-path"]);

      // then
      assert.deepEqual(kept, entries);
    });

    test("filtering drops an entry when neither its state nor its hider's was asked for", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "deferred",
          hiddenBy: { state: "off-path", by: "Q1b" },
          id: "Q2",
          text: "q2",
          options: [],
          children: [],
        },
      ];

      // when
      const kept = filterTree(entries, ["not-applicable"]);

      // then
      assert.deepEqual(kept, []);
    });

    test("filtering by several states keeps entries matching any of them", () => {
      // given
      const entry = (id: string, state: ItemState): TreeEntry => ({
        kind: "question",
        state,
        id,
        text: id,
        options: [],
        children: [],
      });
      const entries = [entry("Q1", "open"), entry("Q2", "settled"), entry("Q3", "deferred")];

      // when
      const kept = filterTree(entries, ["open", "deferred"]);

      // then
      assert.deepEqual(
        kept.map((each) => each.id),
        ["Q1", "Q3"],
      );
    });

    test("an unknown event type throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "dismiss-follow-up", target: "F1" } as unknown as Event,
      ]);

      // when
      const act = () => build(log);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "unknown event type: dismiss-follow-up",
      );
    });

    test("the latest selection is the question's answer", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const graph = build(log);

      // then
      assert.equal(requireQuestion(graph.nodes, "Q1").selected[0]?.id, "Q1b");
    });

    test("clearing a selection reopens its question", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
        { type: "clear-selection", target: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q1");
      const cleared = requireOption(graph.nodes, "Q1a");
      assert.deepEqual([question.state, cleared.state], ["open", "open"]);
    });

    test("questions without an origin become roots in order", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      assert.deepEqual(
        graph.roots.map((root) => root.id),
        ["Q1", "Q2"],
      );
    });

    test("question under an option links both ways", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const graph = build(log);

      // then
      const option = requireOption(graph.nodes, "Q1a");
      const question = requireQuestion(graph.nodes, "Q2");
      assert.equal(question.parent, option);
      assert.deepEqual(option.children, [question]);
    });

    test("question under a question links both ways", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      const parent = requireQuestion(graph.nodes, "Q1");
      const child = requireQuestion(graph.nodes, "Q2");
      assert.equal(child.parent, parent);
      assert.deepEqual(parent.children, [child]);
      assert.deepEqual(requireOption(graph.nodes, "Q1a").children, []);
    });

    test("options attach to their question in order", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ]);

      // when
      const graph = build(log);

      // then
      const question = requireQuestion(graph.nodes, "Q1");
      assert.deepEqual(
        question.options.map((option) => option.id),
        ["Q1a", "Q1b"],
      );
      for (const option of question.options) assert.equal(option.question, question);
    });

    test("a question under an unselected option is off the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, []);
    });

    test("an open question on the frontier leaves out a superseded option", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "supersede-option", target: "Q1a", option: "Q1b" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, [
        { kind: "question", id: "Q1", text: "q1", options: [{ id: "Q1b", text: "b" }] },
      ]);
    });

    test("an open question on the frontier carries its tags, and none when it has none", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "tagged" },
          { type: "add-question", id: "Q2", text: "untagged" },
          { type: "tag", target: "Q1", tags: ["t", "u"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, [
        { kind: "question", id: "Q1", text: "tagged", tags: ["t", "u"], options: [] },
        { kind: "question", id: "Q2", text: "untagged", options: [] },
      ]);
    });

    test("an open follow-up on the frontier carries its tags, and none when it has none", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-follow-up", id: "F1", text: "tagged" },
          { type: "add-follow-up", id: "F2", text: "untagged" },
          { type: "tag", target: "F1", tags: ["t", "u"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, [
        { kind: "follow-up", id: "F1", text: "tagged", tags: ["t", "u"] },
        { kind: "follow-up", id: "F2", text: "untagged" },
      ]);
    });

    test("a question under the selected option is on the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((question) => question.id),
        ["Q2"],
      );
    });

    test("frontier lists answer's children, then question's children, then the next root", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-question", id: "Q3", text: "q3", origin: "Q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
          { type: "add-question", id: "Q4", text: "q4" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((question) => question.id),
        ["Q2", "Q3", "Q4"],
      );
    });

    test("an open question and its question-level follow-up are both on the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((question) => question.id),
        ["Q1", "Q2"],
      );
    });

    test("changing the answer swaps which branch is on the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
          { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "select-option", targets: ["Q1b"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((question) => question.id),
        ["Q3"],
      );
    });

    test("the frontier reaches a question under a statement where the statement sits among the questions", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-statement", id: "S1", text: "s" },
          { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
          { type: "add-question", id: "Q3", text: "q3" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((item) => item.id),
        ["Q1", "Q2", "Q3"],
      );
    });

    test("under a statement the frontier takes its questions and statements first, then its follow-ups", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-statement", id: "S1", text: "s1" },
          { type: "add-follow-up", id: "F1", text: "f", origin: "S1" },
          { type: "add-statement", id: "S2", text: "s2", origin: "S1" },
          { type: "add-question", id: "Q1", text: "q1", origin: "S2" },
          { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((item) => item.id),
        ["Q1", "Q2", "F1"],
      );
    });

    test("a focus on a statement keeps the frontier to what hangs under it", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-statement", id: "S1", text: "s" },
          { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
          { type: "add-follow-up", id: "F1", text: "f", origin: "S1" },
          { type: "focus", target: "S1" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((item) => item.id),
        ["Q2", "F1"],
      );
    });

    test("a focus on a statement ends once nothing under it is open", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-statement", id: "S1", text: "s" },
          { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
          { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
          { type: "focus", target: "S1" },
          { type: "select-option", targets: ["Q2a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        [activeFocus(graph), open.map((item) => item.id)],
        [undefined, ["Q1"]],
      );
    });

    test("what hung under a superseded statement is off the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-statement", id: "S1", text: "old" },
          { type: "add-question", id: "Q1", text: "under", origin: "S1" },
          { type: "add-question", id: "Q2", text: "beside" },
          { type: "add-statement", id: "S2", text: "new" },
          { type: "supersede-statement", target: "S1", statement: "S2" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((item) => item.id),
        ["Q2"],
      );
    });

    test("the result of a write lists the ids it created, in the order they were written", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q1" }];
      const written: Event[] = [
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "tag", target: "Q1", tags: ["t"] },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1a" }, { id: "S1", state: "settled" }, { id: "F1", state: "open" }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("the result of a write names what hides a created item, whichever operation created it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "under b", origin: "Q1b" },
      ];
      const written: Event[] = [
        { type: "add-question", id: "Q3", text: "replaces the one under b", origin: "Q1b" },
        { type: "supersede-question", target: "Q2", question: "Q3" },
        { type: "add-statement", id: "S1", text: "under b too", origin: "Q1b" },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, {
        created: [
          { id: "Q3", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
          { id: "S1", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
        ],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("the result of a write names what hides an item that a later event of the same write put off the path", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1b"] },
      ];
      const written: Event[] = [
        { type: "add-question", id: "Q2", text: "under b", origin: "Q1b" },
        { type: "select-option", targets: ["Q1a"] },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } }],
        selections: [{ question: "Q1", before: ["Q1b"], after: ["Q1a"] }],
        displaced: [],
        placed: [],
      });
    });

    test("a selection lists its options in the question's order, whatever order they were selected in", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1b", "Q1a"] },
      ]);

      // when
      const selected = selection(log, "Q1");

      // then
      assert.deepEqual(selected, ["Q1a", "Q1b"]);
    });

    test("the result of a write reports a question's selection before and after when it changed", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
      ];
      const written: Event[] = [{ type: "select-option", targets: ["Q1b"] }];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result.selections, [{ question: "Q1", before: ["Q1a", "Q1b"], after: ["Q1b"] }]);
    });

    test("the result of a write reports no selection when the same options are selected again", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const written: Event[] = [{ type: "select-option", targets: ["Q1a"], context: "still" }];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, { created: [], selections: [], displaced: [], placed: [] });
    });

    test("the result of a write reports the selections of two questions, in the order the questions were added", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
      ];
      const written: Event[] = [
        { type: "clear-selection", target: "Q2" },
        { type: "select-option", targets: ["Q1a"] },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result.selections, [
        { question: "Q1", before: [], after: ["Q1a"] },
        { question: "Q2", before: ["Q2a"], after: [] },
      ]);
    });

    test("the result of a write reports no selection for an answered question that was superseded", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "superseded" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const written: Event[] = [
        { type: "add-question", id: "Q2", text: "replacement" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, { created: [{ id: "Q2", state: "open" }], selections: [], displaced: [], placed: [] });
    });

    test("the result of a write reports no selection for an answered question that was excluded", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "excluded" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const written: Event[] = [{ type: "exclude", target: "Q1", reason: "deferred" }];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, { created: [], selections: [], displaced: [], placed: [] });
    });

    test("the result of a write lists what it displaced, and not the item it superseded", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "old" },
        { type: "add-question", id: "Q1", text: "under it", origin: "S1" },
        { type: "add-question", id: "Q2", text: "further down", origin: "Q1" },
      ];
      const written: Event[] = [
        { type: "add-statement", id: "S2", text: "new" },
        { type: "supersede-statement", target: "S1", statement: "S2" },
      ];

      // when
      const result = resultOfWrite(Log.memoryLog(events), written);

      // then
      assert.deepEqual(result, {
        created: [{ id: "S2", state: "settled" }],
        selections: [],
        displaced: [{ id: "Q1", state: "frozen", hiddenBy: { state: "frozen", by: "S1" } }],
        placed: [],
      });
    });

    test("a changed selection displaces what hangs directly under the option that lost it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1b"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1b" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1b" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1a"] }])),
      );

      // then
      assert.deepEqual(displaced, [
        { id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
        { id: "S1", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
        { id: "F1", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
      ]);
    });

    test("an option that stays selected displaces nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "under a", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "under b", origin: "Q1b" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1a"] }])),
      );

      // then
      assert.deepEqual(displaced, [{ id: "Q3", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } }]);
    });

    test("a cleared selection displaces what hung under the answer", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "clear-selection", target: "Q1" }])),
      );

      // then
      assert.deepEqual(displaced, [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }]);
    });

    test("excluding an item displaces what hangs directly under it, and not the item excluded", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q1", origin: "S1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "beside" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "exclude", target: "S1", reason: "deferred" }])),
      );

      // then
      assert.deepEqual(displaced, [{ id: "Q1", state: "deferred", hiddenBy: { state: "deferred", by: "S1" } }]);
    });

    test("excluding the selected option displaces what hung under it, and not the question it reopens", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(
          Log.memoryLog([
            ...events,
            { type: "clear-selection", target: "Q1" },
            { type: "exclude", target: "Q1a", reason: "not-applicable" },
          ]),
        ),
      );

      // then
      assert.deepEqual(displaced, [
        { id: "Q2", state: "not-applicable", hiddenBy: { state: "not-applicable", by: "Q1a" } },
      ]);
    });

    test("superseding a statement displaces what hung directly under it", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "old" },
        { type: "add-question", id: "Q1", text: "q1", origin: "S1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([
          ...events,
          { type: "add-statement", id: "S2", text: "new" },
          { type: "supersede-statement", target: "S1", statement: "S2" },
        ])),
      );

      // then
      assert.deepEqual(displaced, [{ id: "Q1", state: "frozen", hiddenBy: { state: "frozen", by: "S1" } }]);
    });

    test("a displaced item names what hides it, which need not be what it hangs on", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "exclude", target: "Q1", reason: "deferred" }])),
      );

      // then
      assert.deepEqual(displaced, [{ id: "Q2", state: "deferred", hiddenBy: { state: "deferred", by: "Q1" } }]);
    });

    test("an item that was already out of play is not displaced when something else hides it too", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "exclude", target: "Q1", reason: "deferred" }])),
      );

      // then
      assert.deepEqual(displaced, []);
    });

    test("a changed selection places what hangs directly under the option that gained it, each with its state", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1b" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1b" },
      ];

      // when
      const placed = placedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1b"] }])),
      );

      // then
      assert.deepEqual(placed, [
        { id: "Q2", state: "open" },
        { id: "S1", state: "settled" },
        { id: "F1", state: "open" },
      ]);
    });

    test("a restore places what hangs directly under the restored item, and not the item restored", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];

      // when
      const placed = placedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "restore", target: "Q1" }])),
      );

      // then
      assert.deepEqual(placed, [{ id: "Q2", state: "open" }]);
    });

    test("a promotion places what was already hanging under the follow-up, beside the question it creates", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "waiting", origin: "F1" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q2", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q2" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "open" }],
        selections: [],
        displaced: [],
        placed: [{ id: "Q1", state: "open" }],
      });
    });

    test("a cleared selection places nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ];

      // when
      const placed = placedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "clear-selection", target: "Q1" }])),
      );

      // then
      assert.deepEqual(placed, []);
    });

    test("an item that comes on the path while it is excluded itself is not placed", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ];

      // when
      const placed = placedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1b"] }])),
      );

      // then
      assert.deepEqual(placed, []);
    });

    test("an operation that takes nothing out of play displaces nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1a"] }])),
      );

      // then
      assert.deepEqual(displaced, []);
    });

    test("what comes back into play is not displaced", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "under b", origin: "Q1b" },
      ];

      // when
      const displaced = displacedBetween(
        build(Log.memoryLog(events)),
        build(Log.memoryLog([...events, { type: "select-option", targets: ["Q1a", "Q1b"] }])),
      );

      // then
      assert.deepEqual(displaced, []);
    });

    test("closed follow-ups are off the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1" },
          { type: "add-follow-up", id: "F2", text: "f2", origin: "Q1" },
          { type: "add-question", id: "Q2", text: "q2", origin: "F1" },
          { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
          { type: "select-option", targets: ["Q2a"] },
          { type: "promote-follow-up", target: "F1", question: "Q2" },
          { type: "exclude", target: "F2", reason: "not-applicable" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, []);
    });

    test("a follow-up under an unselected option is off the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1b" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, []);
    });

    test("follow-ups come up on backtrack from where they hang", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-follow-up", id: "F2", text: "f2", origin: "Q1" },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1a" },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
          { type: "add-question", id: "Q3", text: "q3", origin: "Q1" },
          { type: "add-question", id: "Q4", text: "q4" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q2", "F1", "Q3", "F2", "Q4"],
      );
    });

    test("an open follow-up hides what hangs under it", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1" },
          { type: "add-follow-up", id: "F2", text: "f2", origin: "F1" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["F1"],
      );
    });

    test("a promoted follow-up opens: its question first, then its follow-ups", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1" },
          { type: "add-follow-up", id: "F2", text: "f2", origin: "F1" },
          { type: "add-question", id: "Q2", text: "f1", origin: "F1" },
          { type: "promote-follow-up", target: "F1", question: "Q2" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q2", "F2"],
      );
    });

    test("an excluded follow-up hides what hangs under it", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1" },
          { type: "add-follow-up", id: "F2", text: "f2", origin: "F1" },
          { type: "exclude", target: "F1", reason: "not-applicable" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(open, []);
    });

    test("root follow-ups come up after all roots", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-follow-up", id: "F1", text: "f1" },
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q1", "Q2", "F1"],
      );
    });

    test("a focus puts only its subtree's open items on the frontier", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "focus", target: "Q2" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q2"],
      );
    });

    test("an exhausted focus gives the frontier back to the normal walk", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
          { type: "focus", target: "Q2" },
          { type: "select-option", targets: ["Q2a"] },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q1"],
      );
    });

    test("a supersede-question line alone ends the focus on its question", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "focus", target: "Q2" },
          { type: "add-question", id: "Q3", text: "q3" },
          { type: "supersede-question", target: "Q2", question: "Q3" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q1", "Q3"],
      );
    });

    test("an ended focus does not move to the question that supersedes its question", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
          { type: "focus", target: "Q2" },
          { type: "select-option", targets: ["Q2a"] },
          { type: "add-question", id: "Q3", text: "q3" },
          { type: "supersede-question", target: "Q2", question: "Q3" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q1", "Q3"],
      );
    });

    test("an ended focus does not return when new work appears under it", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
          { type: "focus", target: "Q2" },
          { type: "select-option", targets: ["Q2a"] },
          { type: "add-follow-up", id: "F1", text: "f1", origin: "Q2" },
        ]),
      );

      // when
      const open = frontier(graph);

      // then
      assert.deepEqual(
        open.map((node) => node.id),
        ["Q1", "F1"],
      );
    });

    test("the tag query returns only open on-path items with that tag", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "settled" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "open", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "off-path", origin: "Q1b" },
        { type: "add-question", id: "Q4", text: "other tag" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "tag", target: "Q2", tags: ["t"] },
        { type: "tag", target: "Q3", tags: ["t"] },
        { type: "tag", target: "Q4", tags: ["u"] },
      ]);

      // when
      const items = listed(log, "t", ["open"]);

      // then
      assert.deepEqual(items, [
        { kind: "question", id: "Q2", text: "open", options: [], tags: ["t"], state: "open" },
      ]);
    });

    test("an ended focus is not the active focus", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "focus", target: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const active = activeFocus(graph);

      // then
      assert.equal(active, undefined);
    });

    test("the active focus is the item the latest focus names while something is open under it", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-question", id: "Q2", text: "q2" },
          { type: "focus", target: "Q1" },
          { type: "focus", target: "Q2" },
        ]),
      );

      // when
      const active = activeFocus(graph);

      // then
      assert.equal(active, "Q2");
    });

    test("the tag query is not limited by an active focus", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "focus", target: "Q2" },
      ]);

      // when
      const items = listed(log, "t", ["open"]);

      // then
      assert.deepEqual(items, [
        { kind: "question", id: "Q1", text: "q1", options: [], tags: ["t"], state: "open" },
      ]);
    });

    test("the tag query reports each item's state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "settled" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "off-path", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "deferred" },
        { type: "add-question", id: "Q4", text: "not-applicable" },
        { type: "add-question", id: "Q5", text: "frozen" },
        { type: "add-question", id: "Q6", text: "replacement" },
        { type: "supersede-question", target: "Q5", question: "Q6" },
        { type: "exclude", target: "Q3", reason: "deferred" },
        { type: "exclude", target: "Q4", reason: "not-applicable" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "tag", target: "Q2", tags: ["t"] },
        { type: "tag", target: "Q3", tags: ["t"] },
        { type: "tag", target: "Q4", tags: ["t"] },
        { type: "tag", target: "Q5", tags: ["t"] },
      ]);

      // when
      const items = listed(log, "t", ["settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state]),
        [
          ["Q1", "settled"],
          ["Q2", "off-path"],
          ["Q3", "deferred"],
          ["Q4", "not-applicable"],
          ["Q5", "frozen"],
        ],
      );
    });

    test("a settled tagged question carries what was selected", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "tag", target: "Q1", tags: ["t"] },
      ]);

      // when
      const items = listed(log, "t", ["settled"]);

      // then
      assert.deepEqual(
        items.map((each) => (each.kind === "question" ? each.selected : undefined)),
        [["Q1a"]],
      );
    });

    test("a promoted follow-up counts as settled in the tag query", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
        { type: "tag", target: "F1", tags: ["t"] },
      ]);

      // when
      const items = listed(log, "t", ["settled"]);

      // then
      assert.deepEqual(items, [
        { kind: "follow-up", id: "F1", text: "f", tags: ["t"], state: "settled" },
      ]);
    });

    test("an excluded tagged item carries its exclusion's context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "exclude", target: "Q1", reason: "not-applicable", context: "why" },
      ]);

      // when
      const items = listed(log, "t", ["not-applicable"]);

      // then
      assert.deepEqual(
        items.map((each) => each.context?.exclusion),
        ["why"],
      );
    });

    test("a statement is listed among the settled items, with its context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "S1", text: "s", context: "where it comes from" },
      ]);

      // when
      const items = listed(log, undefined, ["settled"]);

      // then
      assert.deepEqual(items, [
        {
          kind: "statement", id: "S1", text: "s",
          tags: [],
          state: "settled",
          context: { creation: "where it comes from", createdBy: "add-statement" },
        },
      ]);
    });

    test("a tagged statement is listed by its tag", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "tagged" },
        { type: "add-statement", id: "S2", text: "plain" },
        { type: "tag", target: "S1", tags: ["frame"] },
      ]);

      // when
      const items = listed(log, "frame", ["settled"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.kind, each.tags]),
        [["statement", ["frame"]]],
      );
    });

    test("a statement is not listed among the open items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "S1", text: "s" },
      ]);

      // when
      const items = listed(log, undefined, ["open"]);

      // then
      assert.deepEqual(
        items.map((each) => each.kind),
        ["question"],
      );
    });

    test("a statement can be the one item asked for", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1" },
      ]);

      // when
      const items = listed(log, undefined, ["settled"], "S1");

      // then
      assert.deepEqual(
        items.map((each) => [each.kind, each.id, each.text]),
        [["statement", "S1", "s"]],
      );
    });

    test("a listed question carries the context its options were added with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1", context: "what it means" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ]);

      // when
      const items = listed(log, undefined, ["open"]);

      // then
      assert.deepEqual(
        items.map((each) => (each.kind === "question" ? each.options : [])),
        [
          [
            { id: "Q1a", text: "a", context: { creation: "what it means", createdBy: "add-option" } },
            { id: "Q1b", text: "b" },
          ],
        ],
      );
    });

    test("a listed question carries the context of its selection", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
      ]);

      // when
      const items = listed(log, undefined, ["settled"]);

      // then
      assert.deepEqual(
        items.map((each) => (each.kind === "question" ? each.context?.selection : undefined)),
        ["why"],
      );
    });

    test("a tagged item under an excluded ancestor is hidden by it and has no exclusion's context of its own", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "tag", target: "Q2", tags: ["t"] },
        { type: "exclude", target: "Q1", reason: "deferred", context: "why" },
      ]);

      // when
      const items = listed(log, "t", ["deferred"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.hiddenBy, each.context?.exclusion]),
        [[{ state: "deferred", by: "Q1" }, undefined]],
      );
    });

    test("a tagged item under a superseded question is hidden by it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "tag", target: "Q2", tags: ["t"] },
        { type: "add-question", id: "Q3", text: "q3" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // when
      const items = listed(log, "t", ["frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => each.hiddenBy),
        [{ state: "frozen", by: "Q1" }],
      );
    });

    test("a listed superseded question and its replacement link to each other", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => (each.kind === "follow-up" ? [] : [each.state, each.supersedes, each.supersededBy])),
        [
          ["open", "Q1", undefined],
          ["frozen", undefined, "Q2"],
        ],
      );
    });

    test("an off-path tagged item is hidden by the unselected option above it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "tag", target: "Q2", tags: ["t"] },
      ]);

      // when
      const items = listed(log, "t", ["off-path"]);

      // then
      assert.deepEqual(
        items.map((each) => each.hiddenBy),
        [{ state: "off-path", by: "Q1b" }],
      );
    });

    test("a tagged item under an open follow-up is hidden by that follow-up", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "tag", target: "Q1", tags: ["t"] },
      ]);

      // when
      const items = listed(log, "t", ["off-path"]);

      // then
      assert.deepEqual(
        items.map((each) => each.hiddenBy),
        [{ state: "off-path", by: "F1" }],
      );
    });

    test("an item excluded directly is not hidden by anything else", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, "t", ["deferred"]);

      // then
      assert.deepEqual(
        items.map((each) => each.hiddenBy),
        [undefined],
      );
    });

    test("a trail lists the ancestors from the root down, with the options on the way", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const steps = trail(log, "Q2");

      // then
      assert.deepEqual(steps, [
        { kind: "question", id: "Q1", text: "q1" },
        { kind: "option", id: "Q1a", text: "a" },
      ]);
    });

    test("a trail includes the statements on the way", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s1" },
        { type: "add-question", id: "Q1", text: "q1", origin: "S1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-statement", id: "S2", text: "s2", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S2" },
      ]);

      // when
      const steps = trail(log, "Q2");

      // then
      assert.deepEqual(steps, [
        { kind: "statement", id: "S1", text: "s1" },
        { kind: "question", id: "Q1", text: "q1" },
        { kind: "option", id: "Q1a", text: "a" },
        { kind: "statement", id: "S2", text: "s2" },
      ]);
    });

    test("a root item has an empty trail", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q1" }]);

      // when
      const steps = trail(log, "Q1");

      // then
      assert.deepEqual(steps, []);
    });

    test("a supersede-question line alone does not tag the replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const items = listed(log, "t", ["open"]);

      // then
      assert.deepEqual(items, []);
    });

    test("a listed item under an unselected option carries off-path and the option that hides it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const items = listed(log, undefined, ["off-path"]);

      // then
      assert.deepEqual(items, [
        {
          kind: "question", id: "Q2", text: "q2", options: [],
          tags: [],
          state: "off-path",
          hiddenBy: { state: "off-path", by: "Q1b" },
        },
      ]);
    });

    test("looking up an unknown id throws not found for its role", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => requireLive(log, "Q9", "target");

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
    });

    test("looking up an excluded item throws excluded for its role", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const act = () => requireLive(log, "Q1", "origin");

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "origin is excluded: Q1");
    });

    test("looking up an item under an excluded option finds it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ]);

      // when
      const node = requireLive(log, "Q2", "target");

      // then
      assert.equal(node.id, "Q2");
    });

    test("looking up a live item returns its node", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // when
      const node = requireLive(log, "Q1a", "target");

      // then
      assert.equal(node.kind, "option");
      assert.equal(node.id, "Q1a");
      assert.equal(node.text, "a");
      assert.equal(node.kind === "option" ? node.question.id : undefined, "Q1");
    });

    test("looking up a superseded question as unfrozen throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const act = () => requireUnfrozen(log, "Q1", "origin");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q1 is frozen, as it was superseded by Q2",
      );
    });

    test("looking up an unknown id as unfrozen throws not found for its role", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => requireUnfrozen(log, "Q9", "origin");

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "origin not found: Q9");
    });

    test("looking up an excluded item as unfrozen returns its node", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const node = requireUnfrozen(log, "Q1", "origin");

      // then
      assert.equal(node.kind, "question");
      assert.equal(node.id, "Q1");
      assert.equal(node.state, "deferred");
    });

    test("looking up an item under an excluded option as unfrozen returns its node", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ]);

      // when
      const node = requireUnfrozen(log, "Q2", "target");

      // then
      assert.equal(node.kind, "question");
      assert.equal(node.id, "Q2");
      assert.equal(node.state, "not-applicable");
    });

    test("looking up an unknown id to restore throws not found", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => requireExcluded(log, "Q9");

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
    });

    test("looking up a live item to restore throws not excluded", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const act = () => requireExcluded(log, "Q1");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not excluded: Q1",
      );
    });

    test("looking up an item that only an excluded ancestor hides to restore throws not excluded", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ]);

      // when
      const act = () => requireExcluded(log, "Q2");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not excluded: Q2",
      );
    });

    test("looking up an excluded item to restore returns its node", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
      ]);

      // when
      const node = requireExcluded(log, "Q1a");

      // then
      assert.equal(node.kind, "option");
      assert.equal(node.id, "Q1a");
    });

    test("looking up a superseded question throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const act = () => requireLive(log, "Q1", "target");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q1 is frozen, as it was superseded by Q2",
      );
    });

    test("looking up an item under a superseded question throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const act = () => requireLive(log, "Q1a", "target");

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1a is frozen, as its ancestor Q1 was superseded by Q2",
      );
    });

    test("looking up a superseded option throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1b" },
      ]);

      // when
      const act = () => requireLive(log, "Q1a", "target");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q1a is frozen, as it was superseded by Q1b",
      );
    });

    test("looking up an item under a superseded option throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1b" },
      ]);

      // when
      const act = () => requireLive(log, "Q2", "target");

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q2 is frozen, as its ancestor Q1a was superseded by Q1b",
      );
    });

    test("looking up a frozen excluded item to restore throws frozen", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const act = () => requireExcluded(log, "Q1a");

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "Q1a is frozen, as its ancestor Q1 was superseded by Q2",
      );
    });

    test("an item that comes into play during a focus is not reported as hidden", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "focus", target: "Q1" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q3", state: "open" }],
        selections: [{ question: "Q1", before: ["Q1a"], after: ["Q1b"] }],
        displaced: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }],
        placed: [],
      });
    });

    test("an item superseded during a focus is frozen by its own replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "focus", target: "Q1" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
        { type: "select-option", targets: ["Q1b"] },
        { type: "add-question", id: "Q4", text: "q4", origin: "Q1b" },
        { type: "supersede-question", target: "Q3", question: "Q4" },
      ]);

      // when
      const act = () => requireUnfrozen(log, "Q3", "target");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q3 is frozen, as it was superseded by Q4",
      );
    });

    test("a statement is listed where it stands in the walk, before the items after it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s1" },
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-statement", id: "S2", text: "s2", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S2" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["S1", "Q1", "S2", "Q2"],
      );
    });

    test("a restore ends the context of the exclusion, and leaves none of its own", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred", context: "waiting on legal" },
        { type: "restore", target: "Q1" },
      ]);

      // when
      const entries = buildTree(log);

      // then
      assert.deepEqual(entries, [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }]);
    });

    test("an item excluded for one reason under an item excluded for another shows its own exclusion", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q1", reason: "not-applicable" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "not-applicable", undefined],
          ["Q2", "deferred", { state: "not-applicable", by: "Q1" }],
        ],
      );
    });

    test("an item excluded itself has no hider once the ancestor above it is restored", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q1", reason: "not-applicable" },
        { type: "restore", target: "Q1" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "open", undefined],
          ["Q2", "deferred", undefined],
        ],
      );
    });

    test("an item excluded itself under an unselected option shows its own exclusion, hidden by the option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "settled", undefined],
          ["Q2", "deferred", { state: "off-path", by: "Q1b" }],
        ],
      );
    });

    test("an item excluded itself has no hider once the option above it is selected", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "settled", undefined],
          ["Q2", "deferred", undefined],
        ],
      );
    });

    test("an item that is not excluded, with nothing above hiding it, shows open or settled and no hider", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "o", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "settled", undefined],
          ["Q2", "open", undefined],
        ],
      );
    });

    test("an item excluded itself, with nothing above hiding it, shows its exclusion and no hider", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "deferred", undefined],
        ],
      );
    });

    test("an item under an unselected option shows off-path, hidden by the option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "o", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "o", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "settled", undefined],
          ["Q2", "off-path", { state: "off-path", by: "Q1b" }],
        ],
      );
    });

    test("an item under an excluded item shows that item's state, hidden by it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "deferred", undefined],
          ["Q2", "deferred", { state: "deferred", by: "Q1" }],
        ],
      );
    });

    test("an item under an excluded item in an unselected branch shows off-path, hidden by the option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "o", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "o", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q2" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "settled", undefined],
          ["Q2", "deferred", { state: "off-path", by: "Q1b" }],
          ["Q3", "off-path", { state: "off-path", by: "Q1b" }],
        ],
      );
    });

    test("an item excluded for the same reason as the item above it is hidden by that item", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q1", "deferred", undefined],
          ["Q2", "deferred", { state: "deferred", by: "Q1" }],
        ],
      );
    });

    test("an item under a superseded item shows frozen, hidden by the superseded item", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "q" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q3", "open", undefined],
          ["Q1", "frozen", undefined],
          ["Q2", "frozen", { state: "frozen", by: "Q1" }],
        ],
      );
    });

    test("an item excluded itself under a superseded item shows frozen, not its own exclusion", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "add-question", id: "Q3", text: "q" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // when
      const items = listed(log, undefined, ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"]);

      // then
      assert.deepEqual(
        items.map((each) => [each.id, each.state, each.hiddenBy]),
        [
          ["Q3", "open", undefined],
          ["Q1", "frozen", undefined],
          ["Q2", "frozen", { state: "frozen", by: "Q1" }],
        ],
      );
    });

    test("listing by off-path finds the whole unselected branch, the items excluded themselves included", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q4", text: "q", origin: "Q3" },
        { type: "add-question", id: "Q5", text: "q", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q3", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["off-path"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q2", "Q3", "Q4", "Q5"],
      );
    });

    test("listing by deferred finds, in an unselected branch, only the items excluded themselves", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q4", text: "q", origin: "Q3" },
        { type: "add-question", id: "Q5", text: "q", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q3", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["deferred"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q2", "Q3"],
      );
    });

    test("an item whose state and whose hider's state are both asked for is listed once", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q4", text: "q", origin: "Q3" },
        { type: "add-question", id: "Q5", text: "q", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q3", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["deferred", "off-path"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q2", "Q3", "Q4", "Q5"],
      );
    });

    test("listing by open finds no item that something hides", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1b" },
        { type: "add-question", id: "Q4", text: "q", origin: "Q3" },
        { type: "add-question", id: "Q5", text: "q", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q3", reason: "deferred" },
        { type: "add-question", id: "Q6", text: "q" },
      ]);

      // when
      const items = listed(log, undefined, ["open"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q6"],
      );
    });

    test("listing by deferred finds an item excluded for another reason under a deferred item", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1" },
        { type: "exclude", target: "Q3", reason: "not-applicable" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["deferred"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q1", "Q2", "Q3"],
      );
    });

    test("listing by not-applicable does not find the deferred item above an item in that state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "q", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "q", origin: "Q1" },
        { type: "exclude", target: "Q3", reason: "not-applicable" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = listed(log, undefined, ["not-applicable"]);

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q3"],
      );
    });

    test("an excluded item that is off the path can be restored", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // when
      const node = requireExcluded(log, "Q2");

      // then
      assert.equal(node.id, "Q2");
    });

    test("looking up an item excluded while off the path throws excluded", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // when
      const act = () => requireLive(log, "Q2", "target");

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is excluded: Q2",
      );
    });

    test("an item one event displaces is listed, though another event of the same write names it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "tag", target: "Q2", tags: ["t"] },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // then
      assert.deepEqual(result, {
        created: [],
        selections: [{ question: "Q1", before: ["Q1a"], after: ["Q1b"] }],
        displaced: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }],
        placed: [],
      });
    });

    test("an item the write excluded and something else hides is still listed, with its own exclusion", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // then
      assert.deepEqual(result, {
        created: [],
        selections: [{ question: "Q1", before: ["Q1a"], after: ["Q1b"] }],
        displaced: [{ id: "Q2", state: "deferred", hiddenBy: { state: "off-path", by: "Q1a" } }],
        placed: [],
      });
    });

    test("an item created and excluded by the same write is reported in the state the exclusion gave it", () => {
      // given
      const log = Log.memoryLog();

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q1", text: "parked" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1", state: "deferred" }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item created and superseded by the same write is reported as frozen", () => {
      // given
      const log = Log.memoryLog();

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [
          { id: "Q1", state: "frozen" },
          { id: "Q2", state: "open" },
        ],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item created under something excluded is reported in that state, hidden by it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "deferred", hiddenBy: { state: "deferred", by: "Q1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item is reported as hidden by an ancestor that a later event of the write excluded", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q1", reason: "not-applicable" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "not-applicable", hiddenBy: { state: "not-applicable", by: "Q1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item is reported as frozen by an ancestor that a later event of the write superseded", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q3" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [
          { id: "Q2", state: "frozen", hiddenBy: { state: "frozen", by: "Q1" } },
          { id: "Q3", state: "open" },
        ],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item created and excluded under an unselected option is reported with its own exclusion", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "deferred", hiddenBy: { state: "off-path", by: "Q1b" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an option added to an answered question is reported with no state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ]);

      // then
      assert.deepEqual(result, { created: [{ id: "Q1b" }], selections: [], displaced: [], placed: [] });
    });

    test("an option added to an excluded question is reported in the question's state, hidden by it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1a", state: "deferred", hiddenBy: { state: "deferred", by: "Q1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an option created and excluded by the same write is reported in the state the exclusion gave it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1a", state: "not-applicable" }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an option created and excluded under an excluded question is reported with its own exclusion", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const result = resultOfWrite(log, [
        { type: "add-option", id: "Q1a", text: "o", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1a", state: "not-applicable", hiddenBy: { state: "deferred", by: "Q1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an item created under a follow-up that is not promoted is reported as off the path", () => {
      // given
      const log = Log.memoryLog([{ type: "add-follow-up", id: "F1", text: "f" }]);

      // when
      const result = resultOfWrite(log, [{ type: "add-question", id: "Q1", text: "q", origin: "F1" }]);

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1", state: "off-path", hiddenBy: { state: "off-path", by: "F1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("an option that is only not selected is active, though its state is off-path", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
        ]),
      );

      // when
      const option = requireOption(graph.nodes, "Q1b");

      // then
      assert.deepEqual([option.state, isActive(option)], ["off-path", true]);
    });

    test("an option of a question that is off the path is not active", () => {
      // given
      const graph = build(
        Log.memoryLog([
          { type: "add-question", id: "Q1", text: "q1" },
          { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
          { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
          { type: "select-option", targets: ["Q1a"] },
          { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
          { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        ]),
      );

      // when
      const option = requireOption(graph.nodes, "Q2a");

      // then
      assert.deepEqual(
        [option.state, isActive(option), option.hiddenBy],
        ["off-path", false, { state: "off-path", by: "Q1b" }],
      );
    });
  }

  return {
    buildTree,
    filterTree,
    status,
    frontier: (log: Log) => frontier(build(log)),
    activeFocus: (log: Log) => activeFocus(build(log)),
    hasOpen,
    rejectHidden,
    trail,
    targetKinds,
    requireUnfrozenOfKind,
    requireLiveOfKind,
    requireUnfrozen,
    requireLive,
    requireExcluded,
    tags,
    listed,
    selection,
    creates,
    takesContext,
    requiresContext,
    createsItem,
    resultOfWrite,
    tests,
  };
})();

const AddItem = (() => {
  const prefixes = { "add-question": "Q", "add-follow-up": "F", "add-statement": "S" } as const;

  type AddEvent = Extract<Event, { type: keyof typeof prefixes }>;

  function add(log: Log, type: AddEvent["type"], item: { text: string; origin?: string }): string {
    if (item.origin !== undefined) Graph.requireUnfrozen(log, item.origin, "origin");

    const id = Log.nextId(log, type, prefixes[type]);
    const event: AddEvent = { type, id, text: item.text };
    if (item.origin !== undefined) event.origin = item.origin;

    log.append(event);

    return id;
  }

  function tests() {
    test("an item without an origin is stored without an origin field", () => {
      // given
      const log = Log.memoryLog();

      // when
      add(log, "add-question", { text: "q" });

      // then
      assert.deepEqual(log.read(), [{ type: "add-question", id: "Q1", text: "q" }]);
    });

    test("the first question gets Q1", () => {
      // given
      const log = Log.memoryLog();

      // when
      const id = add(log, "add-question", { text: "q" });

      // then
      assert.equal(id, "Q1");
    });

    test("the first follow-up gets F1", () => {
      // given
      const log = Log.memoryLog();

      // when
      const id = add(log, "add-follow-up", { text: "f" });

      // then
      assert.equal(id, "F1");
    });

    test("the first statement gets S1", () => {
      // given
      const log = Log.memoryLog();

      // when
      const id = add(log, "add-statement", { text: "s" });

      // then
      assert.equal(id, "S1");
    });

    test("ids of one kind go up in order", () => {
      // given
      const log = Log.memoryLog([{ type: "add-statement", id: "S1", text: "a" }]);

      // when
      const id = add(log, "add-statement", { text: "b" });

      // then
      assert.equal(id, "S2");
    });

    test("ids are counted for each kind on its own", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const id = add(log, "add-follow-up", { text: "f" });

      // then
      assert.equal(id, "F1");
    });

    test("an item under a question is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      add(log, "add-question", { text: "q", origin: "Q1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-question", id: "Q2", text: "q", origin: "Q1" }]);
    });

    test("an item under an option is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      add(log, "add-question", { text: "q", origin: "Q1a" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-question", id: "Q2", text: "q", origin: "Q1a" }]);
    });

    test("an item under a follow-up is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-follow-up", id: "F1", text: "f" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      add(log, "add-question", { text: "q", origin: "F1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-question", id: "Q1", text: "q", origin: "F1" }]);
    });

    test("an item under a statement is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "s" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      add(log, "add-question", { text: "q", origin: "S1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-question", id: "Q1", text: "q", origin: "S1" }]);
    });

    test("an item under an excluded item is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "not-applicable" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      add(log, "add-question", { text: "q", origin: "Q1a" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-question", id: "Q2", text: "q", origin: "Q1a" }]);
    });

    test("an item under an unknown origin throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => add(log, "add-question", { text: "q", origin: "Q9" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "origin not found: Q9");
      assert.deepEqual(log.read(), []);
    });

    test("an item under a superseded origin throws, naming its replacement, and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "old" },
        { type: "add-statement", id: "S2", text: "new" },
        { type: "supersede-statement", target: "S1", statement: "S2" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => add(log, "add-question", { text: "q", origin: "S1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "S1 is frozen, as it was superseded by S2",
      );
      assert.deepEqual(log.read(), events);
    });
  }

  return { add, tests };
})();

const AddQuestion = (() => {
  const options = {
    text: { type: "string" },
    origin: { type: "string" },
  } as const;

  const required = ["text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { text?: string; origin?: string }): void {
    const { text, origin } = config;
    if (!text) throw new DecisionTreeError("add-question requires --text");

    AddItem.add(log, "add-question", { text, origin });
  }

  function tests() {
    test("adding a question without a text throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "add-question requires --text",
      );
      assert.deepEqual(log.read(), []);
    });

    test("question with an existing origin is stored with it", () => {
      // given
      const first: Event = { type: "add-question", id: "Q1", text: "a" };
      const log = Log.memoryLog([first]);

      // when
      run(log, { text: "b", origin: "Q1" });

      // then
      assert.deepEqual(log.read(), [first, { type: "add-question", id: "Q2", text: "b", origin: "Q1" }]);
    });
  }

  return { options, required, run, tests };
})();

const AddOption = (() => {
  const options = {
    text: { type: "string" },
    origin: { type: "string" },
  } as const;

  const required = ["text", "origin"] as const satisfies readonly (keyof typeof options)[];

  function nextOptionId(log: Log, origin: string): string {
    const count = log
      .read()
      .filter((event) => event.type === "add-option" && event.origin === origin).length;
    if (count >= 26) throw new DecisionTreeError(`question ${origin} already has 26 options`);

    return `${origin}${String.fromCharCode("a".charCodeAt(0) + count)}`;
  }

  function add(log: Log, option: { text: string; origin: string }): string {
    const { text, origin } = option;

    Graph.requireUnfrozenOfKind(log, origin, "origin", ["question"]);

    const id = nextOptionId(log, origin);

    const event: Event = { type: "add-option", id, text, origin };

    log.append(event);

    return id;
  }

  function run(log: Log, config: { text?: string; origin?: string }): void {
    const { text, origin } = config;
    if (!text) throw new DecisionTreeError("add-option requires --text");
    if (!origin) throw new DecisionTreeError("add-option requires --origin");

    add(log, { text, origin });
  }

  function tests() {
    test("option without a question throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => add(log, { text: "a", origin: "Q1" });

      // then
      assert.throws(act, DecisionTreeError);
      assert.deepEqual(log.read(), []);
    });

    test("option under a statement throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => add(log, { text: "a", origin: "S1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "origin is not a question: S1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("option under an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => add(log, { text: "b", origin: "Q1a" });

      // then
      assert.throws(act, DecisionTreeError);
      assert.deepEqual(log.read(), events);
    });

    test("27th option under a question throws and appends nothing", () => {
      // given
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        ...letters.map((letter): Event => ({
          type: "add-option",
          id: `Q1${letter}`,
          text: letter,
          origin: "Q1",
        })),
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => add(log, { text: "extra", origin: "Q1" });

      // then
      assert.throws(act, DecisionTreeError);
      assert.deepEqual(log.read(), events);
    });

    test("option under a question is stored with its origin", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const log = Log.memoryLog([question]);

      // when
      const id = add(log, { text: "a", origin: "Q1" });

      // then
      assert.equal(id, "Q1a");
      assert.deepEqual(log.read(), [
        question,
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);
    });

    test("second option under the same question gets Q1b", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const id = add(log, { text: "b", origin: "Q1" });

      // then
      assert.equal(id, "Q1b");
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ]);
    });

    test("option letters restart per question", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const id = add(log, { text: "b", origin: "Q2" });

      // then
      assert.equal(id, "Q2a");
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q2a", text: "b", origin: "Q2" },
      ]);
    });

    test("option under an excluded question is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const id = add(log, { text: "a", origin: "Q1" });

      // then
      assert.equal(id, "Q1a");
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);
    });
  }

  return { options, required, add, run, tests };
})();

const SelectOption = (() => {
  const options = {
    target: { type: "string", multiple: true },
  } as const;

  const required = ["target"] as const satisfies readonly (keyof typeof options)[];

  function select(log: Log, targets: string[]): void {
    const repeated = targets.find((target, index) => targets.indexOf(target) !== index);
    if (repeated !== undefined) throw new DecisionTreeError(`target is repeated: ${repeated}`);

    const selected = targets.map((target) => Graph.requireUnfrozenOfKind(log, target, "target", ["option"]));
    const question = selected[0].question;
    const stray = selected.find((option) => option.question.id !== question.id);
    if (stray !== undefined) throw new DecisionTreeError(`target is not an option of ${question.id}: ${stray.id}`);

    Graph.rejectHidden(question);
    selected.forEach((option) => Graph.rejectHidden(option));

    const event: Event = { type: "select-option", targets };

    log.append(event);
  }

  function run(log: Log, config: { target?: string[] }): void {
    if (!config.target) throw new DecisionTreeError("select-option requires --target");

    select(log, config.target);
  }

  function tests() {
    test("selecting an option of a question under an excluded item names what hides the question", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q2a"]);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q2 is deferred, hidden by Q1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("selecting an option of an excluded question names the question and its state", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q1a"]);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 is deferred");
      assert.deepEqual(log.read(), events);
    });

    test("selecting an excluded option names it and its state", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q1a"]);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1a is deferred");
      assert.deepEqual(log.read(), events);
    });

    test("selecting without a target throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "select-option requires --target",
      );
      assert.deepEqual(log.read(), []);
    });

    test("selecting the same option twice throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q1a", "Q1a"]);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target is repeated: Q1a");
      assert.deepEqual(log.read(), events);
    });

    test("selecting options of two questions throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-option", id: "Q2a", text: "b", origin: "Q2" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q1a", "Q2a"]);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not an option of Q1: Q2a",
      );
      assert.deepEqual(log.read(), events);
    });

    test("selecting an option of an off-path question throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => select(log, ["Q2a"]);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q2 is off-path, hidden by Q1b",
      );
      assert.deepEqual(log.read(), events);
    });

    test("selecting an unknown option throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => select(log, ["Q1a"]);

      // then
      assert.throws(act, DecisionTreeError);
      assert.deepEqual(log.read(), []);
    });

    test("selecting a question throws and appends nothing", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const log = Log.memoryLog([question]);

      // when
      const act = () => select(log, ["Q1"]);

      // then
      assert.throws(act, DecisionTreeError);
      assert.deepEqual(log.read(), [question]);
    });

    test("selecting several options records them in one event", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      select(log, ["Q1a", "Q1b"]);

      // then
      assert.deepEqual(log.read(), [...events, { type: "select-option", targets: ["Q1a", "Q1b"] }]);
    });

    test("selecting an option records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      select(log, ["Q1a"]);

      // then
      assert.deepEqual(log.read(), [...events, { type: "select-option", targets: ["Q1a"] }]);
    });
  }

  return { options, required, run, tests };
})();

const ClearSelection = (() => {
  const options = {
    target: { type: "string" },
  } as const;

  const required = ["target"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string }): void {
    const { target } = config;
    if (!target) throw new DecisionTreeError("clear-selection requires --target");

    Graph.requireUnfrozenOfKind(log, target, "target", ["question"]);
    if (Graph.selection(log, target).length === 0) throw new DecisionTreeError(`${target} has no selection`);

    const event: Event = { type: "clear-selection", target };

    log.append(event);
  }

  function clearIfSelected(log: Log, option: OptionNode): void {
    if (!option.question.selected.includes(option)) return;

    const event: Event = { type: "clear-selection", target: option.question.id };

    log.append(event);
  }

  function tests() {
    test("clearing the selection of a question under an excluded item records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "clear-selection", target: "Q2" },
      ]);
    });

    test("clearing the selection of an excluded question records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "clear-selection", target: "Q2" },
      ]);
    });

    test("clearing a selection without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "clear-selection requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("clearing the selection of an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not a question: Q1a",
      );
      assert.deepEqual(log.read(), events);
    });

    test("clearing a question with nothing selected throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 has no selection");
      assert.deepEqual(log.read(), events);
    });

    test("clearing a selection records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "clear-selection", target: "Q1" }]);
    });
  }

  return { options, required, run, clearIfSelected, tests };
})();

const AddFollowUp = (() => {
  const options = {
    text: { type: "string" },
    origin: { type: "string" },
  } as const;

  const required = ["text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { text?: string; origin?: string }): void {
    const { text, origin } = config;
    if (!text) throw new DecisionTreeError("add-follow-up requires --text");

    AddItem.add(log, "add-follow-up", { text, origin });
  }

  function open(log: Log, id: string): FollowUpNode {
    const node = Graph.requireUnfrozenOfKind(log, id, "target", ["follow-up"]);
    if (node.status !== "open") throw new DecisionTreeError(`follow-up ${id} is already ${node.status}`);

    return node;
  }

  function tests() {
    test("adding a follow-up without a text throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "add-follow-up requires --text",
      );
      assert.deepEqual(log.read(), []);
    });

    test("follow-up under an open follow-up is stored with its origin", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { text: "f2", origin: "F1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "add-follow-up", id: "F2", text: "f2", origin: "F1" }]);
    });

  }

  return { options, required, open, run, tests };
})();

const AddStatement = (() => {
  const options = {
    text: { type: "string" },
    origin: { type: "string" },
  } as const;

  const required = ["text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { text?: string; origin?: string }): void {
    const { text, origin } = config;
    if (!text) throw new DecisionTreeError("add-statement requires --text");

    AddItem.add(log, "add-statement", { text, origin });
  }

  function tests() {
    test("adding a statement without a text throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "add-statement requires --text",
      );
      assert.deepEqual(log.read(), []);
    });

    test("a statement under a question is stored with its origin", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const log = Log.memoryLog([question]);

      // when
      run(log, { text: "s", origin: "Q1" });

      // then
      assert.deepEqual(log.read(), [question, { type: "add-statement", id: "S1", text: "s", origin: "Q1" }]);
    });
  }

  return { options, required, run, tests };
})();

const PromoteFollowUp = (() => {
  const options = {
    target: { type: "string" },
    text: { type: "string" },
  } as const;

  const required = ["target"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string; text?: string }): void {
    const target = config.target;
    if (!target) throw new DecisionTreeError("promote-follow-up requires --target");

    const followUp = AddFollowUp.open(log, target);
    const tags = Graph.tags(log, target);
    const question = AddItem.add(log, "add-question", { text: config.text ?? followUp.text, origin: followUp.id });

    const event: Event = { type: "promote-follow-up", target, question };

    log.append(event);
    if (tags.length > 0) Tag.run(log, { target: question, tag: tags });
  }

  function tests() {
    test("promoting a follow-up under an excluded item creates its question under it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "F1" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q2", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q2" },
      ]);
    });

    test("promoting an excluded follow-up creates its question under it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1" },
        { type: "exclude", target: "F1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "F1" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q2", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q2" },
      ]);
    });

    test("promoting without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "promote-follow-up requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("promoting a follow-up creates its question under it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1a" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "F1" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q2", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q2" },
      ]);
    });

    test("promoting with a text words the question that way", () => {
      // given
      const events: Event[] = [{ type: "add-follow-up", id: "F1", text: "f" }];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "F1", text: "better" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q1", text: "better", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);
    });

    test("promoting a tagged follow-up tags the new question after recording the promotion", () => {
      // given
      const events: Event[] = [
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "tag", target: "F1", tags: ["t", "u"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "F1" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q1", text: "f", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ]);
    });
  }

  return { options, required, run, tests };
})();

const Exclude = (() => {
  const options = {
    target: { type: "string" },
    reason: { type: "string" },
  } as const;

  const required = ["target", "reason"] as const satisfies readonly (keyof typeof options)[];

  const reasons: ExclusionReason[] = ["not-applicable", "deferred"];

  function run(log: Log, config: { target?: string; reason?: string }): void {
    const { target, reason } = config;
    if (!target) throw new DecisionTreeError("exclude requires --target");
    if (!reason) throw new DecisionTreeError("exclude requires --reason");

    const exclusionReason = reasons.find((each) => each === reason);
    if (exclusionReason === undefined) {
      throw new DecisionTreeError(`reason must be ${reasons.join(" or ")}: ${reason}`);
    }

    const node = Graph.requireLive(log, target, "target");

    if (node.kind === "option") ClearSelection.clearIfSelected(log, node);

    const event: Event = { type: "exclude", target, reason: exclusionReason };

    log.append(event);
  }

  function tests() {
    test("excluding an item under an excluded item records the exclusion", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);
    });

    test("excluding an excluded item again throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1", reason: "deferred" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target is excluded: Q1");
      assert.deepEqual(log.read(), events);
    });

    test("excluding without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { reason: "deferred" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "exclude requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("excluding without a reason throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "exclude requires --reason",
      );
      assert.deepEqual(log.read(), events);
    });

    test("excluding with an unknown reason throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1", reason: "later" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "reason must be not-applicable or deferred: later",
      );
      assert.deepEqual(log.read(), events);
    });

    test("excluding an unknown target throws and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { target: "Q9", reason: "deferred" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
      assert.deepEqual(log.read(), []);
    });

    test("excluding a statement records the exclusion", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "exclude", target: "S1", reason: "deferred" }]);
    });

    test("excluding a selected option clears the selection before recording the exclusion", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1b", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "clear-selection", target: "Q1" },
        { type: "exclude", target: "Q1b", reason: "deferred" },
      ]);
    });

    test("excluding the selected option of a question that was excluded while off the path clears its selection", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "select-option", targets: ["Q1b"] },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2a", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "clear-selection", target: "Q2" },
        { type: "exclude", target: "Q2a", reason: "deferred" },
      ]);
    });

    test("excluding an option that is not selected records no clearing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1b", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "exclude", target: "Q1b", reason: "deferred" }]);
    });

    test("excluding an option records the exclusion", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1a", reason: "deferred" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "exclude", target: "Q1a", reason: "deferred" }]);
    });
  }

  return { options, required, run, tests };
})();

const Restore = (() => {
  const options = {
    target: { type: "string" },
  } as const;

  const required = ["target"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string }): void {
    const target = config.target;
    if (!target) throw new DecisionTreeError("restore requires --target");

    Graph.requireExcluded(log, target);

    const event: Event = { type: "restore", target };

    log.append(event);
  }

  function tests() {
    test("restoring an item whose ancestor is still excluded records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "restore", target: "Q2" },
      ]);
    });

    test("restoring without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "restore requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("restoring a statement records the restore", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "s" },
        { type: "exclude", target: "S1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "restore", target: "S1" }]);
    });

    test("restoring an option records the restore", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1a" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "restore", target: "Q1a" }]);
    });
  }

  return { options, required, run, tests };
})();

const SupersedeQuestion = (() => {
  const options = {
    target: { type: "string" },
    text: { type: "string" },
  } as const;

  const required = ["target", "text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string; text?: string }): void {
    const { target, text } = config;
    if (!target) throw new DecisionTreeError("supersede-question requires --target");
    if (!text) throw new DecisionTreeError("supersede-question requires --text");

    const old = Graph.requireLiveOfKind(log, target, "target", ["question"]);

    const tags = Graph.tags(log, target);
    const focused = Graph.activeFocus(log) === target;

    const question = AddItem.add(log, "add-question", { text, origin: old.parent?.id });

    const event: Event = { type: "supersede-question", target, question };

    log.append(event);
    if (tags.length > 0) Tag.run(log, { target: question, tag: tags });
    if (focused) Focus.run(log, { target: question });
  }

  function tests() {
    test("superseding a question under an excluded item records the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2", text: "new" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q3", text: "new", origin: "Q1" },
        { type: "supersede-question", target: "Q2", question: "Q3" },
      ]);
    });

    test("superseding an excluded question throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q2", text: "new" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target is excluded: Q2");
      assert.deepEqual(log.read(), events);
    });

    test("superseding without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { text: "q2" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-question requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding without a text throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-question requires --text",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a", text: "q2" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not a question: Q1a",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding a question adds one without options where the old one hung", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2", text: "q3" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1a" },
        { type: "supersede-question", target: "Q2", question: "Q3" },
      ]);
    });

    test("superseding a tagged question tags the new one after recording the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1", text: "q2" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
        { type: "tag", target: "Q2", tags: ["t", "u"] },
      ]);
    });

    test("superseding the focused question focuses the new one after recording the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "focus", target: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1", text: "q2" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
        { type: "focus", target: "Q2" },
      ]);
    });
  }

  return { options, required, run, tests };
})();

const SupersedeOption = (() => {
  const options = {
    target: { type: "string" },
    text: { type: "string" },
  } as const;

  const required = ["target", "text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string; text?: string }): void {
    const { target, text } = config;
    if (!target) throw new DecisionTreeError("supersede-option requires --target");
    if (!text) throw new DecisionTreeError("supersede-option requires --text");

    const old = Graph.requireLiveOfKind(log, target, "target", ["option"]);

    const option = AddOption.add(log, { text, origin: old.question.id });

    ClearSelection.clearIfSelected(log, old);

    const event: Event = { type: "supersede-option", target, option };

    log.append(event);
  }

  function tests() {
    test("superseding an option of an excluded question records the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1a", text: "new" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q1b", text: "new", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1b" },
      ]);
    });

    test("superseding an excluded option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a", text: "new" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target is excluded: Q1a");
      assert.deepEqual(log.read(), events);
    });

    test("superseding an option without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { text: "b" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-option requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding an option without a text throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-option requires --text",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding a question as an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1", text: "b" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not an option: Q1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding an option adds one with the next letter before recording the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1a", text: "c" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ]);
    });

    test("superseding the selected option of a question that was excluded while off the path clears its selection", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "select-option", targets: ["Q1b"] },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q2a", text: "y" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q2b", text: "y", origin: "Q2" },
        { type: "clear-selection", target: "Q2" },
        { type: "supersede-option", target: "Q2a", option: "Q2b" },
      ]);
    });

    test("superseding a selected option clears the selection before recording the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1a", text: "c" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "clear-selection", target: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ]);
    });
  }

  return { options, required, run, tests };
})();

const SupersedeStatement = (() => {
  const options = {
    target: { type: "string" },
    text: { type: "string" },
  } as const;

  const required = ["target", "text"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string; text?: string }): void {
    const { target, text } = config;
    if (!target) throw new DecisionTreeError("supersede-statement requires --target");
    if (!text) throw new DecisionTreeError("supersede-statement requires --text");

    const old = Graph.requireLiveOfKind(log, target, "target", ["statement"]);

    const tags = Graph.tags(log, target);

    const statement = AddItem.add(log, "add-statement", { text, origin: old.parent?.id });

    const event: Event = { type: "supersede-statement", target, statement };

    log.append(event);
    if (tags.length > 0) Tag.run(log, { target: statement, tag: tags });
  }

  function tests() {
    test("superseding a statement under an excluded item records the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", text: "new" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-statement", id: "S2", text: "new", origin: "Q1" },
        { type: "supersede-statement", target: "S1", statement: "S2" },
      ]);
    });

    test("superseding an excluded statement throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1" },
        { type: "exclude", target: "S1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "S1", text: "new" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target is excluded: S1");
      assert.deepEqual(log.read(), events);
    });

    test("superseding a statement without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { text: "new" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-statement requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding a statement without a text throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "S1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-statement requires --text",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding a question as a statement throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1", text: "new" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "target is not a statement: Q1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("superseding a statement adds one where the old one hung, then records the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-statement", id: "S1", text: "old", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", text: "new" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-statement", id: "S2", text: "new", origin: "Q1" },
        { type: "supersede-statement", target: "S1", statement: "S2" },
      ]);
    });

    test("superseding a tagged statement tags the new one after recording the supersede", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "old" },
        { type: "tag", target: "S1", tags: ["frame"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", text: "new" });

      // then
      assert.deepEqual(log.read(), [
        ...events,
        { type: "add-statement", id: "S2", text: "new" },
        { type: "supersede-statement", target: "S1", statement: "S2" },
        { type: "tag", target: "S2", tags: ["frame"] },
      ]);
    });
  }

  return { options, required, run, tests };
})();

const Focus = (() => {
  const options = {
    target: { type: "string" },
  } as const;

  const required = ["target"] as const satisfies readonly (keyof typeof options)[];

  function run(log: Log, config: { target?: string }): void {
    const target = config.target;
    if (!target) throw new DecisionTreeError("focus requires --target");

    const node = Graph.requireUnfrozenOfKind(log, target, "target", Graph.targetKinds);
    Graph.rejectHidden(node);
    if (!Graph.hasOpen(log, node)) throw new DecisionTreeError(`nothing open under ${target}`);

    log.append({ type: "focus", target });
  }

  function tests() {
    test("focusing a question under an excluded item names what hides it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q2" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q2 is deferred, hidden by Q1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing an excluded question names it and its state", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 is deferred");
      assert.deepEqual(log.read(), events);
    });

    test("focusing without a target throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "focus requires --target",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing an item with nothing open throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "nothing open under Q1");
      assert.deepEqual(log.read(), events);
    });

    test("focusing an off-path question throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q2" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q2 is off-path, hidden by Q1b",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing a question under an open follow-up names that follow-up", () => {
      // given
      const events: Event[] = [
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "Q1 is off-path, hidden by F1",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "target is not a question, follow-up or statement: Q1a",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing a statement with something open under it records the focus", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "focus", target: "S1" }]);
    });

    test("focusing a statement with nothing open under it throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "S1" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "nothing open under S1");
      assert.deepEqual(log.read(), events);
    });

    test("focusing a statement that is off the path names the option that hides it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-statement", id: "S1", text: "s", origin: "Q1b" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "S1" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "S1 is off-path, hidden by Q1b",
      );
      assert.deepEqual(log.read(), events);
    });

    test("focusing a question records the focus", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1" });

      // then
      assert.deepEqual(log.read(), [...events, { type: "focus", target: "Q1" }]);
    });
  }

  return { options, required, run, tests };
})();

const Tag = (() => {
  const options = {
    target: { type: "string" },
    tag: { type: "string", multiple: true },
  } as const;

  const required = ["target", "tag"] as const satisfies readonly (keyof typeof options)[];

  function checked(log: Log, op: string, config: { target?: string; tag?: string[] }) {
    const { target, tag: tags } = config;
    if (!target) throw new DecisionTreeError(`${op} requires --target`);
    if (!tags) throw new DecisionTreeError(`${op} requires --tag`);
    if (tags.includes("")) throw new DecisionTreeError(`${op} --tag requires a text`);

    Graph.requireUnfrozenOfKind(log, target, "target", Graph.targetKinds);

    return { target, tags };
  }

  function run(log: Log, config: { target?: string; tag?: string[] }): void {
    const { target, tags } = checked(log, "tag", config);

    log.append({ type: "tag", target, tags });
  }

  function tests() {
    test("tagging without a tag throws and appends nothing", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "tag requires --tag");
      assert.deepEqual(log.read(), events);
    });

    test("tagging an option throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1a", tag: ["t"] });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "target is not a question, follow-up or statement: Q1a",
      );
      assert.deepEqual(log.read(), events);
    });

    test("tagging records the tags in one event", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1", tag: ["a", "b"] });

      // then
      assert.deepEqual(log.read(), [...events, { type: "tag", target: "Q1", tags: ["a", "b"] }]);
    });

    test("tagging a statement records the tags", () => {
      // given
      const events: Event[] = [{ type: "add-statement", id: "S1", text: "s" }];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", tag: ["a"] });

      // then
      assert.deepEqual(log.read(), [...events, { type: "tag", target: "S1", tags: ["a"] }]);
    });

    test("tagging an excluded question records the tags", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1", tag: ["legal"] });

      // then
      assert.deepEqual(log.read(), [...events, { type: "tag", target: "Q1", tags: ["legal"] }]);
    });
  }

  return { options, required, checked, run, tests };
})();

const Untag = (() => {
  const options = Tag.options;
  const required = Tag.required;

  function run(log: Log, config: { target?: string; tag?: string[] }): void {
    const { target, tags } = Tag.checked(log, "untag", config);

    const current = Graph.tags(log, target);
    const missing = tags.find((tag) => !current.includes(tag));
    if (missing !== undefined) throw new DecisionTreeError(`${target} has no tag: ${missing}`);

    log.append({ type: "untag", target, tags });
  }

  function tests() {
    test("removing a tag the item does not have throws and appends nothing", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["a"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => run(log, { target: "Q1", tag: ["b"] });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "Q1 has no tag: b");
      assert.deepEqual(log.read(), events);
    });

    test("removing a tag from a statement records it", () => {
      // given
      const events: Event[] = [
        { type: "add-statement", id: "S1", text: "s" },
        { type: "tag", target: "S1", tags: ["a", "b"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "S1", tag: ["a"] });

      // then
      assert.deepEqual(log.read(), [...events, { type: "untag", target: "S1", tags: ["a"] }]);
    });

    test("removing a tag records it", () => {
      // given
      const events: Event[] = [
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["a", "b"] },
      ];
      const log = Log.memoryLog([...events]);

      // when
      run(log, { target: "Q1", tag: ["a"] });

      // then
      assert.deepEqual(log.read(), [...events, { type: "untag", target: "Q1", tags: ["a"] }]);
    });
  }

  return { options, required, run, tests };
})();

const Items = (() => {
  const options = {
    tag: { type: "string" },
    state: { type: "string", multiple: true },
    target: { type: "string" },
    trail: { type: "boolean" },
    limit: { type: "string" },
  } as const;

  const states: ItemState[] = ["open", "settled", "off-path", "deferred", "not-applicable", "frozen"];

  function chosenStates(given: string[] = ["open"]): ItemState[] {
    const unknown = given.find((state) => state !== "all" && !states.some((each) => each === state));
    if (unknown !== undefined) {
      throw new DecisionTreeError(`state must be ${states.join(", ")} or all: ${unknown}`);
    }

    return given.includes("all") ? states : states.filter((state) => given.includes(state));
  }

  function run(
    log: Log,
    config: { tag?: string; state?: string[]; target?: string; trail?: boolean; limit?: string },
  ): ListedItem[] {
    if (config.tag === "") throw new DecisionTreeError("items --tag requires a text");
    if (config.trail && config.target === undefined) throw new DecisionTreeError("items --trail requires --target");
    if (config.limit !== undefined && !/^[1-9][0-9]*$/.test(config.limit)) {
      throw new DecisionTreeError(`items --limit must be a positive integer: ${config.limit}`);
    }

    const given = config.state ?? (config.target === undefined ? undefined : ["all"]);

    const found = Graph.listed(log, config.tag, chosenStates(given), config.target);
    const listed = config.limit === undefined ? found : found.slice(0, Number(config.limit));
    if (!config.trail || config.target === undefined) return listed;

    const steps = Graph.trail(log, config.target);

    return steps.length === 0 ? listed : listed.map((item) => ({ ...item, trail: steps }));
  }

  function tests() {
    test("a limit that is not a positive integer throws", () => {
      // given
      const log = Log.memoryLog();

      for (const limit of ["0", "2.5", "abc"]) {
        // when
        const act = () => run(log, { limit });

        // then
        assert.throws(
          act,
          (error) =>
            error instanceof DecisionTreeError && error.message === `items --limit must be a positive integer: ${limit}`,
        );
      }
    });

    test("a limit keeps the first items in walk order", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-question", id: "Q3", text: "q3" },
      ]);

      // when
      const items = run(log, { limit: "2" });

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q1", "Q2"],
      );
    });

    test("a limit above the number of items returns them all", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
      ]);

      // when
      const items = run(log, { limit: "5" });

      // then
      assert.equal(items.length, 2);
    });

    test("a limit applies after the state filter", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "settled" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "open" },
      ]);

      // when
      const items = run(log, { state: ["open"], limit: "1" });

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q2"],
      );
    });

    test("a question carries its excluded options with their state and exclusion's context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "exclude", target: "Q1b", reason: "deferred", context: "why" },
      ]);

      // when
      const hidden = run(log, {}).flatMap((each) => (each.kind === "question" ? (each.hiddenOptions ?? []) : []));

      // then
      assert.deepEqual(hidden, [{ id: "Q1b", text: "b", state: "deferred", context: { exclusion: "why" } }]);
    });

    test("an excluded question carries an option excluded for another reason with the option's own state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1a", reason: "not-applicable", context: "dropped" },
        { type: "exclude", target: "Q1", reason: "deferred", context: "parked" },
      ]);

      // when
      const hidden = run(log, { state: ["deferred"] }).flatMap((each) =>
        each.kind === "question" ? (each.hiddenOptions ?? []) : [],
      );

      // then
      assert.deepEqual(hidden, [{ id: "Q1a", text: "a", state: "not-applicable", context: { exclusion: "dropped" } }]);
    });

    test("a question carries its superseded option as frozen, linked to its replacement", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-option", id: "Q1c", text: "c", origin: "Q1" },
        { type: "supersede-option", target: "Q1a", option: "Q1c" },
      ]);

      // when
      const hidden = run(log, {}).flatMap((each) => (each.kind === "question" ? (each.hiddenOptions ?? []) : []));

      // then
      assert.deepEqual(hidden, [{ id: "Q1a", text: "a", state: "frozen", supersededBy: "Q1c" }]);
    });

    test("a trail without a target throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { trail: true });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "items --trail requires --target",
      );
    });

    test("a nested target with a trail carries its path from the root", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const items = run(log, { target: "Q2", trail: true });

      // then
      assert.deepEqual(items[0].trail, [
        { kind: "question", id: "Q1", text: "q1" },
        { kind: "option", id: "Q1a", text: "a" },
      ]);
    });

    test("a target with a trail is still limited by the states asked for", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = run(log, { target: "Q2", trail: true, state: ["settled"] });

      // then
      assert.deepEqual(items, []);
    });

    test("an off-path target with a trail shows the unchosen option in its path", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ]);

      // when
      const items = run(log, { target: "Q2", trail: true });

      // then
      assert.deepEqual(items[0].trail, [
        { kind: "question", id: "Q1", text: "q1" },
        { kind: "option", id: "Q1b", text: "b" },
      ]);
    });

    test("a root target with a trail has no trail field", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const items = run(log, { target: "Q1", trail: true });

      // then
      assert.equal("trail" in items[0], false);
    });

    test("a nested target without the flag has no trail field", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = run(log, { target: "Q2" });

      // then
      assert.equal("trail" in items[0], false);
    });

    test("querying with state all returns items in every state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "open" },
        { type: "add-question", id: "Q2", text: "settled" },
        { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "tag", target: "Q1", tags: ["t"] },
        { type: "tag", target: "Q2", tags: ["t"] },
      ]);

      // when
      const items = run(log, { tag: "t", state: ["all"] });

      // then
      assert.deepEqual(
        items.map((each) => each.state),
        ["open", "settled"],
      );
    });

    test("querying with an empty tag throws", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const act = () => run(log, { tag: "" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "items --tag requires a text",
      );
    });

    test("querying an unknown target throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { target: "Q9" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
    });

    test("querying an option as target throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "target is not a question, follow-up or statement: Q1a",
      );
    });

    test("querying a target finds it in any state", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-question", id: "Q2", text: "other" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = run(log, { target: "Q1" });

      // then
      assert.deepEqual(
        items.map((each) => each.state),
        ["deferred"],
      );
    });

    test("an explicit state still filters a target", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const items = run(log, { target: "Q1", state: ["deferred"] });

      // then
      assert.deepEqual(items, []);
    });

    test("querying with an unknown state throws", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const act = () => run(log, { tag: "t", state: ["hidden"] });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "state must be open, settled, off-path, deferred, not-applicable, frozen or all: hidden",
      );
    });

    test("querying without a tag returns tagged and untagged items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "tagged" },
        { type: "add-question", id: "Q2", text: "untagged" },
        { type: "tag", target: "Q1", tags: ["t"] },
      ]);

      // when
      const items = run(log, {});

      // then
      assert.deepEqual(
        items.map((each) => each.id),
        ["Q1", "Q2"],
      );
    });
  }

  return { options, run, states, chosenStates, tests };
})();

const Next = (() => {
  const options = {
    trail: { type: "boolean" },
  } as const;

  function run(log: Log, config: { trail?: boolean } = {}): NextData | undefined {
    const item = Graph.frontier(log)[0];
    if (item === undefined) return undefined;

    const steps = config.trail ? Graph.trail(log, item.id) : [];
    const focus = Graph.activeFocus(log);

    return { ...item, ...(steps.length === 0 ? {} : { trail: steps }), ...(focus === undefined ? {} : { focus }) };
  }

  function tests() {
    test("next names the active focus", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "focus", target: "Q2" },
      ]);

      // when
      const data = run(log);

      // then
      assert.deepEqual(data, { kind: "question", id: "Q2", text: "q2", options: [], focus: "Q2" });
    });

    test("next names no focus when none was set", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
      ]);

      // when
      const data = run(log);

      // then
      assert.deepEqual(data, { kind: "question", id: "Q1", text: "q1", options: [] });
    });

    test("next names no focus once nothing is open under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
        { type: "focus", target: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
      ]);

      // when
      const data = run(log);

      // then
      assert.deepEqual(data, { kind: "question", id: "Q1", text: "q1", options: [] });
    });

    test("next names the focus that is above the item it returns", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2" },
        { type: "add-option", id: "Q2a", text: "a", origin: "Q2" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
        { type: "focus", target: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
      ]);

      // when
      const data = run(log);

      // then
      assert.deepEqual(data, { kind: "question", id: "Q3", text: "q3", options: [], focus: "Q2" });
    });

    test("next carries a trail only when asked", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const without = run(log);
      const withTrail = run(log, { trail: true });

      // then
      assert.equal(without?.trail, undefined);
      assert.deepEqual(withTrail?.trail, [
        { kind: "question", id: "Q1", text: "q1" },
        { kind: "option", id: "Q1a", text: "a" },
      ]);
    });

    test("next carries the context of the question and of its options", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q", context: "what it means" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1", context: "what a means" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "clear-selection", target: "Q1", context: "in doubt" },
      ]);

      // when
      const next = run(log);

      // then
      assert.deepEqual(next, {
        kind: "question",
        id: "Q1",
        text: "q",
        options: [{ id: "Q1a", text: "a", context: { creation: "what a means", createdBy: "add-option" } }],
        context: { creation: "what it means", createdBy: "add-question", clearing: "in doubt" },
      });
    });

    test("next carries the context of a follow-up", () => {
      // given
      const log = Log.memoryLog([{ type: "add-follow-up", id: "F1", text: "f", context: "what it means" }]);

      // when
      const next = run(log);

      // then
      assert.deepEqual(next, {
        kind: "follow-up",
        id: "F1",
        text: "f",
        context: { creation: "what it means", createdBy: "add-follow-up" },
      });
    });

    test("next on an empty log is nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const question = run(log);

      // then
      assert.equal(question, undefined);
    });

    test("next is the first open question with its options", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "add-question", id: "Q2", text: "q2" },
      ]);

      // when
      const question = run(log);

      // then
      assert.deepEqual(question, {
        kind: "question",
        id: "Q1",
        text: "q1",
        options: [
          { id: "Q1a", text: "a" },
          { id: "Q1b", text: "b" },
        ],
      });
    });

    test("next carries the tags of the question it returns", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ]);

      // when
      const question = run(log);

      // then
      assert.deepEqual(question, {
        kind: "question",
        id: "Q1",
        text: "q1",
        options: [],
        tags: ["t", "u"],
      });
    });

    test("next is a follow-up when one comes first", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-follow-up", id: "F1", text: "f1", origin: "Q1a" },
      ]);

      // when
      const item = run(log);

      // then
      assert.deepEqual(item, { kind: "follow-up", id: "F1", text: "f1" });
    });

    test("next carries the tags of the follow-up it returns", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f1" },
        { type: "tag", target: "F1", tags: ["t", "u"] },
      ]);

      // when
      const item = run(log);

      // then
      assert.deepEqual(item, { kind: "follow-up", id: "F1", text: "f1", tags: ["t", "u"] });
    });
  }

  return { options, run, tests };
})();

const Tree = (() => {
  const options = {
    state: { type: "string", multiple: true },
    target: { type: "string" },
  } as const;

  function run(log: Log, config: { state?: string[]; target?: string }): TreeEntry[] {
    const states = Items.chosenStates(config.state);

    return Graph.filterTree(Graph.buildTree(log, config.target), states);
  }

  function tests() {
    test("an unknown state throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { state: ["nope"] });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "state must be open, settled, off-path, deferred, not-applicable, frozen or all: nope",
      );
    });

    test("an unknown target throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { target: "Q9" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
    });

    test("an option as the target throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "target is not a question, follow-up or statement: Q1a",
      );
    });

    test("with no state the tree shows only open items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "settled" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "open" },
      ]);

      // when
      const entries = run(log, {});

      // then
      assert.deepEqual(
        entries.map((entry) => entry.id),
        ["Q2"],
      );
    });

    test("a target limits the tree to its subtree and stays as the ancestor", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q2a", text: "b", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
        { type: "add-question", id: "Q4", text: "elsewhere" },
      ]);

      // when
      const entries = run(log, { target: "Q2" });

      // then
      assert.deepEqual(entries, [
        {
          kind: "question",
          state: "settled",
          id: "Q2",
          text: "q2",
          options: [
            {
              id: "Q2a",
              text: "b",
              selected: true,
              children: [{ kind: "question", state: "open", id: "Q3", text: "q3", options: [], children: [] }],
            },
          ],
          children: [],
        },
      ]);
    });

    test("a target with nothing open inside has no items by default", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      const entries = run(log, { target: "Q1" });

      // then
      assert.deepEqual(entries, []);
    });

    test("an off-path target appears when its state is asked for", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ]);

      // when
      const entries = run(log, { target: "Q2", state: ["off-path"] });

      // then
      assert.deepEqual(
        entries.map((entry) => [entry.id, entry.state]),
        [["Q2", "off-path"]],
      );
    });

    test("a tree by off-path keeps an item excluded itself in an unselected branch, under its question", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
        { type: "exclude", target: "Q2", reason: "deferred" },
      ]);

      // when
      const entries = run(log, { state: ["off-path"] });

      // then
      assert.deepEqual(
        entries.map((entry) => [
          entry.id,
          entry.state,
          entry.kind === "question" ? entry.options.map((option) => option.children.map((child) => child.id)) : [],
        ]),
        [["Q1", "settled", [[], ["Q2"]]]],
      );
    });

    test("state all shows every state, frozen included", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
        { type: "add-question", id: "Q3", text: "later" },
        { type: "exclude", target: "Q3", reason: "deferred" },
        { type: "add-question", id: "Q4", text: "dropped" },
        { type: "exclude", target: "Q4", reason: "not-applicable" },
      ]);

      // when
      const entries = run(log, { state: ["all"] });

      // then
      assert.deepEqual(
        entries.map((entry) => [entry.id, entry.state]),
        [
          ["Q2", "open"],
          ["Q1", "frozen"],
          ["Q3", "deferred"],
          ["Q4", "not-applicable"],
        ],
      );
    });
  }

  return { options, run, tests };
})();

const Status = (() => {
  const options = {
    target: { type: "string" },
  } as const;

  function run(log: Log, config: { target?: string } = {}): StatusItem[] {
    return Graph.status(log, config.target);
  }

  function tests() {
    test("status of an empty log has no items", () => {
      // given
      const log = Log.memoryLog();

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, []);
    });

    test("an unknown target throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => run(log, { target: "Q9" });

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9");
    });

    test("an option as the target throws", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
      ]);

      // when
      const act = () => run(log, { target: "Q1a" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "target is not a question, follow-up or statement: Q1a",
      );
    });

    test("an off-path target has no items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1b" },
      ]);

      // when
      const items = run(log, { target: "Q2" });

      // then
      assert.deepEqual(items, []);
    });

    test("a child of a deferred question as the target has no items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = run(log, { target: "Q2" });

      // then
      assert.deepEqual(items, []);
    });

    test("a frozen target has no items", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const items = run(log, { target: "Q1" });

      // then
      assert.deepEqual(items, []);
    });

    test("a nested target renders only itself and what is under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-option", id: "Q2a", text: "b", origin: "Q2" },
        { type: "select-option", targets: ["Q2a"] },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q2a" },
      ]);

      // when
      const items = run(log, { target: "Q2" });

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q2",
          text: "q2",
          decided: [
            {
              id: "Q2a",
              text: "b",
              children: [{ kind: "question", state: "open", id: "Q3", text: "q3", options: [], children: [] }],
            },
          ],
          children: [],
        },
      ]);
    });

    test("a target deferred directly appears with its exclusion's context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "exclude", target: "Q1", reason: "deferred", context: "why" },
      ]);

      // when
      const items = run(log, { target: "Q1" });

      // then
      assert.deepEqual(items, [{ kind: "question", state: "deferred", id: "Q1", text: "q", context: { exclusion: "why" } }]);
    });

    test("a promoted follow-up as the target renders what came from it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);

      // when
      const items = run(log, { target: "F1" });

      // then
      assert.deepEqual(items, [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }]);
    });

    test("an open question has state open and its live options", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "exclude", target: "Q1b", reason: "not-applicable" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        { kind: "question", state: "open", id: "Q1", text: "q", options: [{ id: "Q1a", text: "a" }], children: [] },
      ]);
    });

    test("an open question carries its tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        { kind: "question", state: "open", id: "Q1", text: "q", tags: ["t", "u"], options: [], children: [] },
      ]);
    });

    test("a not-applicable question is left out", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "dropped" },
        { type: "exclude", target: "Q1", reason: "not-applicable" },
        { type: "add-question", id: "Q2", text: "live" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(
        items.map((item) => item.id),
        ["Q2"],
      );
    });

    test("a settled question has state settled and only its selected options as decided", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1b", text: "b", children: [] }],
          children: [],
        },
      ]);
    });

    test("status leaves out a statement and shows what hangs under it at the statement's level", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s1" },
        { type: "add-question", id: "Q1", text: "q1", origin: "S1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-statement", id: "S2", text: "s2", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S2" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "S1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [
            {
              id: "Q1a",
              text: "a",
              children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
            },
          ],
          children: [],
        },
        { kind: "follow-up", state: "open", id: "F1", text: "f" },
      ]);
    });

    test("status carries the context each question, option and follow-up was added with", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1", context: "c1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1", context: "ca" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1", context: "cb" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "exclude", target: "Q1b", reason: "deferred" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a", context: "c2" },
        { type: "add-option", id: "Q2a", text: "x", origin: "Q2", context: "cx" },
        { type: "add-follow-up", id: "F1", text: "f1", context: "cf" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          context: { creation: "c1", createdBy: "add-question" },
          decided: [
            {
              id: "Q1a",
              text: "a",
              context: { creation: "ca", createdBy: "add-option" },
              children: [
                {
                  kind: "question",
                  state: "open",
                  id: "Q2",
                  text: "q2",
                  context: { creation: "c2", createdBy: "add-question" },
                  options: [{ id: "Q2a", text: "x", context: { creation: "cx", createdBy: "add-option" } }],
                  children: [],
                },
              ],
            },
          ],
          children: [
            {
              kind: "option",
              state: "deferred",
              id: "Q1b",
              text: "b",
              context: { creation: "cb", createdBy: "add-option" },
            },
          ],
        },
        { kind: "follow-up", state: "open", id: "F1", text: "f1", context: { creation: "cf", createdBy: "add-follow-up" } },
      ]);
    });

    test("a settled question carries the context of its selection", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
          context: { selection: "why" },
        },
      ]);
    });

    test("a later selection without a context drops the context of the earlier one", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"], context: "why" },
        { type: "select-option", targets: ["Q1b"] },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1b", text: "b", children: [] }],
          children: [],
        },
      ]);
    });

    test("a settled question carries its tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          tags: ["t", "u"],
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
        },
      ]);
    });

    test("a child hung under the selected option sits inside that decided option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [
            {
              id: "Q1a",
              text: "a",
              children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
            },
          ],
          children: [],
        },
      ]);
    });

    test("a question under an unchosen option is left out", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "chosen", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "unchosen", origin: "Q1b" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(
        items.flatMap((item) => (item.state === "settled" ? item.decided.flatMap((option) => option.children) : [])).map(
          (child) => child.id,
        ),
        ["Q2"],
      );
    });

    test("a child hung under a settled question sits outside the decided option", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
        },
      ]);
    });

    test("a child hung under an open question sits in its children", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q1",
          options: [],
          children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
        },
      ]);
    });

    test("a deferred question has state deferred and its exclusion's context, with no options", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred", context: "why" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "question", state: "deferred", id: "Q1", text: "q", context: { exclusion: "why" } }]);
    });

    test("a deferred question carries its tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q" },
        { type: "tag", target: "Q1", tags: ["t", "u"] },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "question", state: "deferred", id: "Q1", text: "q", tags: ["t", "u"] }]);
    });

    test("a child of a deferred question is left out", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "question", state: "deferred", id: "Q1", text: "q1" }]);
    });

    test("an open follow-up has state open and no body", () => {
      // given
      const log = Log.memoryLog([{ type: "add-follow-up", id: "F1", text: "f" }]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "follow-up", state: "open", id: "F1", text: "f" }]);
    });

    test("an open follow-up carries its tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "tag", target: "F1", tags: ["t", "u"] },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "follow-up", state: "open", id: "F1", text: "f", tags: ["t", "u"] }]);
    });

    test("follow-ups sit where they hang, after the questions at their level", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-follow-up", id: "F1", text: "answer follow-up", origin: "Q1a" },
        { type: "add-question", id: "Q2", text: "answer child", origin: "Q1a" },
        { type: "add-follow-up", id: "F2", text: "question follow-up", origin: "Q1" },
        { type: "add-question", id: "Q3", text: "question child", origin: "Q1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [
            {
              id: "Q1a",
              text: "a",
              children: [
                { kind: "question", state: "open", id: "Q2", text: "answer child", options: [], children: [] },
                { kind: "follow-up", state: "open", id: "F1", text: "answer follow-up" },
              ],
            },
          ],
          children: [
            { kind: "question", state: "open", id: "Q3", text: "question child", options: [], children: [] },
            { kind: "follow-up", state: "open", id: "F2", text: "question follow-up" },
          ],
        },
      ]);
    });

    test("a promoted follow-up is invisible and its question takes its place", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "add-question", id: "Q1", text: "q", origin: "F1" },
        { type: "promote-follow-up", target: "F1", question: "Q1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }]);
    });

    test("status limited to a statement shows what hangs under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q2", text: "q2", origin: "S1" },
      ]);

      // when
      const items = run(log, { target: "S1" });

      // then
      assert.deepEqual(items, [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }]);
    });

    test("a deferred statement appears as deferred, with its exclusion's context and nothing under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
        { type: "exclude", target: "S1", reason: "deferred", context: "later" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        { kind: "statement", state: "deferred", id: "S1", text: "s", context: { exclusion: "later" } },
      ]);
    });

    test("a statement dropped as not applicable is left out, with what hangs under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-statement", id: "S1", text: "s" },
        { type: "add-question", id: "Q1", text: "q", origin: "S1" },
        { type: "exclude", target: "S1", reason: "not-applicable" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, []);
    });

    test("a deferred follow-up has state deferred and its exclusion's context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "exclude", target: "F1", reason: "deferred", context: "why" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "follow-up", state: "deferred", id: "F1", text: "f", context: { exclusion: "why" } }]);
    });

    test("a deferred follow-up carries its tags", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "f" },
        { type: "tag", target: "F1", tags: ["t", "u"] },
        { type: "exclude", target: "F1", reason: "deferred" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [{ kind: "follow-up", state: "deferred", id: "F1", text: "f", tags: ["t", "u"] }]);
    });

    test("a not-applicable follow-up is left out", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-follow-up", id: "F1", text: "dropped" },
        { type: "exclude", target: "F1", reason: "not-applicable" },
        { type: "add-follow-up", id: "F2", text: "live" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(
        items.map((item) => item.id),
        ["F2"],
      );
    });

    test("a deferred option sits under its question, after its live children", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "exclude", target: "Q1b", reason: "deferred", context: "why" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [
            { kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] },
            { kind: "option", state: "deferred", id: "Q1b", text: "b", context: { exclusion: "why" } },
          ],
        },
      ]);
    });

    test("a superseded question is left out and its replacement appears", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "add-question", id: "Q2", text: "new" },
        { type: "supersede-question", target: "Q1", question: "Q2" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(
        items.map((item) => item.id),
        ["Q2"],
      );
    });

    test("a deferred question under the selected option sits in place inside it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "exclude", target: "Q2", reason: "deferred", context: "why" },
      ]);

      // when
      const items = run(log);

      // then
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [
            {
              id: "Q1a",
              text: "a",
              children: [{ kind: "question", state: "deferred", id: "Q2", text: "q2", context: { exclusion: "why" } }],
            },
          ],
          children: [],
        },
      ]);
    });

    test("two selected options each hold their own child", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
      ]);

      // when
      const items = run(log);

      // then
      const question = { kind: "question", state: "open", options: [], children: [] };
      assert.deepEqual(items, [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          decided: [
            { id: "Q1a", text: "a", children: [{ ...question, id: "Q2", text: "q2" }] },
            { id: "Q1b", text: "b", children: [{ ...question, id: "Q3", text: "q3" }] },
          ],
          children: [],
        },
      ]);
    });
  }

  return { options, run, tests };
})();

const Xml = (() => {
  function escapeXml(text: string): string {
    return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\r", "&#13;");
  }

  type OptionParts = {
    id: string;
    text: string;
    marker?: string;
    context?: ItemContext;
    links?: string[];
    children?: string[];
  };

  function renderOption(parts: OptionParts): string[] {
    const inner = [...headElements(parts), ...(parts.links ?? [])];
    const open = `<option${parts.marker ?? ""}>`;
    const children = parts.children ?? [];

    if (children.length === 0) return [`${open}${inner.join("")}</option>`];

    return [open, ...[...inner, ...children].map((line) => `  ${line}`), "</option>"];
  }

  function hiddenOption(data: HiddenOption): string {
    const { id, text, context } = data;

    return renderOption({ id, text, marker: ` state="${data.state}"`, context, links: linkElements(data) })[0];
  }

  function optionsBlock(lines: string[]): string[] {
    if (lines.length === 0) return ["  <options></options>"];

    return ["  <options>", ...lines.map((line) => `    ${line}`), "  </options>"];
  }

  function optionsLines(options: OptionData[]): string[] {
    return optionsBlock(options.map((each) => renderOption(each)[0]));
  }

  function questionLines(data: OpenQuestion): string[] {
    return [
      "<question>",
      ...headLines(data),
      ...optionsLines(data.options),
      ...selectionContextLines(data.context),
      "</question>",
    ];
  }

  function followUp(data: OpenFollowUp): string {
    return `<follow-up>${headElements(data).join("")}</follow-up>`;
  }

  function next(data: NextData | undefined): string {
    if (data === undefined) return "<next></next>";

    const trail = trailLines(data.trail);
    const body = data.kind === "follow-up" ? [followUp(data)] : questionLines(data);

    const open = data.focus === undefined ? "<next>" : `<next focus="${data.focus}">`;

    return [open, ...trail, ...body.map((line) => `  ${line}`), "</next>"].join("\n");
  }

  function decidedLines(data: OptionData & { children: StatusItem[] }): string[] {
    const children = data.children.flatMap(statusLines);

    return renderOption({ id: data.id, text: data.text, context: data.context, children });
  }

  function statusLines(item: StatusItem): string[] {
    if (item.state === "deferred") {
      const selectionContext = item.kind === "question" ? selectionContextLines(item.context) : [];

      return [`<${item.kind} state="deferred">`, ...headLines(item), ...selectionContext, `</${item.kind}>`];
    }

    if (item.kind === "follow-up") {
      return ['<follow-up state="open">', ...headLines(item), "</follow-up>"];
    }

    const children = item.children.flatMap(statusLines).map((line) => `  ${line}`);

    if (item.state === "settled") {
      return [
        '<question state="settled">',
        ...headLines(item),
        "  <decided>",
        ...item.decided.flatMap(decidedLines).map((line) => `    ${line}`),
        ...selectionContextLines(item.context).map((line) => `  ${line}`),
        "  </decided>",
        ...children,
        "</question>",
      ];
    }

    return [
      '<question state="open">',
      ...headLines(item),
      ...optionsLines(item.options),
      ...selectionContextLines(item.context),
      ...children,
      "</question>",
    ];
  }

  function status(items: StatusItem[]): string {
    if (items.length === 0) return "<status></status>";

    return ["<status>", ...items.flatMap(statusLines).map((line) => `  ${line}`), "</status>"].join("\n");
  }

  function itemContextElements(context: ItemContext | undefined): string[] {
    if (context === undefined) return [];

    return [
      ...(context.createdBy === undefined ? [] : contextElement(context.createdBy, context.creation)),
      ...contextElement("exclude", context.exclusion),
    ];
  }

  function selectionContextLines(context: QuestionContext | undefined): string[] {
    if (context === undefined) return [];

    return [
      ...contextElement("select-option", context.selection),
      ...contextElement("clear-selection", context.clearing),
    ].map((element) => `  ${element}`);
  }

  function treeOptionLines(entry: TreeEntryOption): string[] {
    const { id, text, state, context } = entry;
    const marker = state !== undefined ? ` state="${state}"` : selectedMarker(entry.selected === true);
    const children = entry.children.flatMap(treeLines);

    return renderOption({ id, text, marker, context, links: linkElements(entry), children });
  }

  function treeLines(entry: TreeEntry): string[] {
    if (entry.kind !== "question") {
      return [
        `<${entry.kind} state="${entry.state}">`,
        ...headLines(entry),
        ...linkElements(entry).map((line) => `  ${line}`),
        ...entry.children.flatMap(treeLines).map((line) => `  ${line}`),
        `</${entry.kind}>`,
      ];
    }

    return [
      `<question state="${entry.state}">`,
      ...headLines(entry),
      ...linkElements(entry).map((line) => `  ${line}`),
      ...optionsBlock(entry.options.flatMap(treeOptionLines)),
      ...selectionContextLines(entry.context),
      ...entry.children.flatMap(treeLines).map((line) => `  ${line}`),
      "</question>",
    ];
  }

  function tree(entries: TreeEntry[]): string {
    if (entries.length === 0) return "<tree></tree>";

    return ["<tree>", ...entries.flatMap(treeLines).map((line) => `  ${line}`), "</tree>"].join("\n");
  }

  function listedLines(data: ListedItem): string[] {
    const state = ` state="${data.state}"`;
    const hidden = data.hiddenBy === undefined ? [] : [`  ${hiddenByElement(data.hiddenBy)}`];
    const links = data.kind === "follow-up" ? [] : linkElements(data).map((line) => `  ${line}`);

    if (data.kind === "question") {
      const selected = data.selected ?? [];
      const options = [
        ...data.options.map((each) => renderOption({ ...each, marker: selectedMarker(selected.includes(each.id)) })[0]),
        ...(data.hiddenOptions ?? []).map(hiddenOption),
      ];

      return [
        `<question${state}>`,
        ...headLines(data),
        ...optionsBlock(options),
        ...selectionContextLines(data.context),
        ...hidden,
        ...links,
        ...trailLines(data.trail),
        "</question>",
      ];
    }

    return [
      `<${data.kind}${state}>`,
      ...headLines(data),
      ...hidden,
      ...links,
      ...trailLines(data.trail),
      `</${data.kind}>`,
    ];
  }

  function items(list: ListedItem[]): string {
    if (list.length === 0) return "<items></items>";

    return ["<items>", ...list.flatMap(listedLines).map((line) => `  ${line}`), "</items>"].join("\n");
  }

  function selectedMarker(selected: boolean): string {
    return selected ? ' selected="true"' : "";
  }

  function trailLines(steps: TrailStep[] | undefined): string[] {
    if (steps === undefined) return [];

    return [
      "  <trail>",
      ...steps.map((step) => `    <${step.kind}>${headElements(step).join("")}</${step.kind}>`),
      "  </trail>",
    ];
  }

  function hiddenByElement(hiding: Hiding): string {
    return `<hidden-by state="${hiding.state}"><id>${hiding.by}</id></hidden-by>`;
  }

  function ids(tag: string, list: string[]): string {
    return `<${tag}>${list.map((id) => `<id>${id}</id>`).join("")}</${tag}>`;
  }

  function selectionLines(selection: SelectionChange): string[] {
    return [
      `  <selection question="${selection.question}">`,
      `    ${ids("before", selection.before)}`,
      `    ${ids("after", selection.after)}`,
      "  </selection>",
    ];
  }

  function itemLine(item: { id: string } & Placement): string {
    const hidden = item.hiddenBy === undefined ? "" : hiddenByElement(item.hiddenBy);

    return `    <item state="${item.state}"><id>${item.id}</id>${hidden}</item>`;
  }

  function batch(result: WriteResult): string {
    const created = result.created.map((each) => {
      const name = each.as === undefined ? "" : ` as="${each.as}"`;
      const state = each.state === undefined ? "" : ` state="${each.state}"`;
      const hidden = each.hiddenBy === undefined ? "" : hiddenByElement(each.hiddenBy);

      return `  <created${name}${state}><id>${each.id}</id>${hidden}</created>`;
    });
    const selections = result.selections.flatMap((selection) => selectionLines(selection));
    const displaced =
      result.displaced.length === 0 ? [] : ["  <displaced>", ...result.displaced.map(itemLine), "  </displaced>"];
    const placed = result.placed.length === 0 ? [] : ["  <placed>", ...result.placed.map(itemLine), "  </placed>"];
    const lines = [...created, ...selections, ...displaced, ...placed];

    return lines.length === 0 ? "<batch></batch>" : ["<batch>", ...lines, "</batch>"].join("\n");
  }

  function contextElement(by: string, text: string | undefined): string[] {
    return text === undefined ? [] : [`<context by="${by}">${escapeXml(text)}</context>`];
  }

  function tagsElement(tags: string[] | undefined): string[] {
    if (tags === undefined || tags.length === 0) return [];

    return [`<tags>${tags.map((tag) => `<tag>${escapeXml(tag)}</tag>`).join("")}</tags>`];
  }

  function headElements(item: { id: string; text: string; tags?: string[]; context?: ItemContext }): string[] {
    return [
      `<id>${item.id}</id>`,
      `<text>${escapeXml(item.text)}</text>`,
      ...tagsElement(item.tags),
      ...itemContextElements(item.context),
    ];
  }

  function headLines(item: { id: string; text: string; tags?: string[]; context?: ItemContext }): string[] {
    return headElements(item).map((element) => `  ${element}`);
  }

  function linkElements(links: SupersedeLinks): string[] {
    return [
      ...(links.supersedes === undefined ? [] : [ids("supersedes", [links.supersedes])]),
      ...(links.supersededBy === undefined ? [] : [ids("superseded-by", [links.supersededBy])]),
    ];
  }

  function tests() {
    test("items renders a trail last, escaped and in order", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q2", text: "q2", options: [],
          tags: [],
          state: "off-path",
          trail: [
            { kind: "question", id: "Q1", text: "a < b" },
            { kind: "option", id: "Q1a", text: "a" },
          ],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.equal(
        xml,
        [
          "<items>",
          '  <question state="off-path">',
          "    <id>Q2</id>",
          "    <text>q2</text>",
          "    <options></options>",
          "    <trail>",
          "      <question><id>Q1</id><text>a &lt; b</text></question>",
          "      <option><id>Q1a</id><text>a</text></option>",
          "    </trail>",
          "  </question>",
          "</items>",
        ].join("\n"),
      );
    });

    test("items renders a follow-up's trail last", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "follow-up", id: "F1", text: "f",
          tags: [],
          state: "open",
          trail: [{ kind: "question", id: "Q1", text: "q" }],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.equal(
        xml,
        [
          "<items>",
          '  <follow-up state="open">',
          "    <id>F1</id>",
          "    <text>f</text>",
          "    <trail>",
          "      <question><id>Q1</id><text>q</text></question>",
          "    </trail>",
          "  </follow-up>",
          "</items>",
        ].join("\n"),
      );
    });

    test("items renders excluded options after the live ones, with state and escaped exclusion's context", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q1", text: "q", options: [{ id: "Q1a", text: "a" }],
          tags: [],
          state: "open",
          hiddenOptions: [{ id: "Q1b", text: "b", state: "deferred", context: { exclusion: "a < b" } }],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1a</id><text>a</text></option>",
        '      <option state="deferred"><id>Q1b</id><text>b</text><context by="exclude">a &lt; b</context></option>',
        "    </options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("items renders a superseded option after the live ones, linked to its replacement", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1b", text: "b" },
            { id: "Q1c", text: "c" },
          ],
          tags: [],
          state: "open",
          hiddenOptions: [{ id: "Q1a", text: "a", state: "frozen", supersededBy: "Q1c" }],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1b</id><text>b</text></option>",
        "      <option><id>Q1c</id><text>c</text></option>",
        '      <option state="frozen"><id>Q1a</id><text>a</text><superseded-by><id>Q1c</id></superseded-by></option>',
        "    </options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("items renders the links between a superseded question and its replacement", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q2", text: "new", options: [],
          tags: [],
          state: "open",
          supersedes: "Q1",
        },
        {
          kind: "question", id: "Q1", text: "old", options: [],
          tags: [],
          state: "frozen",
          supersededBy: "Q2",
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="open">',
        "    <id>Q2</id>",
        "    <text>new</text>",
        "    <options></options>",
        "    <supersedes><id>Q1</id></supersedes>",
        "  </question>",
        '  <question state="frozen">',
        "    <id>Q1</id>",
        "    <text>old</text>",
        "    <options></options>",
        "    <superseded-by><id>Q2</id></superseded-by>",
        "  </question>",
        "</items>",
      ]);
    });

    test("the built tree renders no entries as an empty element", () => {
      // given
      const entries: TreeEntry[] = [];

      // when
      const xml = tree(entries);

      // then
      assert.equal(xml, "<tree></tree>");
    });

    test("the built tree renders an open question with its state and options", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1a", text: "a", children: [] },
            { id: "Q1b", text: "b", selected: true, children: [] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1a</id><text>a</text></option>",
        '      <option selected="true"><id>Q1b</id><text>b</text></option>',
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree nests an option's child inside it and the question's own after the options", () => {
      // given
      const child = (id: string): TreeEntry => ({
        kind: "question",
        state: "open",
        id,
        text: id,
        options: [],
        children: [],
      });
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          options: [{ id: "Q1a", text: "a", selected: true, children: [child("Q2")] }],
          children: [child("Q3")],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        '      <option selected="true">',
        "        <id>Q1a</id>",
        "        <text>a</text>",
        '        <question state="open">',
        "          <id>Q2</id>",
        "          <text>Q2</text>",
        "          <options></options>",
        "        </question>",
        "      </option>",
        "    </options>",
        '    <question state="open">',
        "      <id>Q3</id>",
        "      <text>Q3</text>",
        "      <options></options>",
        "    </question>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree marks excluded options with their state and exclusion's context", () => {
      // given
      const child: TreeEntry = { kind: "question", state: "deferred", id: "Q2", text: "q2", options: [], children: [] };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1a", text: "a", state: "deferred", context: { exclusion: "why" }, children: [child] },
            { id: "Q1b", text: "b", state: "not-applicable", children: [] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        '      <option state="deferred">',
        "        <id>Q1a</id>",
        "        <text>a</text>",
        '        <context by="exclude">why</context>',
        '        <question state="deferred">',
        "          <id>Q2</id>",
        "          <text>q2</text>",
        "          <options></options>",
        "        </question>",
        "      </option>",
        '      <option state="not-applicable"><id>Q1b</id><text>b</text></option>',
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders the links between a superseded option and its replacement", () => {
      // given
      const child: TreeEntry = { kind: "question", state: "frozen", id: "Q2", text: "q2", options: [], children: [] };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1c", text: "c", supersedes: "Q1a", children: [] },
            { id: "Q1a", text: "a", state: "frozen", supersededBy: "Q1c", children: [child] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1c</id><text>c</text><supersedes><id>Q1a</id></supersedes></option>",
        '      <option state="frozen">',
        "        <id>Q1a</id>",
        "        <text>a</text>",
        "        <superseded-by><id>Q1c</id></superseded-by>",
        '        <question state="frozen">',
        "          <id>Q2</id>",
        "          <text>q2</text>",
        "          <options></options>",
        "        </question>",
        "      </option>",
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders the link on a superseded option with nothing under it", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1b", text: "b", supersedes: "Q1a", children: [] },
            { id: "Q1a", text: "a", state: "frozen", supersededBy: "Q1b", children: [] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1b</id><text>b</text><supersedes><id>Q1a</id></supersedes></option>",
        '      <option state="frozen"><id>Q1a</id><text>a</text><superseded-by><id>Q1b</id></superseded-by></option>',
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders the links between a superseded question and its replacement", () => {
      // given
      const entries: TreeEntry[] = [
        { kind: "question", state: "open", id: "Q2", text: "new", supersedes: "Q1", options: [], children: [] },
        { kind: "question", state: "frozen", id: "Q1", text: "old", supersededBy: "Q2", options: [], children: [] },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q2</id>",
        "    <text>new</text>",
        "    <supersedes><id>Q1</id></supersedes>",
        "    <options></options>",
        "  </question>",
        '  <question state="frozen">',
        "    <id>Q1</id>",
        "    <text>old</text>",
        "    <superseded-by><id>Q2</id></superseded-by>",
        "    <options></options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders a question's tags right after the text, escaped", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "deferred",
          id: "Q2",
          text: "q",
          tags: ["a<b", "c"],
          context: { exclusion: "why" },
          supersedes: "Q1",
          options: [{ id: "Q2a", text: "a", children: [] }],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="deferred">',
        "    <id>Q2</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        '    <context by="exclude">why</context>',
        "    <supersedes><id>Q1</id></supersedes>",
        "    <options>",
        "      <option><id>Q2a</id><text>a</text></option>",
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders a follow-up's tags right after the text, escaped", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "follow-up",
          state: "deferred",
          id: "F1",
          text: "f",
          tags: ["a<b", "c"],
          context: { exclusion: "later" },
          children: [{ kind: "question", state: "deferred", id: "Q1", text: "q", options: [], children: [] }],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <follow-up state="deferred">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        '    <context by="exclude">later</context>',
        '    <question state="deferred">',
        "      <id>Q1</id>",
        "      <text>q</text>",
        "      <options></options>",
        "    </question>",
        "  </follow-up>",
        "</tree>",
      ]);
    });

    test("the built tree renders follow-ups with their state and what they hold", () => {
      // given
      const entries: TreeEntry[] = [
        { kind: "follow-up", state: "open", id: "F1", text: "open", children: [] },
        {
          kind: "follow-up",
          state: "settled",
          id: "F2",
          text: "promoted",
          children: [{ kind: "question", state: "open", id: "Q1", text: "q", options: [], children: [] }],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <follow-up state="open">',
        "    <id>F1</id>",
        "    <text>open</text>",
        "  </follow-up>",
        '  <follow-up state="settled">',
        "    <id>F2</id>",
        "    <text>promoted</text>",
        '    <question state="open">',
        "      <id>Q1</id>",
        "      <text>q</text>",
        "      <options></options>",
        "    </question>",
        "  </follow-up>",
        "</tree>",
      ]);
    });

    test("the built tree renders an exclusion's context right after the text, only when there is one", () => {
      // given
      const entries: TreeEntry[] = [
        { kind: "question", state: "deferred", id: "Q1", text: "q", context: { exclusion: "why" }, options: [], children: [] },
        { kind: "follow-up", state: "deferred", id: "F1", text: "f", context: { exclusion: "later" }, children: [] },
        { kind: "follow-up", state: "deferred", id: "F2", text: "g", children: [] },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="deferred">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        '    <context by="exclude">why</context>',
        "    <options></options>",
        "  </question>",
        '  <follow-up state="deferred">',
        "    <id>F1</id>",
        "    <text>f</text>",
        '    <context by="exclude">later</context>',
        "  </follow-up>",
        '  <follow-up state="deferred">',
        "    <id>F2</id>",
        "    <text>g</text>",
        "  </follow-up>",
        "</tree>",
      ]);
    });

    test("the built tree renders the context a question was added with right after its tags, escaped", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          tags: ["t"],
          context: { creation: "a < b", createdBy: "add-question" },
          options: [],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>t</tag></tags>",
        '    <context by="add-question">a &lt; b</context>',
        "    <options></options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders the context an option was added with right after its text, escaped", () => {
      // given
      const child: TreeEntry = { kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1a", text: "a", context: { creation: "a < b", createdBy: "add-option" }, children: [] },
            { id: "Q1b", text: "b", context: { creation: "c", createdBy: "add-option" }, selected: true, children: [child] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        '      <option><id>Q1a</id><text>a</text><context by="add-option">a &lt; b</context></option>',
        '      <option selected="true">',
        "        <id>Q1b</id>",
        "        <text>b</text>",
        '        <context by="add-option">c</context>',
        '        <question state="open">',
        "          <id>Q2</id>",
        "          <text>q2</text>",
        "          <options></options>",
        "        </question>",
        "      </option>",
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders the context a follow-up was added with right after its tags, escaped", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "follow-up",
          state: "open",
          id: "F1",
          text: "f",
          tags: ["t"],
          context: { creation: "a < b", createdBy: "add-follow-up" },
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <follow-up state="open">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>t</tag></tags>",
        '    <context by="add-follow-up">a &lt; b</context>',
        "  </follow-up>",
        "</tree>",
      ]);
    });

    test("the built tree renders the context a selection was cleared with right after the options, escaped", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [{ id: "Q1a", text: "a", children: [] }],
          context: { clearing: "a < b" },
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        "      <option><id>Q1a</id><text>a</text></option>",
        "    </options>",
        '    <context by="clear-selection">a &lt; b</context>',
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders an option's context as written when it holds dollar sequences", () => {
      // given
      const text = "costs $$5, $& and $' here";
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1a", text: "a", context: { creation: text, createdBy: "add-option" }, children: [] },
            { id: "Q1b", text: "b", state: "deferred", context: { exclusion: text }, supersededBy: "Q1c", children: [] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        `      <option><id>Q1a</id><text>a</text><context by="add-option">costs $$5, $&amp; and $' here</context></option>`,
        `      <option state="deferred"><id>Q1b</id><text>b</text><context by="exclude">costs $$5, $&amp; and $' here</context><superseded-by><id>Q1c</id></superseded-by></option>`,
        "    </options>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders a statement with its state, id and text", () => {
      // given
      const entries: TreeEntry[] = [{ kind: "statement", state: "settled", id: "S1", text: "a < b", children: [] }];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <statement state="settled">',
        "    <id>S1</id>",
        "    <text>a &lt; b</text>",
        "  </statement>",
        "</tree>",
      ]);
    });

    test("the built tree renders the context a statement was added with", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "statement",
          state: "settled",
          id: "S1",
          text: "s",
          context: { creation: "a < b", createdBy: "add-statement" },
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <statement state="settled">',
        "    <id>S1</id>",
        "    <text>s</text>",
        '    <context by="add-statement">a &lt; b</context>',
        "  </statement>",
        "</tree>",
      ]);
    });

    test("the built tree renders a statement's supersede links after its context", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "statement",
          state: "settled",
          id: "S2",
          text: "new",
          context: { creation: "why", createdBy: "supersede-statement" },
          supersedes: "S1",
          children: [],
        },
        { kind: "statement", state: "frozen", id: "S1", text: "old", supersededBy: "S2", children: [] },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <statement state="settled">',
        "    <id>S2</id>",
        "    <text>new</text>",
        '    <context by="supersede-statement">why</context>',
        "    <supersedes><id>S1</id></supersedes>",
        "  </statement>",
        '  <statement state="frozen">',
        "    <id>S1</id>",
        "    <text>old</text>",
        "    <superseded-by><id>S2</id></superseded-by>",
        "  </statement>",
        "</tree>",
      ]);
    });

    test("the built tree renders a selection's context right after the options, before the question's children", () => {
      // given
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          options: [{ id: "Q1a", text: "a", selected: true, children: [] }],
          context: { selection: "a < b" },
          children: [{ kind: "question", state: "open", id: "Q2", text: "q2", options: [], children: [] }],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<tree>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        '      <option selected="true"><id>Q1a</id><text>a</text></option>',
        "    </options>",
        '    <context by="select-option">a &lt; b</context>',
        '    <question state="open">',
        "      <id>Q2</id>",
        "      <text>q2</text>",
        "      <options></options>",
        "    </question>",
        "  </question>",
        "</tree>",
      ]);
    });

    test("the built tree renders a carriage return as a character reference", () => {
      // given
      const text = "a\r\nb";
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text,
          tags: [text],
          context: { creation: text, createdBy: "add-question" },
          options: [],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.equal(
        xml,
        [
          "<tree>",
          '  <question state="open">',
          "    <id>Q1</id>",
          "    <text>a&#13;\nb</text>",
          "    <tags><tag>a&#13;\nb</tag></tags>",
          '    <context by="add-question">a&#13;\nb</context>',
          "    <options></options>",
          "  </question>",
          "</tree>",
        ].join("\n"),
      );
    });

    test("the built tree escapes every text it renders", () => {
      // given
      const text = "<&>";
      const followUp: TreeEntry = { kind: "follow-up", state: "deferred", id: "F1", text, context: { exclusion: text }, children: [] };
      const entries: TreeEntry[] = [
        {
          kind: "question",
          state: "deferred",
          id: "Q1",
          text,
          context: { exclusion: text },
          options: [
            { id: "Q1a", text, state: "deferred", context: { exclusion: text }, children: [followUp] },
            { id: "Q1b", text, children: [] },
            { id: "Q1c", text, state: "deferred", context: { exclusion: text }, children: [] },
          ],
          children: [],
        },
      ];

      // when
      const xml = tree(entries);

      // then
      assert.equal(xml.includes(text), false);
      assert.equal(xml.split("&lt;&amp;&gt;").length - 1, 9);
    });

    test("status renders no items as an empty element", () => {
      // given
      const items: StatusItem[] = [];

      // when
      const xml = status(items);

      // then
      assert.equal(xml, "<status></status>");
    });

    test("status renders a decided option with no children on one line", () => {
      // given
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.equal(
        xml,
        [
          "<status>",
          '  <question state="settled">',
          "    <id>Q1</id>",
          "    <text>q</text>",
          "    <decided>",
          "      <option><id>Q1a</id><text>a</text></option>",
          "    </decided>",
          "  </question>",
          "</status>",
        ].join("\n"),
      );
    });

    test("status renders the context each item was added with right after its text and tags, escaped", () => {
      // given
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q1",
          tags: ["t"],
          context: { creation: "a < b", createdBy: "add-question" },
          decided: [
            {
              id: "Q1a",
              text: "a",
              context: { creation: "ca", createdBy: "add-option" },
              children: [
                {
                  kind: "question",
                  state: "open",
                  id: "Q2",
                  text: "q2",
                  context: { creation: "c2", createdBy: "promote-follow-up" },
                  options: [{ id: "Q2a", text: "x", context: { creation: "cx", createdBy: "add-option" } }],
                  children: [],
                },
              ],
            },
            { id: "Q1c", text: "c", context: { creation: "cc", createdBy: "supersede-option" }, children: [] },
          ],
          children: [
            { kind: "option", state: "deferred", id: "Q1b", text: "b", context: { creation: "cb", createdBy: "add-option" } },
          ],
        },
        { kind: "follow-up", state: "open", id: "F1", text: "f1", context: { creation: "cf", createdBy: "add-follow-up" } },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q1</text>",
        "    <tags><tag>t</tag></tags>",
        '    <context by="add-question">a &lt; b</context>',
        "    <decided>",
        "      <option>",
        "        <id>Q1a</id>",
        "        <text>a</text>",
        '        <context by="add-option">ca</context>',
        '        <question state="open">',
        "          <id>Q2</id>",
        "          <text>q2</text>",
        '          <context by="promote-follow-up">c2</context>',
        "          <options>",
        '            <option><id>Q2a</id><text>x</text><context by="add-option">cx</context></option>',
        "          </options>",
        "        </question>",
        "      </option>",
        '      <option><id>Q1c</id><text>c</text><context by="supersede-option">cc</context></option>',
        "    </decided>",
        '    <option state="deferred">',
        "      <id>Q1b</id>",
        "      <text>b</text>",
        '      <context by="add-option">cb</context>',
        "    </option>",
        "  </question>",
        '  <follow-up state="open">',
        "    <id>F1</id>",
        "    <text>f1</text>",
        '    <context by="add-follow-up">cf</context>',
        "  </follow-up>",
        "</status>",
      ]);
    });

    test("status renders an option's context as written when it holds dollar sequences", () => {
      // given
      const text = "costs $$5, $& and $' here";
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          options: [{ id: "Q1a", text: "a", context: { creation: text, createdBy: "add-option" } }],
          children: [],
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        `      <option><id>Q1a</id><text>a</text><context by="add-option">costs $$5, $&amp; and $' here</context></option>`,
        "    </options>",
        "  </question>",
        "</status>",
      ]);
    });

    test("a write that created items renders each id, and what hides it after the id", () => {
      // given
      const result: WriteResult = {
        created: [
          { id: "Q2", state: "open" },
          { id: "S1", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
        ],
        selections: [],
        displaced: [],
        placed: [],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        '  <created state="open"><id>Q2</id></created>',
        '  <created state="off-path"><id>S1</id><hidden-by state="off-path"><id>Q1b</id></hidden-by></created>',
        "</batch>",
      ]);
    });

    test("a write that changed selections renders each one's options before and after", () => {
      // given
      const result: WriteResult = {
        created: [],
        selections: [
          { question: "Q1", before: [], after: ["Q1a", "Q1b"] },
          { question: "Q2", before: ["Q2a"], after: [] },
        ],
        displaced: [],
        placed: [],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        '  <selection question="Q1">',
        "    <before></before>",
        "    <after><id>Q1a</id><id>Q1b</id></after>",
        "  </selection>",
        '  <selection question="Q2">',
        "    <before><id>Q2a</id></before>",
        "    <after></after>",
        "  </selection>",
        "</batch>",
      ]);
    });

    test("a write that displaced items renders each with its state and what hides it", () => {
      // given
      const result: WriteResult = {
        created: [],
        selections: [],
        displaced: [
          { id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } },
          { id: "S1", state: "deferred", hiddenBy: { state: "deferred", by: "Q3" } },
        ],
        placed: [],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        "  <displaced>",
        '    <item state="off-path"><id>Q2</id><hidden-by state="off-path"><id>Q1a</id></hidden-by></item>',
        '    <item state="deferred"><id>S1</id><hidden-by state="deferred"><id>Q3</id></hidden-by></item>',
        "  </displaced>",
        "</batch>",
      ]);
    });

    test("a write renders what it created first, then the selections, then what it displaced", () => {
      // given
      const result: WriteResult = {
        created: [{ id: "Q1c" }],
        selections: [{ question: "Q1", before: ["Q1a"], after: [] }],
        displaced: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }],
        placed: [],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        "  <created><id>Q1c</id></created>",
        '  <selection question="Q1">',
        "    <before><id>Q1a</id></before>",
        "    <after></after>",
        "  </selection>",
        "  <displaced>",
        '    <item state="off-path"><id>Q2</id><hidden-by state="off-path"><id>Q1a</id></hidden-by></item>',
        "  </displaced>",
        "</batch>",
      ]);
    });

    test("a write that placed items renders each with its state, after what it displaced", () => {
      // given
      const result: WriteResult = {
        created: [],
        selections: [],
        displaced: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }],
        placed: [
          { id: "Q3", state: "open" },
          { id: "S1", state: "settled" },
        ],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        "  <displaced>",
        '    <item state="off-path"><id>Q2</id><hidden-by state="off-path"><id>Q1a</id></hidden-by></item>',
        "  </displaced>",
        "  <placed>",
        '    <item state="open"><id>Q3</id></item>',
        '    <item state="settled"><id>S1</id></item>',
        "  </placed>",
        "</batch>",
      ]);
    });

    test("a created item that was given a name renders the name as an attribute", () => {
      // given
      const result: WriteResult = {
        created: [{ id: "Q3", as: "hour" }, { id: "Q3a" }],
        selections: [],
        displaced: [],
        placed: [],
      };

      // when
      const xml = batch(result);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<batch>",
        '  <created as="hour"><id>Q3</id></created>',
        "  <created><id>Q3a</id></created>",
        "</batch>",
      ]);
    });

    test("a write with nothing to report renders an empty batch on one line", () => {
      // given
      const result: WriteResult = { created: [], selections: [], displaced: [], placed: [] };

      // when
      const xml = batch(result);

      // then
      assert.equal(xml, "<batch></batch>");
    });

    test("status renders a selection's context inside decided, after its options", () => {
      // given
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
          context: { selection: "a < b" },
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <decided>",
        "      <option><id>Q1a</id><text>a</text></option>",
        '      <context by="select-option">a &lt; b</context>',
        "    </decided>",
        "  </question>",
        "</status>",
      ]);
    });

    test("status renders a settled question's tags right after the text, escaped", () => {
      // given
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          tags: ["a<b", "c"],
          decided: [{ id: "Q1a", text: "a", children: [] }],
          children: [],
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        "    <decided>",
        "      <option><id>Q1a</id><text>a</text></option>",
        "    </decided>",
        "  </question>",
        "</status>",
      ]);
    });

    test("status renders an open follow-up with its state", () => {
      // given
      const items: StatusItem[] = [{ kind: "follow-up", state: "open", id: "F1", text: "f" }];

      // when
      const xml = status(items);

      // then
      assert.equal(
        xml,
        ["<status>", '  <follow-up state="open">', "    <id>F1</id>", "    <text>f</text>", "  </follow-up>", "</status>"].join(
          "\n",
        ),
      );
    });

    test("status renders an open follow-up's tags right after the text, escaped", () => {
      // given
      const items: StatusItem[] = [{ kind: "follow-up", state: "open", id: "F1", text: "f", tags: ["a<b", "c"] }];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <follow-up state="open">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        "  </follow-up>",
        "</status>",
      ]);
    });

    test("status renders a deferred statement with its state, tags and exclusion's context", () => {
      // given
      const items: StatusItem[] = [
        { kind: "statement", state: "deferred", id: "S1", text: "a < b", tags: ["t"], context: { exclusion: "later" } },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <statement state="deferred">',
        "    <id>S1</id>",
        "    <text>a &lt; b</text>",
        "    <tags><tag>t</tag></tags>",
        '    <context by="exclude">later</context>',
        "  </statement>",
        "</status>",
      ]);
    });

    test("status renders deferred items with their state, and an exclusion's context only when there is one", () => {
      // given
      const items: StatusItem[] = [
        { kind: "question", state: "deferred", id: "Q1", text: "q", context: { exclusion: "why" } },
        { kind: "follow-up", state: "deferred", id: "F1", text: "f" },
        { kind: "option", state: "deferred", id: "Q2a", text: "a" },
      ];

      // when
      const xml = status(items);

      // then
      assert.equal(
        xml,
        [
          "<status>",
          '  <question state="deferred">',
          "    <id>Q1</id>",
          "    <text>q</text>",
          '    <context by="exclude">why</context>',
          "  </question>",
          '  <follow-up state="deferred">',
          "    <id>F1</id>",
          "    <text>f</text>",
          "  </follow-up>",
          '  <option state="deferred">',
          "    <id>Q2a</id>",
          "    <text>a</text>",
          "  </option>",
          "</status>",
        ].join("\n"),
      );
    });

    test("status renders a deferred question's tags right after the text, escaped", () => {
      // given
      const items: StatusItem[] = [
        { kind: "question", state: "deferred", id: "Q1", text: "q", tags: ["a<b", "c"], context: { exclusion: "why" } },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="deferred">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        '    <context by="exclude">why</context>',
        "  </question>",
        "</status>",
      ]);
    });

    test("status renders a deferred follow-up's tags right after the text, escaped", () => {
      // given
      const items: StatusItem[] = [
        { kind: "follow-up", state: "deferred", id: "F1", text: "f", tags: ["a<b", "c"], context: { exclusion: "later" } },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <follow-up state="deferred">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        '    <context by="exclude">later</context>',
        "  </follow-up>",
        "</status>",
      ]);
    });

    test("status escapes every text it renders", () => {
      // given
      const text = "<&>";
      const open: StatusItem = {
        kind: "question",
        state: "open",
        id: "Q2",
        text,
        options: [{ id: "Q2a", text }],
        children: [],
      };
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text,
          decided: [{ id: "Q1a", text, children: [open] }],
          children: [],
        },
        { kind: "follow-up", state: "open", id: "F1", text },
        { kind: "question", state: "deferred", id: "Q3", text, context: { exclusion: text } },
      ];

      // when
      const xml = status(items);

      // then
      assert.equal(xml.includes(text), false);
      assert.equal(xml.split("&lt;&amp;&gt;").length - 1, 7);
    });

    test("status renders an open question with its state and options", () => {
      // given
      const items: StatusItem[] = [
        { kind: "question", state: "open", id: "Q1", text: "q", options: [{ id: "Q1a", text: "a" }], children: [] },
      ];

      // when
      const xml = status(items);

      // then
      assert.equal(
        xml,
        [
          "<status>",
          '  <question state="open">',
          "    <id>Q1</id>",
          "    <text>q</text>",
          "    <options>",
          "      <option><id>Q1a</id><text>a</text></option>",
          "    </options>",
          "  </question>",
          "</status>",
        ].join("\n"),
      );
    });

    test("status renders an open question's tags right after the text, escaped", () => {
      // given
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "open",
          id: "Q1",
          text: "q",
          tags: ["a<b", "c"],
          options: [{ id: "Q1a", text: "a" }],
          children: [],
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<status>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        "    <options>",
        "      <option><id>Q1a</id><text>a</text></option>",
        "    </options>",
        "  </question>",
        "</status>",
      ]);
    });

    test("status renders an answer's child inside the decided option and the question's own after it", () => {
      // given
      const child = (id: string): StatusItem => ({
        kind: "question",
        state: "open",
        id,
        text: id,
        options: [],
        children: [],
      });
      const items: StatusItem[] = [
        {
          kind: "question",
          state: "settled",
          id: "Q1",
          text: "q",
          decided: [{ id: "Q1a", text: "a", children: [child("Q2")] }],
          children: [child("Q3")],
        },
      ];

      // when
      const xml = status(items);

      // then
      assert.equal(
        xml,
        [
          "<status>",
          '  <question state="settled">',
          "    <id>Q1</id>",
          "    <text>q</text>",
          "    <decided>",
          "      <option>",
          "        <id>Q1a</id>",
          "        <text>a</text>",
          '        <question state="open">',
          "          <id>Q2</id>",
          "          <text>Q2</text>",
          "          <options></options>",
          "        </question>",
          "      </option>",
          "    </decided>",
          '    <question state="open">',
          "      <id>Q3</id>",
          "      <text>Q3</text>",
          "      <options></options>",
          "    </question>",
          "  </question>",
          "</status>",
        ].join("\n"),
      );
    });

    test("next without a question renders an empty next", () => {
      // given
      const data = undefined;

      // when
      const xml = next(data);

      // then
      assert.equal(xml, "<next></next>");
    });

    test("next with a question renders the question with its options nested in order", () => {
      // given
      const data: NextData = {
        kind: "question",
        id: "Q1",
        text: "a < b",
        options: [
          { id: "Q1a", text: "x" },
          { id: "Q1b", text: "y < z" },
        ],
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <question>",
        "    <id>Q1</id>",
        "    <text>a &lt; b</text>",
        "    <options>",
        "      <option><id>Q1a</id><text>x</text></option>",
        "      <option><id>Q1b</id><text>y &lt; z</text></option>",
        "    </options>",
        "  </question>",
        "</next>",
      ]);
    });

    test("next with a question that has no options renders empty options", () => {
      // given
      const data: NextData = { kind: "question", id: "Q1", text: "q", options: [] };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <question>",
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options></options>",
        "  </question>",
        "</next>",
      ]);
    });

    test("next renders a question's contexts and its options' contexts", () => {
      // given
      const data: NextData = {
        kind: "question",
        id: "Q1",
        text: "q",
        options: [{ id: "Q1a", text: "a", context: { creation: "a < b", createdBy: "add-option" } }],
        context: { creation: "c", createdBy: "add-question", clearing: "in doubt" },
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <question>",
        "    <id>Q1</id>",
        "    <text>q</text>",
        '    <context by="add-question">c</context>',
        "    <options>",
        '      <option><id>Q1a</id><text>a</text><context by="add-option">a &lt; b</context></option>',
        "    </options>",
        '    <context by="clear-selection">in doubt</context>',
        "  </question>",
        "</next>",
      ]);
    });

    test("next renders a follow-up's context inside its line, after its tags", () => {
      // given
      const data: NextData = {
        kind: "follow-up",
        id: "F1",
        text: "f",
        tags: ["t"],
        context: { creation: "a < b", createdBy: "add-follow-up" },
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        '  <follow-up><id>F1</id><text>f</text><tags><tag>t</tag></tags><context by="add-follow-up">a &lt; b</context></follow-up>',
        "</next>",
      ]);
    });

    test("next renders a question's tags right after the text, escaped", () => {
      // given
      const data: NextData = {
        kind: "question",
        id: "Q1",
        text: "q",
        options: [{ id: "Q1a", text: "a" }],
        tags: ["a<b", "c"],
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <question>",
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        "    <options>",
        "      <option><id>Q1a</id><text>a</text></option>",
        "    </options>",
        "  </question>",
        "</next>",
      ]);
    });

    test("next renders the active focus on its root element", () => {
      // given
      const data: NextData = { kind: "follow-up", id: "F1", text: "f", focus: "Q2" };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        '<next focus="Q2">',
        "  <follow-up><id>F1</id><text>f</text></follow-up>",
        "</next>",
      ]);
    });

    test("next with a follow-up renders the follow-up on one line, escaped", () => {
      // given
      const data: NextData = { kind: "follow-up", id: "F1", text: "a < b" };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), ["<next>", "  <follow-up><id>F1</id><text>a &lt; b</text></follow-up>", "</next>"]);
    });

    test("next renders a follow-up's tags inside its line, right after the text, escaped", () => {
      // given
      const data: NextData = { kind: "follow-up", id: "F1", text: "f", tags: ["a<b", "c"] };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <follow-up><id>F1</id><text>f</text><tags><tag>a&lt;b</tag><tag>c</tag></tags></follow-up>",
        "</next>",
      ]);
    });

    test("listed items render multi-line, with their tags right after the text and escaped, and no tags when they have none", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q1", text: "q", options: [],
          tags: ["a<b", "c"],
          state: "open",
        },
        { kind: "follow-up", id: "F1", text: "f", tags: [], state: "open" },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>a&lt;b</tag><tag>c</tag></tags>",
        "    <options></options>",
        "  </question>",
        '  <follow-up state="open">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "  </follow-up>",
        "</items>",
      ]);
    });

    test("a settled tagged question renders its state, tags, options and selection", () => {
      // given
      const a = { id: "Q1a", text: "a" };
      const b = { id: "Q1b", text: "b" };
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q1", text: "q", options: [a, b],
          tags: ["t"],
          state: "settled",
          selected: [a.id],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <tags><tag>t</tag></tags>",
        "    <options>",
        '      <option selected="true"><id>Q1a</id><text>a</text></option>',
        "      <option><id>Q1b</id><text>b</text></option>",
        "    </options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("a listed question renders the context an option was added with right after the option's text, escaped", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "question",
          id: "Q1",
          text: "q",
          options: [
            { id: "Q1a", text: "a", context: { creation: "a < b", createdBy: "add-option" } },
            { id: "Q1b", text: "b" },
          ],
          tags: [],
          state: "settled",
          selected: ["Q1a"],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        '      <option selected="true"><id>Q1a</id><text>a</text><context by="add-option">a &lt; b</context></option>',
        "      <option><id>Q1b</id><text>b</text></option>",
        "    </options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("items renders an option's context as written when it holds dollar sequences", () => {
      // given
      const text = "costs $$5, $& and $' here";
      const a = { id: "Q1a", text: "a", context: { creation: text, createdBy: "add-option" as const } };
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q1", text: "q", options: [a],
          tags: [],
          state: "settled",
          selected: [a.id],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="settled">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options>",
        `      <option selected="true"><id>Q1a</id><text>a</text><context by="add-option">costs $$5, $&amp; and $' here</context></option>`,
        "    </options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("items renders a statement with its state, id and escaped text, and its trail last", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "statement", id: "S1", text: "a < b",
          tags: [],
          state: "settled",
          trail: [{ kind: "question", id: "Q1", text: "q" }],
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <statement state="settled">',
        "    <id>S1</id>",
        "    <text>a &lt; b</text>",
        "    <trail>",
        "      <question><id>Q1</id><text>q</text></question>",
        "    </trail>",
        "  </statement>",
        "</items>",
      ]);
    });

    test("a listed question renders its exclusion's context after its text and its selection's context after its options, escaped", () => {
      // given
      const a = { id: "Q1a", text: "a" };
      const list: ListedItem[] = [
        {
          kind: "question", id: "Q1", text: "q", options: [a],
          tags: [],
          state: "deferred",
          selected: [a.id],
          context: { selection: "a < b", exclusion: "later" },
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="deferred">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        '    <context by="exclude">later</context>',
        "    <options>",
        '      <option selected="true"><id>Q1a</id><text>a</text></option>',
        "    </options>",
        '    <context by="select-option">a &lt; b</context>',
        "  </question>",
        "</items>",
      ]);
    });

    test("a tagged item renders its exclusion's context, escaped, after its tags", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "follow-up", id: "F1", text: "f",
          tags: ["t"],
          state: "deferred",
          context: { exclusion: "a < b" },
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <follow-up state="deferred">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>t</tag></tags>",
        '    <context by="exclude">a &lt; b</context>',
        "  </follow-up>",
        "</items>",
      ]);
    });

    test("a tagged item renders what hides it after its tags", () => {
      // given
      const list: ListedItem[] = [
        {
          kind: "follow-up", id: "F1", text: "f",
          tags: ["t"],
          state: "frozen",
          hiddenBy: { state: "frozen", by: "Q1" },
        },
      ];

      // when
      const xml = items(list);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <follow-up state="frozen">',
        "    <id>F1</id>",
        "    <text>f</text>",
        "    <tags><tag>t</tag></tags>",
        '    <hidden-by state="frozen"><id>Q1</id></hidden-by>',
        "  </follow-up>",
        "</items>",
      ]);
    });

    test("next renders a statement in the trail on one line, escaped", () => {
      // given
      const data: NextData = {
        kind: "follow-up",
        id: "F1",
        text: "f",
        trail: [{ kind: "statement", id: "S1", text: "a < b" }],
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <trail>",
        "    <statement><id>S1</id><text>a &lt; b</text></statement>",
        "  </trail>",
        "  <follow-up><id>F1</id><text>f</text></follow-up>",
        "</next>",
      ]);
    });

    test("next renders the trail before the item, one line per step", () => {
      // given
      const data: NextData = {
        kind: "follow-up",
        id: "F1",
        text: "f",
        trail: [
          { kind: "question", id: "Q1", text: "a < b" },
          { kind: "option", id: "Q1a", text: "a" },
        ],
      };

      // when
      const xml = next(data);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<next>",
        "  <trail>",
        "    <question><id>Q1</id><text>a &lt; b</text></question>",
        "    <option><id>Q1a</id><text>a</text></option>",
        "  </trail>",
        "  <follow-up><id>F1</id><text>f</text></follow-up>",
        "</next>",
      ]);
    });
  }

  return {
    batch,
    next,
    tree,
    status,
    items,
    tests,
  };
})();

const Cli = (() => {
  const cliOptions = {
    op: { type: "string" },
    query: { type: "string" },
    test: { type: "boolean" },
    help: { type: "boolean" },
    log: { type: "string" },
  } as const;

  const notInXml = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/;

  const operationOptions = { as: { type: "string" }, context: { type: "string" } } as const;

  type Group = { op: string; args: string[] };

  type Names = ReadonlyMap<string, string>;

  type Config<T extends ParseArgsOptionsConfig> = ReturnType<typeof readModeConfig<T>>;

  type Module<T extends ParseArgsOptionsConfig, D> = { options: T; run: (log: Log, config: Config<T>) => D };

  type OperationConfig<T extends ParseArgsOptionsConfig> = Config<T> & {
    as?: string;
    context?: string;
    target?: string | string[];
    origin?: string;
  };

  type Operation = {
    op: Event["type"];
    as?: string;
    context?: string;
    run: (staged: Log, names: Names) => void;
  };

  type Parser = {
    options: ParseArgsOptionsConfig;
    required: readonly string[];
    summary: string;
    parse: (args: string[]) => Omit<Operation, "op"> };

  type Query = { options: ParseArgsOptionsConfig; summary: string; answer: (log: Log, args: string[]) => string };

  type Mode =
    | { kind: "test" }
    | { kind: "help" }
    | { kind: "write"; groups: Group[]; log: string }
    | { kind: "query"; query: string; log: string };

  function groups(args: string[]): Group[] {
    const { tokens } = parseArgs({ options: cliOptions, strict: false, tokens: true, args });
    const found: Group[] = [];

    for (const token of tokens) {
      if (token.kind === "option" && token.name === "log") continue;

      if (token.kind === "option" && token.name === "op") {
        if (token.value === undefined) throw new DecisionTreeError("--op requires a value");

        found.push({ op: token.value, args: [] });
        continue;
      }

      const current = found.at(-1);
      if (current === undefined) throw new DecisionTreeError(`${args[token.index]} must come after an --op`);

      current.args.push(args[token.index]);
    }

    return found;
  }

  function idNamed(reference: string, names: Names): string {
    if (!reference.startsWith("@")) return reference;

    const id = names.get(reference.slice(1));
    if (id === undefined) throw new DecisionTreeError(`${reference} is not named by an earlier operation`);

    return id;
  }

  function idsNamed(config: { target?: string | string[]; origin?: string }, names: Names) {
    const { target, origin } = config;

    return {
      target: typeof target === "string" ? idNamed(target, names) : target?.map((each) => idNamed(each, names)),
      origin: origin === undefined ? undefined : idNamed(origin, names),
    };
  }

  function withName(created: Created, nameOf: ReadonlyMap<string, string>): Created {
    const name = nameOf.get(created.id);

    return name === undefined ? created : { ...created, as: name };
  }

  function itemCreated(op: string, added: Event[]): string {
    const [created, ...others] = added.filter(Graph.creates);
    if (created === undefined) throw new DecisionTreeError(`${op} creates nothing for --as to name`);
    if (others.length > 0) throw new Error(`${op} created more than one item`);

    return created.id;
  }

  function rejectUnusable(name: string, given: string[]): void {
    if (given.some((each) => each.trim() === "")) throw new DecisionTreeError(`${name} must not be blank`);

    const unprintable = given.join("").match(notInXml)?.[0];
    if (unprintable !== undefined) {
      const code = unprintable.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0");

      throw new DecisionTreeError(`${name} must not contain the control character U+${code}`);
    }
  }

  function readMode(args: string[] = process.argv.slice(2), env: NodeJS.ProcessEnv = process.env): Mode {
    const { tokens, values } = parseArgs({ options: cliOptions, strict: false, tokens: true, args });
    const { op, query, test, help, log } = values;

    const given = [op, query, test, help].filter((value) => value !== undefined);
    if (given.length > 1) {
      throw new DecisionTreeError("--op, --query, --test and --help are mutually exclusive");
    }

    if (help !== undefined) return { kind: "help" };

    if (test !== undefined) {
      if (log !== undefined) throw new DecisionTreeError("--test does not take --log");

      return { kind: "test" };
    }

    if (op === undefined && query === undefined) {
      throw new DecisionTreeError("missing --op, --query, --test or --help");
    }
    if (query !== undefined && typeof query !== "string") {
      throw new DecisionTreeError("--query requires a value");
    }

    const logs = tokens.filter((token) => token.kind === "option" && token.name === "log");
    if (logs.length > 1) throw new DecisionTreeError("--log given more than once");

    const fromEnvironment = env.DECISION_TREE_LOG?.trim() === "" ? undefined : env.DECISION_TREE_LOG;
    const logPath = log ?? fromEnvironment;
    if (logPath === undefined) throw new DecisionTreeError("missing --log or DECISION_TREE_LOG");
    if (typeof logPath !== "string") throw new DecisionTreeError("--log requires a value");

    rejectUnusable(log === undefined ? "DECISION_TREE_LOG" : "--log", [logPath]);

    if (typeof query === "string") return { kind: "query", query, log: logPath };

    return { kind: "write", groups: groups(args), log: logPath };
  }

  function readModeConfig<T extends ParseArgsOptionsConfig>(modeOptions: T, args: string[]) {
    const options = { ...cliOptions, ...modeOptions };

    const unknown = args.find((arg) => arg.startsWith("--") && !Object.hasOwn(options, arg.slice(2).split("=")[0]));
    if (unknown !== undefined) throw new DecisionTreeError(`unknown flag: ${unknown.split("=")[0]}`);

    const { tokens, values } = (() => {
      try {
        return parseArgs({ options, tokens: true, args });
      } catch (error) {
        throw new DecisionTreeError((error as Error).message);
      }
    })();

    const seen = new Set<string>();
    for (const token of tokens) {
      if (token.kind !== "option" || options[token.name]?.multiple) continue;
      if (seen.has(token.name)) throw new DecisionTreeError(`--${token.name} given more than once`);

      seen.add(token.name);
    }

    for (const [name, value] of Object.entries(values)) {
      rejectUnusable(`--${name}`, [value].flat().filter((each) => typeof each === "string"));
    }

    return values;
  }

  function tests() {
    test("help names every operation and query with every flag it declares", () => {
      // given
      const declared = [...Object.entries(parsers), ...Object.entries(queries)];

      // when
      const text = helpText();

      // then
      for (const [name, { options }] of declared) {
        const line = text.split("\n").find((each) => each.startsWith(`  ${name} `));
        assert.ok(line !== undefined, name);
        for (const flag of Object.keys(options).filter((each) => !Object.hasOwn(operationOptions, each))) {
          assert.match(line, new RegExp(`--${flag}\\b`), `${name} --${flag}`);
        }
      }
    });

    test("help brackets an optional flag and marks a repeatable one with an ellipsis", () => {
      // given
      const options = {
        target: { type: "string", multiple: true },
        text: { type: "string" },
        state: { type: "string", multiple: true },
        trail: { type: "boolean" },
      } as const;

      // when
      const flags = flagsOf(options, ["target", "text"]);

      // then
      assert.deepEqual(flags, ["--target TARGET…", "--text TEXT", "[--state STATE]…", "[--trail]"]);
    });

    test("help shows --context as required, optional or absent, as each operation takes it", () => {
      // given
      const ops = ["select-option", "add-question", "restore"] as const;

      // when
      const signatures = ops.map(signatureOf);

      // then
      assert.deepEqual(signatures, [
        "--target TARGET… --context CONTEXT",
        "--text TEXT [--origin ORIGIN] [--context CONTEXT] [--as NAME]",
        "--target TARGET",
      ]);
    });

    test("help shows --as only on the operations that create an item", () => {
      // given
      const ops = Object.keys(parsers) as Event["type"][];

      // when
      const showing = ops.filter((op) => signatureOf(op).includes("[--as NAME]"));

      // then
      assert.deepEqual(showing, [
        "add-question",
        "add-option",
        "add-follow-up",
        "add-statement",
        "promote-follow-up",
        "supersede-question",
        "supersede-option",
        "supersede-statement",
      ]);
    });

    for (const [op, { options, required }] of Object.entries(parsers)) {
      const own = Object.keys(options).filter((each) => !Object.hasOwn(operationOptions, each));

      for (const flag of own) {
        const declared = required.includes(flag);

        test(`${op} ${declared ? "refuses" : "does not refuse"} a call without --${flag}, as its help says`, () => {
          // given
          const values: Record<string, string> = { target: "Q1", text: "t", origin: "Q1", reason: "deferred", tag: "x" };
          const args = own
            .filter((each) => each !== flag)
            .map((each) => `--${each}=${values[each]}`)
            .concat(Graph.requiresContext(op as Event["type"]) ? ["--context=why"] : []);

          // when
          const refusal = (() => {
            try {
              parsedOperation(op, args).run(Log.memoryLog([]), new Map());
            } catch (error) {
              if (!(error instanceof DecisionTreeError)) throw error;
              return error.message;
            }
          })();

          // then
          assert.equal(refusal === `${op} requires --${flag}`, declared, refusal ?? "no refusal");
        });
      }
    }

    test("help names the script it is run as in its usage lines", () => {
      // given
      const script = "decision-tree.js";

      // when
      const usage = helpText(script).split("\n").slice(1, 5);

      // then
      assert.deepEqual(usage, [
        "  node decision-tree.js --log PATH --op OP [flags] [--op OP [flags]]…",
        "  node decision-tree.js --log PATH --query QUERY [flags]",
        "  node decision-tree.js --test",
        "  node decision-tree.js --help",
      ]);
    });

    test("help lists every state --state accepts and says open is the default", () => {
      // given
      const text = helpText();

      // when
      const line = text.split("\n").find((each) => each.startsWith("STATE is "));

      // then
      assert.equal(line, "STATE is open, settled, off-path, deferred, not-applicable, frozen or all, and open when no --state is given.");
    });

    test("--help reads as the help mode", () => {
      // given
      const args = ["--help"];

      // when
      const mode = readMode(args, {});

      // then
      assert.deepEqual(mode, { kind: "help" });
    });

    test("--help ignores DECISION_TREE_LOG", () => {
      // given
      const args = ["--help"];

      // when
      const mode = readMode(args, { DECISION_TREE_LOG: "a.jsonl" });

      // then
      assert.deepEqual(mode, { kind: "help" });
    });

    for (const other of [["--op", "add-question"], ["--query", "next"], ["--test"]]) {
      test(`--help with ${other[0]} throws`, () => {
        // given
        const args = ["--help", ...other];

        // when
        const act = () => readMode(args, {});

        // then
        assert.throws(
          act,
          (error) =>
            error instanceof DecisionTreeError &&
            error.message === "--op, --query, --test and --help are mutually exclusive",
        );
      });
    }

    test("--help with --log reads as the help mode", () => {
      // given
      const args = ["--help", "--log", "a.jsonl"];

      // when
      const mode = readMode(args, {});

      // then
      assert.deepEqual(mode, { kind: "help" });
    });

    test("--help with --log prints the help and leaves the log untouched", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");

      // when
      const run = spawnSync(process.execPath, [process.argv[1], "--log", path, "--help"], { encoding: "utf8" });

      // then
      assert.equal(run.status, 0);
      assert.equal(run.stdout, `${helpText()}\n`);
      assert.equal(fs.existsSync(path), false);
    });

    test("a call with no mode throws, naming --help among the modes", () => {
      // given
      const args: string[] = [];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "missing --op, --query, --test or --help",
      );
    });

    test("--help prints the help on stdout and exits 0 without a log", () => {
      // given
      const env = { ...process.env };
      delete env.DECISION_TREE_LOG;

      // when
      const run = spawnSync(process.execPath, [process.argv[1], "--help"], { encoding: "utf8", env });

      // then
      assert.equal(run.status, 0);
      assert.equal(run.stderr, "");
      assert.equal(run.stdout, `${helpText()}\n`);
    });

    test("--help with an unknown flag prints one line and exits 1", () => {
      // given
      const args = [process.argv[1], "--help", "--nope"];

      // when
      const run = spawnSync(process.execPath, args, { encoding: "utf8" });

      // then
      assert.equal(run.status, 1);
      assert.equal(run.stdout, "");
      assert.equal(run.stderr, "unknown flag: --nope\n");
    });

    test("a message with a line feed is put on one line", () => {
      // given
      const message = "target not found: x\ny";

      // when
      const line = onOneLine(message);

      // then
      assert.equal(line, "target not found: x\\ny");
    });

    test("a message with a carriage return and a line feed is put on one line", () => {
      // given
      const message = "target not found: x\r\ny";

      // when
      const line = onOneLine(message);

      // then
      assert.equal(line, "target not found: x\\r\\ny");
    });

    test("a message with no line break is left as it is", () => {
      // given
      const message = "target not found: Q9\ta";

      // when
      const line = onOneLine(message);

      // then
      assert.equal(line, "target not found: Q9\ta");
    });

    test("a refusal that quotes a value with a line break prints one line and exits 1", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");

      // when
      const run = spawnSync(
        process.execPath,
        [process.argv[1], "--log", path, "--op", "select-option", "--target", "x\ny", "--context", "why"],
        { encoding: "utf8" },
      );

      // then
      assert.deepEqual([run.status, run.stderr, run.stdout], [1, "target not found: x\\ny\n", ""]);
    });

    test("a write on a log with a line that is not an event it knows names the line and exits 1", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      const damaged = '{"type":"add-question","id":"Q1","text":"q"}\n{"type":"select-option","targets":[]}\n';
      writeFileSync(path, damaged);

      // when
      const run = spawnSync(
        process.execPath,
        [process.argv[1], "--log", path, "--op", "add-question", "--text", "x"],
        { encoding: "utf8" },
      );

      // then
      assert.deepEqual(
        [run.status, run.stderr, run.stdout, readFileSync(path, "utf8")],
        [1, "log line 2: select-option needs at least one string in its targets\n", "", damaged],
      );
    });

    test("a query on a log with a line that does not fit names the line and exits 1", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));
      const path = join(dir, "decision-tree.jsonl");
      writeFileSync(path, '{"type":"add-question","id":"Q1","text":"q"}\n{"type":"select-option","targets":["Q9a"]}\n');

      // when
      const run = spawnSync(
        process.execPath,
        [process.argv[1], "--log", path, "--query", "next"],
        { encoding: "utf8" },
      );

      // then
      assert.deepEqual([run.status, run.stderr, run.stdout], [1, "log line 2: option Q9a does not exist\n", ""]);
    });

    test("a query on a log that is a directory prints one line and exits 1", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));

      // when
      const run = spawnSync(process.execPath, [process.argv[1], "--log", dir, "--query", "next"], { encoding: "utf8" });

      // then
      assert.deepEqual([run.status, run.stderr, run.stdout], [1, `cannot use log ${dir}: it is a directory\n`, ""]);
    });

    test("a write on a log that is a directory prints one line and exits 1", (t) => {
      // given
      const dir = mkdtempSync(join(tmpdir(), "decision-tree-"));
      t.after(() => rmSync(dir, { recursive: true }));

      // when
      const run = spawnSync(
        process.execPath,
        [process.argv[1], "--log", dir, "--op", "add-question", "--text", "q"],
        { encoding: "utf8" },
      );

      // then
      assert.deepEqual([run.status, run.stderr, run.stdout], [1, `cannot use log ${dir}: it is a directory\n`, ""]);
    });

    test("superseding a selected option reports the new option, the selection it withdrew and what hung under it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "under a", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "under b", origin: "Q1b" },
      ]);

      // when
      const result = write(
        log,
        [{ op: "supersede-option", run: (staged) => SupersedeOption.run(staged, { target: "Q1a", text: "c" }) }],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1c" }],
        selections: [{ question: "Q1", before: ["Q1a", "Q1b"], after: [] }],
        displaced: [
          { id: "Q2", state: "frozen", hiddenBy: { state: "frozen", by: "Q1a" } },
          { id: "Q3", state: "off-path", hiddenBy: { state: "off-path", by: "Q1b" } },
        ],
        placed: [],
      });
    });

    test("excluding one of two selected options reports the selection cleared and what hung under each as displaced", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
      ]);

      // when
      const result = write(
        log,
        [{ op: "exclude", run: (staged) => Exclude.run(staged, { target: "Q1b", reason: "deferred" }) }],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [],
        selections: [{ question: "Q1", before: ["Q1a", "Q1b"], after: [] }],
        displaced: [
          { id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } },
          { id: "Q3", state: "deferred", hiddenBy: { state: "deferred", by: "Q1b" } },
        ],
        placed: [],
      });
    });

    test("excluding a selected option and selecting the other in one call displaces only what hung under the excluded one", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a", "Q1b"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
        { type: "add-question", id: "Q3", text: "q3", origin: "Q1b" },
      ]);

      // when
      const result = write(
        log,
        [
          { op: "exclude", run: (staged) => Exclude.run(staged, { target: "Q1b", reason: "deferred" }) },
          { op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q1a"] }) },
        ],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [],
        selections: [{ question: "Q1", before: ["Q1a", "Q1b"], after: ["Q1a"] }],
        displaced: [{ id: "Q3", state: "deferred", hiddenBy: { state: "deferred", by: "Q1b" } }],
        placed: [],
      });
    });

    test("the clearing an exclusion causes points at the exclusion's line and carries no context", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);

      // when
      write(
        log,
        [
          {
            op: "exclude",
            context: "ruled out",
            run: (staged) => Exclude.run(staged, { target: "Q1a", reason: "deferred" }),
          },
        ],
        1000,
      );

      // then
      assert.deepEqual(log.read().slice(3), [
        { type: "clear-selection", target: "Q1", meta: { eid: 4, at: 1000, causedByEid: 5 } },
        { type: "exclude", target: "Q1a", reason: "deferred", context: "ruled out", meta: { eid: 5, at: 1000 } },
      ]);
    });

    test("superseding a question under an excluded item reports the replacement as hidden by that item", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const result = write(
        log,
        [{ op: "supersede-question", run: (staged) => SupersedeQuestion.run(staged, { target: "Q2", text: "new" }) }],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q3", state: "deferred", hiddenBy: { state: "deferred", by: "Q1" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("restoring an item whose ancestor is still excluded reports nothing", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1" },
        { type: "exclude", target: "Q2", reason: "deferred" },
        { type: "exclude", target: "Q1", reason: "deferred" },
      ]);

      // when
      const result = write(log, [{ op: "restore", run: (staged) => Restore.run(staged, { target: "Q2" }) }], 1000);

      // then
      assert.deepEqual(result, { created: [], selections: [], displaced: [], placed: [] });
    });

    test("restoring an option that was selected when it was excluded reports nothing", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
      ]);
      write(log, [{ op: "exclude", run: (staged) => Exclude.run(staged, { target: "Q1a", reason: "deferred" }) }], 1000);

      // when
      const result = write(log, [{ op: "restore", run: (staged) => Restore.run(staged, { target: "Q1a" }) }], 2000);

      // then
      assert.deepEqual(result, { created: [], selections: [], displaced: [], placed: [] });
    });

    test("promoting a follow-up under an option that is not selected reports the new question and what hides it", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-follow-up", id: "F1", text: "f", origin: "Q1a" },
      ]);

      // when
      const result = write(
        log,
        [{ op: "promote-follow-up", run: (staged) => PromoteFollowUp.run(staged, { target: "F1" }) }],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", state: "off-path", hiddenBy: { state: "off-path", by: "Q1a" } }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("a write that fails reports nothing and leaves the log untouched", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q1" }];
      const log = Log.memoryLog([...events]);

      // when
      const act = () => write(
        log,
        [{ op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q9a"] }) }],
        1000,
      );

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "target not found: Q9a");
      assert.deepEqual(log.read(), events);
    });

    test("a command without a log path throws", () => {
      // given
      const args = ["--query", "next"];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "missing --log or DECISION_TREE_LOG",
      );
    });

    test("an empty DECISION_TREE_LOG counts as no log path", () => {
      // given
      const args = ["--query", "next"];

      // when
      const act = () => readMode(args, { DECISION_TREE_LOG: "" });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "missing --log or DECISION_TREE_LOG",
      );
    });

    test("a blank --log on a write throws", () => {
      // given
      const args = ["--log", "  ", "--op", "add-question", "--text", "q"];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--log must not be blank");
    });

    test("a blank --log on a query throws", () => {
      // given
      const args = ["--log", "  ", "--query", "next"];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--log must not be blank");
    });

    test("a --log holding a control character on a write throws, naming the character", () => {
      // given
      const args = ["--log", "a\u0001b", "--op", "add-question", "--text", "q"];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "--log must not contain the control character U+0001",
      );
    });

    test("a blank DECISION_TREE_LOG counts as not set", () => {
      // given
      const args = ["--query", "next"];

      // when
      const act = () => readMode(args, { DECISION_TREE_LOG: "  " });

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "missing --log or DECISION_TREE_LOG",
      );
    });

    test("a DECISION_TREE_LOG holding a control character throws, naming the variable and the character", () => {
      // given
      const args = ["--query", "next"];

      // when
      const act = () => readMode(args, { DECISION_TREE_LOG: "a\u0001b" });

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "DECISION_TREE_LOG must not contain the control character U+0001",
      );
    });

    test("a blank DECISION_TREE_LOG is not looked at when --log is given", () => {
      // given
      const args = ["--log", "b.jsonl", "--query", "next"];

      // when
      const mode = readMode(args, { DECISION_TREE_LOG: "  " });

      // then
      assert.deepEqual(mode, { kind: "query", query: "next", log: "b.jsonl" });
    });

    test("the log path comes from DECISION_TREE_LOG when there is no --log", () => {
      // given
      const args = ["--query", "next"];

      // when
      const mode = readMode(args, { DECISION_TREE_LOG: "a.jsonl" });

      // then
      assert.deepEqual(mode, { kind: "query", query: "next", log: "a.jsonl" });
    });

    test("--log wins over DECISION_TREE_LOG", () => {
      // given
      const args = ["--log", "b.jsonl", "--query", "next"];

      // when
      const mode = readMode(args, { DECISION_TREE_LOG: "a.jsonl" });

      // then
      assert.deepEqual(mode, { kind: "query", query: "next", log: "b.jsonl" });
    });

    test("a blank flag value throws", () => {
      // given
      const args = ["--text", "   "];

      // when
      const act = () => readModeConfig({ text: { type: "string" } } as const, args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--text must not be blank");
    });

    test("a blank value among repeated flags throws", () => {
      // given
      const args = ["--option", "a", "--option", " "];

      // when
      const act = () => readModeConfig({ option: { type: "string", multiple: true } } as const, args);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--option must not be blank",
      );
    });

    test("a single-value flag given twice throws", () => {
      // given
      const args = ["--target", "Q1", "--target", "Q2"];

      // when
      const act = () => readModeConfig({ target: { type: "string" } } as const, args);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--target given more than once",
      );
    });

    test("a multiple flag given twice keeps both values", () => {
      // given
      const args = ["--target", "Q1", "--target", "Q2"];

      // when
      const config = readModeConfig({ target: { type: "string", multiple: true } } as const, args);

      // then
      assert.deepEqual(config.target, ["Q1", "Q2"]);
    });

    test("each flag belongs to the --op before it", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--op", "tag", "--target", "Q1", "--tag", "t"];

      // when
      const found = groups(args);

      // then
      assert.deepEqual(found, [
        { op: "add-question", args: ["--text", "q"] },
        { op: "tag", args: ["--target", "Q1", "--tag", "t"] },
      ]);
    });

    test("--log belongs to no operation, wherever it comes", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--log", "a.jsonl", "--op", "focus", "--target", "Q1"];

      // when
      const mode = readMode(args, {});

      // then
      assert.deepEqual(mode, {
        kind: "write",
        groups: [
          { op: "add-question", args: ["--text", "q"] },
          { op: "focus", args: ["--target", "Q1"] },
        ],
        log: "a.jsonl",
      });
    });

    test("a flag before any --op throws", () => {
      // given
      const args = ["--text", "q", "--op", "add-question"];

      // when
      const act = () => groups(args);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--text must come after an --op",
      );
    });

    test("an --op without a value throws", () => {
      // given
      const args = ["--op"];

      // when
      const act = () => groups(args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--op requires a value");
    });

    test("--log given twice throws", () => {
      // given
      const args = ["--log", "a.jsonl", "--op", "focus", "--target", "Q1", "--log", "b.jsonl"];

      // when
      const act = () => readMode(args, {});

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--log given more than once",
      );
    });

    test("operations run in order, each on what the earlier ones left, and are reported as one write", () => {
      // given
      const log = Log.memoryLog();

      // when
      const result = write(
        log,
        [
          { op: "add-question", run: (staged) => AddQuestion.run(staged, { text: "q" }) },
          { op: "add-option", run: (staged) => AddOption.run(staged, { origin: "Q1", text: "a" }) },
          { op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q1a"] }) },
        ],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1", state: "settled" }, { id: "Q1a" }],
        selections: [{ question: "Q1", before: [], after: ["Q1a"] }],
        displaced: [],
        placed: [],
      });
    });

    test("each operation's lines are stamped on their own, and its side effects point at its own line", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "old" },
        { type: "tag", target: "Q1", tags: ["t"] },
      ]);

      // when
      write(
        log,
        [
          { op: "supersede-question", run: (staged) => SupersedeQuestion.run(staged, { target: "Q1", text: "new" }) },
          { op: "add-follow-up", run: (staged) => AddFollowUp.run(staged, { text: "f" }) },
        ],
        1000,
      );

      // then
      assert.deepEqual(log.read().slice(2), [
        { type: "add-question", id: "Q2", text: "new", meta: { eid: 3, at: 1000, causedByEid: 4 } },
        { type: "supersede-question", target: "Q1", question: "Q2", meta: { eid: 4, at: 1000 } },
        { type: "tag", target: "Q2", tags: ["t"], meta: { eid: 5, at: 1000, causedByEid: 4 } },
        { type: "add-follow-up", id: "F1", text: "f", meta: { eid: 6, at: 1000 } },
      ]);
    });

    test("an invalid operation after a valid one names itself and its position, and appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () =>
        write(
          log,
          [
            { op: "add-question", run: (staged) => AddQuestion.run(staged, { text: "q" }) },
            { op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q9a"] }) },
          ],
          1000,
        );

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "operation 2 (select-option): target not found: Q9a",
      );
      assert.deepEqual(log.read(), []);
    });

    test("a write whose result cannot be worked out appends nothing", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () =>
        write(
          log,
          [{ op: "select-option", run: (staged) => staged.append({ type: "select-option", targets: ["Q9a"] }) }],
          1000,
        );

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "option Q9a does not exist",
      );
      assert.deepEqual(log.read(), []);
    });

    test("an item one operation displaces and a later one brings back is not reported", () => {
      // given
      const log = Log.memoryLog([
        { type: "add-question", id: "Q1", text: "q1" },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1" },
        { type: "add-option", id: "Q1b", text: "b", origin: "Q1" },
        { type: "select-option", targets: ["Q1a"] },
        { type: "add-question", id: "Q2", text: "q2", origin: "Q1a" },
      ]);

      // when
      const result = write(
        log,
        [
          { op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q1b"] }) },
          { op: "select-option", run: (staged) => SelectOption.run(staged, { target: ["Q1a"] }) },
        ],
        1000,
      );

      // then
      assert.deepEqual(result, { created: [], selections: [], displaced: [], placed: [] });
    });

    test("a created item carries the name its operation was given, and a later operation can use it", () => {
      // given
      const log = Log.memoryLog();

      // when
      const result = write(
        log,
        [
          { op: "add-question", as: "q", run: (staged) => AddQuestion.run(staged, { text: "q" }) },
          {
            op: "add-option",
            run: (staged, names) => AddOption.run(staged, { origin: names.get("q"), text: "a" }),
          },
        ],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q1", as: "q", state: "open" }, { id: "Q1a" }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("a name on a superseding operation names the item that takes the old one's place", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "old" }]);

      // when
      const result = write(
        log,
        [
          {
            op: "supersede-question",
            as: "new",
            run: (staged) => SupersedeQuestion.run(staged, { target: "Q1", text: "new" }),
          },
        ],
        1000,
      );

      // then
      assert.deepEqual(result, {
        created: [{ id: "Q2", as: "new", state: "open" }],
        selections: [],
        displaced: [],
        placed: [],
      });
    });

    test("a name on an operation that creates two items is an error of the program, not of the command", () => {
      // given
      const added: Event[] = [
        { type: "add-question", id: "Q1", text: "a" },
        { type: "add-question", id: "Q2", text: "b" },
      ];

      // when
      const act = () => itemCreated("add-question", added);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof Error &&
          !(error instanceof DecisionTreeError) &&
          error.message === "add-question created more than one item",
      );
    });

    test("a name on an operation that creates nothing throws and appends nothing", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "q" };
      const log = Log.memoryLog([question]);

      // when
      const act = () =>
        write(log, [{ op: "tag", as: "t", run: (staged) => Tag.run(staged, { target: "Q1", tag: ["t"] }) }], 1000);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "tag creates nothing for --as to name",
      );
      assert.deepEqual(log.read(), [question]);
    });

    test("a context is written on the operation's own line", () => {
      // given
      const log = Log.memoryLog();

      // when
      write(
        log,
        [{ op: "add-question", context: "what it means", run: (staged) => AddQuestion.run(staged, { text: "q" }) }],
        1000,
      );

      // then
      assert.deepEqual(log.read(), [
        { type: "add-question", id: "Q1", text: "q", context: "what it means", meta: { eid: 1, at: 1000 } },
      ]);
    });

    test("an operation the CLI does not have throws", () => {
      // given
      const args = ["--op", "add-answer", "--text", "x"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "unknown op: add-answer");
    });

    test("a name every object has is not an operation", () => {
      // given
      const args = ["--op", "toString"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "unknown op: toString");
    });

    test("an operation the CLI does not have is found before any operation runs, and names its position", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--op", "add-answer"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "operation 2 (add-answer): unknown op: add-answer",
      );
    });

    test("--as and --context belong to the operation they follow", () => {
      // given
      const args = [
        "--op", "add-question", "--text", "q", "--as", "hour", "--context", "why",
        "--op", "focus", "--target", "@hour",
      ];

      // when
      const operations = parsed(groups(args));

      // then
      assert.deepEqual(
        operations.map(({ op, as, context }) => ({ op, as, context })),
        [
          { op: "add-question", as: "hour", context: "why" },
          { op: "focus", as: undefined, context: undefined },
        ],
      );
    });

    test("--as given twice for one operation throws", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--as", "a", "--as", "b"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--as given more than once",
      );
    });

    test("a name given to two operations throws, naming the second", () => {
      // given
      const args = [
        "--op", "add-question", "--text", "a", "--as", "n",
        "--op", "add-question", "--text", "b", "--as", "n",
      ];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "operation 2 (add-question): --as n given more than once",
      );
    });

    test("a name that is not letters, digits, - or _ throws", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--as", "a b"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--as must be letters, digits, - or _: a b",
      );
    });

    test("select-option requires a context", () => {
      // given
      const args = ["--op", "select-option", "--target", "Q1a"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "select-option requires --context",
      );
    });

    test("clear-selection requires a context", () => {
      // given
      const args = ["--op", "clear-selection", "--target", "Q1"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "clear-selection requires --context",
      );
    });

    test("exclude requires a context", () => {
      // given
      const args = ["--op", "exclude", "--target", "Q1", "--reason", "deferred"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "exclude requires --context",
      );
    });

    test("supersede-question requires a context", () => {
      // given
      const args = ["--op", "supersede-question", "--target", "Q1", "--text", "new"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-question requires --context",
      );
    });

    test("supersede-option requires a context", () => {
      // given
      const args = ["--op", "supersede-option", "--target", "Q1a", "--text", "new"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-option requires --context",
      );
    });

    test("supersede-statement requires a context", () => {
      // given
      const args = ["--op", "supersede-statement", "--target", "S1", "--text", "new"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "supersede-statement requires --context",
      );
    });

    test("in a batch, the operation that lacks its context is named", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--op", "exclude", "--target", "Q1", "--reason", "deferred"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "operation 2 (exclude): exclude requires --context",
      );
    });

    test("add-question is read without a context", () => {
      // given
      const args = ["--op", "add-question", "--text", "q"];

      // when
      const [operation] = parsed(groups(args));

      // then
      assert.deepEqual([operation.op, operation.context], ["add-question", undefined]);
    });

    test("add-option is read without a context", () => {
      // given
      const args = ["--op", "add-option", "--origin", "Q1", "--text", "a"];

      // when
      const [operation] = parsed(groups(args));

      // then
      assert.deepEqual([operation.op, operation.context], ["add-option", undefined]);
    });

    test("add-follow-up is read without a context", () => {
      // given
      const args = ["--op", "add-follow-up", "--text", "f"];

      // when
      const [operation] = parsed(groups(args));

      // then
      assert.deepEqual([operation.op, operation.context], ["add-follow-up", undefined]);
    });

    test("add-statement is read without a context", () => {
      // given
      const args = ["--op", "add-statement", "--text", "s"];

      // when
      const [operation] = parsed(groups(args));

      // then
      assert.deepEqual([operation.op, operation.context], ["add-statement", undefined]);
    });

    test("promote-follow-up is read without a context", () => {
      // given
      const args = ["--op", "promote-follow-up", "--target", "F1"];

      // when
      const [operation] = parsed(groups(args));

      // then
      assert.deepEqual([operation.op, operation.context], ["promote-follow-up", undefined]);
    });

    test("tag takes no context", () => {
      // given
      const args = ["--op", "tag", "--target", "Q1", "--tag", "t", "--context", "why"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "tag takes no --context");
    });

    test("untag takes no context", () => {
      // given
      const args = ["--op", "untag", "--target", "Q1", "--tag", "t", "--context", "why"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "untag takes no --context");
    });

    test("focus takes no context", () => {
      // given
      const args = ["--op", "focus", "--target", "Q1", "--context", "why"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "focus takes no --context");
    });

    test("--context given twice for one operation throws", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--context", "a", "--context", "b"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--context given more than once",
      );
    });

    test("a blank context throws", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--context", "  "];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "--context must not be blank",
      );
    });

    test("a flag of another operation names the operation it was given to", () => {
      // given
      const args = ["--op", "add-question", "--text", "q", "--op", "focus", "--target", "Q1", "--text", "x"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "operation 2 (focus): unknown flag: --text",
      );
    });

    test("@name in an origin stands for the id an earlier operation created", () => {
      // given
      const log = Log.memoryLog();
      const args = [
        "--op", "add-question", "--text", "q", "--as", "q",
        "--op", "add-option", "--origin", "@q", "--text", "a",
      ];

      // when
      write(log, parsed(groups(args)), 1000);

      // then
      assert.deepEqual(log.read(), [
        { type: "add-question", id: "Q1", text: "q", meta: { eid: 1, at: 1000 } },
        { type: "add-option", id: "Q1a", text: "a", origin: "Q1", meta: { eid: 2, at: 1000 } },
      ]);
    });

    test("each @name among several targets stands for its id", () => {
      // given
      const events: Event[] = [{ type: "add-question", id: "Q1", text: "q" }];
      const log = Log.memoryLog([...events]);
      const first = ["--op", "add-option", "--origin", "Q1", "--text", "a", "--as", "a"];
      const second = ["--op", "add-option", "--origin", "Q1", "--text", "b", "--as", "b"];
      const select = ["--op", "select-option", "--target", "@a", "--target", "@b", "--context", "both"];

      // when
      write(log, parsed(groups([...first, ...second, ...select])), 1000);

      // then
      assert.deepEqual(log.read().at(-1), {
        type: "select-option", targets: ["Q1a", "Q1b"], context: "both",
        meta: { eid: 4, at: 1000 },
      });
    });

    test("@name that no earlier operation gave throws, naming the operation that used it", () => {
      // given
      const log = Log.memoryLog();
      const args = ["--op", "add-question", "--text", "q", "--op", "add-option", "--origin", "@later", "--text", "a"];

      // when
      const act = () => write(log, parsed(groups(args)), 1000);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "operation 2 (add-option): @later is not named by an earlier operation",
      );
      assert.deepEqual(log.read(), []);
    });

    test("a text that starts with @ is left as it is", () => {
      // given
      const log = Log.memoryLog();
      const args = ["--op", "add-follow-up", "--text", "@todo later"];

      // when
      write(log, parsed(groups(args)), 1000);

      // then
      assert.deepEqual(log.read(), [
        { type: "add-follow-up", id: "F1", text: "@todo later", meta: { eid: 1, at: 1000 } },
      ]);
    });

    test("a query the CLI does not have throws", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => answer(log, "everything", []);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "unknown query: everything",
      );
    });

    test("a name every object has is not a query", () => {
      // given
      const log = Log.memoryLog();

      // when
      const act = () => answer(log, "toString", []);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "unknown query: toString");
    });

    test("a query is answered with its own flags", () => {
      // given
      const log = Log.memoryLog([{ type: "add-question", id: "Q1", text: "q" }]);

      // when
      const xml = answer(log, "items", ["--limit", "1"]);

      // then
      assert.deepEqual(xml.split("\n"), [
        "<items>",
        '  <question state="open">',
        "    <id>Q1</id>",
        "    <text>q</text>",
        "    <options></options>",
        "  </question>",
        "</items>",
      ]);
    });

    test("a value is joined to the flag it follows", () => {
      // given
      const args = ["--op", "add-question", "--text", "q"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--op=add-question", "--text=q"]);
    });

    test("a value that starts with a dash is still the value", () => {
      // given
      const args = ["--context", "- chosen because X"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--context=- chosen because X"]);
    });

    test("a value that starts with two dashes and is not a flag of the CLI is still the value", () => {
      // given
      const args = ["--text", "--verbose is on"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--text=--verbose is on"]);
    });

    test("each of several values of one flag is joined", () => {
      // given
      const args = ["--target", "Q1a", "--target", "Q1b"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--target=Q1a", "--target=Q1b"]);
    });

    test("a flag that takes no value is left as it is", () => {
      // given
      const args = ["--query", "next", "--trail"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--query=next", "--trail"]);
    });

    test("a value already joined with = is left as it is", () => {
      // given
      const args = ["--text=--text"];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--text=--text"]);
    });

    test("an empty value is joined, for the blank check to refuse", () => {
      // given
      const args = ["--text", ""];

      // when
      const joined = withValuesJoined(args);

      // then
      assert.deepEqual(joined, ["--text="]);
    });

    test("a flag of the CLI is never taken as a value", () => {
      // given
      const args = ["--context", "--op", "tag"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "--context requires a value, and --op is a flag",
      );
    });

    test("a flag of the CLI joined with = is never taken as a value", () => {
      // given
      const args = ["--text", "--origin=Q1"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError && error.message === "--text requires a value, and --origin=Q1 is a flag",
      );
    });

    test("a flag with no value at the end of a batch names its operation and place", () => {
      // given
      const args = ["--op", "add-question", "--text", "a", "--op", "tag", "--target", "Q1", "--tag"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "operation 2 (tag): --tag requires a value",
      );
    });

    test("a flag with no value followed by another flag names its operation and place", () => {
      // given
      const args = ["--op", "add-question", "--text", "--origin", "Q1", "--op", "tag", "--target", "Q1", "--tag", "t"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "operation 1 (add-question): --text requires a value, and --origin is a flag",
      );
    });

    test("an operation given as --op=NAME is named the same way", () => {
      // given
      const args = ["--op=add-question", "--text=a", "--op=tag", "--target=Q1", "--tag"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "operation 2 (tag): --tag requires a value",
      );
    });

    test("an --op with no value at the end of a batch names no operation", () => {
      // given
      const args = ["--op", "add-question", "--text", "a", "--op"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--op requires a value");
    });

    test("a --log with no value inside a batch names no operation", () => {
      // given
      const args = ["--op", "add-question", "--text", "a", "--op", "tag", "--target", "Q1", "--tag", "t", "--log"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--log requires a value");
    });

    test("a flag with no value before the first --op names no operation", () => {
      // given
      const args = ["--text", "--op", "add-question", "--op", "tag"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "--text requires a value, and --op is a flag",
      );
    });

    test("a flag with no value in a batch of one names no operation", () => {
      // given
      const args = ["--op", "add-question", "--text"];

      // when
      const act = () => withValuesJoined(args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "--text requires a value");
    });

    test("a write whose context starts with a dash records it", () => {
      // given
      const log = Log.memoryLog();
      const args = withValuesJoined(["--op", "add-question", "--text", "q", "--context", "-> follows from Q3"]);

      // when
      write(log, parsed(groups(args)), 1000);

      // then
      assert.deepEqual(log.read(), [
        { type: "add-question", id: "Q1", text: "q", context: "-> follows from Q3", meta: { eid: 1, at: 1000 } },
      ]);
    });

    test("restore takes no context", () => {
      // given
      const args = ["--op", "restore", "--target", "Q1", "--context", "the blocker cleared"];

      // when
      const act = () => parsed(groups(args));

      // then
      assert.throws(
        act,
        (error) => error instanceof DecisionTreeError && error.message === "restore takes no --context",
      );
    });

    test("a write reaches the log in one append, however many operations and lines it holds", () => {
      // given
      const question: Event = { type: "add-question", id: "Q1", text: "old" };
      const appends: Event[][] = [];
      const log: Log = { read: () => [question], append: (...events) => appends.push(events) };

      // when
      write(
        log,
        [
          { op: "supersede-question", run: (staged) => SupersedeQuestion.run(staged, { target: "Q1", text: "new" }) },
          { op: "add-follow-up", run: (staged) => AddFollowUp.run(staged, { text: "f" }) },
        ],
        1000,
      );

      // then
      assert.deepEqual(appends, [
        [
          { type: "add-question", id: "Q2", text: "new", meta: { eid: 2, at: 1000, causedByEid: 3 } },
          { type: "supersede-question", target: "Q1", question: "Q2", meta: { eid: 3, at: 1000 } },
          { type: "add-follow-up", id: "F1", text: "f", meta: { eid: 4, at: 1000 } },
        ],
      ]);
    });

    test("a flag the command does not have throws, naming the flag", () => {
      // given
      const args = ["--tex=q"];

      // when
      const act = () => readModeConfig({ text: { type: "string" } } as const, args);

      // then
      assert.throws(act, (error) => error instanceof DecisionTreeError && error.message === "unknown flag: --tex");
    });

    test("a value holding a control character throws, naming the character", () => {
      // given
      const args = ["--text=a\u0001b"];

      // when
      const act = () => readModeConfig({ text: { type: "string" } } as const, args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "--text must not contain the control character U+0001",
      );
    });

    test("a control character in one of several values throws", () => {
      // given
      const args = ["--tag=fine", "--tag=x\u001Fy"];

      // when
      const act = () => readModeConfig({ tag: { type: "string", multiple: true } } as const, args);

      // then
      assert.throws(
        act,
        (error) =>
          error instanceof DecisionTreeError &&
          error.message === "--tag must not contain the control character U+001F",
      );
    });

    test("a tab and a line break in a value are kept", () => {
      // given
      const args = ["--text=a\tb\nc"];

      // when
      const config = readModeConfig({ text: { type: "string" } } as const, args);

      // then
      assert.equal(config.text, "a\tb\nc");
    });
  }

  function runTests() {
    tests();
    Log.tests();
    Graph.tests();
    AddItem.tests();
    AddQuestion.tests();
    AddOption.tests();
    SelectOption.tests();
    ClearSelection.tests();
    AddFollowUp.tests();
    AddStatement.tests();
    PromoteFollowUp.tests();
    Exclude.tests();
    Restore.tests();
    SupersedeQuestion.tests();
    SupersedeOption.tests();
    SupersedeStatement.tests();
    Focus.tests();
    Tag.tests();
    Untag.tests();
    Items.tests();
    Next.tests();
    Tree.tests();
    Status.tests();
    Xml.tests();
  }

  function locatingErrors<T>(operation: { op: string; position: number; of: number }, work: () => T): T {
    try {
      return work();
    } catch (error) {
      if (!(error instanceof DecisionTreeError) || operation.of === 1) throw error;

      throw new DecisionTreeError(`operation ${operation.position} (${operation.op}): ${error.message}`);
    }
  }

  function linesOf({ op, as, run }: Operation, staged: Log, names: Map<string, string>): Event[] {
    const existing = staged.read().length;

    run(staged, names);

    const added = staged.read().slice(existing);
    if (as !== undefined) names.set(as, itemCreated(op, added));

    return added;
  }

  function write(log: Log, operations: Operation[], at: number): WriteResult {
    const before = log.read();
    const staged = Log.memoryLog([...before]);
    const names = new Map<string, string>();

    const stamped = operations.flatMap((operation, index) => {
      const { op, context } = operation;
      const existing = staged.read().length;
      const added = locatingErrors({ op, position: index + 1, of: operations.length }, () =>
        linesOf(operation, staged, names),
      );

      return Log.stamp(added, { existing, op, at, context });
    });

    const result = Graph.resultOfWrite(Log.memoryLog(before), staged.read().slice(before.length));

    log.append(...stamped);

    const nameOf = new Map([...names].map(([name, id]) => [id, name]));

    return { ...result, created: result.created.map((each) => withName(each, nameOf)) };
  }

  function flags(): ParseArgsOptionsConfig {
    const declared = [...Object.values(parsers), ...Object.values(queries)].map((each) => each.options);

    return Object.assign({}, cliOptions, ...declared);
  }

  function operationOf(args: string[], index: number): { op: string; position: number; of: number } | undefined {
    if (args[index] === "--op" || args[index] === "--log") return undefined;

    const ops = args.flatMap((arg, at) => (arg === "--op" || arg.startsWith("--op=") ? [at] : []));
    const before = ops.filter((at) => at < index);
    const last = before.at(-1);
    if (last === undefined) return undefined;

    const op = args[last] === "--op" ? args[last + 1] : args[last].slice("--op=".length);

    return { op, position: before.length, of: ops.length };
  }

  function withValuesJoined(args: string[], options: ParseArgsOptionsConfig = flags()): string[] {
    const isFlag = (arg: string) => arg.startsWith("--") && Object.hasOwn(options, arg.slice(2).split("=")[0]);
    const takesValue = (arg: string) => isFlag(arg) && !arg.includes("=") && options[arg.slice(2)].type === "string";

    const refuse = (index: number, message: string): never => {
      const operation = operationOf(args, index);
      const refusal = new DecisionTreeError(message);
      if (operation === undefined) throw refusal;

      return locatingErrors(operation, () => {
        throw refusal;
      });
    };

    return args.flatMap((arg, index) => {
      const before = args[index - 1];
      const after = args[index + 1];

      if (before !== undefined && takesValue(before) && !isFlag(arg)) return [];
      if (!takesValue(arg)) return [arg];
      if (after === undefined) return refuse(index, `${arg} requires a value`);
      if (isFlag(after)) return refuse(index, `${arg} requires a value, and ${after} is a flag`);

      return [`${arg}=${after}`];
    });
  }

  function main() {
    const args = withValuesJoined(process.argv.slice(2));
    const mode = readMode(args);

    if (mode.kind === "test") {
      readModeConfig({}, args);
      runTests();
      return;
    }

    if (mode.kind === "help") {
      readModeConfig({}, args);
      console.log(helpText());
      return;
    }

    const log = Log.fileLog(mode.log);

    if (mode.kind === "query") {
      console.log(Log.explainingFileErrors(mode.log, () => answer(log, mode.query, args)));
      return;
    }

    const operations = parsed(mode.groups);

    Log.explainingFileErrors(mode.log, () =>
      Log.locked(mode.log, () => {
        console.log(Xml.batch(write(log, operations, Date.now())));
      }),
    );
  }

  function query<T extends ParseArgsOptionsConfig, D>(
    module: Module<T, D>,
    print: (data: D) => string,
    summary: string,
  ): Query {
    return {
      options: module.options,
      summary,
      answer: (log, args) => print(module.run(log, readModeConfig(module.options, args))),
    };
  }

  const queries: Record<string, Query> = {
    next: query(Next, Xml.next, "The first open item; --trail adds the path to it. The only query a focus affects."),
    tree: query(Tree, Xml.tree, "The nested structure with every option, keeping the ancestors of a match."),
    status: query(Status, Xml.status, "Open, settled and deferred items in one compact hierarchy."),
    items: query(Items, Xml.items, "A flat list in walk order; --target finds one item, in any state unless --state is given, and --trail requires --target."),
  };

  function answer(log: Log, name: string, args: string[]): string {
    if (!Object.hasOwn(queries, name)) throw new DecisionTreeError(`unknown query: ${name}`);

    return queries[name].answer(log, args);
  }

  function parser<T extends ParseArgsOptionsConfig>(
    module: Module<T, void> & { required: readonly (keyof T & string)[] },
    summary: string,
  ): Parser {
    const options = { ...module.options, ...operationOptions };

    return {
      options,
      required: module.required,
      summary,
      parse: (args) => {
        const config = readModeConfig(options, args) as OperationConfig<T>;
        const { as, context } = config;

        return { as, context, run: (staged, names) => module.run(staged, { ...config, ...idsNamed(config, names) }) };
      },
    };
  }

  const parsers: Record<Event["type"], Parser> = {
    "add-question": parser(AddQuestion, "Adds a question, with no options."),
    "add-option": parser(AddOption, "Adds an option to a question."),
    "add-follow-up": parser(AddFollowUp, "Records a follow-up."),
    "add-statement": parser(AddStatement, "Records a statement."),
    "select-option": parser(SelectOption, "Makes these options, all of one question, its whole selection."),
    "clear-selection": parser(ClearSelection, "Withdraws a question's whole selection."),
    "promote-follow-up": parser(PromoteFollowUp, "Creates a question under the follow-up, worded as --text or as the follow-up."),
    "supersede-question": parser(SupersedeQuestion, "Puts a new question in the old one's place and freezes the old one."),
    "supersede-option": parser(SupersedeOption, "Adds a new option to the same question and freezes the old one."),
    "supersede-statement": parser(SupersedeStatement, "Puts a new statement in the old one's place and freezes the old one."),
    exclude: parser(Exclude, "Hides an item and everything under it; --reason is deferred or not-applicable."),
    restore: parser(Restore, "Lifts the exclusion made on that item."),
    focus: parser(Focus, "Puts an item with something open at the head of next."),
    tag: parser(Tag, "Adds tags to a question, follow-up or statement."),
    untag: parser(Untag, "Removes tags from a question, follow-up or statement."),
  };

  function isOperationName(op: string): op is Event["type"] {
    return Object.hasOwn(parsers, op);
  }

  function parsedOperation(op: string, args: string[]): Operation {
    if (!isOperationName(op)) throw new DecisionTreeError(`unknown op: ${op}`);

    const operation = parsers[op].parse(args);
    if (operation.context !== undefined && !Graph.takesContext(op)) {
      throw new DecisionTreeError(`${op} takes no --context`);
    }
    if (operation.context === undefined && Graph.requiresContext(op)) {
      throw new DecisionTreeError(`${op} requires --context`);
    }
    if (operation.as !== undefined && !/^[A-Za-z0-9_-]+$/.test(operation.as)) {
      throw new DecisionTreeError(`--as must be letters, digits, - or _: ${operation.as}`);
    }

    return { op, ...operation };
  }

  function parsed(given: Group[]): Operation[] {
    const names = new Set<string>();

    return given.map(({ op, args }, index) =>
      locatingErrors({ op, position: index + 1, of: given.length }, () => {
        const operation = parsedOperation(op, args);
        if (operation.as !== undefined && names.has(operation.as)) {
          throw new DecisionTreeError(`--as ${operation.as} given more than once`);
        }
        if (operation.as !== undefined) names.add(operation.as);

        return operation;
      }),
    );
  }

  function flagsOf(options: ParseArgsOptionsConfig, required: readonly string[] = []): string[] {
    return Object.entries(options)
      .filter(([name]) => !Object.hasOwn(operationOptions, name))
      .map(([name, option]) => {
        const flag = option.type === "string" ? `--${name} ${name.toUpperCase()}` : `--${name}`;
        const shown = required.includes(name) ? flag : `[${flag}]`;

        return option.multiple ? `${shown}…` : shown;
      });
  }

  function signatureOf(op: Event["type"]): string {
    const { options, required } = parsers[op];
    const context = Graph.requiresContext(op) ? ["--context CONTEXT"] : Graph.takesContext(op) ? ["[--context CONTEXT]"] : [];
    const as = Graph.createsItem(op) ? ["[--as NAME]"] : [];

    return [...flagsOf(options, required), ...context, ...as].join(" ");
  }

  function section(entries: { name: string; flags: string; summary: string }[]): string[] {
    const width = Math.max(...entries.map(({ name }) => name.length)) + 2;

    return entries.flatMap(({ name, flags, summary }) => [
      `  ${name.padEnd(width)}${flags}`.trimEnd(),
      `  ${"".padEnd(width)}${summary}`,
    ]);
  }

  function helpText(script: string = basename(process.argv[1])): string {
    const operations = Object.entries(parsers).map(([op, { summary }]) => ({
      name: op,
      flags: signatureOf(op as Event["type"]),
      summary,
    }));
    const answers = Object.entries(queries).map(([name, { options, summary }]) => ({
      name,
      flags: flagsOf(options).join(" "),
      summary,
    }));

    return [
      "Usage:",
      `  node ${script} --log PATH --op OP [flags] [--op OP [flags]]…`,
      `  node ${script} --log PATH --query QUERY [flags]`,
      `  node ${script} --test`,
      `  node ${script} --help`,
      "",
      "DECISION_TREE_LOG can stand in for --log, which wins if both are set.",
      "Results are XML on stdout. A refused call prints one line on stderr, exits 1 and writes nothing.",
      "[--flag] is optional; a trailing … means it can be repeated.",
      "",
      "Operations:",
      ...section(operations),
      "",
      "--context says why an operation was done, or where a fact comes from.",
      "--as names the item an operation creates, so a later --op in the same call can refer to it as @NAME.",
      "",
      "Queries:",
      ...section(answers),
      "",
      `STATE is ${Items.states.join(", ")} or all, and open when no --state is given.`,
    ].join("\n");
  }

  function onOneLine(message: string): string {
    return message.replaceAll("\r", "\\r").replaceAll("\n", "\\n");
  }

  return { main, onOneLine };
})();

try {
  Cli.main();
} catch (error) {
  if (!(error instanceof DecisionTreeError)) throw error;

  console.error(Cli.onOneLine(error.message));
  process.exit(1);
}
