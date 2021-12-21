import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
  EMAIL_SENT,
  EMAIL_NOT_SENT,
  PASSWORD_UPDATED,
  PASSWORD_FAILED,
  PASSWORD_CHECKED,
  PASSWORD_CHECKED_FAILED,
} from "../actions/type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  link: null,
  password: null,
  isMatch: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return { ...state, ...payload, isAuthenticated: true, loading: false };
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem("token");
      return { ...state, token: null, isAuthenticated: false, loading: false };
    case EMAIL_SENT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        link: payload,
      };
    case EMAIL_NOT_SENT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        link: null,
      };
    case PASSWORD_UPDATED:
      return {
        ...state,
        loading: false,
        password: payload,
      };
    case PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        password: null,
      };
    case PASSWORD_CHECKED:
      return {
        ...state,
        loading: false,
        isMatch: payload,
      };
    case PASSWORD_CHECKED_FAILED:
      return {
        ...state,
        loading: false,
        isMatch: false,
      };
    default:
      return state;
  }
}
