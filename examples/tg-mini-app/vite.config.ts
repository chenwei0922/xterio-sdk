import react from '@vitejs/plugin-react'
import path from 'path'
import gzipPlugin from 'rollup-plugin-gzip'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __EXAMPLE_ENV__: mode === 'production' ? 'Staging' : 'Dev'
    },
    base: env.VITE_BASE_URL,
    css: {
      preprocessorOptions: {
        scss: {
          // 统一在scss文件中，引入variable 和 mixin文件，减少每个scss文件单独引入
          additionalData:
            '@import "src/styles/base/variable.scss";@import "src/styles/base/extend.scss";@import "src/styles/base/mixin.scss";'
        }
      }
    },
    plugins: [
      react(),
      basicSsl(),
      createHtmlPlugin({
        // minify: true,
        inject: {
          data: {
            // GIT_VERSION: child_process.execSync('git rev-parse --short HEAD').toString().trim()
            GIT_VERSION: ''
          }
        }
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        // 指定symbolId格式
        // symbolId: 'icon-[dir]-[name]',
        inject: 'body-first',
        customDomId: '__svg__icons__dom__'
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/images/**/*',
            dest: 'images'
          },
          {
            src: 'src/icons/**/*',
            dest: 'icons'
          }
          // {
          //   src: 'src/videos/**/*',
          //   dest: 'videos'
          // }
        ]
      })
      // {
      //   name: 'singleHMR',
      //   handleHotUpdate({ modules }) {
      //     modules.map((m) => {
      //       m.importedModules = new Set()
      //       m.importers = new Set()
      //     })

      //     return modules
      //   }
      // }
    ],
    resolve: {
      alias: {
        src: path.resolve('src/')
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除 debugger 打点和 console.log()
          drop_debugger: true,
          // drop_console: true,
          pure_funcs: ['console.log', 'console.info'] //配置移除指定的指令,drop_console 会移除所有日志
        }
      },
      rollupOptions: {
        plugins: [gzipPlugin()] // 启用gzip压缩
      }
    },
    server: {
      // port: 3000,
      // strictPort: true
      // proxy: {
      //   '/api': {
      //     target: 'https://xx.xx.xx ',
      //     changeOrigin: true
      //   }
      // }
    }
  }
})
