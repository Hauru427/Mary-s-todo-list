import React from "react";
import Modal from "./ui/Modal";
import useModal from "../hooks/useModal";
import { Card } from "../types";

interface CardCardProps {
  card: Card;
}

export default function ShowCard({
  card,
} : CardCardProps) {
  const { modalRef, openModal } = useModal();
  return (
    <div>
      <div className="m-2 rounded border border-light bg-light hover:bg-light">
        <div className="d-flex flex-column min-vh-80">
          <div className="m-2 me-4 text-break text-sm link" onClick={openModal}>
            {card.title}
          </div>
        </div>
      </div>
      <Modal modalRef={modalRef}>
      <div className="d-flex">
        <h3 className="my-2 flex-grow-1 border-bottom border-secondary display-4 fw-bold">
          Show
        </h3>
      </div>
      <div className="mb-2 h5">Title</div>
      <div className="rounded border border-secondary">
        <div className="m-2 mx-4">{card.title}</div>
      </div>
      <div className="mb-2 h5">Content</div>
      <div className="rounded border border-secondary pb-3 text-muted">
        <div className="m-2 mx-4">{card.memo}</div>
      </div>
      <div className="mb-2 h5">Assignee</div>
      <div className="badge bg-secondary text-light">{card.due_date}</div>
      </Modal>
    </div>
  );
}