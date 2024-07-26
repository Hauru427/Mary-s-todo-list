import { useRef, useCallback } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';

export default function useModal() {
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      const modal = new BootstrapModal(modalElement);
      modal.show();
    }
  }, []);

  const closeModal = useCallback(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      const modal = BootstrapModal. getInstance(modalElement);
      modal?.hide();
    }
  }, []);

  return { modalRef, openModal, closeModal };
}