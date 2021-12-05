import React, { useState, Fragment, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

const AddExperience = ({ addExperience, alert: alert }) => {
  // Change state whenever eperienece is updated successfully
  const [redirect, setRedirect] = useState(false);

  const [formData, setFromData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

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

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData);
  };

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Add An Experience</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form class="form" onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Job Title"
              name="title"
              required
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="* Company"
              name="company"
              required
              value={company}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
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
              Current Job
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
              placeholder="Job Description"
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

// Add required properties for component
AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

// Map state of component to state of redux-reducer
const mapStateToProps = (state) => ({
  alert: state.alert,
});

// Connect properties and state b/w redux-react
export default connect(mapStateToProps, { addExperience })(AddExperience);
