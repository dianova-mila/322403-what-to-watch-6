import React, {useEffect, useState} from "react";
import MoviesList from "../movies-list";
import PropTypes from "prop-types";
import filmsPropTypes from "../films-prop-types";
import GenreList from "../genre-list";
import ShowMore from "../show_more";
import {ActionCreator} from "../../store/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from "../spinner/spinner";
import {fetchMovies} from "../../store/api-actions";

const MOVIES_CARDS_IN_STEP = 8;

const collectGenres = (films) => {
  const genres = [...new Set(films.map((item) => item.genre))];
  genres.unshift(`All genres`);
  return genres;
};

const getMoviesToShow = (movies, maxDisplayedMovies) => {
  if (movies <= maxDisplayedMovies.length) {
    return movies;
  }

  return movies.slice(0, maxDisplayedMovies);
};

const MainPage = (props) => {
  const {
    mainMovie,
    movies,
    onSelectGenre,
    movieList,
    onChangeGenre,
    currentGenre,
    isDataLoaded,
    onLoadData,
    authorizationStatus,
    onUserAvatarClick
  } = props;

  const [displayedMovies, setDisplayedMovies] = useState({
    maxDisplayedMovies: MOVIES_CARDS_IN_STEP,
    movies: movieList,
  });
  const [showMoreButtonActive, setShowMoreButtonActive] = useState(true);

  useEffect(() => {
    setDisplayedMovies((prevDisplayedMovies) => ({
      ...prevDisplayedMovies,
      movies: getMoviesToShow(movieList, displayedMovies.maxDisplayedMovies)
    }));

    if (displayedMovies.maxDisplayedMovies >= movieList.length) {
      setShowMoreButtonActive(false);
    } else {
      setShowMoreButtonActive(true);
    }
  }, [movieList]);

  useEffect(() => {
    onChangeGenre(currentGenre, movies);

    setDisplayedMovies((prevDisplayedMovies) => ({
      ...prevDisplayedMovies,
      maxDisplayedMovies: MOVIES_CARDS_IN_STEP
    }));
  }, [currentGenre]);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            {authorizationStatus
              ? <div className="user-block__avatar">
                <img
                  src="img/avatar.jpg"
                  alt="User avatar"
                  width="63"
                  height="63"
                  onClick={() => onUserAvatarClick()}
                />
              </div>
              : <Link to="/login" className="user-block__link">Sign in</Link>
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{mainMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{mainMovie.genre}</span>
                <span className="movie-card__year">{mainMovie.year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            genres={collectGenres(movies)}
            onSelectGenre={onSelectGenre}
          />

          <MoviesList films={displayedMovies.movies} />

          <ShowMore
            isActive={showMoreButtonActive}
            onClick={() => {
              setDisplayedMovies(() => ({
                maxDisplayedMovies: displayedMovies.maxDisplayedMovies + MOVIES_CARDS_IN_STEP,
                movies: getMoviesToShow(movieList, displayedMovies.maxDisplayedMovies + MOVIES_CARDS_IN_STEP)
              }));

              if (displayedMovies.maxDisplayedMovies + MOVIES_CARDS_IN_STEP >= movieList.length) {
                setShowMoreButtonActive(false);
              }
            }}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

MainPage.propTypes = {
  mainMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired
  }),
  movies: filmsPropTypes,
  movieList: filmsPropTypes,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  currentGenre: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired,
  onChangeGenre: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.bool.isRequired,
  onUserAvatarClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movieList: state.movieList,
  movies: state.movies,
  currentGenre: state.currentGenre,
  isDataLoaded: state.isDataLoaded,
  authorizationStatus: state.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onSelectGenre(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  },
  onChangeGenre(genre, films) {
    dispatch(ActionCreator.getMovieList(genre, films));
  },
  onLoadData() {
    dispatch(fetchMovies());
  },
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
