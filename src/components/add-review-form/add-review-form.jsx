import React, {useState} from "react";
import Toast from "../toast/toast";
import {useDispatch} from 'react-redux';
import {addReview} from "../../store/api-actions";
import PropTypes from "prop-types";

const AddReviewForm = ({id}) => {
  const [reviewForm, setReviewForm] = useState({rating: ``, comment: ``});
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onSubmit(reviewForm, id, onAddReviewError);
  };

  const onSubmit = (reviewData, movieId, onAddReviewError) => {
    dispatch(addReview(reviewData, movieId, onAddReviewError));
  };

  const ratingChangeHandler = (evt) => {
    const currentRating = evt.target.value;
    setReviewForm((prevReview) => ({...prevReview, rating: currentRating}));
  };

  const onAddReviewError = () => {
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
    }, 10000);
  };

  return (
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
            required
            placeholder="Review text"
            onChange={(evt) => {
              const text = evt.target.value;

              setReviewForm((prevReview) => ({...prevReview, comment: text}));
            }}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!reviewForm.rating || reviewForm.comment.length < 40 || reviewForm.comment.length > 400}
            >Post</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddReviewForm;

AddReviewForm.propTypes = {
  id: PropTypes.string.isRequired
};
