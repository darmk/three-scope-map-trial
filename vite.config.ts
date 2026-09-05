import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => ({
  // 部署时的一级路由前缀，需与 Nginx location 路径一致
  // 优先读取环境变量 VITE_BASE，未设置时默认 '/threeScopeMapTrial/'
  base: process.env.VITE_BASE || '/threeScopeMapTrial/',
  plugins: [vue()],
  build: {
    // three/gsap 体积大且几乎不变，单独分包便于浏览器长期缓存
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
          vue: ['vue'],
        },
      },
    },
    chunkSizeWarningLimit: 3000,
  },
}));
