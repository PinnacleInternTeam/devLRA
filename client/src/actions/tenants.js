import axios from "axios";
import { setAlert } from "./alert";
import { getAllUsers } from "./auth";
// import { getAllStaffDelays } from "./staff";
import { TENANT_ADD_INIT, AUTH_ERROR, SHOP_ADD_INIT } from "./types";

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
