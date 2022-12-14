import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // vite-plugin-checker
    // https://github.com/fi3ework/vite-plugin-checker
    checker({
      typescript: true,
      vueTsc: false,
      eslint: {
        lintCommand: `eslint . --fix --cache --cache-location ./node_modules/.vite/vite-plugin-eslint`, // for example, lint .ts & .tsx
      },
    }),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/geojson-offset.ts', import.meta.url)),
      name: 'geojson-offset',
      fileName: format => `geojson-offset.${format}.js`,
    },
    target: 'esnext',
    minify: false,
  },
});
