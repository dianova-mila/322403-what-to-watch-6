import React from 'react';
import {useState} from 'react';
import SmallMovieCard from "./small-movie-card";
import filmsPropTypes from "./films-prop-types";

const MoviesList = (props) => {
  const {films} = props;
  const [, setCurrentMovieId] = useState(0);

  return (
    <div className="catalog__movies-list">
      {films.map((movie) =>
        <SmallMovieCard
          movie={movie}
          key={`movieCard-${movie.id}`}
          onMouseOver={() => {
            setCurrentMovieId({currentMovieId: movie.id});
          }}/>
      )}
    </div>
  );
};

MoviesList.propTypes = {
  films: filmsPropTypes
};

export default MoviesList;
