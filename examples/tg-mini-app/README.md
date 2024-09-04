# Casual Games - 前端落地页模版

## 技术栈

- 前端框架：react (v18+)
- 前端路由：react-router (v6.3)
- 打包工具：vite (v5.0)
- UI 组件库：antd (v4.22)
- 样式处理：scss (v1.54)
- 状态管理：Mobx (v6)
- 数据请求：axios + useRequest
- 通用 hooks：ahooks(v3)
- 图表 echarts(v5)
- 关系图 @antv/g6(v4)
- 命令行生成模板代码 plop（v3）

## Node 版本要求

required node version >= v16.0

## 脚本命令

项目中可以运行如下脚本:

### `npm run dev`

以开发模式运行项目，打开 [http://127.0.0.1:5173/ ](http://127.0.0.1:5173/) 进行浏览

### `npm run build`

打包构建应用于生产环境的文件到 `dist` 目录下.\
经过优化压缩等的代码文件可以直接部署到生产环境。\

### `npm preview`

本地预览 build 后生成的生产构建产物

### `npm run build:pre`

打包构建应用于与上线（测试）环境的文件到 `dist` 目录下.\
经过优化压缩等的代码文件可以直接部署到生产环境。

### `npm run preview:pre`

本地预览 build:pre 后生成的生产构建产物

### `npm run lint`

对 src 目录下的文件进行 eslint 检查

### `npm run prettier`

对 src 目录下的文件进行 prettier 格式化，格式化设置依照 .prettierrc.js 中的配置进行。

### `npm run plop`

按模板和输入命令自动生成模板代码。
npm run plop components - 自动生成组件模板代码
npm run plop controller - 自动生成 store、 service 层代码

### `npm run svgo`

对 src/icons/svg 目录下的 svg 图标文件进行压缩，减少打包体积，build 命令脚本已集成该命令一般不需要单独运行该命令.
