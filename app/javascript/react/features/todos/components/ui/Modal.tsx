import React from 'react';

type Props = {
  children: React.ReactNode;
  modalRef: React.RefObject<HTMLDivElement>;
};

export default function Modal({ children, modalRef }: Props) {
  return (
    <div ref={modalRef} className="modal fade" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}