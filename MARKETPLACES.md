# Plugin catalog

Plugins are programs. Each is independently versioned in its own repository. The catalog version identifies the agent-loadable plugin contract. Product-only releases preserve the plugin version and do not refresh installed clients.

Package Manager is the marketplace at `PedroAVJ/package-manager`. The catalog repository is public; its two client catalogs point at external plugin repositories. Categories are metadata inside the catalog, not separate marketplaces. Qualified identities use `plugin@package-manager`.

Most listed plugins have public source. `linear`, `notion`, and `near` install from private repositories (`PedroAVJ/linear-graphql`, `PedroAVJ/notion`, and `PedroAVJ/near-plugin`), so installing them requires GitHub access to those repositories. A public plugin must not depend on a private one. Codex and Claude manifests are client compatibility surfaces within the marketplace, not a functional marketplace split. `models` ships different skills to each client through its two manifests. Near supports separately configured private context; it ships no person's records.

Named AI employee role plugins live in the separate private `PedroAVJ/agents` marketplace. The former private `PedroAVJ/apps` marketplace is no longer configured in either client; its remaining plugins moved here or were retired.

The new `openai-docs`, `link`, and `hatch-pet` sources are private (`PedroAVJ/openai-docs`, `PedroAVJ/link`, `PedroAVJ/hatch-pet`); their publication visibility has not been broadened during the migration. `hatch-pet` is Codex-only because its workflow depends on Codex pet and image-generation surfaces.

## Category naming rule

Follow the category vocabulary of the official Anthropic and OpenAI plugin marketplaces, not App Store names. Choose the name from that vocabulary that fits the primary job the plugin performs; introduce a category outside it only when the existing vocabulary does not describe the job. Vendor, platform, and implementation method do not determine membership.

Assign one primary category after reviewing the plugin's actual skills. Compare a new entry with the purposes below before adding a category. Split a category when its meaning becomes unclear, not when it reaches a fixed member count. Display names and stable plugin identifiers are separate from category membership.

| Category | Count | Plugins |
| --- | ---: | --- |
| **Productivity** | 8 | `linear`, `link`, `macos`, `models`, `near`, `notion`, `rappi`, `writing` |
| **Developer Tools** | 8 | `ast-grep`, `google-cloud`, `ios`, `lsp`, `openai-docs`, `package-manager`, `sentry`, `toolchain` |
| **Communication** | 1 | `whatsapp` |
| **Creativity** | 1 | `hatch-pet` |

18 plugins in 4 categories. Native apps and services within a plugin repository are not counted as separate plugins.

## Category purposes

- **Productivity:** organize time, documents, files, notes, tasks, and written work, and run the personal assistants, context, credentials, host, and errands that support it. Models belongs here because it reaches other models for second opinions, images, and transcription. macOS belongs here because it operates the Mac's own apps, files, credentials, and host. Near belongs here because it retrieves separately configured personal context. Rappi belongs here because it prepares personal orders.
- **Developer Tools:** build, operate, diagnose, and release software and its infrastructure. Google Cloud belongs here because of the development work its plugin performs. It also owns Google's Workspace CLI (gws), Gmail, and YouTube surfaces because they share Google's OAuth client and CLI substrate; the former `gmail` and `youtube` plugins merged into it. The ast-grep and language-server navigation plugins belong here because they search and navigate source code.
- **Communication:** manage people and messages.

- **Creativity:** create and refine visual assets, including animated pets.

## Keep the map consistent

A category change updates this map, both client catalogs, the owning Codex plugin manifest, and the category checks in the same release. `npm test` checks exact membership, allowed category names, uniqueness, counts, and agreement between this document and both catalogs. It enforces the approved map; reviewing the primary job remains the author and reviewer's responsibility.
