import {
  GET_ALL_LEVELS,
  GET_ALL_TENANTS,
  GET_ALL_SETTINGS,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
  GET_DOORNOS,
  GET_DOORNUMBER,
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
  allDoorNumber: [""],
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
    case GET_DOORNUMBER:
      return {
        ...state,
        allDoorNumber: payload,
      };
    default:
      return state;
  }
};

export default tenants;
