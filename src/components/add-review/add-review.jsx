import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import Spinner from "../spinner/spinner";
import {fetchOneMovie, addReview, fetchMovies} from "../../store/api-actions";
import dayjs from "dayjs";
import Toast from "../toast/toast";
import Header from "../header/header";
import MovieList from "../movie-list/movie-list";
import PropTypes from "prop-types";

const AddReview = ({onUserAvatarClick, onPlayButtonClick}) => {
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

  const onSubmit = (reviewData, movieId, onAddReviewError) => {
    dispatch(addReview(reviewData, movieId, onAddReviewError));
  };

  const [reviewForm, setReviewForm] = useState({rating: ``, comment: ``});
  const [showError, setShowError] = useState(false);

  const ratingChangeHandler = (evt) => {
    const currentRating = evt.target.value;
    setReviewForm((prevReview) => ({...prevReview, rating: currentRating}));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(reviewForm, id, onAddReviewError);
  };

  const onAddReviewError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 10000);
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
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
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

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <ul className="movie-nav__list">
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Overview</a>
                  </li>
                  <li className="movie-nav__item">
                    <a href="#" className="movie-nav__link">Details</a>
                  </li>
                  <li className="movie-nav__item movie-nav__item--active">
                    <a href="#" className="movie-nav__link">Reviews</a>
                  </li>
                </ul>
              </nav>

              <div className="add-review">
                <Toast isErrorShow={showError} errorText={`Cannot post review`}/>
                <form
                  action="#"
                  className="add-review__form"
                  onSubmit={handleSubmit}
                >
                  <div className="rating">
                    <div className="rating__stars" onChange={ratingChangeHandler}>
                      <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                      <label className="rating__label" htmlFor="star-1">Rating 1</label>

                      <input className="rating__input" id="star-2" type="radio" name="rating" value="2"/>
                      <label className="rating__label" htmlFor="star-2">Rating 2</label>

                      <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
                      <label className="rating__label" htmlFor="star-3">Rating 3</label>

                      <input className="rating__input" id="star-4" type="radio" name="rating" value="4"/>
                      <label className="rating__label" htmlFor="star-4">Rating 4</label>

                      <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                      <label className="rating__label" htmlFor="star-5">Rating 5</label>

                      <input className="rating__input" id="star-6" type="radio" name="rating" value="6"/>
                      <label className="rating__label" htmlFor="star-6">Rating 6</label>

                      <input className="rating__input" id="star-7" type="radio" name="rating" value="7"/>
                      <label className="rating__label" htmlFor="star-7">Rating 7</label>

                      <input className="rating__input" id="star-8" type="radio" name="rating" value="8"/>
                      <label className="rating__label" htmlFor="star-8">Rating 8</label>

                      <input className="rating__input" id="star-9" type="radio" name="rating" value="9"/>
                      <label className="rating__label" htmlFor="star-9">Rating 9</label>

                      <input className="rating__input" id="star-10" type="radio" name="rating" value="10"/>
                      <label className="rating__label" htmlFor="star-10">Rating 10</label>
                    </div>
                  </div>

                  <div className="add-review__text">
                    <textarea
                      className="add-review__textarea"
                      name="review-text"
                      id="review-text"
                      minLength="50"
                      maxLength="400"
                      required={true}
                      placeholder="Review text"
                      onChange={(evt) => {
                        const text = evt.target.value;
                        setReviewForm((prevReview) => ({...prevReview, comment: text}));
                      }}/>
                    <div className="add-review__submit">
                      <button
                        className="add-review__btn"
                        type="submit"
                        disabled={!reviewForm.rating || !reviewForm.comment}
                      >Post</button>
                    </div>

                  </div>
                </form>
              </div>

              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  {comments.map((item) =>
                    <div className="review" key={`comment-${item.id}`}>
                      <blockquote className="review__quote">
                        <p className="review__text">{item.comment}</p>

                        <footer className="review__details">
                          <cite className="review__author">{item.user.name}</cite>
                          <time className="review__date" dateTime="{dayjs(new Date(item.date)).format(`YYYY-MM-DD`)}">{
                            dayjs(new Date(item.date)).format(`MMMM DD, YYYY`)
                          }</time>
                        </footer>
                      </blockquote>

                      <div className="review__rating">{item.rating}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList films={similarMovies} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

AddReview.propTypes = {
  onUserAvatarClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};

export default AddReview;

