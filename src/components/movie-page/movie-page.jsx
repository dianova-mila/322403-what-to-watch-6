import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import moviePropTypes from "../movie-prop-types";
import filmsPropTypes from "../films-prop-types";
import commentsPropTypes from "../comments-prop-types";
import PropTypes from "prop-types";
import MoviePageTabs from "../movie-page-tabs";
import SimilarMoviesList from "../similar-movies-list";
import {fetchOneMovie} from "../../store/api-actions";
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";

const MoviePage = (props) => {
  const {movie, movies, isOneMovieLoaded, onLoadData, comments, authorizationStatus} = props;
  const {id} = useParams();

  useEffect(() => {
    onLoadData(id);
  }, [id]);

  useEffect(() => {
    if (!isOneMovieLoaded) {
      onLoadData(id);
    }
  }, [isOneMovieLoaded]);

  if (!isOneMovieLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img
              src={movie.backgroundImage}
              alt={movie.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <Link to="/" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </Link>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
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
                {authorizationStatus && <Link to={`/films/${movie.id}/review`} className="btn movie-card__button">Add review</Link>}
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

            <MoviePageTabs movie={movie} comments={comments}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <SimilarMoviesList films={movies} movie={movie}/>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link">
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

MoviePage.propTypes = {
  movie: moviePropTypes,
  movies: filmsPropTypes,
  isOneMovieLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.bool.isRequired,
  comments: commentsPropTypes,
  authorizationStatus: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  movie: state.movie,
  comments: state.comments,
  isOneMovieLoaded: state.isOneMovieLoaded,
  authorizationStatus: state.authorizationStatus
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData(id) {
    dispatch(fetchOneMovie(id));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
