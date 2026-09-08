import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const schedules = await readFile(join(root, "skills", "schedules", "SKILL.md"), "utf8");

test("cross-source schedule example keeps the owning skills", () => {
  assert.match(schedules, /\$gmail:review-inbox-hygiene/);
  assert.match(schedules, /\$whatsapp:review-inbox-hygiene/);
  assert.match(schedules, /\$messages:review-inbox-hygiene/);
  assert.match(schedules, /previous 24 hours by received\/message time/);
  assert.match(schedules, /unified, read-only cross-source hygiene/);
});
