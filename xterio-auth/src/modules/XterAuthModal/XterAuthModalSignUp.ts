import { BaseModalState } from './BaseModalState'
import { PrivacyURL, TermsURL } from './constant'
import { EAuthState } from './enums'
import { Button, Input, Logo } from './ui'
import { XterAuthModal } from './XterAuthModal'

export class XterAuthModalSignUp extends BaseModalState {
  private signUpButton: Button | null
  constructor(modal: XterAuthModal) {
    super(modal)
    this.signUpButton = null
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    _container.innerHTML = `
        <h3 class="xa-signin-title">Create Xterio account</h3>
        <p class="xa-signin-sub-title">Sign up with email</p>
       `

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
    this.append(_container, emailInput.getElement())

    // Password Input
    const pwdInput = new Input({
      id: 'xaPasswordInput',
      label: 'PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      }
    })
    this.append(_container, pwdInput.getElement())

    // Confirm Password Input
    const confirmPwdInput = new Input({
      id: 'xaConfirmPasswordInput',
      label: 'CONFRIM PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      }
    })
    this.append(_container, confirmPwdInput.getElement())

    // tips
    const tips = document.createElement('div')
    tips.innerHTML = `
      <div class="xa-login-tip">
        <span>I am 18 years of age or older and agree to the terms of the</span>
        <a href="${TermsURL}" target="_blank"> Terms of Service </a>
        <span>and the</span>
        <a href="${PrivacyURL}" target="_blank"> Privacy Policy </a>
      </div>
      <div class="xa-login-tip">
        <span>Subscribe to updates via email</span>
      </div>
    `
    this.append(_container, tips)

    // Sing Up button
    const signUpButton = new Button({
      text: 'SIGN UP',
      disabled: true,
      onClick: (event) => {
        console.log('signUpButton clicked')
        // this.modal.handleLogin()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.signUpButton = signUpButton
    this.append(_container, signUpButton.getElement())

    // back to sign in
    const toSignInTips = document.createElement('div')
    toSignInTips.classList.add('xa-w-full', 'xa-text-center')
    toSignInTips.innerHTML = `
      <div class="xa-login-tip">
        <span>Already have an account? </span>
        <a class="xa-to-sign-in"> Sign in </a>
      </div>
    `
    this.append(_container, toSignInTips)

    this.setupListeners()
  }

  private setupListeners(): void {
    const loginButton = this.modal.modalContainer?.querySelector('#loginButton')
    // loginButton?.addEventListener('click', () => this.modal.handleLogin())

    // const signUpLink = this.modal.modalContainer.querySelector('p:nth-child(4)')
    // signUpLink?.addEventListener('click', () => this.modal.switchToSignUp())

    const signInLink = this.modal.modalContainer?.querySelector('.xa-to-sign-in')
    signInLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.Login))

    const forgotPasswordLink = this.modal.modalContainer?.querySelector('.xa-to-forgotpwd')
    forgotPasswordLink?.addEventListener('click', () => this.modal.switchModalState(EAuthState.ForgotPassword))
  }

  private handleEmailChange(value: string): void {
    console.log({ value })
    this.signUpButton?.setDisabled(value.length === 0)
  }
  private handlePasswordChange(value: string): void {
    // this.loginButton?.setDisabled(value.length === 0)
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
