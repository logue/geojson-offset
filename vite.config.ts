import { defineConfig, type UserConfig } from 'vite';
import eslintPlugin from '@modyqyw/vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
const config: UserConfig = {
  // https://vitejs.dev/config/#server-options
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['..'],
    },
  },
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
};

// Export vite config
export default defineConfig(async ({ command }): Promise<UserConfig> => {
  // Hook production build.
  // Write meta data.
  /*
  fs.writeFileSync(
    path.resolve(path.join(__dirname, 'src/Meta.ts')),
    `import type MetaInterface from '@/interfaces/MetaInterface';

// This file is auto-generated by the build system.
const meta: MetaInterface = {
  version: '${require('./package.json').version}',
  date: '${new Date().toISOString()}',
};
export default meta;
`
  );
  */

  return config;
});