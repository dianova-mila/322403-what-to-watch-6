import React, {useEffect, useRef, useState} from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchOneMovie} from "../../store/api-actions";
import Spinner from "../spinner/spinner";

const MILLISECONDS_TO_SECOND = 1000;
const MAX_PROGRESS = 100;

const Player = ({onExitClick}) => {
  const {movie, isOneMovieLoaded} = useSelector((state) => state.MOVIE);
  const [isVideoPlayed, setIsVideoPlayed] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [progress, setProgress] = useState(0);

  const {id} = useParams();

  const videoRef = useRef();

  const duration = require(`dayjs/plugin/duration`);
  dayjs.extend(duration);

  const dispatch = useDispatch();

  const onLoadData = (movieId) => {
    dispatch(fetchOneMovie(movieId));
  };

  useEffect(() => {
    if (movie.id !== id) {
      onLoadData(id);
    }
  }, []);

  if (!isOneMovieLoaded) {
    return (
      <Spinner />
    );
  }

  const onPlayButtonClick = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsVideoPlayed(true);
      return;
    }
    videoRef.current.pause();
    setIsVideoPlayed(false);
  };


  return (
    <div className="player">
      <video
        ref={videoRef}
        src={movie.videoLink}
        className="player__video"
        poster={movie.backgroundImage}
        autoPlay={true}
        onTimeUpdate={() => {
          setTimeElapsed(
              ((videoRef.current.duration - videoRef.current.currentTime) * MILLISECONDS_TO_SECOND),
          );
          setProgress(
              (Math.floor(videoRef.current.currentTime) / (Math.floor(videoRef.current.duration) / MAX_PROGRESS))
          );
        }}
        onClick={() => onPlayButtonClick()}
      />

      <button
        type="button"
        className="player__exit"
        onClick={() => onExitClick()}
      >Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={progress} max="100" />
            <div className="player__toggler" style={{left: `${progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{dayjs.duration(timeElapsed).format(`H:mm:ss`)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={() => onPlayButtonClick()}
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={isVideoPlayed ? `#pause` : `#play-s`} />
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{movie.name}</div>

          <button
            type="button"
            className="player__full-screen"
            onClick={() => {
              videoRef.current.requestFullscreen();
            }}
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen" />
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  onExitClick: PropTypes.func.isRequired
};

export default Player;
