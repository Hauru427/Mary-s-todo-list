import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DraggableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { useCards } from '../hooks/useCards';
import { List } from '../types';
import CardCard from "./CardCard";
import CardCreateForm from "./CardCreateForm";
import ListDropdownMenu from "./ListDropdownMenu";

type ListProps = {
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
  searchQuery: string
}

export default function List({
  lists,
  setLists,
  searchQuery,
}: ListProps) {
  const { cards, setCards } = useCards()

  const filterdCards = (listId: number) => {
    return cards
    .filter(
      (card) =>
        card.list_id === listId &&
        (
          card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.memo.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ).sort((a, b) => a.position - b.position)
  }

  return (
    <>
      <DragDropContext>
        {lists.map((list) => (
          <div key={list.id} className="ms-4 d-flex flex-column border rounded" style={{ maxHeight: '100%', backgroundColor: '#d1d5db' }}>
            <div className="p-2 d-flex justify-content-between align-items-center position-relative">
              <h5 className="m-0">{list.title}</h5>
              <ListDropdownMenu
                lists={lists}
                setLists={setLists}
                list={list}
                cards={cards}
                setCards={setCards}
              />
            </div>
            <Droppable droppableId={list.id.toString()}>
              {(provided: DroppableProvided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="min-vh-100" style={{ width: '350px' }}
                >
                  {filterdCards(list.id).map((card,index) => (
                    <div key={card.id} className="m-2">
                      <Draggable
                        key={card.id}
                        draggableId={card.id.toString()}
                        index={index}
                      >
                        {(provided: DraggableProvided) => (
                          <CardCard
                            cards={cards}
                            setCards={setCards}
                            card={card}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    </div>
                ))}
                {provided.placeholder}
              </div>
              )}
            </Droppable>
            <CardCreateForm
              cards={cards}
              setCards={setCards}
              listId={list.id}
            />
          </div>
        ))}
      </DragDropContext>
    </>
  );
}