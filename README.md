# Value Graph

Code and content for Venkat's personal website, showcasing work on **Valuable**, an AI layer on top of the **Value Graph**.

Version 1 has two parts:

- **Article (home page):** the LinkedIn article "What does 'customer value' actually mean?".
- **Explore Valuable (`/explore/`):** an interactive demo on fictional ACME Corp accounts payable data. Ask preset questions, click any card to trace it through the seven lenses, and switch between the Value view and the Portfolio (skills) view.

## How content grows

Each article is a **release** of the Value Graph. The demo has a release picker, and every article links to the demo at its release. All graph data is static and fictional or anonymized, so the site has no backend and no live Jira connection.

| What | Where |
| --- | --- |
| Articles (Markdown) | `content/articles/NN-slug.md` |
| List of releases (published and upcoming) | `data/releases.json` |
| Graph snapshot per release | `data/snapshots/release-N.json` |
| Scripted questions and answers per release | `data/questions/release-N.json` |
| Demo component | `src/components/ValueGraph/` |
| Pages | `src/pages/` |
| Site name, author, LinkedIn link | `src/site.ts` |

### Publishing the next article (for example "How are we doing against our KPIs?")

1. Add `content/articles/01-kpis.md`, copying the front matter of article 0 and setting `number: 1` and `release: 1`.
2. Export the full graph for that release to `data/snapshots/release-1.json`. It is a complete snapshot, not a diff. Set `"addedIn": 1` on new cards so the demo marks them "New in this release".
3. Write the scripted questions in `data/questions/release-1.json`.
4. In `data/releases.json`, change release 1 to `"status": "published"` and set `"article": "kpis"`.
5. Run `npm run build`. The data check fails the build if hours don't add up, an edge points to a missing card, or a question highlights a card that doesn't exist.

## Develop

Requires Node 22.

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # data check + type check + static build into dist/
npm run preview    # serve dist/
```

## Deploy

The site is a plain static build (`dist/`), so either host works on the free plan.

- **Vercel:** import the GitHub repository at vercel.com/new. `vercel.json` sets the build command and output folder.
- **Netlify:** "Add new site" → "Import an existing project" → pick the repository. `netlify.toml` sets the build command, output folder and Node version.

Both redeploy automatically on every push to `main` and create preview links for pull requests.
