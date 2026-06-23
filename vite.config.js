/* global process */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: env.CHAT_API_ENDPOINT || 'https://mock.rag.endpoint',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/chat/, ''),
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (env.CHAT_API_KEY) {
                proxyReq.setHeader('Authorization', `Bearer ${env.CHAT_API_KEY}`);
                proxyReq.setHeader('x-api-key', env.CHAT_API_KEY);
              }
            });
          }
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@mui') || id.includes('@emotion')) {
                return 'vendor-mui';
              }
              if (id.includes('react')) {
                return 'vendor-react';
              }
              return 'vendor'; // other dependencies
            }
          }
        }
      }
    }
  }
})

