import React, { useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Movie, MoviesAction } from 'types';
import { getMovies } from 'api/movies';

interface MoviesState {
  movies: Movie[]
  initialized: boolean
}

export function useMoviesReducer(): [MoviesState, React.Dispatch<MoviesAction>] {
  const movieReducer = (state: MoviesState, action: MoviesAction): MoviesState => {
    switch (action.type) {
      case 'fetch':
        return { ...state, movies: action.payload.data, initialized: true  };

      case 'add':
        const newMovie = { ...action.payload.movie, id: uuid() };
        return { ...state, 
          movies: [...state.movies, newMovie] 
        // console.log(state. '')
        };

      case 'delete':
        const filteredMovies = state.movies.filter(movie => movie.id !== action.payload.movieId);
        return { ...state, movies: filteredMovies };

      case 'rate':
        const { movieId, rating } = action.payload;
        const updatedMovies = state.movies.map(movie => {
          if (movie.id === movieId) {
            const updatedRatings = [...movie.ratings, rating];
            const aggregateRating = updatedRatings.reduce((acc, curr) => acc + curr) / updatedRatings.length;
            return { ...movie, ratings: updatedRatings, aggregateRating };
          }
          return movie;
        });
        return { ...state, movies: updatedMovies };

      default:
        return state;
    }
  };

  // Initial state for the movies reducer
  const initialState: MoviesState = {
    movies: [],
    initialized: false
  };

  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Fetch movies when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      dispatch({ type: 'fetch', payload: { data: movies } });
    };
    fetchData();
  }, []);

  return [state, dispatch];
}
