import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import ErrorMessage from './ui/ErrorMessage'
import Modal from '../components/ui/Modal'
import useModal from '../hooks/useModal'
import { Card } from '../types'

interface AddCardProps {
  cards: Card[]
  setCards: React.Dispatch<React.SetStateAction<Card[]>>
  listId: number
}

export default function CardCreateForm({
  cards,
  setCards,
  listId,
}: AddCardProps) {
  const { modalRef, openModal, closeModal } = useModal()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      memo: '',
    },
  })

  const [serverError, setServerError] = useState<string>('')
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await createCard(
        data.title,
        data.memo,
        data.due_date
      )
      if (response.ok) {
        const responseData = await response.json()
        setCards([...cards, responseData.card])
        reset()
        closeModal()
      } else {
        setServerError('サーバーエラーが発生しました。')
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。')
    }
  }

  const createCard = async (
    title: string,
    memo: string,
    due_date: string
  ) => {
    const response = await fetch('cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card: {
          title,
          memo,
          due_date,
          list_id: listId,
        },
      }),
    })
    return response
  }

  return (
    <>
      <Modal modalRef={modalRef}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='d-flex flex-column'>
            <h3 className='my-2 border-bottom border-dark text-3xl fw-bold'>
              New
            </h3>
            <ErrorMessage message={serverError} />
            <ErrorMessage message={errors.title?.message as string || ''}/>
            <label htmlFor="title" className='mb-2 h5'>
              Title
            </label>
            <input
              {...register('title', { required: 'Titleを入力してください。'})}
              className='form-control mb-2'
            />
            <label htmlFor="content" className='mb-2 h5'>
              memo
            </label>
            <textarea
              {...register('memo')}
              className='form-control mb-2'
            />
            <label htmlFor="due_date" className='mb-2 h5'>
              Due Date
            </label>
            <input type="datetime-local"
              {...register('due_date')}
              className='form-control mb-2'
            />
            <button type="submit" className='btn btn-primary mt-2'>
              Save
            </button>
          </form>
      </Modal>
      <div
        className='position-sticky bottom-0 z-index-10 cursor-pointer rounded bg-secondary p-2 text-white'
        onClick={openModal}>
          + Add Card
        </div>
    </>
  )
}