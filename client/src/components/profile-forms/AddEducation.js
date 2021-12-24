import React, { useState, Fragment, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

const AddEducation = ({ addEducation, alert }) => {
  // Change state whenever eperienece is updated successfully
  const [redirect, setRedirect] = useState(false);

  const [formData, setFromData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  useEffect(() => {
    // Check if alert is fired before redirect to dashboard
    if (alert[0]) {
      if (alert[0].alertType === "success") {
        console.log(alert[0]);
        setRedirect(true);
      }
    }
  }, [alert]);

  // Redirect to dashboard
  if (redirect) return <Navigate to="/dashboard" />;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData);
  };

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">An Education Form</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add school or bootcamp that you
          have attended
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* School or bootcamp"
              name="school"
              required
              value={school}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Degree or certificate"
              name="degree"
              required
              value={degree}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Field of study"
              name="fieldofstudy"
              value={fieldofstudy}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <h4>From Date</h4>
            <input
              type="date"
              name="from"
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value={current}
                checked={current}
                onChange={(e) => {
                  setFromData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{" "}
              Current Study
            </p>
          </div>
          <div class="form-group">
            <h4>To Date</h4>
            <input
              type="date"
              name="to"
              value={to}
              disabled={toDateDisabled ? "disabled" : ""}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Major Description"
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" class="btn btn-primary my-1" />
          <Link class="btn btn-light my-1" to="/dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps, { addEducation })(AddEducation);
