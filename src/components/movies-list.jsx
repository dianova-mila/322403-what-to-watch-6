import React, {useState} from "react";
import SmallMovieCard from "./small-movie-card";
import filmsPropTypes from "./films-prop-types";
import {connect} from "react-redux";

const MoviesList = (props) => {
  const {movieList} = props;
  const [, setCurrentMovieId] = useState(0);

  return (
    <div className="catalog__movies-list">
      {movieList.map((movie) =>
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
  movieList: filmsPropTypes
};

const mapStateToProps = (state) => ({
  movieList: state.movieList,
});

export {MoviesList};
export default connect(mapStateToProps)(MoviesList);
