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
  GET_EDUCATION,
  CLEAR_EDUCATION,
  GET_EXPERIENCE,
  CLEAR_EXPERIENCE,
} from "./type";

// Get user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
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

// Get user's profile education
export const getCurrentEducation = (edu_id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_EDUCATION });
    const res = await axios.get(`/api/profile/education/${edu_id}`);
    dispatch({
      type: GET_EDUCATION,
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

// Clear user's profile education
export const clearCurrentEducation = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_EDUCATION });
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

// Get user's profile experience
export const getCurrentExperience = (exp_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/experience/${exp_id}`);
    dispatch({
      type: GET_EXPERIENCE,
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

// Clear user's profile experience
export const clearCurrentExperience = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_EXPERIENCE });
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
    const res = await axios.get("/api/profile");
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
    const res = await axios.get(`/api/profile/user/${user_id}`);
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
    const res = await axios.get(`/api/profile/github/${username}`);
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
      const res = await axios.post("/api/profile", formData, config);

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
    const res = await axios.put("/api/profile/education", formData, config);

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
    const res = await axios.put("/api/profile/experience", formData, config);

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
    const res = await axios.delete(`/api/profile/experience/${exp_id}`);

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
    const res = await axios.delete(`/api/profile/education/${edu_id}`);

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
      await axios.delete("/api/profile");

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

// Update Education by Id
export const updateEducation = (formData, edu_id) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.put(
      `/api/profile/education/${edu_id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education updated successfully", "success", 5000));
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

// Update Experience by Id
export const updateExperience = (formData, exp_id) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.put(
      `/api/profile/experience/${exp_id}`,
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience updated successfully", "success", 5000));
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
