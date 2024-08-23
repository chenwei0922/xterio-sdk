export interface InputProps {
  type: 'text' | 'password'
  id: string // selector id
  label: string
  placeholder?: string
  errorMessage?: string
  showError?: boolean
  showClearIcon?: boolean
  showPasswordToggleIcon?: boolean
  wrapperClassNames?: string[]
  onChange?: (value: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export class Input {
  private props: InputProps
  private root: HTMLElement

  constructor(props: InputProps) {
    this.props = props
    this.root = this.createInputElement()
    this.setUpEventListeners()
  }

  private createInputElement(): HTMLElement {
    const { id, type, label, wrapperClassNames, showClearIcon, showPasswordToggleIcon, onChange, onBlur, onFocus } =
      this.props
    const containerDiv = document.createElement('div')
    containerDiv.classList.add('xa-input-wrapper', `xa-input-wrapper-${type}`)

    if (wrapperClassNames) {
      wrapperClassNames.forEach((className) => containerDiv.classList.add(className))
    }

    const labelElement = document.createElement('span')
    labelElement.className = 'xa-input-label'
    labelElement.textContent = label
    containerDiv.appendChild(labelElement)

    const inputInnerDiv = document.createElement('div')
    inputInnerDiv.className = 'xa-input-inner'

    const inputElement = document.createElement('input')
    inputElement.type = type === 'password' ? 'password' : type
    inputElement.id = 'auth-input'
    inputElement.className = 'xa-input'
    inputElement.placeholder = ''
    inputInnerDiv.appendChild(inputElement)

    if (showClearIcon) {
      const clearIcon = document.createElement('div')
      clearIcon.className = 'xa-icon-close'
      clearIcon.addEventListener('click', () => {
        inputElement.value = ''
        clearIcon.style.display = 'none'
      })
      inputInnerDiv.appendChild(clearIcon)
    }

    if (type === 'password' && showPasswordToggleIcon) {
      const toggleIcon = document.createElement('div')
      toggleIcon.className = 'xa-icon-hide'
      toggleIcon.addEventListener('click', () => {
        if (inputElement.type === 'password') {
          inputElement.type = 'text'
          toggleIcon.className = 'xa-icon-show'
        } else {
          inputElement.type = 'password'
          toggleIcon.className = 'xa-icon-hide'
        }
      })
      inputInnerDiv.appendChild(toggleIcon)
    }

    // Event callback
    inputElement.addEventListener('input', (event) => {
      console.log(event)
      if (onChange) {
        onChange((event.target as HTMLInputElement)?.value ?? '')
      }
    })

    inputElement.addEventListener('focus', () => {
      if (onFocus) {
        onFocus()
      }
    })

    inputElement.addEventListener('blur', () => {
      if (onBlur) {
        onBlur()
      }
    })

    containerDiv.appendChild(inputInnerDiv)

    // 错误提示信息
    const errorTipElement = document.createElement('p')
    errorTipElement.className = 'xa-error-tip'
    if (this.props.showError) {
      errorTipElement.textContent = this.props.errorMessage || ''
    } else {
      errorTipElement.style.display = 'none'
    }
    containerDiv.appendChild(errorTipElement)

    return containerDiv
  }

  public getElement(): HTMLElement {
    return this.root
  }

  private setUpEventListeners() {
    const wrappers = this.root

    this.root.addEventListener('click', () => {
      const input = this.root.querySelector<HTMLInputElement>('.xa-input')

      if (input) {
        input.focus()
      }
    })

    const inputs = this.root.querySelectorAll<HTMLInputElement>('.xa-input')
    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        const wrapper = input.closest('.xa-input-wrapper')
        const label = wrapper?.querySelector('.xa-input-label')
        if (label) {
          label.classList.add('xa-input-label_filled')
        }
      })

      input.addEventListener('blur', () => {
        const wrapper = input.closest('.xa-input-wrapper')
        const label = wrapper?.querySelector('.xa-input-label')
        if (label && input.value === '') {
          label.classList.remove('xa-input-label_filled')
        }
      })
    })
  }

  public showError(message: string) {
    const errorTip = this.root.querySelector('.xa-error-tip') as HTMLElement
    errorTip.textContent = message
    errorTip.style.display = 'block'
  }

  public hideError() {
    const errorTip = this.root.querySelector('.xa-error-tip') as HTMLElement
    errorTip.style.display = 'none'
  }
}
