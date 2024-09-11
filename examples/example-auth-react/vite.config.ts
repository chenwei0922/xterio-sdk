import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Env } from '@xterio-sdk/auth'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: './',
    plugins: [react()],
    define: {
      __EXAMPLE_ENV__: mode === 'production' ? Env.Staging : Env.Dev
    }
  }
})
