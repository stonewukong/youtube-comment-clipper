import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import terser from '@rollup/plugin-terser';

// See https://wxt.dev/api/config.html
export default defineConfig({
  webExt: {
    binaries: {
      firefox: 'firefoxdeveloperedition',
    },
  },
  vite: () => ({
    plugins: [terser(), tailwindcss() as any],
  }),
  manifest: {
    permissions: ['storage', 'tabs'],
    content_security_policy: {
      extension_pages:
        "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline'",
    },
    // manifest: {
    //   browser_specific_settings: {
    //     gecko: {
    //       id: 'youtube-comment-clipper',
    //     },
    //   },
    // },
  },
});
