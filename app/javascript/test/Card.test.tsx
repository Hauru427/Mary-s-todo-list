import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardCard from '../react/features/todos/components/CardCard';
import { DraggableProvided } from 'react-beautiful-dnd';
import { Card } from '../react/features/todos/types';
import useModal from '../react/features/todos/hooks/useModal';
import fetchMock from 'jest-fetch-mock';
import { stringify } from 'querystring';

jest.mock('../react/features/todos/components/PomodoroTimer', () => () => null);

// Mocking the useModal hook
jest.mock('../react/features/todos/hooks/useModal', () => ({
  __esModule: true,
  default: () => ({
    modalRef: { current: null },
    openModal: jest.fn(),
    closeModal: jest.fn(),
  }),
}));

describe('CardCard', () => {
  const mockCard: Card = {
    id: 1,
    title: 'テストカード',
    memo: 'テストコンテンツ',
    due_date: '2026-09-05T12:00:00Z',
    list_id: 1,
    user_id: 1,
  };

  const mockSetCards = jest.fn();

  const mockProvided: DraggableProvided = {
    draggableProps: {
      style: {},
      'data-rbd-draggable-context-id': '1',
      'data-rbd-draggable-id': '1',
    },
    dragHandleProps: {
      'data-rbd-drag-handle-draggable-id': '1',
      'data-rbd-drag-handle-context-id': '1',
      'aria-describedby': 'description',
      role: 'button',
      tabIndex: 0,
      draggable: true,
      onDragStart: () => {},
    },
    innerRef: jest.fn(),
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('CardCard コンポーネントが正しくレンダリングされる', () => {
    fetchMock.mockResponse(JSON.stringify({ count: 0}));
    render(
      <CardCard
        card={mockCard}
        cards={[]}
        setCards={mockSetCards}
        provided={mockProvided}
      />
    );

    // タイトルが表示されるか
    expect(screen.getByText('テストカード')).toBeInTheDocument();
    expect(screen.getByText('期日: 2026/09/05 21:00')).toBeInTheDocument();
    expect(screen.queryByText('期限切れ')).not.toBeInTheDocument();
  });

  test('期限切れのカードが正しく表示される', () => {
    fetchMock.mockResponse(JSON.stringify({ count: 0 }));
    const expiredCard: Card = {
      ...mockCard,
      due_date: '2022-01-01T00:00:00Z', // 過去の期限
    };

    render(
      <CardCard
        card={expiredCard}
        cards={[]}
        setCards={mockSetCards}
        provided={mockProvided}
      />
    );

    // 期限切れアイコンが表示されるか
    expect(screen.getByText(/期限切れ/)).toBeInTheDocument();
  });

  test('タイトルをクリックするとモーダルが開く', async () => {
    const { openModal } = useModal();

    render(
      <CardCard
        card={mockCard}
        cards={[]}
        setCards={mockSetCards}
        provided={mockProvided}
      />
    );

    // タイトルのクリックイベントを発火
    await fireEvent.click(screen.getByText('テストカード'));

    // モーダルが開く関数が呼ばれたか
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument();
    });
  });
});
