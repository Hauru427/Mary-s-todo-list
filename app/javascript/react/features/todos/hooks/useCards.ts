import { useState, useEffect } from "react";
import { Card } from '../types';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('/cards')
        if (response.ok) {
          const data = await response.json()
          setCards(data)
        } else {
          console.log('サーバーエラーが発生しました。')
        }
      } catch (error) {
        console.log('リクエスト中にエラーが発生しました。')
      }
    }

    fetchCards()
  }, [])

  return { cards, setCards}
}