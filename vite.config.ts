import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
// import { analyzer } from 'vite-bundle-analyzer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // analyzer(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'Block Pop',
        short_name: 'BlockPop',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // devOptions: {
      //   enabled: true,
      // },
    }),
  ],
  base: 'block-pop',
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    BUILD_DATE: JSON.stringify(new Date().toLocaleDateString('en-CA')),
  },
});
