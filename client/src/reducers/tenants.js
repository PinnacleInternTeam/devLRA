import { STAFF_FEEDBACK_INIT, GET_DOORNOS } from "../actions/types";

const initialState = {
  loading: true,
  staffPerformance: [],
  error: {},
  staff: null,
  allDoorNos: [""],
  newtenantdetails: [""],
};
const tennats = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DOORNOS:
      return {
        ...state,
        allDoorNos: payload,
      };
    case NEW_TENENTDETAILS:
      return {
        ...state,
        newtenantdetails: payload,
      };
    default:
      return state;
  }
};

export default tennats;
