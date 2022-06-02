import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // vite-plugin-checker
    // https://github.com/fi3ework/vite-plugin-checker
    checker({
      typescript: true,
      vueTsc: false,
      eslint: {
        lintCommand: `eslint`, // for example, lint .ts & .tsx
      },
    }),
  ],
  // Build Options
  // https://vitejs.dev/config/#build-options
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/geojson-offset.ts'),
      name: 'geojson-offset',
      fileName: format => `geojson-offset.${format}.js`,
    },
    target: 'es2021',
    // Minify option
    // https://vitejs.dev/config/#build-minify
    /*
    minify: 'terser',
    terserOptions: {
      ecma: 2020,
      compress: { drop_console: true },
      mangle: true, // Note `mangle.properties` is `false` by default.
      module: true,
      output: { comments: true, beautify: false },
    },
    */
  },
});
