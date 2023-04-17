import React, { useState } from 'react';
import { MovieCard } from './MovieCard';
import { AddMovieButton } from './AddMovieButton';
import { AddMovieForm } from './AddMovieForm';
import { Card } from 'shared/components';
import { useMovies } from './MovieProvider';
import { Movie } from 'types';

type NewMovieMode = 'BUTTON' | 'FORM';

export const MovieList = () => {
  const { movies, moviesDispatch } = useMovies();
  const [displayOptionType, setDisplayOptionType] = useState<NewMovieMode>('BUTTON');

  const handleAddMovie = () => {
    setDisplayOptionType('FORM');
  };

  const handleCancelAddMovie = () => {
    setDisplayOptionType('BUTTON');
  };

  const handleMovieAdded = (movie: Movie) => {
    moviesDispatch({ type: 'add', payload: { movie } });
    setDisplayOptionType('BUTTON');
  };

  return (
    <div className="card-deck">
      {movies.map(movie => (
        <Card key={movie.id}>
          <MovieCard key={movie.id} movie={movie} />
        </Card>
      ))}
      {displayOptionType === 'BUTTON' ? (
        <Card>
          <AddMovieButton onClick={handleAddMovie} />
        </Card>
      ) : (
        <Card>
          {/* <AddMovieForm
            onCancel={handleCancelAddMovie}
            onSubmit={}
          /> */}
        </Card>
      )}
    </div>
  );
};
