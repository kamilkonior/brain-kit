#!/usr/bin/env node
// Purpose: a mode has one file per goal, and reading them one by one costs a
// dozen reads. This script joins each mode's goal files into one file,
// goals/<mode>/COMPILED.md, so that a mode's goals can be read at once.
//
// The goal files are the source. COMPILED.md is generated from them, in the
// order the mode file (modes/<mode>.md) lists the goals, and is never edited
// by hand. Each goal keeps its own headings, so the compiled file is the goal
// files one after another under a one-line note.
//
// Run it after changing, adding or removing a goal file:
//
//   node scripts/compile-goals.mjs           writes the compiled files
//   node scripts/compile-goals.mjs --check   writes nothing; fails if a
//                                            compiled file is missing or
//                                            out of date
//
// It stops with an error if a goal file exists that its mode file does not
// list, because such a file would be left out of the compiled one.
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skill = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
let stale = 0;

for (const file of readdirSync(join(skill, "modes")).filter((f) => f.endsWith(".md")).sort()) {
  const mode = file.slice(0, -3);
  const folder = join(skill, "goals", mode);
  const links = new RegExp(`\\(\\.\\./goals/${mode}/([a-z-]+)\\.md\\)`, "g");
  const goals = [...readFileSync(join(skill, "modes", file), "utf8").matchAll(links)].map((m) => m[1]);

  const unlisted = readdirSync(folder)
    .filter((f) => f.endsWith(".md") && f !== "COMPILED.md" && !goals.includes(f.slice(0, -3)));
  if (unlisted.length) throw new Error(`${mode}: goal files that modes/${file} does not list: ${unlisted.join(", ")}`);

  const note =
    `<!-- Generated from the ${goals.length} goal files in this folder, in the order modes/${file} lists them. ` +
    `Do not edit: change a goal file and run scripts/compile-goals.mjs. -->\n\n`;
  const body = goals.map((g) => readFileSync(join(folder, `${g}.md`), "utf8").trimEnd() + "\n").join("\n");

  const target = join(folder, "COMPILED.md");
  const current = existsSync(target) ? readFileSync(target, "utf8") : null;
  if (current === note + body) continue;
  if (check) {
    console.error(`${mode}: COMPILED.md is ${current === null ? "missing" : "out of date"}`);
    stale++;
  } else {
    writeFileSync(target, note + body);
    console.log(`${mode}: wrote COMPILED.md from ${goals.length} goal files`);
  }
}
if (stale) process.exit(1);
