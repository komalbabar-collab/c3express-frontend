import { createSlice } from "@reduxjs/toolkit";

var initialState = {
  isNavDrawerOpen: false,
};
export const NavDropDown = createSlice({
  name: "NavDropDown",
  initialState: initialState,
  reducers: {
    setNavDropDownDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});
// Action creators are generated for each case reducer function
export const { setNavDropDownDetails } = NavDropDown.actions;

export default NavDropDown.reducer;
