import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  let _id, avatar, name;

  const { user } = profile;

  // Check if user's profile already existed
  if (user) {
    _id = user._id;
    avatar = user.avatar;
    name = user.name;
  }

  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {profile.status}{" "}
          {profile.company && <span> at {profile.company}</span>}
        </p>
        <p className="my-1">
          {profile.location && <span> at {profile.location}</span>}
        </p>
        {user ? (
          <Link className="btn btn-primary" to={`/profile/${_id}`}>
            View Profile
          </Link>
        ) : (
          <p className="text-primary">This user does not have profile</p>
        )}
      </div>
      <ul>
        {profile.skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
