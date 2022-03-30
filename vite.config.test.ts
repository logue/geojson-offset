import path from 'path';
import { defineConfig } from 'vite';
import viteTestPlugin from 'vite-plugin-test';

export default defineConfig({
  plugins: [
    viteTestPlugin({
      watch: true,
    }),
  ],
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
