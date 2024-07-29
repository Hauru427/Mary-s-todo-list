import React from "react";
import { useCards } from '../hooks/useCards';
import { List } from '../types';
import CardCard from "./CardCard";
import CardCreateForm from "./CardCreateForm";

type ListProps = {
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
}

export default function List({
  lists,
  setLists,
}: ListProps) {
  const { cards, setCards } = useCards()

  const filterdCards = (listId: number) => {
    return cards
    .filter(
      (card) =>
        card.list_id === listId
    ).sort((a, b) => a.position - b.position)
  }

  return (
    <>
      {lists.map((list) => (
        <div key={list.id} className="ms-4 d-flex flex-column border rounded" style={{ maxHeight: '100%', backgroundColor: '#d1d5db' }}>
          <div className="sticky-top p-2">
            <h5 className="m-0">{list.title}</h5>
          </div>
          <div className="min-vh-100" style={{ width: '350px' }}>
            {filterdCards(list.id).map((card) => (
              <div key={card.id} className="m-2">
                <CardCard
                  cards={cards}
                  setCards={setCards}
                  card={card}
                />
              </div>
            ))}
          </div>
          <CardCreateForm
            cards={cards}
            setCards={setCards}
            listId={list.id}
          />
        </div>
      ))}
    </>
  );
}