import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { Button, Input, Logo } from './ui'
import { XterAuthModal } from './XterAuthModal'

export class XterAuthModalSignIn extends BaseModalState {
  private loginButton: Button | null
  constructor(modal: XterAuthModal) {
    super(modal)
    this.loginButton = null
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    _container.innerHTML = `
        <h3 class="xa-signin-title">Sign in</h3>
        <p class="xa-signin-sub-title">Sign in with email</p>
       `

    // _container.innerHTML = `
    //     <h3 class="xa-signin-title">Sign in</h3>
    //     <p class="xa-signin-sub-title">Sign in with email</p>
    //     <div class="xa-input-wrapper xa-input-wrapper-email">
    //       <span class="xa-input-label">EMAIL</span>
    //       <div class="xa-input-inner">
    //         <input type="email" id="auth-email" class="xa-input" placeholder="" />
    //       </div>
    //     </div>
    //     <div class="xa-input-wrapper">
    //       <span class="xa-input-label">PASSWORD</span>
    //       <div class="xa-input-inner">
    //         <input type="password" id="auth-password" class="xa-input" placeholder="" />
    //         <div class="xa-icon-close"></div>
    //       </div>
    //     </div>
    //     <div class="xa-login-tip">
    //       <div>No account yet? <a class="xa-to-sign-up">Sign up</a></div>
    //       <div>
    //         <a class="xa-to-forgotpwd">Forgot password?</a>
    //       </div>
    //     </div>
    //     <button id="auth-login-btn" class="xa-login-button">SIGN IN</button>`
    // logo
    const logo = new Logo()
    _container.insertBefore(logo.getElement(), _container.firstChild)

    // Email Input
    const emailInput = new Input({
      id: 'xa-input-email',
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.handleEmailChange(value)
      }
    })
    _container.appendChild(emailInput.getElement())

    // Password Input
    const pwdInput = new Input({
      id: 'xa-input-password',
      label: 'PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      }
    })
    _container.appendChild(pwdInput.getElement())

    // tips
    const tips = document.createElement('div')
    tips.classList.add(...['xa-login-tip', 'xa-flex', 'xa-justify-between'])
    tips.innerHTML = `
      <div>No account yet? <a class="xa-to-sign-up">Sign up</a></div>
      <div>
        <a class="xa-to-forgotpwd">Forgot password?</a>
      </div>
    `
    _container.appendChild(tips)

    // login button
    const loginButton = new Button({
      text: 'SIGN IN',
      disabled: true,
      onClick: (event) => {
        console.log('loginButton clicked')
        // this.modal.handleLogin()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.loginButton = loginButton
    _container.appendChild(loginButton.getElement())

    this.setupListeners()
  }

  private setupListeners(): void {
    const loginButton = this.modal.modalContainer?.querySelector('#loginButton')
    // loginButton?.addEventListener('click', () => this.modal.handleLogin())

    // const signUpLink = this.modal.modalContainer.querySelector('p:nth-child(4)')
    // signUpLink?.addEventListener('click', () => this.modal.switchToSignUp())

    const signUpLink = this.modal.modalContainer?.querySelector('.xa-to-sign-up')
    signUpLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Signup))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleEmailChange(value: string): void {
    console.log({ value })
    this.loginButton?.setDisabled(value.length === 0)
  }
  private handlePasswordChange(value: string): void {
    // this.loginButton?.setDisabled(value.length === 0)
  }
}
