import Cookies from 'js-cookie'
import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { loginService } from './services'
import { Button, Input, Logo } from './ui'
import { XterAuthModal } from './XterAuthModal'
import { ModalExtraData } from './interfaces'
import { XterAuthModalForm } from './XterAuthModalForm'
import { validateEmail, validatePassword } from './utils'
import { XterModalFormItem } from './XterAuthModalFormItem'

enum FomrItemsName {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  Terms = 'terms',
  Subscribe = 'subscribe'
}

export class XterAuthModalSignIn extends BaseModalState {
  private loginButton: Button | null
  private emailInput: Input | null
  private pwdInput: Input | null
  form: XterAuthModalForm

  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
    this.loginButton = null
    this.emailInput = null
    this.pwdInput = null

    this.form = new XterAuthModalForm()
  }

  render(): void {
    if (!this.modal.modalContainer) return

    const _container = this.modal.modalContainer

    this.modal.setTitle('Sign in', 'Sign in with email')

    // Email Input
    this.renderEmailInput(_container)

    // Password Input
    this.renderPwdInput(_container)

    // tips
    this.renderTips(_container)

    // login button
    this.renderLoginButton(_container)

    this.setupListeners()
  }

  private renderEmailInput(_container: HTMLElement) {
    const emailInput = new Input({
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.form.clearFormItemError(FomrItemsName.Email)
        this.handleEmailChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(FomrItemsName.Email)?.setError(validateEmail(value))
      }
    })
    this.emailInput = emailInput
    const formItem = new XterModalFormItem(FomrItemsName.Email, emailInput.getElement(), () => {
      return emailInput.getValue()
    })
    this.form.add(FomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderPwdInput(_container: HTMLElement) {
    const pwdInput = new Input({
      label: 'PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(FomrItemsName.Password)?.setError(validatePassword(value))
      }
    })
    this.pwdInput = pwdInput
    const formItem = new XterModalFormItem(FomrItemsName.Password, pwdInput.getElement(), () => {
      return pwdInput.getValue()
    })
    this.form.add(FomrItemsName.Password, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderTips(_container: HTMLElement) {
    const tips = document.createElement('div')
    tips.classList.add(...['xa-login-tip', 'xa-flex', 'xa-justify-between'])
    tips.innerHTML = `
      <div>No account yet? <a class="xa-to-sign-up">Sign up</a></div>
      <div>
        <a class="xa-to-forgotpwd">Forgot password?</a>
      </div>
    `
    _container.appendChild(tips)
  }

  private renderLoginButton(_container: HTMLElement) {
    const loginButton = new Button({
      text: 'SIGN IN',
      disabled: true,
      onClick: (event) => {
        console.log('signUpButton clicked')
        this.handleLogin()
      }
      // wrapperClassNames: ['xa-login-button']
    })
    this.loginButton = loginButton
    this.append(_container, loginButton.getElement())
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

  private async handleLogin() {
    const userName = this.emailInput?.getValue()
    const password = this.pwdInput?.getValue()
    if (!userName || !password) return
    this.loginButton?.setLoading(true)
    const isLoggedIn = await this.modal.store.login(userName, password)
    this.loginButton?.setLoading(false)
    if (isLoggedIn) {
      this.modal.close()
    }
  }

  private append(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
  }
}
