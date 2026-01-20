import { createSlice } from "@reduxjs/toolkit";
import { useTrackByReferenceMutation, useTrackByTrackingMutation } from '../../service/apiServices';

var initialState = {
  trackingType: "Airwaybiil",
  loading: false,
  error: false,
  data: [],
  POAImages: {},
  POAImagesFilter: [],
  message: "",
  billingId: null
};
export const TrackingDetails = createSlice({
  name: "TrackingDetails",
  initialState: initialState,
  reducers: {
    setTrackingDetails: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setBillingId: (state, action) => {
      return {
        ...state,
        billingId: action.payload,
      };
    },
  },
});
// Action creators are generated for each case reducer function
export const { setTrackingDetails, setBillingId } = TrackingDetails.actions;

export default TrackingDetails.reducer;
