// Funniest Time Machine Warning Label — one-line entry.
// Writes the warning label to /output/entry.txt and validates it:
// exactly one line, 1-120 characters, non-blank.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const LINE =
  "WARNING: Do not step on butterflies. One of them is your grandfather.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = resolve(OUTPUT_DIR, "entry.txt");

function main(): void {
  const line = LINE.trim();
  if (line.length < 1 || line.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  // Read back and confirm the file holds exactly the validated line.
  const written = readFileSync(OUTPUT_PATH, "utf8");
  if (written !== line) {
    throw new Error("entry.txt does not match the validated line");
  }
  console.log(`entry (${line.length} chars): ${line}`);
}

main();
