import React from "react";
import { Card } from '../types';

interface DeleteCardProps {
  cardId: number
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  closeModal:() => void
}

export default function DeleteCardButton({
  cardId,
  cards,
  setCards,
  closeModal,
}: DeleteCardProps) {
  const handleDeleteCard = async () => {
    const confirmed = window.confirm('本当に削除しますか?')
    if (!confirmed) return

    try {
      const response = await deleteCard(cardId)
      if (response.ok) {
        setCards(cards.filter((card) => card.id !== cardId))
        closeModal()
      } else {
        console.log('削除に失敗しました。')
      }
    } catch (error) {
      console.log('リクエスト中にエラーが発生しました。')
    }
  }

  const deleteCard = async (cardId: number) => {
    const deleteResponse = await fetch(`/cards/${cardId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return deleteResponse
  }

  return (
    <div className="mt-2 bottom-2 end-2">
      <button className="btn btn-danger btn-sm" onClick={handleDeleteCard}>
        delete
      </button>
    </div>
  )
}