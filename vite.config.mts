import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)

  return {
    //插件配置
    plugins: [
      tsconfigPaths(),
      dts({
        //dts工作根目录, xterio-auth
        root: './',
        entryRoot: './src',
        outDir: ['./dist/es', './dist/lib'],
        // outDir: ['./dist/types'],
        //排除dts操作的目录
        exclude: ['./src/main.ts', './src/__test__'],
        tsconfigPath: './tsconfig.build.json'
      }),
      {
        name: 'vite-plugin-mypackage',
        transform(code, id, options) {
          if (command === 'build' && id.includes('utils/logger')) {
            code = code.replace(/package.json/, '../../package.json')
          }
          return { code }
        }
      },
      svgr()
    ],
    //定义全局变量
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    //打包配置
    build: {
      minify: false,
      outDir: 'dist',
      target: 'es2015',
      //rollup、lib二选一
      rollupOptions: {
        external: [/package\.json/],
        input: ['./src/index.ts'],
        output: [
          {
            format: 'esm',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: './src',
            exports: undefined,
            dir: './dist/es'
            // sourcemap: true
          },
          {
            format: 'commonjs',
            entryFileNames: '[name].js',
            preserveModules: true,
            preserveModulesRoot: './src',
            exports: 'named',
            dir: './dist/lib'
            // sourcemap: true
          }
        ]
      },

      lib: {
        entry: './src/index.ts',
        name: 'MyLib'
        // fileName: 'my-lib',
        // formats: ['es', 'cjs', 'iife', 'umd']
      }
    },

    //开发服务器配置
    server: {}
  }
})
