import React, { useEffect, Fragment, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  // Get query id params from App router
  const { id } = useParams();

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById]);

  const [displayGithubRepos, toggleDisplayGithubRepos] = useState(false);
  const [displayText, changeDisplayText] = useState(false);

  return (
    <Fragment>
      <section className="container">
        {profile === null || loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link className="btn btn-light" to="/profiles">
              Back
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link className="btn btn-dark" to="/edit-profile">
                  Edit-Profile
                </Link>
              )}
            <div class="profile-grid my-1">
              <ProfileTop profile={profile} />
              <ProfileAbout profile={profile} />
              <div className="profile-exp bg-white p-2">
                <h2 className="text-primary">Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>There are no experience available, please add it !!!</h4>
                )}
              </div>
              <div className="profile-edu bg-white p-2">
                <h2 className="text-primary">Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>There are no education available, please add it !!!</h4>
                )}
              </div>
              {profile.githubusername && (
                <div class="profile-github">
                  <h2 class="text-primary my-1">
                    <i class="fab fa-github"></i> Github Repos
                  </h2>
                  <button
                    onClick={() => {
                      toggleDisplayGithubRepos(!displayGithubRepos);
                      changeDisplayText(!displayText);
                    }}
                    type="button"
                    className="btn btn-dark"
                  >
                    {displayText ? "Show less" : "Show more"}
                  </button>
                  {displayGithubRepos && (
                    <ProfileGithub username={profile.githubusername} />
                  )}
                </div>
              )}
            </div>
          </Fragment>
        )}
      </section>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
