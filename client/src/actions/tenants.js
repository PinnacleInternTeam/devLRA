import axios from "axios";
import { setAlert } from "./alert";
import { getAllUsers } from "./auth";

import {
  TENANT_ADD_INIT,
  AUTH_ERROR,
  SHOP_ADD_INIT,
  AGREEMENT_ADD_INIT,
  GET_DOORNOS,
  NEW_TENENTDETAILS,
  TENANT_FEEDBACK_ERROR,
  GET_ALL_LEVELS,
  GET_ALL_TENANTS,
  GET_ALL_SETTINGS,
} from "./types";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// Add Staff Performance feedback
export const AddTenantDetailsform = (finalData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/tenants/add-tenant-details",
      finalData,
      config
    );
    dispatch({
      type: NEW_TENENTDETAILS,
      payload: res.data,
    });

    // console.log(res.data);
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

export const deactiveTenantsDetails = (finalData) => async (dispatch) => {
  // console.log("finalData");
  try {
    const res = await axios.post(
      "/api/tenants/deactive-tenant",
      finalData,
      config
    );
  } catch (err) {
    dispatch({
      type: TENANT_FEEDBACK_ERROR,
    });
  }
};

export const getAllLevels = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-levels");
    dispatch({
      type: GET_ALL_LEVELS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllTenants = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-tenants");
    dispatch({
      type: GET_ALL_TENANTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllSettings = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-all-settings");
    dispatch({
      type: GET_ALL_SETTINGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const getAllDoorNos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tenants/get-door-nos");
    dispatch({
      type: GET_DOORNOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
