import React from "react";
import filmsPropTypes from "../../prop-types/films-prop-types";
import PropTypes from "prop-types";

const GenreList = (props) => {
  const {genres, currentGenre, onSelectGenre} = props;

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) =>
        <li className={`catalog__genres-item ${genre === currentGenre ? `catalog__genres-item--active` : ``}`} key={`${genre}`}>
          <a
            href="#"
            className="catalog__genres-link"
            onClick={() => onSelectGenre(genre)}
          >{genre}</a>
        </li>
      )}
    </ul>
  );
};

GenreList.propTypes = {
  films: filmsPropTypes,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onSelectGenre: PropTypes.func.isRequired
};

export default GenreList;
