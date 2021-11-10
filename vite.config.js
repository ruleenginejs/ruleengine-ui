import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'RuleEngineUI',
      fileName: (format) => `ruleengine-ui.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'debounce',
        'splitview.js',
        '@svgdotjs/svg.js'
      ],
      output: {
        globals: {
          vue: 'Vue',
          debounce: 'debounce',
          'splitview.js': 'SplitView',
          '@svgdotjs/svg.js': 'SVG'
        },
        exports: 'named'
      }
    }
  }
})
