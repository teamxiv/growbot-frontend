import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Card from "../../components/Card/Card.jsx";

import "./login.css";
import refreshLoginToken from "../../actions/refresh_token";
import login from "../../actions/login";

const Login = props => {
  const { loggedIn } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectLogin = loggedIn ? <Redirect to="/" /> : <div />;

  const handleLogin = () => {
    const { login } = props;
    login(email, password);
  };

  useEffect(() => {
    const { refreshLoginToken } = props;
    const token = localStorage.getItem("loginToken");
    if (token !== null) {
      refreshLoginToken(token);
    }
  });

  return (
    <div className="login_div">
      {redirectLogin}
      <Card
        className="login_card"
        title="Login"
        content={
          <div>
            <div className="form-group">
              <label htmlFor="inputEmail">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>

              <input
                type="password"
                className="form-control"
                id="inputPassword"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)}
              />
            </div>

            <div className="checkbox">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
            </div>

            <button onClick={handleLogin} className="btn btn-primary">
              Login
            </button>
          </div>
        }
      />
    </div>
  );
};

const mapStateToProps = state => {
  const { loginError, isLoginSuccess } = state.auth;
  return {
    loginError,
    loggedIn: isLoginSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshLoginToken: token => dispatch(refreshLoginToken(token)),
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);