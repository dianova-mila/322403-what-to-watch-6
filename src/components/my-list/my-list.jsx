import React, {useEffect} from "react";
import MovieList from "../movie-list/movie-list";
import filmsPropTypes from "../../prop-types/films-prop-types";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/spinner";
import PropTypes from "prop-types";
import {fetchFavorites} from "../../store/api-actions";

const MyList = ({onSmallMovieCardClick}) => {
  const {favoritesMovies, isFavoritesLoaded} = useSelector((state) => state.FILMS);
  const {userInfo} = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  const onLoadData = () => {
    dispatch(fetchFavorites());
  };

  useEffect(() => {
    onLoadData();
  }, []);

  if (!isFavoritesLoaded) {
    return (
      <Spinner />
    );
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to="/" className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <div className="user-block">
          <div className="user-block__avatar">
            <img
              src={userInfo.avatarUrl}
              alt="User avatar"
              width="63"
              height="63"
            />
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList films={favoritesMovies} onSmallMovieCardClick={onSmallMovieCardClick}/>
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
  );
};

MyList.propTypes = {
  films: filmsPropTypes,
  onSmallMovieCardClick: PropTypes.func.isRequired,
};

export default MyList;
