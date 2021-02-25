import React, {useState} from "react";
import SmallMovieCard from "./small-movie-card";
import filmsPropTypes from "./films-prop-types";
import moviePropTypes from "./movie-prop-types";

const SimilarMoviesList = (props) => {
  const {films, movie} = props;
  const [, setCurrentMovieId] = useState(0);
  const similarFilms = films.filter((film) => film.genre === movie.genre).slice(0, 4);

  return (
    <div className="catalog__movies-list">
      {similarFilms.map((film) =>
        <SmallMovieCard
          movie={film}
          key={`movieCard-${film.id}`}
          onMouseOver={() => {
            setCurrentMovieId({currentMovieId: film.id});
          }}/>
      )}
    </div>
  );
};

SimilarMoviesList.propTypes = {
  films: filmsPropTypes,
  movie: moviePropTypes
};

export default SimilarMoviesList;
