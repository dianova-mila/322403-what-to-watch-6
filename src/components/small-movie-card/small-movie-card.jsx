import React, {useState} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import moviePropTypes from "../../prop-types/movie-prop-types";
import VideoPlayer from "../video-player/video-player";

const ONE_SECOND = 1000;

const SmallMovieCard = (props) => {
  const {movie, onSmallMovieCardClick} = props;
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const [timer, setTimer] = useState(0);

  return (
    <article className="small-movie-card catalog__movies-card" onMouseOver={props.onMouseOver}>
      <div
        className="small-movie-card__image"
        onMouseOver={() => {
          setTimer(setTimeout(() => {
            setIsPlayerActive(true);
          }, ONE_SECOND));
        }}
        onMouseOut={() => {
          setIsPlayerActive(false);
          clearTimeout(timer);
        }}
        onClick={() => onSmallMovieCardClick(movie.id)}
      >
        {isPlayerActive
          ? <VideoPlayer
            isPlaying={isPlayerActive}
            src={movie.previewVideoLink} />
          : <img
            src={movie.previewImage}
            alt={movie.name}
            width="280"
            height="175"/>
        }
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${movie.id}/`}>{movie.name}</Link>
      </h3>
    </article>
  );
};

SmallMovieCard.propTypes = {
  movie: moviePropTypes,
  onMouseOver: PropTypes.func,
  onSmallMovieCardClick: PropTypes.func
};

export default SmallMovieCard;
