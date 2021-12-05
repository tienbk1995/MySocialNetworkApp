import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
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
    const res = await axios.get("http://localhost:5000/api/auth");
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
      const res = await axios.post(
        "http://localhost:5000/api/users",
        body,
        config
      );
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
      const res = await axios.post(
        "http://localhost:5000/api/auth",
        body,
        config
      );
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
