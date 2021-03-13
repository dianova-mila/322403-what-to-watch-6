import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../store/actions";
import filmsPropTypes from "./films-prop-types";
import PropTypes from "prop-types";

const getGenres = (films) => {
  const genres = [...new Set(films.map((item) => item.genre))];
  genres.unshift(`All genres`);
  return genres;
};

const GenreList = (props) => {
  const {films, currentGenre, onChangeGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {getGenres(films).map((genre) =>
        <li className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`} key={`${genre}`}>
          <a
            href="#"
            className="catalog__genres-link"
            onClick={() => onChangeGenre(genre, films)}
          >{genre}</a>
        </li>
      )}
    </ul>
  );
};

GenreList.propTypes = {
  films: filmsPropTypes,
  currentGenre: PropTypes.string.isRequired,
  onChangeGenre: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeGenre(genre, films) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.getMovieList(genre, films));
  },
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
