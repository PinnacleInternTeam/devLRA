import {
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_ERROR,
  ALL_USERS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  errorResponse: "",
  successResponse: "",
  patient: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        errorResponse: payload,
        successResponse: "",
      };

    case ALL_USERS:
      return {
        ...state,
        users: payload,
      };

    case REMOVE_ERROR:
      return {
        ...state,
        errorResponse: "",
        successResponse: "",
      };

    default:
      return state;
  }
};

export default auth;
