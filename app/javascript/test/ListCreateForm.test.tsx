import React from "react";
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListCreateForm from '../react/features/todos/components/ListCreateForm';

describe('ListCreateForm', () => {
  const mockSetLists = jest.fn();

  beforeEach(() => {
    render(<ListCreateForm lists={[]} setLists={mockSetLists} />);
  });
  
  test('フォームが正しくレンダリングされる', () => {
    expect(screen.getByText("List Title")).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});