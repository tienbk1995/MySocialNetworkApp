import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-circle"></i>{" "}
          <span className="hide-sm">Talents</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-blog"></i> <span className="hide-sm">Posts</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/login">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user-circle"></i>{" "}
          <span className="hide-sm">Talents</span>
        </Link>
      </li>
      <li>
        <i class="far fa-registered"></i>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">
          <i class="fas fa-sign-in-alt"></i> Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i class="fas fa-house-user"></i> Home
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
