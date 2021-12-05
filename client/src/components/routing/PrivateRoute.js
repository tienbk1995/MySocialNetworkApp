import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  element: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return !isAuthenticated && !loading ? (
    <Navigate to="/login" />
  ) : (
    <Component />
  );
};

const render = (props, Component) => {
  return <Component {...props} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
