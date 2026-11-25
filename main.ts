/**
 * Real-Life Patch Notes: The Comedy Changelog.
 *
 * Writes one comedy patch-note line to /output/entry.txt.
 *
 * The bug: the mouth's autopilot reply. When a waiter says
 * "enjoy your meal", the mouth answers "you too" — as if the
 * waiter were about to sit down and eat it as well. A real,
 * specific, instantly recognisable human bug, stated in the
 * terse register of a shipped release note.
 */

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "v3.0.4: fixed a bug where the mouth replied 'you too' when the waiter said 'enjoy your meal'.";

function main(): void {
  // One clean line: collapse any stray whitespace so the entry can
  // never split across lines, then gate it at 1-160 chars.
  const text = LINE.split(/\s+/).join(" ");
  if (text.length < 1 || text.length > 160 || !text.trim()) {
    throw new Error(`entry must be 1-160 chars, got ${text.length}`);
  }
  // It must read as a real release note: a version number up front.
  if (!/^v\d+\.\d+\.\d+:/.test(text)) {
    throw new Error("entry must start with a version number like v3.0.4:");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf-8");
}

main();
