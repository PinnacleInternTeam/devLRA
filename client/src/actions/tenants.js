import axios from "axios";
import { setAlert } from "./alert";
import { getAllUsers } from "./auth";
// import { getAllStaffDelays } from "./staff";
import {
  TENANT_ADD_INIT,
  AUTH_ERROR,
  SHOP_ADD_INIT,
  AGREEMENT_ADD_INIT,
  MONTH_EXP_CNT,
  YEAR_EXP_CNT,
  EXP_REPORT,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Add Staff Performance feedback
export const AddTenantDetailsform = (finalData) => async (dispatch) => {
  console.log(finalData);
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });

    await axios.post("/api/tenants/add-tenant-details", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantSettingsform = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });
    // console.log(finalData);
    await axios.post("/api/tenants/add-tenant-settings", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantSettingform = (finalData) => async (dispatch) => {
  try {
    dispatch({
      type: TENANT_ADD_INIT,
    });
    // console.log(finalData);
    await axios.post("/api/tenants/add-tenant-settings", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddShopDetailsform = (finalData) => async (dispatch) => {
  console.log(finalData);
  try {
    dispatch({
      type: SHOP_ADD_INIT,
    });
    await axios.post("/api/tenants/add-shop-details", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const AddTenantAgreementform = (finalData) => async (dispatch) => {
  // console.log(finalData);
  try {
    dispatch({
      type: AGREEMENT_ADD_INIT,
    });

    await axios.post("/api/tenants/add-agreement-details", finalData, config);
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Exp Month Count
export const getMonthExpCount = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-month-exp-count");
    dispatch({
      type: MONTH_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Exp Month Count filter
export const getMonthExpCountFilter = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/tenants/get-month-exp-count-filter",
      finalData,
      config
    );
    dispatch({
      type: MONTH_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Year Exp Count filter
export const getPreviousYearsExpCount = (finalData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "/api/tenants/get-previous-years-exp",
      finalData,
      config
    );
    dispatch({
      type: YEAR_EXP_CNT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Get Year Month Report
export const getTenantReportYearMonth =
  (finalDataReport) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "/api/tenants/get-tenant-exp-report",
        finalDataReport,
        config
      );
      dispatch({
        type: EXP_REPORT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
