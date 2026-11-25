import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  'You want 40 euros sent to "Definitely Not A Casino." My screen is dim, my battery is at 6 percent, and I have a cautious relationship with consequences. Decline.';

function main(): void {
  if (!ENTRY || ENTRY.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (!ENTRY.startsWith("You want 40 euros")) {
    throw new Error("entry must open on the refused transaction");
  }
  if (!ENTRY.includes("Definitely Not A Casino")) {
    throw new Error("entry must name the suspicious recipient");
  }
  if (!ENTRY.includes("Decline.")) {
    throw new Error("entry must end with the wallet's refusal punch");
  }
  const outDir =
    process.env.OUTPUT_DIR ?? process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`entry ok: ${ENTRY.length} chars, 1 line`);
}

main();
