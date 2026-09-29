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
  "Productivity": [
    "linear",
    "macos",
    "models",
    "near",
    "notion",
    "rappi",
    "writing"
  ],
  "Developer Tools": [
    "ast-grep",
    "azure",
    "convex",
    "expo",
    "github",
    "google-cloud",
    "ios",
    "lsp",
    "package-manager",
    "sentry",
    "vercel"
  ],
  "Communication": [
    "whatsapp"
  ]
};

const allPlugins = Object.values(categories).flat().sort();
const codexOnly = new Set();
const claudeOnly = new Set();
const expectedCodex = allPlugins.filter((name) => !claudeOnly.has(name));
const expectedClaude = allPlugins.filter((name) => !codexOnly.has(name));
const allEntries = [...codex.plugins, ...claude.plugins.filter(({ name }) => claudeOnly.has(name))];

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
  assert.equal(new Set(allPlugins).size, allPlugins.length, "one primary category per plugin");
  assert.deepEqual([...new Set(allEntries.map(({ category }) => category))].sort(), Object.keys(categories).sort());

  for (const [category, names] of Object.entries(categories)) {
    const actual = allEntries
      .filter((entry) => entry.category === category)
      .map((entry) => entry.name)
      .sort();
    assert.deepEqual(actual, [...names].sort(), category);
  }
});

test("the documented map matches both catalogs without missing members or count drift", () => {
  const map = readFileSync(join(root, "MARKETPLACES.md"), "utf8");
  const rows = [...map.matchAll(/^\| \*\*([^*]+)\*\* \| (\d+) \| (.+) \|$/gm)];
  assert.equal(rows.length, Object.keys(categories).length);
  const documented = new Map();
  let previousCount = Infinity;
  for (const [, category, count, members] of rows) {
    assert.ok(Object.hasOwn(categories, category), `unknown category: ${category}`);
    const names = [...members.matchAll(/`([a-z0-9-]+)`/g)].map((match) => match[1]);
    assert.equal(names.length, Number(count), category);
    assert.ok(Number(count) <= previousCount, "categories are ordered by member count");
    previousCount = Number(count);
    assert.deepEqual([...names].sort(), [...categories[category]].sort(), category);
    for (const name of names) {
      assert.equal(documented.has(name), false, `duplicate membership: ${name}`);
      documented.set(name, category);
    }
  }
  for (const [marketplace, expected] of [[codex, expectedCodex], [claude, expectedClaude]]) {
    assert.equal(marketplace.plugins.length, expected.length);
    for (const { name, category } of marketplace.plugins) assert.equal(category, documented.get(name), name);
  }
  assert.ok(map.includes(`${documented.size} plugins in ${rows.length} categories`));
  for (const name of claudeOnly) assert.match(map, new RegExp("`" + name + "` is Claude-only"));
});

test("shared plugins keep source and category metadata synchronized", () => {
  const claudeByName = new Map(claude.plugins.map((entry) => [entry.name, entry]));
  const sparseSources = new Map([
    ["sentry", "./plugins/sentry"]
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
    // Near public profiles need no sign-in; private access is configured on use.
    assert.equal(entry.policy?.authentication, entry.name === "near" ? "ON_USE" : "ON_INSTALL");

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
  for (const name of claudeOnly) {
    assert.equal(codex.plugins.find((entry) => entry.name === name), undefined, `${name} is Claude-only`);
    const entry = claudeByName.get(name);
    assert.ok(entry, `${name} is missing from Claude's catalog`);
    assert.equal(entry.source?.source, "url");
    assert.equal(entry.source?.ref, "main");
  }
});

test("entries are unique, versioned, and point at PedroAVJ repositories", () => {
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
  assert.equal(a.category, "Productivity");
  assert.equal(a.policy.installation, "INSTALLED_BY_DEFAULT");
  assert.equal(a.version, b.version);
  assert.equal(a.description, b.description);
});

test("the marketplace contains no copied plugin implementations", () => {
  assert.equal(existsSync(join(root, "plugins")), false);
});

test("only the documented private sources are listed", () => {
  const privateSources = new Map([
    ["linear", "linear-graphql"],
    ["notion", "notion"],
    ["near", "near-plugin"],
    ["expo", "expo"],
    ["github", "github"],
    ["vercel", "vercel"],
    ["convex", "convex"]
  ]);
  const map = readFileSync(join(root, "MARKETPLACES.md"), "utf8");
  for (const [name, repository] of privateSources) {
    const entry = codex.plugins.find((plugin) => plugin.name === name);
    assert.equal(entry?.source.url, `https://github.com/PedroAVJ/${repository}.git`, name);
    assert.match(map, new RegExp("`PedroAVJ/" + repository + "`"));
  }
  const readme = readFileSync(join(root, "README.md"), "utf8");
  for (const name of privateSources.keys()) assert.match(readme, new RegExp("`" + name + "`"));
});
