import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/auth";
import PropTypes from "prop-types";

const ResetPassword = ({ resetPassword }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const { email } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    resetPassword({ email });
  };

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Reset Password</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Email Address
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
              Enter your email address (eg: JohnSmith@gmail.com...)
            </small>
          </div>
          <input type="submit" className="btn btn-primary" value="Submit" />
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
};

export default connect(null, { resetPassword })(ResetPassword);
