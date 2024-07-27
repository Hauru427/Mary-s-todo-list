import React from 'react';

type Props = {
  message: string
}

export default function ErrorMessage({ message }: Props) {
  if (!message) return null

  return <p className='text-danger'>{message}</p>
}