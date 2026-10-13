import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const out = join(root, "dist");
const excluded = new Set([".env", ".v3", "dist", "node_modules", "package.json", "build.mjs"]);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const entry of await readdir(root, { withFileTypes: true })) {
  if (excluded.has(entry.name)) continue;
  const source = join(root, entry.name);
  const target = join(out, entry.name === "public" ? "" : entry.name);
  if (entry.name === "public") {
    await cp(source, out, { recursive: true });
  } else {
    await cp(source, target, { recursive: true });
  }
}
