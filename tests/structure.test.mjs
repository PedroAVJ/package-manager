import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));
const expected = {
  "name": "package-manager",
  "version": "0.2.2",
  "url": "https://github.com/PedroAVJ/package-manager",
  "dependencies": []
};

async function json(...parts) {
  return JSON.parse(await readFile(join(root, ...parts), "utf8"));
}

test("standalone plugin metadata is synchronized", async () => {
  const codex = await json(".codex-plugin", "plugin.json");
  assert.equal(codex.name, expected.name);
  assert.equal(codex.version, expected.version);
  assert.equal(codex.homepage, expected.url);
  assert.equal(codex.repository, expected.url);
  assert.equal(codex.interface.category, "Developer Tools");
  assert.equal(codex.interface.brandColor, "#000000");
  assert.equal(codex.interface.composerIcon, "./assets/agent-plugins-glyph.svg");
  assert.equal(codex.interface.logo, "./assets/agent-plugins-glyph.svg");
  const icon = await readFile(join(root, "assets", "agent-plugins-glyph.svg"));
  assert.ok(icon.length > 0);
  assert.match(icon.toString("utf8"), /^<svg\b/);
  const desktopIcon = await readFile(join(root, "assets", "agent-plugins-desktop-icon.svg"));
  assert.match(desktopIcon.toString("utf8"), /^<svg\b/);
  assert.match(desktopIcon.toString("utf8"), /Finder-safe neutral tile/);
  const desktopPng = await readFile(join(root, "assets", "agent-plugins-desktop-icon.png"));
  assert.deepEqual([...desktopPng.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  await access(join(root, "README.md"));
  await access(join(root, "AGENTS.md"));
  await access(join(root, "ICON-SOURCES.md"));

  if (expected.codexOnly) {
    await assert.rejects(access(join(root, ".claude-plugin", "plugin.json")));
  } else {
    const claude = await json(".claude-plugin", "plugin.json");
    assert.equal(claude.name, codex.name);
    assert.equal(claude.version, codex.version);
    assert.equal(claude.homepage, expected.url);
    assert.equal(claude.repository, expected.url);
    for (const dependency of expected.dependencies) {
      assert.ok((claude.dependencies ?? []).includes(dependency));
    }
  }

  const pkg = await json("package.json");
  assert.equal(pkg.version, expected.version);
  assert.equal(pkg.homepage, expected.url + "#readme");
  assert.equal(pkg.repository.url, "git+" + expected.url + ".git");

  const marketplace = await json(".claude-plugin", "marketplace.json");
  const catalogEntry = marketplace.plugins.find(({ name }) => name === expected.name);
  assert.equal(catalogEntry?.version, expected.version);
  assert.equal(catalogEntry?.source?.url, expected.url + ".git");
});
