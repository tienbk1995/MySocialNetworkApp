import React, { useState, Fragment, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateExperience, getCurrentExperience } from "../../actions/profile";
import Spinner from "../layout/Spinner";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

const EditExperience = ({
  profile: { experiences, loading },
  updateExperience,
  getCurrentExperience,
  alert,
}) => {
  const { id } = useParams();
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

  const { company, title, location, from, to, current, description } = formData;

  useEffect(() => {
    if (!experiences) getCurrentExperience(id);
    try {
      setFromData({
        company: loading || !experiences.company ? "" : experiences.company,
        title: loading || !experiences.title ? "" : experiences.title,
        location: loading || !experiences.location ? "" : experiences.location,
        from: loading || !experiences.from ? "" : formatDate(experiences.from),
        to: loading || !experiences.to ? "" : formatDate(experiences.to),
        current: loading || !experiences.current ? false : experiences.current,
        description:
          loading || !experiences.description ? "" : experiences.description,
      });
      // Check if alert is fired before redirect to dashboard
      if (alert[0]) {
        if (alert[0].alertType === "success") {
          console.log(alert[0]);
          setRedirect(true);
        }
      }
    } catch (err) {
      return (
        <section class="container">
          <Spinner />
        </section>
      );
    }
  }, [experiences]);

  // Redirect to dashboard
  if (redirect) return <Navigate to="/dashboard" />;

  if (!experiences)
    return (
      <section class="container">
        <Spinner />
      </section>
    );

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateExperience(formData, id);
  };

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Update Experience Form</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Update any developer/programming
          positions that you need to change
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
EditExperience.propTypes = {
  updateExperience: PropTypes.func.isRequired,
  getCurrentExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

// Map state of component to state of redux-reducer
const mapStateToProps = (state) => ({
  alert: state.alert,
  profile: state.profile,
});

// Connect properties and state b/w redux-react
export default connect(mapStateToProps, {
  updateExperience,
  getCurrentExperience,
})(EditExperience);
