import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const json = (path) => JSON.parse(readFileSync(path, "utf8"));
const codex = json(join(root, ".agents/plugins/marketplace.json"));
const claude = json(join(root, ".claude-plugin/marketplace.json"));

const categories = {
  AI: ["chatgpt", "claude", "elevenlabs", "openrouter"],
  Cloud: ["azure", "google-cloud", "icloud", "neon"],
  Communication: ["contacts", "gmail", "messages", "telcel", "whatsapp"],
  "Developer Tools": ["codex", "ios", "sentry"],
  Drivers: ["macbook"],
  Finance: ["bbva", "sat"],
  Health: ["near", "rp-strength"],
  Media: ["youtube", "youtube-music"],
  Productivity: [
    "apple-passwords",
    "google-docs",
    "samsung-tv",
    "calendar",
    "notes",
    "reminders",
    "voice-memos",
  ],
  Shopping: ["amazon", "rappi"],
  System: ["package-manager", "toolchain", "writing"],
};

const expectedCodex = Object.values(categories).flat().sort();
const codexOnly = new Set();
const expectedClaude = expectedCodex.filter((name) => !codexOnly.has(name));

test("Package Manager contains every semantic category", () => {
  assert.equal(codex.name, "package-manager");
  assert.equal(codex.interface?.displayName, "Package Manager");
  assert.equal(claude.name, "package-manager");
  assert.equal(
    claude.$schema,
    "https://json.schemastore.org/claude-code-marketplace.json",
  );
  assert.deepEqual(codex.plugins.map(({ name }) => name).sort(), expectedCodex);
  assert.deepEqual(claude.plugins.map(({ name }) => name).sort(), expectedClaude);

  for (const [category, names] of Object.entries(categories)) {
    const actual = codex.plugins
      .filter((entry) => entry.category === category)
      .map((entry) => entry.name)
      .sort();
    assert.deepEqual(actual, [...names].sort(), category);
  }
});

test("shared plugins keep source and category metadata synchronized", () => {
  const claudeByName = new Map(claude.plugins.map((entry) => [entry.name, entry]));
  const sparseSources = new Map([
    ["near", "./plugins/near"],
    ["sentry", "./plugins/sentry"],
  ]);
  for (const entry of codex.plugins) {
    if (sparseSources.has(entry.name)) {
      assert.equal(entry.source?.source, "git-subdir");
      assert.equal(entry.source?.path, sparseSources.get(entry.name));
    } else {
      assert.equal(entry.source?.source, "url");
      assert.equal(entry.source?.path, undefined);
    }
    assert.match(entry.source?.url, /^https:\/\/[^/]+\/.+/);
    assert.equal(entry.source?.ref, "main");
    assert.ok(["AVAILABLE", "INSTALLED_BY_DEFAULT"].includes(entry.policy?.installation));
    assert.equal(entry.policy?.authentication, "ON_INSTALL");

    const counterpart = claudeByName.get(entry.name);
    if (codexOnly.has(entry.name)) {
      assert.equal(counterpart, undefined);
      continue;
    }
    assert.ok(counterpart, `${entry.name} is missing from Claude's catalog`);
    assert.deepEqual(counterpart.source, entry.source);
    assert.equal(counterpart.category, entry.category);
    assert.equal(typeof counterpart.version, "string");
  }
});

test("public entries are unique, versioned, and have public-source shapes", () => {
  for (const marketplace of [codex, claude]) {
    const names = marketplace.plugins.map(p => p.name);
    assert.equal(new Set(names).size, names.length);
    for (const entry of marketplace.plugins) {
      assert.match(entry.version, /^\d+\.\d+\.\d+(?:[-+].+)?$/);
      assert.match(entry.source.url, /^https:\/\/github\.com\/PedroAVJ\/[^/]+\.git$/);
      assert.ok(entry.description.trim().length > 20);
    }
  }
});

test("Writing remains installed by default with synchronized discovery", () => {
  const a = codex.plugins.find(p => p.name === "writing");
  const b = claude.plugins.find(p => p.name === "writing");
  assert.equal(a.category, "System");
  assert.equal(a.policy.installation, "INSTALLED_BY_DEFAULT");
  assert.equal(a.version, b.version);
  assert.equal(a.description, b.description);
});

test("the marketplace contains no copied plugin implementations", () => {
  assert.equal(existsSync(join(root, "plugins")), false);
});
