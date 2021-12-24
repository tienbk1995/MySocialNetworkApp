import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  GET_EDUCATION,
  CLEAR_EDUCATION,
  GET_EXPERIENCE,
  CLEAR_EXPERIENCE,
} from "../actions/type";

const initialState = {
  profile: null,
  educations: null,
  experiences: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        education: null,
        experience: null,
        repos: [],
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case GET_EDUCATION:
      return {
        ...state,
        educations: payload,
        loading: false,
      };
    case CLEAR_EDUCATION:
      return {
        ...state,
        educations: null,
        loading: false,
      };
    case GET_EXPERIENCE:
      return {
        ...state,
        experiences: payload,
        loading: false,
      };
    case CLEAR_EXPERIENCE:
      return {
        ...state,
        experiences: null,
        loading: false,
      };
    default:
      return state;
  }
}
