# Package Manager

A public catalog of independently versioned plugins for Codex and Claude Code. The repository also contains the Package Manager plugin for discovering, packaging, scheduling, and releasing agent capabilities.

Every listed plugin has public source. Account access and private user data remain in the owning service or local configuration. Proprietary work plugins use their own private marketplaces and are not listed here.

## Install

```bash
codex plugin marketplace add PedroAVJ/package-manager --ref main
codex plugin add writing@package-manager

claude plugin marketplace add PedroAVJ/package-manager
claude plugin install writing@package-manager
```

Use the same `plugin@package-manager` identity for other entries. See [the catalog](MARKETPLACES.md) for categories and capabilities.

## Package Manager skills

- `package-manager:agent-skills` discovers and reviews skills, provenance, and packaging.
- `package-manager:mcp-servers` packages and reconciles MCP capabilities.
- `package-manager:release` validates and publishes plugins with verified client cutovers.
- `package-manager:schedules` creates thin native schedules through the host's supported automation surface.
- `package-manager:sqlite-cache-cli-pattern` designs durable local adapters owned by the corresponding plugin.

A repository may contain an application alongside its plugin. The catalog version identifies only what the agent loads. Product-only releases keep that version unchanged. Larger product repositories expose a self-contained plugin through `git-subdir`.

## Contributing and licensing

Author changes in the owning repository, validate its source, and update this catalog after publication. Public releases must preserve upstream licenses and contain no private records or proprietary source. First-party Package Manager code and guidance are MIT licensed; see [icon provenance](ICON-SOURCES.md) for third-party artwork.
