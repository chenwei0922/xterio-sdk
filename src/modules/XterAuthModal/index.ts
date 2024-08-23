import { XterAuthModal } from './XterAuthModal'
export { XterAuthModal }

export const useXterLoginModal = () => {
  const modal = XterAuthModal.instance

  function open() {
    modal.open()
  }

  return { open }
}
