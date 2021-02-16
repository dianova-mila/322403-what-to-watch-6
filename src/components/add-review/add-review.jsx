import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import filmsPropTypes from "../films-prop-types";

const AddReview = (props) => {
  const {films} = props;
  const {id} = useParams();
  const [reviewForm, setReviewForm] = useState({rating: ``, text: ``});
  const movie = films.find((film) => film.id === id);

  const ratingChangeHandler = (evt) => {
    setReviewForm({...reviewForm, rating: evt.target.value});
  };

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
                <form action="#" className="add-review__form">
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
                      placeholder="Review text"
                      onChange={(evt) => {
                        setReviewForm({...reviewForm, text: evt.target.value});
                      }}/>
                    <div className="add-review__submit">
                      <button className="add-review__btn" type="submit">Post</button>
                    </div>

                  </div>
                </form>
              </div>

              <div className="movie-card__reviews movie-card__row">
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Discerning travellers and Wes Anderson fans will luxuriate in the
                        glorious Mittel-European kitsch of one of the director&apos;s funniest and most exquisitely designed
                        movies in years.</p>

                      <footer className="review__details">
                        <cite className="review__author">Kate Muir</cite>
                        <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,9</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">Anderson&apos;s films are too precious for some, but for those of us
                        willing to lose ourselves in them, they&apos;re a delight. &quot;The Grand Budapest Hotel &quot; is no
                        different, except that he has added a hint of gravitas to the mix, improving the recipe.</p>

                      <footer className="review__details">
                        <cite className="review__author">Bill Goodykoontz</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">I didn&apos;t find it amusing, and while I can appreciate the creativity,
                        it&apos;s an hour and 40 minutes I wish I could take back.</p>

                      <footer className="review__details">
                        <cite className="review__author">Amanda Greever</cite>
                        <time className="review__date" dateTime="2015-11-18">November 18, 2015</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">8,0</div>
                  </div>
                </div>
                <div className="movie-card__reviews-col">
                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">The mannered, madcap proceedings are often delightful, occasionally
                        silly, and here and there, gruesome and/or heartbreaking.</p>

                      <footer className="review__details">
                        <cite className="review__author">Matthew Lickona</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,2</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                        the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,6</div>
                  </div>

                  <div className="review">
                    <blockquote className="review__quote">
                      <p className="review__text">It is certainly a magical and childlike way of storytelling, even if
                        the content is a little more adult.</p>

                      <footer className="review__details">
                        <cite className="review__author">Paula Fleri-Soler</cite>
                        <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">7,0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                  alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of
                  Grindelwald</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/bohemian-rhapsody.jpg" alt="Bohemian Rhapsody" width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Bohemian Rhapsody</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/macbeth.jpg" alt="Macbeth" width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Macbeth</a>
              </h3>
            </article>

            <article className="small-movie-card catalog__movies-card">
              <div className="small-movie-card__image">
                <img src="img/aviator.jpg" alt="Aviator" width="280" height="175"/>
              </div>
              <h3 className="small-movie-card__title">
                <a className="small-movie-card__link" href="movie-page.html">Aviator</a>
              </h3>
            </article>
          </div>
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
  films: filmsPropTypes
};

export default AddReview;
