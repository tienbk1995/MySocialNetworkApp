import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS,
} from "./type";

// Get user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get("http://localhost:5000/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Get profile by ID
export const getProfileById = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/profile/user/${user_id}`
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/profile/github/${username}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
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

// Delete Experience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/experience/${exp_id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience deleted successfully", "success", 5000));
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

// Delete Education
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/profile/education/${edu_id}`
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education deleted successfully", "success", 5000));
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

// Delete Account
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure want to delete this account, this could be undone"
    )
  ) {
    try {
      await axios.delete("http://localhost:5000/api/profile");

      dispatch({ type: CLEAR_PROFILE });

      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been deleted successfully"));
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
  }
};
