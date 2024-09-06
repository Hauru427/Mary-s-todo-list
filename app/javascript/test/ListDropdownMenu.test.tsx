import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // この行を追加
import ListDropdownMenu from '../react/features/todos/components/ListDropdownMenu';
import { List, Card } from '../react/features/todos/types'; // 必要な型をインポート

describe('ListDropdownMenu コンポーネント', () => {
  test('コンポーネントが正しくレンダリングされること', () => {
    const dummyList: List = { user_id: 1, id: 1, title: 'テストカテゴリ' };
    const dummyLists: List[] = [dummyList];
    const dummyCards: Card[] = [];
    const dummySetLists = jest.fn();
    const dummySetCards = jest.fn();

    // 必要な props を渡してコンポーネントをレンダリング
    render(
      <ListDropdownMenu
        list={dummyList}
        lists={dummyLists}
        setLists={dummySetLists}
        cards={dummyCards}
        setCards={dummySetCards}
      />
    );
    expect(screen.getByText('Delete List')).toBeInTheDocument();
  });
});