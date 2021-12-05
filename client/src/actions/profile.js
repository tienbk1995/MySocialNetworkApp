import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./type";
import { Link, Navigate } from "react-router-dom";

// Get user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create user's profile
export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/profile",
        formData,
        config
      );

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile updated" : "Profile created", "success", 5000)
      );

      // Redirect to '/dashboard' if new profile created
      // if (!edit) {
      //   console.log("redirect");
      //   return <Navigate to="/dashboard" />;
      // }
    } catch (err) {
      // Set Alert for required fields
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
      // Dispatch error
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response ? err.response.statusText : "Something went wrong",
          status: err.response ? err.response.status : "Something went wrong",
        },
      });
    }
  };

// Add user's Education
export const addEducation = (formData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    const res = await axios.put(
      "http://localhost:5000/api/profile/education",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education added successfully", "success", 5000));
  } catch (err) {
    // Set Alert for required fields
    let errors = null;
    if (err.response) {
      if (err.response.data.error) errors = err.response.data.error;
      else if (err.response.data.errors) errors = err.response.data.errors;
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    }
    // Dispatch error
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Add user's Experience
export const addExperience = (formData) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  try {
    const res = await axios.put(
      "http://localhost:5000/api/profile/experience",
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience added successfully", "success", 5000));
  } catch (err) {
    // Set Alert for required fields
    let errors = null;
    if (err.response) {
      if (err.response.data.error) errors = err.response.data.error;
      else if (err.response.data.errors) errors = err.response.data.errors;
    }
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger", 3000)));
    }
    // Dispatch error
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};
