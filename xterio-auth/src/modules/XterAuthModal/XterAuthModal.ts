import './styles/login-modal.scss'

import { generateSVGIcon } from 'ui/svg-icon'
import { EAuthState } from './enums'
import { BaseModalState } from './BaseModalState'
import { XterAuthModalSignIn } from './XterAuthModalSignIn'
import { XterAuthModalSignUp } from './XterAuthModalSignUp'
import { XterAuthModalForgetPwd } from './XterAuthModalForgetPwd'
// import { sumtowards } from "src/utils";
export class XterAuthModal {
  private static _instance: XterAuthModal
  private apiUrl: string
  private redirectUri?: string
  public modalContainer?: HTMLElement
  private currentState: BaseModalState

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
    this.modalContainer = document.createElement('div')
    this.modalContainer.className = 'xa-modal-overlay'
    this.currentState = new XterAuthModalSignIn(this)
    // sumtowards([1, 2]);
  }

  // 通过静态属性直接访问实例
  public static get instance(): XterAuthModal {
    if (!XterAuthModal._instance) {
      throw new Error('AuthSDK is not initialized. Call AuthSDK.init(apiUrl, redirectUri) first.')
    }
    return XterAuthModal._instance
  }

  public static init(apiUrl: string): void {
    if (!XterAuthModal._instance) {
      XterAuthModal._instance = new XterAuthModal(apiUrl)
    }
  }

  public open(): void {
    const modalOverlay = document.createElement('div')
    modalOverlay.className = 'xa-modal-overlay'

    const modalContainer = document.createElement('div')
    this.modalContainer = modalContainer
    modalContainer.className = 'xa-modal'

    modalOverlay.appendChild(modalContainer)
    document.body.appendChild(modalOverlay)

    this.currentState.render()
    // this.loginModalInit()
    // 监听登录按钮点击事件
    // const loginBtn = document.getElementById("auth-login-btn");
    // loginBtn?.addEventListener("click", this.handleLogin.bind(this));
  }

  private loginModalInit() {
    const modalOverlay = document.createElement('div')
    modalOverlay.className = 'xa-modal-overlay'

    const modalContainer = document.createElement('div')
    this.modalContainer = modalContainer
    modalContainer.className = 'xa-modal'

    modalOverlay.appendChild(modalContainer)
    document.body.appendChild(modalOverlay)

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.remove()
      }
    })

    const iconWrapper = document.querySelector('.xa-icon-close')
    const _iconClose = generateSVGIcon('icon-close', '16px', '#0a116133')
    iconWrapper?.appendChild(_iconClose)
  }

  private renderContent() {
    this.currentState.render()
    // this.currentState.addEventListeners(this)
  }

  public switchModalState(state: EAuthState) {
    switch (state) {
      case 'login':
        this.currentState = new XterAuthModalSignIn(this)
        break
      case 'signup':
        this.currentState = new XterAuthModalSignUp(this)
        break
      case 'forgotPassword':
        this.currentState = new XterAuthModalForgetPwd(this)
        break
    }
    this.renderContent()
  }

  private async handleLogin(): Promise<void> {
    const email = (document.getElementById('auth-email') as HTMLInputElement).value
    const password = (document.getElementById('auth-password') as HTMLInputElement).value

    try {
      //   const response = await axios.post(`${this.apiUrl}/login`, { email, password });
      //   const { token } = response.data;

      //   // 保存 token 到 cookie 中
      //   Cookies.set('auth_token', token);

      // 重定向到指定的 URL（如果有）
      if (this.redirectUri) {
        window.location.href = this.redirectUri
      } else {
        alert('Login successful')
        document.querySelector('.auth-modal-overlay')?.remove()
      }
    } catch (error) {
      alert('Login failed. Please try again.')
    }
  }
}
