import { XterAuthModal } from './XterAuthModal'

export abstract class BaseModalState {
  protected modal: XterAuthModal

  constructor(modal: XterAuthModal) {
    this.modal = modal
  }

  abstract render(): void
}
