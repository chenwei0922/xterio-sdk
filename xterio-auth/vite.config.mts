import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)

  return {
    //插件配置
    plugins: [tsconfigPaths()],
    //定义全局变量
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    //打包配置
    build: {},

    //开发服务器配置
    server: {
    }
  }
})
