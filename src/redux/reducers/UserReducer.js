import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  data: null,
  Address: Date.now()
};
export const UserInfo = createSlice({
  name: "UserInfo",
  initialState: initialState,
  reducers: {
    setUserDetails: (state, action) => {
      if (action.payload.access_token) {
        localStorage.setItem("token", action.payload.access_token);
      }
      return {
        ...state,
        ...action.payload,
      };
    },
    setUserAdressChange: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setUserLogout: (state, action) => {
      state.access_token = ""
      state.data = null
      localStorage.removeItem("token")

    },
  },
});
// Action creators are generated for each case reducer function
export const { setUserDetails, setUserAdressChange, setUserLogout } = UserInfo.actions;

export default UserInfo.reducer;
