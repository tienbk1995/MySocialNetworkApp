import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { renewPassword, checkPassword } from "../../actions/auth";
import PropTypes from "prop-types";

const ChangePassword = ({ setAlert, renewPassword, checkPassword }) => {
  // Read form data
  const [formData, setFormData] = useState({
    currentpassword: "",
    password: "",
    password2: "",
  });
  const { currentpassword, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    checkPassword(currentpassword);

    if (password !== password2) {
      setAlert("Password does not match", "danger", 3000);
    } else {
      renewPassword({ password });
    }
  };
  return (
    <section className="container">
      <Fragment>
        <h1 className="large text-primary">Change your password</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Update Password
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="currentpassword"
              value={currentpassword}
              onChange={(e) => onChange(e)}
            />
            <small className="form-text">Enter your current password</small>
          </div>
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
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </Fragment>
    </section>
  );
};

ChangePassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
  renewPassword: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
};

export default connect(null, {
  renewPassword,
  checkPassword,
  setAlert,
})(ChangePassword);
