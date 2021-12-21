import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  EMAIL_SENT,
  EMAIL_NOT_SENT,
  PASSWORD_UPDATED,
  PASSWORD_FAILED,
  PASSWORD_CHECKED,
  PASSWORD_CHECKED_FAILED,
} from "./type";
import axios from "axios";
import { setAlert } from "./alert";
import { setAuthToken } from "../ultils/setAuthToken";

// Load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);
      // Register the user successfully
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      // Send user's token to server
      dispatch(loadUser());
    } catch (err) {
      let errors = null;
      if (err.response) {
        if (err.response.data.error) errors = err.response.data.error;
        else if (err.response.data.errors) errors = err.response.data.errors;
      }
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger", 3000))
        );
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };

// Login user
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);
      // Logged in successfully
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      // Send user's token to server
      dispatch(loadUser());
    } catch (err) {
      let errors = null;
      if (err.response) {
        if (err.response.data.error) errors = err.response.data.error;
        else if (err.response.data.errors) errors = err.response.data.errors;
      }
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger", 3000))
        );
      }

      dispatch({ type: LOGIN_FAIL });
    }
  };

// Log out user
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Reset Password
export const resetPassword =
  ({ email }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ email });

    try {
      const res = await axios.post("/api/users/reset-password", body, config);
      // Email sent successfully
      dispatch({ type: EMAIL_SENT, payload: res.data });
      dispatch(setAlert("Email has been sent successfully", "success", 3000));
    } catch (err) {
      let errors = null;
      if (err.response) {
        if (err.response.data.error) errors = err.response.data.error;
        else if (err.response.data.errors) errors = err.response.data.errors;
      }
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger", 3000))
        );
      }

      dispatch({ type: EMAIL_NOT_SENT });
    }
  };

// Renew Password
export const renewPassword =
  ({ password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ password });

    try {
      const res = await axios.post("/api/users/renew-password", body, config);
      // Email sent successfully
      dispatch({ type: PASSWORD_UPDATED, payload: res.data });
      dispatch(
        setAlert("Password has been updated successfully", "success", 3000)
      );
    } catch (err) {
      let errors = null;
      if (err.response) {
        if (err.response.data.error) errors = err.response.data.error;
        else if (err.response.data.errors) errors = err.response.data.errors;
      }
      if (errors) {
        errors.forEach((error) =>
          dispatch(setAlert(error.msg, "danger", 3000))
        );
      }

      dispatch({ type: PASSWORD_FAILED });
    }
  };

// Check password
export const checkPassword = (password) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.post("/api/auth/checkpass", body, config);
    // Check password successfully
    dispatch({ type: PASSWORD_CHECKED, payload: res.data });
  } catch (err) {
    let errors = null;
    if (err.response) {
      if (err.response.data.error) errors = err.response.data.error;
      else if (err.response.data.errors) errors = err.response.data.errors;
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    }

    dispatch({ type: PASSWORD_CHECKED_FAILED });
  }
};
