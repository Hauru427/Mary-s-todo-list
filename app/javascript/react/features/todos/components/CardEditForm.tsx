import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import ErrorMessage from './ui/ErrorMessage';
import Modal from './ui/Modal';
import { Card } from '../types'

interface EditCardProps {
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  editedCard: Card
  modalRef: React.RefObject<HTMLDivElement>
  closeModal: () => void
}

export default function CardEditForm({
  cards,
  setCards,
  editedCard,
  modalRef,
  closeModal,
}: EditCardProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: editedCard.title,
      memo: editedCard.memo,
      due_date: editedCard.due_date,
    },
  })

  const [serverError, setServerError] = useState<string>('')
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateCard(
        editedCard.id,
        data.title,
        data.memo,
        data.due_date
      )
      if (response.ok) {
        const responseData = await response.json()
        setCards(
          cards.map((card) =>
            card.id === editedCard.id ? responseData.card : card
          )
        )
        closeModal()
      } else {
        setServerError('サーバーでエラーが発生しました。')
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。')
    }
  }

  const updateCard = async (
    cardId: number,
    title: string,
    memo: string,
    due_date: string
  ) => {
    const response = await fetch(`/cards/${cardId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        card: {
          title,
          memo,
          due_date,
        },
      }),
    })
    return response
  }

  return (
    <Modal modalRef={modalRef}>
      <div className="d-flex flex-column">
        <div className="d-flex">
          <h3 className="my-2 flex-grow-1 border-bottom border-dark fs-3 fw-bold">
            Edit
          </h3>
        </div>
        <ErrorMessage message={serverError} />
        <ErrorMessage message={errors.title?.message as string || ''} />
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <label htmlFor="title" className="mb-2 h5">
            Title
          </label>
          <input
            type="text"
            {...register('title', { required: 'Titleを入力してください。'})}
            className="form-control mb-2"
          />
          <label htmlFor="memo" className="mb-2 h5">
            Memo
          </label>
          <textarea
            {...register('memo')}
            className="form-control mb-2"
          />
          <label htmlFor="due_date" className="mb-2 h5">
            DueDate
          </label>
          <input type="datetime-local"
                {...register('due_date')}
                className='form-control mb-2'
          />
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </div>
    </Modal>
  )
}