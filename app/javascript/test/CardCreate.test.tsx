import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardCreateForm from "../react/features/todos/components/CardCreateForm";

describe('CardCreateForm', () => {
  test('カード作成フォームの各項目が表示されること', () => {
    render(<CardCreateForm cards={[]} setCards={jest.fn()} listId={1} />);
    expect(screen.getByText("Title"));
    expect(screen.getByText("memo"));
    expect(screen.getByText("Due Date"));
  });
});