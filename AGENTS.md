# Repository guidance

- This repository is the canonical source for the public `package-manager` plugin and the `package-manager` catalog.
- Keep `.agents/plugins/marketplace.json` and `.claude-plugin/marketplace.json` synchronized under `package-manager`.
- Catalog entries point at independently versioned plugin repositories. Most are public; the private sources (`linear`, `notion`, `near`) are named in `MARKETPLACES.md` and the tests. Adding another private source requires the same documentation. Do not duplicate runtime implementations into the catalog.
- Named AI employee role plugins belong in the private `agents` marketplace and stay out of this catalog. The former `apps` marketplace is retired.
- Use the established owner and marketplace for a new plugin. An existing public plugin stays public. Unclear or unauthorized visibility stays private until settled. A temporary local namespace requires an explicit request.
- Use `git-subdir` for a self-contained plugin inside a larger product repository. Do not ship private state with any public payload.
- Categories describe the primary job the plugin performs. Follow the naming rule and category purposes in `MARKETPLACES.md`; vendor, platform, and implementation method do not determine membership. Keep the exact map, both catalogs, owning manifests, and category checks synchronized.
- Preserve stable command names, service labels, and credential identifiers. Keep user configuration, credentials, messages, schedules, and private profiles outside Git.
- Preserve upstream licenses and artwork provenance. Audit payload, history, and repository metadata before publication.
- Run the release-impact gate. Bump versions only for agent-loadable behavior; a product-only deployment preserves plugin/catalog versions. Validate before release.
