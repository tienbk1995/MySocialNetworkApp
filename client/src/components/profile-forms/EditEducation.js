import React, { useState, Fragment, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateEducation, getCurrentEducation } from "../../actions/profile";
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

const EditEducation = ({
  profile: { educations, loading },
  getCurrentEducation,
  updateEducation,
  alert,
}) => {
  const { id } = useParams();
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
    // Stop fetching data when these're available
    if (!educations) getCurrentEducation(id);
    // Fill the form with data fetched from db
    try {
      setFromData({
        school: loading || !educations.school ? "" : educations.school,
        degree: loading || !educations.degree ? "" : educations.degree,
        fieldofstudy:
          loading || !educations.fieldofstudy ? "" : educations.fieldofstudy,
        from: loading || !educations.from ? "" : formatDate(educations.from),
        to: loading || !educations.to ? "" : formatDate(educations.to),
        current: loading || !educations.current ? false : educations.current,
        description:
          loading || !educations.description ? "" : educations.description,
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
  }, [educations]);

  // Redirect to dashboard
  if (redirect) return <Navigate to="/dashboard" />;

  if (!educations)
    return (
      <section class="container">
        <Spinner />
      </section>
    );

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateEducation(formData, id);
  };

  return (
    <Fragment>
      <section class="container">
        <h1 class="large text-primary">Edit Education Form</h1>
        <p class="lead">
          <i class="fas fa-code-branch"></i> Edit/Add school or bootcamp that
          you have attended
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

EditEducation.propTypes = {
  updateEducation: PropTypes.func.isRequired,
  getCurrentEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateEducation,
  getCurrentEducation,
})(EditEducation);
