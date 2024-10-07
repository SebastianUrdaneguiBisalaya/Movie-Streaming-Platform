import { render, screen, waitFor } from '@testing-library/react';
import { MainSection } from '../components/mainSection/MainSection';
import { get } from '../services';
import { vi, expect, describe, beforeEach, it } from 'vitest';

vi.mock('../services/get');

const mockMovies = {
  results: Array(5).fill({
    id: 1,
    title: 'Test Movie',
    vote_average: 8,
    poster_path: '/test.jpg',
    genre_ids: [1, 2],
  }),
};

const mockSeries = {
  results: Array(10).fill({
    id: 1,
    name: 'Test Series',
    vote_average: 8,
    poster_path: '/test.jpg',
  }),
};

const mockGenres = {
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
  ],
};

describe('MainSection', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('fetches data and renders child components', async () => {
    // Mock the get function to return the mock data
    (get as vi.Mock).mockResolvedValueOnce(mockMovies)
      .mockResolvedValueOnce(mockGenres)
      .mockResolvedValueOnce(mockSeries)
      .mockResolvedValueOnce(mockMovies)
      .mockResolvedValueOnce(mockMovies)
      .mockResolvedValueOnce(mockSeries)
      .mockResolvedValueOnce(mockMovies)
      .mockResolvedValueOnce(mockSeries)
      .mockResolvedValueOnce(mockMovies);

    render(<MainSection />);

    await waitFor(() => expect(get).toHaveBeenCalledTimes(9));

    expect(screen.getByTestId('carrousel-main')).toBeInTheDocument();
    expect(screen.getByTestId('recently-updated')).toBeInTheDocument();
    expect(screen.getByTestId('trending')).toBeInTheDocument();
    expect(screen.getByTestId('new-release-movies')).toBeInTheDocument();
    expect(screen.getByTestId('new-release-series')).toBeInTheDocument();
    expect(screen.getByTestId('tab-recommended')).toBeInTheDocument();
  });
});
