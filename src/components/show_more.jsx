import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {isActive, onClick} = props;
  if (!isActive) {
    return ``;
  }

  return (
    <div className="catalog__more" onClick={onClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ShowMore;
