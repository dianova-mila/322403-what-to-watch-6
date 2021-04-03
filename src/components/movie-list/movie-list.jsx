import React, {useState} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import PropTypes from "prop-types";
import filmsPropTypes from "../../prop-types/films-prop-types";

const MovieList = (props) => {
  const {films, onSmallMovieCardClick} = props;
  const [, setCurrentMovieId] = useState(0);

  return (
    <div className="catalog__movies-list">
      {films.map((movie) =>
        <SmallMovieCard
          movie={movie}
          key={`movieCard-${movie.id}`}
          onMouseOver={() => {
            setCurrentMovieId({currentMovieId: movie.id});
          }}
          onSmallMovieCardClick={onSmallMovieCardClick}
        />
      )}
    </div>
  );
};

MovieList.propTypes = {
  films: filmsPropTypes,
  onSmallMovieCardClick: PropTypes.func.isRequired
};

export default MovieList;
