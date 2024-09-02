import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import type { ConfigEnv, Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

const particleWasmPlugin: Plugin | undefined = {
  name: 'particle-wasm',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'development';
  },
  buildStart: () => {
    const copiedPath = path.join(
      __dirname,
      'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm' //@particle-network/thresh-sig dir
    );
    const dir = path.join(__dirname, 'node_modules/.vite/wasm');
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    console.log('copiedPath:', copiedPath)
    console.log('resultPath:', resultPath)
    fs.copyFileSync(copiedPath, resultPath);
  },
};

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(mode, '=', env)
  console.log('command=', command)

  return {
    plugins: [tsconfigPaths(), react(), particleWasmPlugin],
    resolve: {
      alias: {
        buffer: 'buffer',
      },
    },
  }
})
