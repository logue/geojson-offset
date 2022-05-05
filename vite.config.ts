import { defineConfig } from 'vite';
import eslintPlugin from '@modyqyw/vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    // eslint
    // https://github.com/gxmari007/vite-plugin-eslint
    eslintPlugin(),
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
