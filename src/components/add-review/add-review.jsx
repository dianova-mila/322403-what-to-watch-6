import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Spinner from "../spinner/spinner";
import {fetchOneMovie, fetchMovies, addToFavorites} from "../../store/api-actions";
import Header from "../header/header";
import MovieList from "../movie-list/movie-list";
import PropTypes from "prop-types";
import MoviePageTabs from "../movie-page-tabs/movie-page-tabs";
import {Tabs} from "../../const";

const AddReview = ({onUserAvatarClick, onPlayButtonClick, onSmallMovieCardClick}) => {
  const {movie, comments, isOneMovieLoaded} = useSelector((state) => state.MOVIE);
  const {movies} = useSelector((state) => state.FILMS);

  const {id} = useParams();

  const dispatch = useDispatch();

  const onLoadData = (movieId) => {
    dispatch(fetchOneMovie(movieId));

    if (movies.length === 0) {
      dispatch(fetchMovies(movieId));
    }
  };

  const onMyListButtonClick = () => {
    if (movie.isFavorite) {
      dispatch(addToFavorites(id, 0, () => onAddToFavorites(id)));
      return;
    }

    dispatch(addToFavorites(id, 1, () => onAddToFavorites(id)));
  };

  const onAddToFavorites = (movieId) => {
    dispatch(fetchOneMovie(movieId));
  };

  useEffect(() => {
    if (movie.id !== id) {
      onLoadData(id);
    }
  }, [id]);

  useEffect(() => {
    onLoadData(id);
  }, []);

  if (!isOneMovieLoaded) {
    return (
      <Spinner />
    );
  }

  const similarMovies = movies.filter((film) => film.genre === movie.genre).slice(0, 4);

  return (
    <React.Fragment>
      <section
        className="movie-card movie-card--full"
        style={{
          backgroundColor: movie.backgroundColor,
        }}
      >
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img
              src={movie.backgroundImage}
              alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header onUserAvatarClick={onUserAvatarClick} />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => onPlayButtonClick(movie.id)}
                >
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
                    <use xlinkHref={movie.isFavorite ? `#in-list` : `#add`} />
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img
                src={movie.posterImage}
                alt={movie.name}
                width="218"
                height="327"/>
            </div>

            <MoviePageTabs defaultTab={Tabs.REVIEWS} movie={movie} comments={comments}/>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList films={similarMovies} onSmallMovieCardClick={onSmallMovieCardClick}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

AddReview.propTypes = {
  onUserAvatarClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired
};

export default AddReview;

