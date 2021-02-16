import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {movie} = props;

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver={props.onMouseOver}>
      <div className="small-movie-card__image">
        <img
          src={movie.previewImage}
          alt={movie.name}
          width="280"
          height="175"/>
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${movie.id}/`}>{movie.name}</Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: PropTypes.shape({
    previewImage: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }),
  onMouseOver: PropTypes.func
};

export default SmallMovieCard;
