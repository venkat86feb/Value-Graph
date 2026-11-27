// @ts-check
import { defineConfig } from 'astro/config';

// Static site. Set `site` to the final domain once it is known
// (used for canonical URLs and the sitemap later).
export default defineConfig({
  output: 'static',
  trailingSlash: 'ignore',
});
