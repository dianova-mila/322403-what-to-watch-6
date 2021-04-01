import React, {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/api-actions";
import {Link, Redirect} from "react-router-dom";

const SignIn = () => {
  const {authorizationStatus} = useSelector((state) => state.USER);
  const [errorMessage, setErrorMessage] = useState(``);

  const loginRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const onSubmit = (authData) => {
    dispatch(login(authData, () => setErrorMessage(`loginError`)));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!loginRef.current.value) {
      setErrorMessage(`emailError`);
      return;
    }

    if (!passwordRef.current.value) {
      setErrorMessage(`passwordError`);
      return;
    }

    onSubmit({
      login: loginRef.current.value,
      password: passwordRef.current.value,
    });
  };

  if (authorizationStatus) {
    return <Redirect to={`/`} />;
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

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={handleSubmit}
        >

          {errorMessage === `loginError` &&
          <div className="sign-in__message">
            <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
          </div>}

          {errorMessage === `emailError` &&
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>}

          {errorMessage === `passwordError` &&
          <div className="sign-in__message">
            <p>Please enter a password</p>
          </div>}

          <div className="sign-in__fields">
            <div className={`sign-in__field ${errorMessage === `emailError` ? `sign-in__field--error` : ``}`}>
              <input
                ref={loginRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="login"
                onBlur={(evt) => {
                  if (!evt.target.value.includes(`@`)) {
                    evt.preventDefault();
                    setErrorMessage(`emailError`);
                  }
                }}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${errorMessage === `passwordError` ? `sign-in__field--error` : ``}`}>
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password"
                onBlur={(evt) => {
                  if (!evt.target.value) {
                    evt.preventDefault();
                    setErrorMessage(`passwordError`);
                  }
                }}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
            >Sign in</button>
          </div>
        </form>
      </div>

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
    </div>);
};

export default SignIn;
