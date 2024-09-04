/// <reference types="vite/client" />

// 新增 env 变量需要在如下定义，便于获取ts 智能提示
interface ImportMetaEnv {
  readonly VITE_API_ROOT: string
  readonly VITE_INVITE_BOT_LINK: string
  readonly VITE_TEL_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
