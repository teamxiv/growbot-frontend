import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import Card from "../../components/Card/Card.jsx";

import "../../assets/css/login.css";
import backgroundImage from "../../assets/img/background.png";
import refreshLoginToken from "../../actions/refresh_token";
import login from "../../actions/login";

const Login = props => {
  const { loggedIn } = props;
  const redirectLogin = loggedIn ? <Redirect to="/" /> : <div />;

  const [alertVisible, showAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const { login } = props;
    login(email, password);
  };

  useEffect(() => {
    const { refreshLoginToken, loginError } = props;
    const token = localStorage.getItem("loginToken");
    if (token !== null) {
      refreshLoginToken(token);
    }
    if (loginError) {
      showAlert(true);
      setAlertMessage(loginError);
    }
  });

  return (
    <div className="background">
      <img className="background-img" src={backgroundImage} alt="background" />
      <div className="login-div">
        {redirectLogin}
        <Card
          className="login-card"
          title="Login"
          content={
            <div>
              <div
                style={
                  !alertVisible ? { display: "none" } : { display: "block" }
                }
                className="alert alert-danger"
                role="alert"
              >
                {alertMessage}
              </div>
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

              <button style={{marginRight: '10px'}}onClick={handleLogin} className="btn btn-primary">
                Login
              </button>
              <Link to="/register" className="btn btn-primary">Go To Register</Link>
            </div>
          }
        />
      </div>
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
