import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeleteCardButton from "../react/features/todos/components/CardDeleteButton";
import { Card } from "../react/features/todos/types";

describe('DeleteCardButton', () => {
  it('カードの削除', () => {
    window.confirm = jest.fn(() => true);
    const mockCard: Card = {
      id: 1,
      title: 'テストカード',
      memo: 'テストコンテンツ',
      due_date: '2026-09-05T12:00:00Z',
      list_id: 1,
      user_id: 1,
    };
    const mockCards = [mockCard];
    const mockSetCards = jest.fn();
    const mockCloseModal = jest.fn();

    render(<DeleteCardButton
            cardId={mockCard.id}
            cards={mockCards}
            setCards={mockSetCards}
            closeModal={mockCloseModal}
          />);
    fireEvent.click(screen.getByText('delete'));
    expect(window.confirm).toHaveBeenCalledWith('本当に削除しますか?')
  });
});