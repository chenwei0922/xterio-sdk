import { ConfigEnv, defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

// to fix pn wasm error
const particleWasmPlugin: Plugin | undefined = {
  name: 'particle-wasm',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'development'
  },
  buildStart: () => {
    const copiedPath = path.join(
      __dirname,
      'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm' //@particle-network/thresh-sig dir
    )
    if (!fs.existsSync(copiedPath)) return
    const dir = path.join(__dirname, 'node_modules/.vite/wasm')
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.copyFileSync(copiedPath, resultPath)
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), particleWasmPlugin]
})
