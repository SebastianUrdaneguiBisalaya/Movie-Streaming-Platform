import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CarrouselMain } from '../components/mainSection/CarrouselMain';
import { Movie, Movies, MovieResponse } from '../types/types';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get, api } from '../services/get';

const mockMovies: Movies[] = [
    {
    genres: ["Action", "Adventure"],
    id: 1,
    overview: "Description of the movie 1",
    release_date: "2024-01-01",
    title: "Movie 1",
    vote_average: 8.5,
    backdrop_path: "image1.jpg",
    },
    {
    genres: ["Action", "Adventure"],
    id: 2,
    overview: "Description of the movie 2",
    release_date: "2024-01-01",
    title: "Movie 2",
    vote_average: 8.5,
    backdrop_path: "image2.jpg",
    },
  ];

const mockMoviesFromApi: Movie[] = [
    {
        adult: false,
        backdrop_path: "",
        genre_ids: [28,8],
        id: 1,
        original_language: "en-US",
        original_title: "Movie 1",
        overview: "Description of the movie 1",
        popularity: 123,
        poster_path: "/img1.jpg",
        release_date: "2024-01-01",
        title: "Movie 1",
        video: false,
        vote_average: 8.8,
        vote_count: 128,
    }
]

describe('CarrouselMain Component', () => {
  it('should render movie titles', () => {
    render(
        <MemoryRouter>
            <CarrouselMain movies={mockMovies} />
        </MemoryRouter>
    );
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
    expect(screen.getByText("Description of the movie 1")).toBeInTheDocument();
    expect(screen.getByText("Description of the movie 2")).toBeInTheDocument();
  });

  it("should render backdrop path", async () => {
    render(
        <MemoryRouter>
            <CarrouselMain movies={mockMovies} />
        </MemoryRouter>
    );
    const images = await screen.findAllByRole("img");
    expect(images[0]).toHaveAttribute("data-src", "https://image.tmdb.org/t/p/w500/image1.jpg");
    expect(images[1]).toHaveAttribute("data-src", "https://image.tmdb.org/t/p/w500/image2.jpg");
  })

  beforeEach(() => {
    vi.restoreAllMocks();
  })
});


describe("Get Methods of Data to Show Movies", () => {
    it("should fetch data successfully", async () => {
        const mockData = {
            page: 1,
            results: mockMoviesFromApi
        };
        const mockGet = vi.spyOn(api, "get").mockResolvedValue({data: mockData});
        const result = await get<MovieResponse>("movie/popular?language=en-US&page=1");
        result.results.forEach((movie: Movie) => {
            expect(movie).toEqual(
                expect.objectContaining({
                    adult: expect.any(Boolean),
                    backdrop_path: expect.any(String),
                    genre_ids: expect.any(Array),
                    id: expect.any(Number),
                    original_language: expect.any(String),
                    original_title: expect.any(String),
                    overview: expect.any(String),
                    popularity: expect.any(Number),
                    poster_path: expect.any(String),
                    release_date: expect.any(String),
                    title: expect.any(String),
                    video: expect.any(Boolean),
                    vote_average: expect.any(Number),
                    vote_count: expect.any(Number),
                })
            )
        })
        expect(mockGet).toHaveBeenCalledWith("movie/popular?language=en-US&page=1");
    })

    it("should handle error", async () => {
        const mockError = new Error("Error");
        vi.spyOn(api, "get").mockRejectedValue(mockError);
        await expect(get("movie/popular?language=en-US&page=1")).rejects.toThrow(mockError);
    })

    it("should handle timeout", async () => {
        const mockTimeOut = new Error("Timeout");
        vi.spyOn(api, "get").mockRejectedValue(mockTimeOut);
        await expect(get("movie/popular?language=en-US&page=1")).rejects.toThrow(mockTimeOut);
    })

    beforeEach(() => {
        vi.restoreAllMocks();
    })
})

describe('CarrouselMain Component Integration Test', () => {
    it('should render movie titles and backdrop path', async () => {
      vi.spyOn(api, 'get').mockResolvedValue({ results: mockMoviesFromApi });
  
      render(
        <MemoryRouter>
          <CarrouselMain movies={mockMovies} />
        </MemoryRouter>
      );
  
      await waitFor(() => {
        expect(screen.getByText('Movie 1')).toBeInTheDocument();
        expect(screen.getByText('Movie 2')).toBeInTheDocument();
        expect(screen.getByText("Description of the movie 1")).toBeInTheDocument();
        expect(screen.getByText("Description of the movie 2")).toBeInTheDocument();
      });
  
      const images = await screen.findAllByRole('img');
      expect(images[0]).toHaveAttribute('data-src', 'https://image.tmdb.org/t/p/w500/image1.jpg');
      expect(images[1]).toHaveAttribute('data-src', 'https://image.tmdb.org/t/p/w500/image2.jpg');
    });
  });