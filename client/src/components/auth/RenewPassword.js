import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { loadUser, renewPassword } from "../../actions/auth";
import { setAuthToken } from "../../ultils/setAuthToken";
import PropTypes from "prop-types";

const RenewPassword = ({
  isAuthenticated,
  setAlert,
  loadUser,
  renewPassword,
}) => {
  const { token } = useParams();

  // Set header token and store in localStorage if valid link is given
  setAuthToken(token);
  localStorage.setItem("token", token);

  // Read form data
  const [formData, setFormData] = useState({
    password: "",
    password2: "",
  });
  const { password, password2 } = formData;

  useEffect(() => loadUser(), []);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password does not match", "danger", 3000);
    } else {
      renewPassword({ password });
    }
  };

  return (
    <section className="container">
      {isAuthenticated ? (
        <Fragment>
          <h1 className="large text-primary">Reset Password</h1>
          <p className="lead">
            <i className="fas fa-user"></i> New Password
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Enter your new password</small>
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={(e) => onChange(e)}
              />
              <small className="form-text">Confirm your new password</small>
            </div>
            <input type="submit" className="btn btn-primary" value="Submit" />
          </form>
        </Fragment>
      ) : (
        <Fragment>
          <div>
            <h1 className="large text-primary">Invalid Page</h1>
          </div>
        </Fragment>
      )}
    </section>
  );
};

RenewPassword.propTypes = {
  loadUser: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  renewPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, loadUser, renewPassword })(
  RenewPassword
);
