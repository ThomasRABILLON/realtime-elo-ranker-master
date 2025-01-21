import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerForm from './PlayerForm';

describe('<PlayerForm />', () => {
  test('it should mount', () => {
    const mockCallback = jest.fn();
    render(<PlayerForm callback={mockCallback} />);

    const playerForm = screen.getByTestId('PlayerForm');

    expect(playerForm).toBeInTheDocument();
  });
});