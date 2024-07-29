import React from "react";
import useModal from "../hooks/useModal";
import { Card } from "../types";
import CardEditForm from "./CardEditForm";

type Props = {
  card: Card
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

export default function CardCard({ card, cards, setCards } : Props) {
  const { modalRef, openModal, closeModal } = useModal();
  return (
    <div>
      <div className="m-2 rounded border border-light bg-light hover:bg-light">
        <div className="d-flex flex-column min-vh-80">
          <div className="m-2 me-4 text-break text-sm link" onClick={openModal}>
            {card.title}
          </div>
        </div>
      </div>
      <CardEditForm
        cards={cards}
        setCards={setCards}
        editedCard={card}
        modalRef={modalRef}
        closeModal={closeModal}
      />
    </div>
  );
}