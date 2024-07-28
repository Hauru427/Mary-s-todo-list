import React from "react";
import { useLists } from './hooks/useLists';
import { useCards } from './hooks/useCards';
import CardCard from "./components/CardCard";
import CardCreateForm from './components/CardCreateForm';

export default function Todos() {
  const { cards, setCards} = useCards();
  const { lists, setLists, isLoading } = useLists();

  const filterdCards = (listId: number) => {
    return cards
      .filter(
        (card) =>
          card.list_id === listId
      ).sort((a, b) => a.position - b.position)
  }

  return (
    <div className="my-4 d-flex overflow-auto" style={{ maxHeight: '90%' }}>
      {isLoading && <p>Loading...</p>}
    {!isLoading && lists.length === 0 && <p>No lists found</p>}
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
    </div>
  );
  }