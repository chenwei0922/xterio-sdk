/**
 * 兼容Vite生产模式下路径有效性。将 "/src" 或 "src" 开头的图片路径转为项目打包后的路径
 * @param path
 * @returns
 */
export const parseImageUrl = (path) => {
  try {
    if (!path) return ''
    const imagePath =
      !import.meta.env.BASE_URL || import.meta.env.BASE_URL === '/' ? path : `${import.meta.env.BASE_URL}${path}`
    // import.meta.env.BASE_URL
    // console.warn('未传入路径参数path')

    return new URL(imagePath.replace('/src', '').replace('src', ''), import.meta.url).href
  } catch (error) {
    return ''
  }
}

/**
 * 兼容Vite生产模式下路径有效性。将 "/src" 或 "src" 开头的资源路径转为项目打包后的路径
 * @param path
 * @returns
 */
export const parseAssetsUrl = (path) => {
  if (!path) return ''
  const assetsPath =
    !import.meta.env.BASE_URL || import.meta.env.BASE_URL === '/' ? path : `${import.meta.env.BASE_URL}${path}`
  // import.meta.env.BASE_URL
  // console.warn('未传入路径参数path')

  return new URL(assetsPath.replace('/src', '').replace('src', ''), import.meta.url).href
}
