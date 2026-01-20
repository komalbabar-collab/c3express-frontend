import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import TrackingDetailsReducer from "./reducers/TrackingDetailsReducer";
import NavDropdownReducer from "./reducers/NavDropdownReducer";
import { RTKQueryApi } from "../service/apiServices";

import { setupListeners } from '@reduxjs/toolkit/query'
import { toast } from "react-toastify";
const rtkQueryErrorMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type.endsWith('rejected') && action.error) {
    // Handle RTK Query error here


    // Handle status code here
    if (action?.payload?.status == "FETCH_ERROR") {
      toast.error("Internel Server Error Please Try again Refresh the Page")
    }
    // Optionally dispatch an action or perform other error handling tasks
    // dispatch(yourErrorAction(errorMessage));
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    UserReducer,
    TrackingDetailsReducer,
    NavDropdownReducer,
    [RTKQueryApi.reducerPath]: RTKQueryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(RTKQueryApi.middleware, rtkQueryErrorMiddleware),
});
setupListeners(store.dispatch)