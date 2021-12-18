import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Login</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Log into Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
            <small className="form-text">
              Enter your email account (eg: JohnSmith@gmail.com...)
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Enter your password</small>
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Do not have an account? <Link to="/register">Sign In</Link>
        </p>
        <p className="my-1">
          Have you forgot your password?{" "}
          <Link to="/reset-password">Click here</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
