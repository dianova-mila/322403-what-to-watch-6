import React, {useEffect} from "react";
import Header from "../header/header";
import {useDispatch, useSelector} from "react-redux";
import {addToFavorites, fetchPromoMovie} from "../../store/api-actions";
import Spinner from "../spinner/spinner";
import PropTypes from "prop-types";

const MovieCard = ({onUserAvatarClick}) => {
  const {promoMovie, isPromoMovieLoaded} = useSelector((state) => state.MOVIE);

  const dispatch = useDispatch();

  const onLoadData = () => {
    dispatch(fetchPromoMovie());
  };

  const onMyListButtonClick = () => {
    if (promoMovie.isFavorite) {
      dispatch(addToFavorites(promoMovie.id, 0, () => onAddToFavorites()));
      return;
    }

    dispatch(addToFavorites(promoMovie.id, 1, () => onAddToFavorites()));
  };

  const onAddToFavorites = () => {
    dispatch(fetchPromoMovie());
  };

  useEffect(() => {
    if (!isPromoMovieLoaded) {
      onLoadData();
    }
  }, [isPromoMovieLoaded]);

  if (!isPromoMovieLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img
          src={promoMovie.backgroundImage}
          alt={promoMovie.name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header onUserAvatarClick={onUserAvatarClick} />

      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <div className="movie-card__poster">
            <img
              src={promoMovie.posterImage}
              alt={promoMovie.name}
              width="218"
              height="327"/>
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{promoMovie.name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{promoMovie.genre}</span>
              <span className="movie-card__year">{promoMovie.year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s" />
                </svg>
                <span>Play</span>
              </button>
              <button
                className="btn btn--list movie-card__button"
                type="button"
                onClick={() => onMyListButtonClick()}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref={promoMovie.isFavorite ? `#in-list` : `#add`} />
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MovieCard.propTypes = {
  onUserAvatarClick: PropTypes.func.isRequired
};

export default MovieCard;
