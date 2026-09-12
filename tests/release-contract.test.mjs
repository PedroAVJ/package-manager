import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("..", import.meta.url));

test("Package Manager owns releases through one categorized marketplace", () => {
  const release = readFileSync(join(root, "skills/release/SKILL.md"), "utf8");
  assert.match(release, /category.*Productivity.*Developer Tools.*AI.*Communication.*Media.*Finance.*Shopping.*Utilities.*Health & Fitness.*Memory/is);
  assert.match(release, /primary job the plugin performs/is);
  assert.match(release, /established App Store terminology/is);
  assert.match(release, /Vendor, platform, and implementation method do not determine membership/is);
  assert.match(release, /one primary\s+category per plugin/is);
  assert.match(release, /Split a category when its meaning becomes unclear, not at a fixed member count/is);
  assert.match(release, /canonical map, both catalogs, the owning Codex manifest, and category\s+checks together/is);
  assert.match(release, /claude@package-manager.*both clients/is);
  assert.match(release, /inside Claude\s+Code.*without spawning a\s+nested Claude CLI/is);
  assert.match(release, /com\.pedro\.claude-remote-control/);
  assert.match(release, /PedroAVJ\/package-manager/);
  assert.match(release, /Install-first cutover/i);
  assert.match(release, /Preserve credential service IDs/i);
  assert.match(release, /external plugin repository/i);
  assert.match(release, /Program icon contract/i);
  assert.match(release, /ICON-SOURCES\.md/);
  assert.match(release, /interface\.composerIcon.*interface\.logo/is);
  assert.match(release, /authoritative remote default branch is canonical source/i);
  assert.match(release, /Do\s+not require or maintain a permanent `~\/Developer\/<repository>` checkout/is);
  assert.match(release, /independent task-specific ephemeral clone/i);
  assert.match(release, /Use `toolchain:resource-hygiene` for cleanup eligibility/i);
  assert.match(release, /versioned caches.*runtime artifacts/is);
  assert.match(release, /Ignored repository environments are disposable projections/i);
  assert.match(release, /Vercel Environment Variables.*Expo EAS Environment Variables.*Azure/is);
  assert.match(release, /inject variables without writing a file/i);
  assert.match(release, /Compare\s+environment-variable names.*without printing values/is);
  assert.match(release, /do not preserve\s+task-scoped database branch metadata or OIDC tokens/is);
  assert.match(release, /committed asset is the only required icon source of truth/i);
  assert.match(release, /no persistent Finder folder or machine-local resource fork is required/i);
  assert.match(release, /Do not open Finder or\s+invoke\s+Computer Use solely/i);
  assert.match(release, /Keep routine release verification non-GUI/i);
  assert.match(release, /Remove released task clones/i);
  assert.match(release, /permanently remove only an exact checkout proven obsolete/i);
  assert.match(release, /Preserve uncertain state in place/i);
  assert.doesNotMatch(release, /Trash/i);
  assert.match(release, /exact remote refs and commit SHAs.*clean status.*no active process/is);
  assert.match(release, /There is no canonical local read copy to synchronize/i);
  assert.match(release, /contains unpublished, dirty, or uncertain state, leave it in place/i);
  assert.match(release, /Release impact gate/i);
  assert.match(release, /git diff --name-status <baseline>[\s\S]*git status --short/is);
  assert.match(release, /Repository co-location and a new Git commit are not reasons to bump a\s+plugin version/is);
  assert.match(release, /Product-only release:[\s\S]*preserve the Codex and Claude plugin manifests/is);
  assert.match(release, /do not refresh marketplaces, reinstall either client plugin, or repoint a\s+plugin CLI shim/is);
  assert.match(release, /Mixed or ambiguous release:[\s\S]*do not guess from directory names alone/is);
  assert.match(release, /PedroAVJ\/apps/);
  assert.match(release, /PedroAVJ\/agents/);
  assert.match(release, /For a product-only release[\s\S]*do not update the selected marketplace catalog or either installed plugin/is);
  assert.match(release, /ordinary request to make or create a plugin means a complete Git-backed/is);
  assert.match(release, /Do not create or register `~\/plugins\/<plugin>`[\s\S]*`plugin@personal`/is);
  assert.match(release, /install and verify the fully qualified identity/is);
  assert.match(release, /local scaffold is only an implementation draft/is);
});

test("the canonical catalog map records exact standalone ownership", () => {
  const map = readFileSync(join(root, "MARKETPLACES.md"), "utf8");
  assert.match(map, /Plugins are programs/);
  assert.match(map, /catalog version identifies the\s+agent-loadable plugin contract/is);
  assert.match(map, /Product-only releases preserve the plugin version/is);
  assert.match(map, /categories\s+are metadata/i);
  assert.match(map, /plugin@package-manager/);
  for (const name of ["AI", "Communication", "Developer Tools", "Finance", "Health & Fitness", "Media", "Memory", "Productivity", "Shopping", "Utilities"]) {
    assert.match(map, new RegExp("\\*\\*" + name + "\\*\\*"));
  }
  for (const qualified of [
    "chatgpt.*claude.*codex.*elevenlabs.*openrouter",
    "ios.*sentry.*neon.*azure.*google-cloud.*toolchain.*package-manager",
    "contacts.*gmail.*messages.*whatsapp",
    "toolchain",
    "calendar.*reminders.*notes.*voice-memos.*google-docs.*icloud.*writing",
    "youtube.*youtube-music",
    "amazon.*rappi",
    "near",
    "rp-strength",
    "macbook.*apple-passwords",
    "bbva.*sat",
  ]) assert.match(map, new RegExp(qualified));
});


test("skill authoring uses the canonical category map", () => {
  const skill = readFileSync(join(root, "skills/agent-skills/SKILL.md"), "utf8");
  const target = skill.match(/\[the canonical category map\]\(([^)]+)\)/)?.[1];
  assert.ok(target, "authoring must reference the category authority");
  assert.equal(readFileSync(join(root, "skills/agent-skills", target), "utf8"), readFileSync(join(root, "MARKETPLACES.md"), "utf8"));
  assert.doesNotMatch(skill, /^- \*\*(?:Cloud|Drivers|Health|System)\*\*\s+[—–-]/m, "retired category guidance must not return");
});
