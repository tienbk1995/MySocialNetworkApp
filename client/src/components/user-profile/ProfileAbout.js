import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div class="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          {" "}
          <h2 class="text-primary">{bio}</h2>
          <p>There are something more about me, check it out!!</p>
          <div class="line"></div>
        </Fragment>
      )}
      {skills && (
        <Fragment>
          <h2 class="text-primary">Skill Set</h2>
          <div class="skills">
            {skills.map((skill, index) => (
              <div key={index} className="p-1">
                <i className="fas fa-check">{skill}</i>
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
