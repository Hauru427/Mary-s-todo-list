import React from "react";
import useModal from "../hooks/useModal";
import { Card } from "../types";
import CardEditForm from "./CardEditForm";
import { DraggableProvided } from "react-beautiful-dnd";

type Props = {
  card: Card
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  provided: DraggableProvided
}

export default function CardCard({ card, cards, setCards, provided } : Props) {
  const { modalRef, openModal, closeModal } = useModal();
  return (
    <>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="m-2 rounded border border-light bg-light hover:bg-light">
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
    </>
  );
}