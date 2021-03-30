import React, {Fragment, useState} from "react";
import dayjs from "dayjs";
import moviePropTypes from "../../prop-types/movie-prop-types";
import commentsPropTypes from "../../prop-types/comments-prop-types";


const Rating = {
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10
};

const Tabs = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};

const MINUTE_IN_HOUR = 60;

const getRating = (rating) => {
  if (rating <= Rating.NORMAL) {
    return `Bad`;
  } else if (rating > Rating.NORMAL && rating <= Rating.GOOD) {
    return `Normal`;
  } else if (rating > Rating.GOOD && rating <= Rating.VERY_GOOD) {
    return `Good`;
  } else if (rating > Rating.VERY_GOOD && rating < Rating.AWESOME) {
    return `Very good`;
  } else if (rating === Rating.AWESOME) {
    return `Awesome`;
  }
  return ``;
};

const getRunTime = (runTimeInMinute) => {
  return `${Math.floor(runTimeInMinute / MINUTE_IN_HOUR)}h ${runTimeInMinute % MINUTE_IN_HOUR}m`;
};

const MoviePageTabs = (props) => {
  const {movie, comments} = props;
  const [activeTab, setActiveTab] = useState(Tabs.OVERVIEW);

  const renderTab = (currentTab) => {
    switch (currentTab) {
      case Tabs.OVERVIEW:
        return (
          <Fragment>
            <div className="movie-rating">
              <div className="movie-rating__score">{movie.rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{getRating(movie.rating)}</span>
                <span className="movie-rating__count">{movie.scoresCount} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{movie.description}</p>

              <p className="movie-card__director"><strong>Director: {movie.director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {movie.starring.join(`, `)} and other</strong></p>
            </div>
          </Fragment>
        );

      case Tabs.DETAILS:
        return (
          <div className="movie-card__text movie-card__row">
            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Director</strong>
                <span className="movie-card__details-value">{movie.director}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Starring</strong>
                <span className="movie-card__details-value">
                  {movie.starring.join(`, `)}
                </span>
              </p>
            </div>

            <div className="movie-card__text-col">
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Run Time</strong>
                <span className="movie-card__details-value">{getRunTime(movie.runTime)}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Genre</strong>
                <span className="movie-card__details-value">{movie.genre}</span>
              </p>
              <p className="movie-card__details-item">
                <strong className="movie-card__details-name">Released</strong>
                <span className="movie-card__details-value">{movie.released}</span>
              </p>
            </div>
          </div>
        );

      case Tabs.REVIEWS:
        return (
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
        );
    }

    return ``;
  };

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={`movie-nav__item ${activeTab === Tabs.OVERVIEW && `movie-nav__item--active`}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setActiveTab(Tabs.OVERVIEW);
              }}
            >Overview</a>
          </li>
          <li className={`movie-nav__item ${activeTab === Tabs.DETAILS && `movie-nav__item--active`}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setActiveTab(Tabs.DETAILS);
              }}
            >Details</a>
          </li>
          <li className={`movie-nav__item ${activeTab === Tabs.REVIEWS && `movie-nav__item--active`}`}>
            <a
              href="#"
              className="movie-nav__link"
              onClick={(evt) => {
                evt.preventDefault();
                setActiveTab(Tabs.REVIEWS);
              }}
            >Reviews</a>
          </li>
        </ul>
      </nav>

      {renderTab(activeTab)}
    </div>
  );
};

export default MoviePageTabs;

MoviePageTabs.propTypes = {
  movie: moviePropTypes,
  comments: commentsPropTypes
};
