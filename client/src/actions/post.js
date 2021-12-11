import axios from "axios";
import {
  GET_POSTS,
  POSTS_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./type";
import { setAlert } from "./alert";

// Get posts from user
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Add like for user
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Remove like for user
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Delete post by user owner
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post removed", "success", 5000));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Add post by user owner
export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post(`/api/posts`, formData, config);

    dispatch({ type: ADD_POST, payload: res.data });

    dispatch(setAlert("Post created", "success", 5000));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Get posts from user
export const getPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Add comment by user owner in the post
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });

    dispatch(setAlert("Comment added", "success", 2000));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};

// Remove comment by user owner in the post
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({ type: REMOVE_COMMENT, payload: commentId });

    dispatch(setAlert("Comment removed", "success", 2000));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: {
        msg: err.response ? err.response.statusText : "Something went wrong",
        status: err.response ? err.response.status : "Something went wrong",
      },
    });
  }
};
