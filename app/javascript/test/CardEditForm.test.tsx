import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardEditForm from "../react/features/todos/components/CardEditForm";
import { Card } from "../react/features/todos/types";

describe('CardEditForm', () => {
  it('Editフォームが正しく表示されるか', () => {
    const mockCard: Card = {
    id: 1,
    title: 'テストカード',
    memo: 'テストコンテンツ',
    due_date: '2026-09-05T12:00:00Z',
    list_id: 1,
    user_id: 1,
  };
  const mockSetCards = jest.fn();
  const mockCloseModal = jest.fn();
  const mockModalRef = React.createRef<HTMLDivElement>();

  render(
    <CardEditForm
      cards={[mockCard]}
      setCards={mockSetCards}
      editedCard={mockCard}
      modalRef={mockModalRef}
      closeModal={mockCloseModal}
      />
  );
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByText('Memo')).toBeInTheDocument();
  expect(screen.getByText('DueDate')).toBeInTheDocument();
  });
});