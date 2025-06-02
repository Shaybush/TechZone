import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

const rootDir = path.join(__dirname, '../../');

export default defineConfig(({ mode }) => {
  // Load env file based on `mode`
  const env = loadEnv(mode, rootDir, '');

  return {
    root: `${process.cwd()}/src`,
    plugins: [react()],
    publicDir: './public',
    server: {
      open: true,
      port: Number(env.VITE_PORT) || 3005,
      strictPort: true,
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
      },
    },
    envDir: rootDir, // optional — can remove if .env files are in the root
    clearScreen: false,
    logLevel: 'info',
    cacheDir: '../node_modules/.cache/vite',
    build: {
      outDir: '../dist',
      sourcemap: true,
      minify: 'esbuild',
      target: 'esnext',
      manifest: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 500,
      assetsDir: 'main',
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      cssMinify: 'esbuild',
    },
    preview: { port: Number(env.VITE_PORT) || 3005, strictPort: true, open: false },
    css: {
      modules: {
        generateScopedName:
          mode === 'development' ? '[name].[local].[hash:base64:3]' : '[hash:base64:7]',
        localsConvention: 'camelCaseOnly',
      },
      devSourcemap: true,
      transformer: 'postcss',
    },
  };
});
