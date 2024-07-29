import React, { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import ErrorMessage from './ui/ErrorMessage';
import Modal from './ui/Modal';
import useModal from '../hooks/useModal';
import { List } from '../types';

interface AddListPropps {
  lists: List[]
  setLists: React.Dispatch<React.SetStateAction<List[]>>
}

export default function ListCreateForm({
  lists,
  setLists,
}: AddListPropps) {
  const { modalRef, openModal, closeModal } = useModal()
  const [serverError, setServerError] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
    },
  })
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await createList(data.title)
      if (response.ok) {
        const responseData = await response.json()
        setLists([...lists, responseData.list])
        reset()
        closeModal()
      } else {
        setServerError('サーバーエラーが発生しました。')
      }
    } catch (error) {
      setServerError('リクエスト中にエラーが発生しました。')
    }
  }

  const createList = async (listTitle: string) => {
    const response = await fetch('/lists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ list: { title: listTitle } }),
    })
    return response
  }

  return (
    <>
      <Modal modalRef={modalRef}>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="z-20 d-flex flex-column">
            <h3 className="my-2 flex-1 border-bottom border-dark fs-3 fw-bold">
              New
            </h3>
            <ErrorMessage message={serverError} />
            <ErrorMessage message={errors.title?.message as string || ''}/>
            <label htmlFor="title" className="mb-2 fs-5">
              List Title
            </label>
            <input
              {...register('title',{
                required: 'カテゴリー名を入力してください。',
              })}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary mt-2">Save</button>
        </form>
      </Modal>
      <div
        className="btn btn-secondary my-4 ms-4 me-20 d-flex align-items-center justify-content-center border border-gray-200"
        onClick={openModal}
        style={{ width: '50px', height: '50px', backgroundColor: '#d1d5db'}}>
          +
      </div>
    </>
  )
}
