import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MovieList from "../movie-list/movie-list";
import PropTypes from "prop-types";
import GenreList from "../genre-list/genre-list";
import ShowMore from "../show_more/show_more";
import Spinner from "../spinner/spinner";
import {fetchMovies} from "../../store/api-actions";
import {changeGenre, getMovieList} from "../../store/actions";
import MovieCard from "../movie-card/movie-card";

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

const MainPage = ({onUserAvatarClick, onPlayButtonClick}) => {
  const {movies, movieList, currentGenre, isDataLoaded} = useSelector((state) => state.FILMS);

  const [displayedMovies, setDisplayedMovies] = useState({
    maxDisplayedMovies: MOVIES_CARDS_IN_STEP,
    movies: movieList,
  });
  const [showMoreButtonActive, setShowMoreButtonActive] = useState(true);

  const dispatch = useDispatch();

  const onSelectGenre = (genre) => {
    dispatch(changeGenre(genre));
  };

  const onChangeGenre = (genre, films) => {
    dispatch(getMovieList(genre, films));
  };

  const onLoadData = () => {
    dispatch(fetchMovies());
  };

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
      <MovieCard onUserAvatarClick={onUserAvatarClick} onPlayButtonClick={onPlayButtonClick} />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            genres={collectGenres(movies)}
            onSelectGenre={onSelectGenre}
            currentGenre={currentGenre}
          />

          <MovieList films={displayedMovies.movies} />

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
  onUserAvatarClick: PropTypes.func.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};

export default MainPage;
