import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RankingLadder from './RankingLadder';

describe('<RankingLadder />', () => {
  test('it should mount', () => {
    const mockData = [
      { id: '1', name: 'Player 1', score: 100, rank: 1 },
      { id: '2', name: 'Player 2', score: 90, rank: 2 },
      // Add more mock player data as needed
    ];
    render(<RankingLadder data={mockData} />);
    const rankingLadder = screen.getByTestId('RankingLadder');

    expect(rankingLadder).toBeInTheDocument();
  });
});