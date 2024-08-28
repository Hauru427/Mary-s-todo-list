import React from "react";
import useModal from "../hooks/useModal";
import { Card } from "../types";
import CardEditForm from "./CardEditForm";
import { DraggableProvided } from "react-beautiful-dnd";
import { FaExclamationTriangle } from "react-icons/fa"

type Props = {
  card: Card
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  provided: DraggableProvided
}

export default function CardCard({ card, cards, setCards, provided } : Props) {
  const { modalRef, openModal, closeModal } = useModal();

  //期限切れかどうかを確認する関数
  const isExpired = (dueDate: string | null): boolean => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  // due_dateをフォーマットする関数
  const formatDueDate = (dueDate: string | null): string => {
    if (!dueDate) return "期限なし";
    const due = new Date(dueDate);
    const year = due.getFullYear();
    const month = ("0" + (due.getMonth() + 1)).slice(-2);
    const day = ("0" + due.getDate()).slice(-2);
    const hours = ("0" + due.getHours()).slice(-2);
    const minutes = ("0" + due.getMinutes()).slice(-2);
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

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
          {isExpired(card.due_date) && (
            <div className="m-2 text-danger">
              <FaExclamationTriangle /> 期限切れ
            </div>
          )}
          <div className="m-2 text-muted">
            期日: {formatDueDate(card.due_date)}
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