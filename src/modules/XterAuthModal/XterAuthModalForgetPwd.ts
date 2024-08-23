import { BaseModalState } from './BaseModalState'
import { PrivacyURL, TermsURL } from './constant'
import { EAuthState } from './enums'
import { Button, Input, Logo } from './ui'
import { XterAuthModal } from './XterAuthModal'

export class XterAuthModalForgetPwd extends BaseModalState {
  private continueButton: Button | null
  constructor(modal: XterAuthModal) {
    super(modal)
    this.continueButton = null
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    _container.innerHTML = `
        <h3 class="xa-signin-title">Forgot password</h3>
        <p class="xa-signin-sub-title">Please enter your email and email verification code</p>
       `

    const logo = new Logo()
    _container.insertBefore(logo.getElement(), _container.firstChild)

    // Email Input
    const emailInput = new Input({
      id: 'xaEmailInput',
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.handleEmailChange(value)
      }
    })
    this.append(_container, emailInput.getElement())

    // Enter Code
    const codeInput = new Input({
      id: 'xaCodeInput',
      label: 'ENTER CODE',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.handleEmailChange(value)
      }
    })
    this.append(_container, codeInput.getElement())

    // Password Input
    const pwdInput = new Input({
      id: 'xaPasswordInput',
      label: 'NEW PASSWORD',
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

    // continue button
    const continueButton = new Button({
      text: 'CONTINUE',
      disabled: true,
      onClick: (event) => {
        console.log('continueButton clicked')
        // this.modal.handleLogin()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.continueButton = continueButton
    this.append(_container, continueButton.getElement())

    // back to sign in
    const toSignInTips = document.createElement('div')
    toSignInTips.classList.add('xa-w-full', 'xa-text-center')
    toSignInTips.innerHTML = `
      <div class="xa-login-tip">
        <span>Back to </span>
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
    this.continueButton?.setDisabled(value.length === 0)
  }
  private handlePasswordChange(value: string): void {
    // this.loginButton?.setDisabled(value.length === 0)
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
