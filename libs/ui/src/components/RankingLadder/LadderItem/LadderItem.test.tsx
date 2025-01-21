import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LadderItem from './LadderItem';

describe('<LadderItem />', () => {
  test('it should mount', () => {
    const player = { id: '1', rank: 1 }; // mock player data
    render(<LadderItem player={player} />);

    const ladderItem = screen.getByTestId('LadderItem');

    expect(ladderItem).toBeInTheDocument();
  });
});