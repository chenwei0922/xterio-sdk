import { BaseModalState } from './BaseModalState'
import { EAuthState } from './enums'
import { ModalExtraData } from './interfaces'
import { Button, Input, Logo } from './ui'
import { validateEmail, validatePasswordMatch } from './utils'
import { XterAuthModal } from './XterAuthModal'
import { XterAuthModalForm } from './XterAuthModalForm'
import { XterModalFormItem } from './XterAuthModalFormItem'

enum ForgotFomrItemsName {
  Email = 'email',
  Code = 'code',
  Password = 'password',
  ConfirmPassword = 'confirmPassword'
}

export class XterAuthModalForgetPwd extends BaseModalState {
  private continueButton: Button | null
  form: XterAuthModalForm

  constructor(modal: XterAuthModal, extraData?: ModalExtraData) {
    super(modal)
    this.continueButton = null

    this.form = new XterAuthModalForm()
  }

  render(): void {
    if (!this.modal.modalContainer) return
    const _container = this.modal.modalContainer

    this.modal.setTitle('orgot password', 'Please enter your email and email verification code')

    // Email Input
    this.renderEmailInput(_container)

    // Enter Code
    this.renderCodeInput(_container)

    // Password Input
    this.renderPwdInput(_container)

    // Confirm Password Input
    this.renderConfirmPwdInput(_container)

    // Continue button
    this.renderConfirmButton(_container)

    // back to sign in
    this.renderBackTip(_container)

    this.setupListeners()
  }

  private renderEmailInput(_container: HTMLElement) {
    const emailInput = new Input({
      label: 'EMAIL',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.form.clearFormItemError(ForgotFomrItemsName.Email)
        this.handleEmailChange(value)
      },
      onBlur: (value) => {
        this.form.findFormItem(ForgotFomrItemsName.Email)?.setError(validateEmail(value))
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.Email, emailInput.getElement(), () => {
      return emailInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderCodeInput(_container: HTMLElement) {
    const codeInput = new Input({
      label: 'ENTER CODE',
      type: 'text',
      showClearIcon: true,
      onChange: (value) => {
        this.handleEmailChange(value)
      },
      addonAfterSendButton: {
        onClick: () => {
          console.log('send code')
        },
        onCountdownEnd: () => {
          console.log('countdown end')
        }
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.ConfirmPassword, codeInput.getElement(), () => {
      return codeInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Email, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderPwdInput(_container: HTMLElement) {
    const pwdInput = new Input({
      label: 'NEW PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      }
    })
    const formItem = new XterModalFormItem(ForgotFomrItemsName.Password, pwdInput.getElement(), () => {
      return pwdInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.Password, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderConfirmPwdInput(_container: HTMLElement) {
    const confirmPwdInput = new Input({
      label: 'CONFRIM PASSWORD',
      type: 'password',
      onChange: (value) => {
        this.handlePasswordChange(value)
      },
      onBlur: (value) => {
        this.form
          .findFormItem(ForgotFomrItemsName.ConfirmPassword)
          ?.setError(validatePasswordMatch(this.form.getFormItemValue(ForgotFomrItemsName.Password), value))
      }
    })

    const formItem = new XterModalFormItem(ForgotFomrItemsName.ConfirmPassword, confirmPwdInput.getElement(), () => {
      return confirmPwdInput.getValue()
    })
    this.form.add(ForgotFomrItemsName.ConfirmPassword, formItem)
    this.append(_container, formItem.getElement())
  }

  private renderConfirmButton(_container: HTMLElement) {
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
  }

  private renderBackTip(_container: HTMLElement) {
    const toSignInTips = document.createElement('div')
    toSignInTips.classList.add('xa-w-full', 'xa-text-center')
    toSignInTips.innerHTML = `
      <div class="xa-login-tip">
       <span>Back to </span>
        <a class="xa-to-sign-in"> Sign in </a>
      </div>
    `
    this.append(_container, toSignInTips)
  }

  private setupListeners(): void {
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
