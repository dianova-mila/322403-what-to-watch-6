import React, {useState} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import filmsPropTypes from "../../prop-types/films-prop-types";

const MovieList = (props) => {
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

MovieList.propTypes = {
  films: filmsPropTypes
};

export default MovieList;
