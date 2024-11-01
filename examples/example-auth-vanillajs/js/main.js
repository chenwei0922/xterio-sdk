document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('loginButton')
  const logoutButton = document.getElementById('logoutButton')
  const loginSection = document.querySelector('section.login-btn')
  const userInfoSection = document.querySelector('section.login-info')
  const userName = document.getElementById('userName')
  const userEmail = document.getElementById('userEmail')
  const openTopup = document.getElementById('openTopup')
  const openFiatTopup = document.getElementById('openFiatTopup')

  let loginState = { isLogin: false, userInfo: null }

  function displayUserInfo(userInfo) {
    loginSection.style.display = 'none'
    userInfoSection.style.display = 'flex'
    userName.textContent = userInfo.username || ''
    userEmail.textContent = userInfo.email || ''
  }

  function displayLoginSection() {
    loginSection.style.display = 'flex'
    userInfoSection.style.display = 'none'
  }

  // init auth sdk
  const redirect_uri = 'http://localhost:3001/'
  const client_id = '4gsmgur6gkp8u9ps8dlco3k7eo'
  const client_secret = 'ABC23'
  const app_id = ''
  XterioAuth.XterioAuth.init({ app_id, client_id, client_secret, redirect_uri }, 'Dev') //ENV:'Dev','Staging','Production'

  // call useLoginModal
  const { open, logout } = XterioAuth.useXterLoginModal({
    onLoginStateChange: (isLogin, userInfo) => {
      loginState = { isLogin, userInfo }
      console.log({ isLogin, userInfo })
      if (isLogin) {
        displayUserInfo(userInfo)
      }
    }
  })

  // login: use open modal method
  loginButton.addEventListener('click', function () {
    if (typeof XterioAuth !== 'undefined' && XterioAuth.useXterLoginModal) {
      open()
    } else {
      console.error('XterSDK not found or openLoginModal method not available')
      alert('Unable to open login modal. Please check if XterSDK is properly loaded.')
    }
  })

  // logout
  logoutButton.addEventListener('click', function () {
    if (typeof XterioAuth !== 'undefined' && logout) {
      logout()
      displayLoginSection()
    } else {
      console.error('XterSDK not found or logout method not available')
    }
  })

  /** Xterio Topup iframe **/

  const xterTopup = new XterioAuth.XterTopup({
    spuId: '66c849b2c0d855814f49d3c4',
    skuId: '1',
    hideHeader: true,
    hideFooter: true,
    showModal: true,
    width: 400,
    height: 670,
    onLoad: () => {
      console.log('iframe 加载完成')
    },
    onClose: (data) => {
      console.log('支付窗口已关闭', data)
    },
    onSuccess: (data) => {
      console.log('支付成功', data)
    }
  })

  openTopup.addEventListener('click', function () {
    // 打开支付页面
    xterTopup.openPay('#topup-container', 'default')
  })

  openFiatTopup.addEventListener('click', function () {
    // 打开支付页面
    xterTopup.openPay('#topup-container', 'fiat')
  })
})
