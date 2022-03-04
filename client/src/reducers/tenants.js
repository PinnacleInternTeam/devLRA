import {
  USER_LOADED,
  AUTH_ERROR,
  REMOVE_ERROR,
  ALL_USERS,
  CHANGE_PWD_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  GET_ALL_LEVELS,
  GET_ALL_TENANTS,
  GET_ALL_SETTINGS,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
  GET_DOORNOS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  users: [],
  errorResponse: "",
  successResponse: "",

  alllevels: [""],
  alltenants: [""],
  allTenantSetting: [""],
  allDoorNos: [""],

  monthExpCnt: [],
  yearExpCnt: [],
  expReport: [],
};

const tenants = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EXP_REPORT:
      return {
        ...state,
        expReport: payload,
      };
    case GET_DOORNOS:
      return {
        ...state,
        allDoorNos: payload,
      };
    default:
      return state;
  }
};

export default tenants;
