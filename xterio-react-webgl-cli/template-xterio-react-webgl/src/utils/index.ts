export const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export const addViewportMeta = () => {
  if (isMobile()) {
    // Mobile device style: fill the whole browser client area with the game canvas:
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content =
      'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
    document.getElementsByTagName('head')[0].appendChild(meta)
  }
}

export const validateConfig = (config) => {
  const requiredFields = ['app_id', 'client_id', 'client_secret', 'pn_app_id']
  requiredFields.forEach((field) => {
    if (!config[field] || config[field].trim() === '') {
      console.error(`Xterio SDK Initial Config Error: ${field} is required and cannot be empty.`)
    }
  })
}
