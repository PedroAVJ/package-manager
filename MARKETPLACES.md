# Plugin catalog

Plugins are programs. Each is independently versioned in its own repository. The catalog version identifies the agent-loadable plugin contract. Product-only releases preserve the plugin version and do not refresh installed clients.

Package Manager is the marketplace at `PedroAVJ/package-manager`. The catalog repository is public; its two client catalogs point at external plugin repositories. Categories are metadata inside the catalog, not separate marketplaces. Qualified identities use `plugin@package-manager`.

Most listed plugins have public source. `linear`, `notion`, and `near` install from private repositories (`PedroAVJ/linear-graphql`, `PedroAVJ/notion`, and `PedroAVJ/near-plugin`), so installing them requires GitHub access to those repositories. A public plugin must not depend on a private one. Codex and Claude manifests are client compatibility surfaces within the marketplace, not a functional marketplace split. Near supports separately configured private context; it ships no person's records.

Named AI employee role plugins live in the separate private `PedroAVJ/agents` marketplace. The former private `PedroAVJ/apps` marketplace is no longer configured in either client; its remaining plugins moved here or were retired.

## Category naming rule

Use a familiar name for the primary job the plugin performs. Prefer established App Store terminology when it fits; introduce a custom category only when the existing vocabulary does not describe the job. Vendor, platform, and implementation method do not determine membership.

Assign one primary category after reviewing the plugin's actual skills. Compare a new entry with the purposes below before adding a category. Split a category when its meaning becomes unclear, not when it reaches a fixed member count. Display names and stable plugin identifiers are separate from category membership.

| Category | Count | Plugins |
| --- | ---: | --- |
| **Developer Tools** | 10 | `ios`, `sentry`, `google-cloud`, `toolchain`, `package-manager`, `ast-grep`, `lsp`, `typescript-lsp`, `python-lsp`, `bash-lsp` |
| **Productivity** | 8 | `calendar`, `reminders`, `notes`, `voice-memos`, `icloud`, `writing`, `linear`, `notion` |
| **AI** | 5 | `chatgpt`, `claude`, `codex`, `elevenlabs`, `openrouter` |
| **Communication** | 4 | `contacts`, `gmail`, `messages`, `whatsapp` |
| **Media** | 2 | `youtube`, `youtube-music` |
| **Utilities** | 2 | `macbook`, `apple-passwords` |
| **Finance** | 1 | `sat` |
| **Shopping** | 1 | `rappi` |
| **Memory** | 1 | `near` |

34 plugins in 9 categories. Native apps and services within a plugin repository are not counted as separate plugins. The table uses stable installation identifiers; `macbook` and `apple-passwords` display as macOS and Passwords.

## Category purposes

- **Productivity:** organize time, documents, files, notes, tasks, and written work. iCloud belongs here because the plugin operates personal files.
- **Developer Tools:** build, operate, diagnose, and release software and its infrastructure. Google Cloud belongs here because of the development work its plugin performs. The ast-grep and language-server navigation plugins belong here because they search and navigate source code.
- **AI:** use, generate with, or operate AI assistants and models. Codex belongs here even though software development is a common use.
- **Communication:** manage people, messages, and mail.
- **Media:** manage playback and media libraries, including educational content and work-session audio.
- **Finance:** manage tax work.
- **Shopping:** prepare purchases and orders.
- **Utilities:** operate the host environment and credentials. The macOS and Passwords plugins belong here because they provide general system utilities.
- **Memory:** retrieve and maintain separately configured personal context. Near's placement describes its current context-repository scope and should be reviewed if that scope changes.

## Keep the map consistent

A category change updates this map, both client catalogs, the owning Codex plugin manifest, and the category checks in the same release. `npm test` checks exact membership, allowed category names, uniqueness, counts, and agreement between this document and both catalogs. It enforces the approved map; reviewing the primary job remains the author and reviewer's responsibility.
