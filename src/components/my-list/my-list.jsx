import React, {useEffect} from "react";
import MovieList from "../movie-list/movie-list";
import filmsPropTypes from "../../prop-types/films-prop-types";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/spinner";
import {fetchFavorites, logout} from "../../store/api-actions";

const MyList = () => {
  const {favoritesMovies, isFavoritesLoaded} = useSelector((state) => state.FILMS);
  const {userInfo} = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  const onLoadData = () => {
    dispatch(fetchFavorites());
  };

const MyList = (props) => {
  const {films} = props;

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
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </div>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList films={films}/>
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
  films: filmsPropTypes
};

export default MyList;
