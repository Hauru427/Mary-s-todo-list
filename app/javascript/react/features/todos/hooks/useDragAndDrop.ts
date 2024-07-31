import { useCallback } from "react";
import { Card } from '../types';
import { DropResult } from 'react-beautiful-dnd';

export const useDragAndDrop =() => {
  const onDragEnd = useCallback(
    (
      result: DropResult,
      cards: Card[],
      filteredCards: (listId: number) => Card[]
    ) => {
      const { source, destination } = result

      //ドロップ先がない場合は何もしない（ドロップ可能なエリア外にドロップされた場合）
      if(!destination) return

      //ドラッグ元とドロップ先が同じ場所であれば何もしない
      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      )
      return

      //アイテムを再配置するための新しいアイテムリストを生成
      const startListId = parseInt(source.droppableId)
      const finishListId = parseInt(destination.droppableId)

      //ドラッグされたアイテムを見つける
      const draggedCard = cards.find(
        (card) => card.id === parseInt(result.draggableId)
      )

      if (!draggedCard) return

      let finalCards = [...cards]
      //同じリスト内での移動
      if (startListId === finishListId) {
        const newCards = filteredCards(startListId)
        newCards.splice(source.index, 1)
        newCards.splice(destination.index, 0, draggedCard)

        //新しいpositionを計算して設定
        const updatedCards = newCards.map((card, index) => ({
          ...card,
          position: index + 1
        }))

        finalCards = cards.map(
          (card) =>
          updatedCards.find((updatedCard) => updatedCard.id === card.id) ||
          card
        )
      } else {
        //異なるリスト間での移動
        //新しいリストのカードを取得してドラッグされたカードを挿入
        const newStartCards = filteredCards(startListId).filter(
          (card) => card.id !== draggedCard.id
        )
        const newFinishCards = [...filteredCards(finishListId)]
        newFinishCards.splice(destination.index, 0, draggedCard)

        // 新しいpositionを設定
        const updatedStartCards = newStartCards.map((card, index) => ({
          ...card,
          position: index + 1,
        }))
        const updatedFinishCards = newFinishCards.map((card, index) => ({
          ...card,
          position: index + 1,
          list_id: finishListId, //リストIDの更新
        }))

        finalCards = cards
          .map(
            (card) =>
              updatedStartCards.find(
                (updatedCard) => updatedCard.id === card.id
              ) || card
          )
          .map(
            (card) =>
              updatedFinishCards.find(
                (updatedCard) => updatedCard.id === card.id
              ) || card
          )
      }
      return finalCards
    },
    []
  )

  const updatePositionOfAllCards = useCallback(async (cards: Card[]) => {
    try {
      const response = await fetch('/cards/update_all_position', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards: cards }),
      })

      if (!response.ok) {
        console.error('更新に失敗しました。')
      }

      const responseData = await response.json()
      console.log('更新成功:', responseData)
    } catch (error) {
      console.error('更新エラー:', error)
    }
  }, [])

  return { onDragEnd, updatePositionOfAllCards }
}