const webGLBasePath = '/WebGL/Build'
const webGLAssetPath = '/WebGL/StreamingAssets'

export const appConfig = {
  companyName: 'DefaultCompany',
  productName: 'unity-2d-demo',
  productVersion: '1.0',
  loaderUrl: `${webGLBasePath}/WEBGL.loader.js`,
  dataUrl: `${webGLBasePath}/WEBGL.data`,
  frameworkUrl: `${webGLBasePath}/WEBGL.framework.js`,
  codeUrl: `${webGLBasePath}/WEBGL.wasm`
  // streamingAssetsUrl: `${webGLAssetPath}/`,
}
