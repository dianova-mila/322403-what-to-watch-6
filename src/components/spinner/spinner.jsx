import React from "react";
import "./spinner.css";
import {Link} from "react-router-dom";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>
        </header>
        <div className="spinner-container">
          <div className="spinner">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
