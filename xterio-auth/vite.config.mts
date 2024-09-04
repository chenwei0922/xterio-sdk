import { ConfigEnv, defineConfig, loadEnv, Plugin } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

const dtsPlugin = dts({
  //dts工作根目录, xterio-auth
  root: './',
  entryRoot: './src',
  // outDir: ['./dist/es', './dist/lib'],
  outDir: ['./dist/types'],
  // 排除dts操作的目录
  exclude: [],
  aliasesExclude: [/axios/],
  tsconfigPath: './tsconfig.build.json'
})

const packagePlugin: Plugin | undefined = {
  name: 'vite-plugin-mypackage',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'production';
  },
  transform(code, id, options) {
    if (id.includes('xterio-auth/src/utils/logger')) {
      code = code.replace(/package.json/, '../package.json')
    }
    return { code }
  }
}
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)

  return {
    //插件配置
    plugins: [
      tsconfigPaths(),
      dtsPlugin,
      packagePlugin,
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
        external: [/package\.json/, /axios/, /js-cookie/, /js-base64/, /query-string/],
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
        // name: 'XterioAuth'
        // fileName: 'xterio-auth',
        // formats: ['es', 'cjs', 'iife', 'umd']
      }
    },

    //开发服务器配置
    server: {}
  }
})
