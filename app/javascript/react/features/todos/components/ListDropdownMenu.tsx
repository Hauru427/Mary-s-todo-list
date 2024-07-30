import React from "react";
import { List, Card } from '../types';

type Props = {
  list: List
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
}

export default function ListDropdownMenu({
  list,
  lists,
  setLists,
  cards,
  setCards,
}: Props) {
  const deleteAllCards = async (listId: number) => {
    const deleteAllResponse = await fetch(
      `/lists/${listId}/destroy_all_cards`,
      {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    return deleteAllResponse
  }

  const handleDeleteAllCards = async (list: List) => {
    const confirmed = window.confirm(
      `${list.title} のアイテムを本当に削除しますか？`
    )
    if (!confirmed) return

    try {
      const response = await deleteAllCards(list.id)
      if (response.ok) {
        setCards(cards.filter((card) => card.list_id !== list.id))
      } else {
        console.log('削除に失敗しました。')
      }
    } catch (error) {
      console.log('リクエスト中にエラーが発生しました。')
    }
  }

  const deleteList = async (listId: number) => {
    const deleteResponse = await fetch(`/lists/${listId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return deleteResponse
  }

  const handleDeleteList = async (list: List) => {
    const confirmed = window.confirm(
      `${list.title} を本当に削除しますか？同時にcardも削除されます。`
    )
    if (!confirmed) return

    try {
      const response = await deleteList(list.id)
      const deletedListId = list.id
      if (response.ok) {
        setLists(
          lists.filter((list) => list.id !== deletedListId)
        )
      } else {
        console.log('削除に失敗しました。')
      }
    } catch (error) {
      console.log('リクエスト中にエラーが発生しました。')
    }
  }

  return (
    <div className="dropdown position-relative" style={{zIndex: 1}}>
      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
      </button>
      <ul className="dropdown-menu">
        <li><a className="dropdown-item" onClick={() => handleDeleteAllCards(list)}>Delete all Cards</a></li>
        <li><a className="dropdown-item" onClick={() => handleDeleteList(list)}>Delete List</a></li>
      </ul>
    </div>
  )
}