import React from "react";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import List from "../react/features/todos/components/List";

describe('List', () => {
  test('リストが正しく表示される', () => {
    const mockLists = [
      { user_id: 1, id: 1, title: 'カテゴリ1' },
      { user_id: 1, id: 2, title: 'カテゴリ2' }
    ];
    const mockSetLists = jest.fn();

    render(<List lists={mockLists} setLists={mockSetLists} searchQuery="" />)

    expect(screen.getByText('カテゴリ1')).toBeInTheDocument();
    expect(screen.getByText('カテゴリ2')).toBeInTheDocument();
  })
})
