import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import Spinner from "../spinner/spinner";

const Header = ({onUserAvatarClick}) => {
  const {authorizationStatus, userInfo} = useSelector((state) => state.USER);

  if (!userInfo.avatarUrl && authorizationStatus) {
    return <Spinner />;
  }

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link to={`/`} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {authorizationStatus
          ? <div className="user-block__avatar">
            <img
              src={userInfo.avatarUrl}
              alt="User avatar"
              width="63"
              height="63"
              onClick={() => onUserAvatarClick()}
            />
          </div>
          : <Link to="/login" className="user-block__link">Sign in</Link>
        }
      </div>
    </header>
  );
};

Header.propTypes = {
  onUserAvatarClick: PropTypes.func.isRequired
};

export default Header;
