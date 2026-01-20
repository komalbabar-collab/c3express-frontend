// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// export const APi_Url = "http://localhost:8997/api/";
// export const APi_Url = "https://c3expressapi.handsintechnology.in/api/";
export const APi_Url = "https://api.c3x.ae/api/";
const getAuthToken = () => {
  return localStorage.getItem("token");
};
// Define a service using a base URL and expected endpoints
export const RTKQueryApi = createApi({
  reducerPath: "RTKQueryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APi_Url,
    tagTypes: ["Post"],
    prepareHeaders: (headers) => {
      // Get the authentication token
      const authToken = getAuthToken(); // Replace with your actual token
      // If you have an authentication token, add it to the headers
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      // You can also set other headers as needed
      headers.set("Content-Type", "application/json");
      return headers;
    },
    prepareBody: (body, { method, }) => {
      // Modify the body here before sending it
      if (method === 'POST' || method === 'PUT') {
        // Modify the body for POST and PUT requests
        // For example, you can stringify JSON objects
        delete body.AccountNo;
        return JSON.stringify(body);
      }
      // For other methods, you can leave the body unchanged
      return body;
    },
  }),
  endpoints: (builder) => ({
    getUerProfile: builder.query({
      query: () => `auth/profile`,
      providesTags: ['UserProfile'],
    }),
    trackByReference: builder.mutation({
      query: (data) => ({
        url: 'TrackByReference', // Replace with your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    Trackbybooking: builder.mutation({
      query: (data) => ({
        url: 'Trackbybooking', // Replace with your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    trackByTracking: builder.mutation({
      query: (data) => ({
        url: 'Tracking', // Replace with your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    getUsersData: builder.query({
      query: ({ activate, search, page, limit }) => ({
        url: `users`,
        params: { activate, search, page, limit },
      }),
    }),
    GetAllUserByAccountNo: builder.query({
      query: ({ AccountNo }) => ({
        url: `users/GetAllUserByAccountNo`,
        params: { AccountNo },
      }),
    }),
    Register: builder.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "auth/changepassword",
        method: "PUT",
        body: payload,
      }),
    }),
    getShipmentHistoryData: builder.mutation({
      query: (payload) => ({
        url: "ShipmentHistory",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "auth/signin",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['UserProfile']
    }),
    MultipleCreateAirwayBill: builder.mutation({
      query: (payload) => ({
        url: "AirwayBillBatchPDFFormat",
        method: "POST",
        body: payload,
      }),
    }),
    getCreateAirwayBillyData: builder.mutation({
      query: (payload) => ({
        url: "CreateAirwayBill",
        method: "POST",
        body: payload,
      }),
    }),
    PostasaGuestSchedulePickupData: builder.mutation({
      query: (payload) => ({
        url: "asaGuestSchedulePickup",
        method: "POST",
        body: payload,
      }),
    }),
    PostSchedulePickupyData: builder.mutation({
      query: (payload) => ({
        url: "SchedulePickup",
        method: "POST",
        body: payload,
      }),
    }),
    PostSPickupHistoryData: builder.mutation({
      query: (payload) => ({
        url: "BookingHistory",
        method: "POST",
        body: payload,
      }),
    }),
    PostAirwayBillPDFFormatData: builder.mutation({
      query: (payload) => ({
        url: "AirwayBillPDFFormat",
        method: "POST",
        body: payload,
      }),
    }),
    getBatchnumberData: builder.query({
      query: ({ search, itemsPerPage, pageNumber }) => {
        return {
          url: `GetAllBatchNumber`,
          params: { search, limit: itemsPerPage, page: pageNumber },

        }
      },
    }),
    PostDueInvoicesData: builder.mutation({
      query: (payload) => ({
        url: "DueInvoices",
        method: "POST",
        body: payload,
      }),
    }),
    getDueInvoicesData: builder.query({
      query: (AccountNo) => `DueInvoices?AccountNo=${AccountNo}`,
    }),
    PaymentDuesData: builder.mutation({
      query: (payload) => ({
        url: "PaymentDues",
        method: "POST",
        body: payload,
      }),
    }),
    PostPrepaidPaymentHistory: builder.mutation({
      query: (payload) => ({
        url: "PrepaidPaymentHistory",
        method: "POST",
        body: payload,
      }),
    }),
    UpdateUserData: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "PUT",
        body: payload,
      }),
    }),
    AddUserData: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: payload,
      }),
    }),
    DeleteUserData: builder.mutation({
      query: (payload) => ({
        url: "users?userId=" + payload,
        method: "DELETE",
      }),
    }),
    PostCityList: builder.mutation({

      query: (payload) => ({
        url: "CityList",
        method: "POST",
        body: payload,
      }),
    }),
    PostAccountDayWiseShipments: builder.mutation({

      query: (payload) => ({
        url: "AccountDayWiseShipments",
        method: "POST",
        body: payload,
      }),
    }),
    PostDailyPickupDetailsForAccountss: builder.mutation({

      query: (payload) => ({
        url: "DailyPickupDetailsForAccounts",
        method: "POST",
        body: payload,
      }),
    }),
    PostPickupSummaryForAccounts: builder.mutation({

      query: (payload) => ({
        url: "PickupSummaryForAccounts",
        method: "POST",
        body: payload,
      }),
    }),
    PostDeliveryDetailsForAccounts: builder.mutation({
      query: (payload) => ({
        url: "DeliveryDetailsForAccounts",
        method: "POST",
        body: payload,
      }),
    }),
    PostRateFInder: builder.mutation({
      query: (payload) => ({
        url: "RateFinder",
        method: "POST",
        body: payload,
      }),
    }),
    getCountryMaster: builder.query({
      query: (country = "") => `CountryMaster?Country=${country}`,
    }),
    PostPrepaidAccountStatus: builder.mutation({
      query: (payload) => ({
        url: "PrepaidAccountStatus",
        method: "POST",
        body: payload,
      }),
    }),
    // Address Api
    getAddressData: builder.query({
      query: ({ search, page, limit }) => {
        return {
          url: `addresses`,
          params: { search, page, limit },

        }
      },
      providesTags: ["addresses"]
    }),
    PostAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["addresses"]
    }),

    PostUpdateAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["addresses"]

    }),
    PostDeleteAddressData: builder.mutation({
      query: (payload) => ({
        url: `addresses?_id=${payload._id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["addresses"]
    }),
    // Recivers Address Api
    getrecieveraddressAddressData: builder.query({
      query: ({ search, page, limit }) => {
        return {
          url: `addresses/recieveraddress`,
          params: { search, page, limit },
        }
      },
      providesTags: (result, error, arg) =>
        result?.data?.Address
          ? [
            ...result.data.Address.map(({ _id }) => ({
              type: 'addresses_recieveraddress',
              id: _id
            })),
            'addresses_recieveraddress'
          ]
          : ['addresses_recieveraddress']

    }),
    PostrecieveraddressAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses/recieveraddress",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["addresses_recieveraddress"]
    }),

    PostUpdaterecieveraddressAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses/recieveraddress",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["addresses_recieveraddress"]

    }),
    PostDeleterecieveraddressAddressData: builder.mutation({
      query: (payload) => ({
        url: `addresses/recieveraddress?_id=${payload._id}`,
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["addresses_recieveraddress"]

    }),
    // Service Types Api
    getServiceTypesData: builder.query({
      query: (search) => {
        return {
          url: `ServiceTypes`,
          params: { search },
        }
      },
    }),
    getActiveServiceTypesData: builder.query({
      query: () => `activeServicetypes`
    }),
    getUserServiceTypesData: builder.query({
      query: (param) => {
        return param ? `getServiceType?country=${param}` : `getServiceType`
      }
    }),
    PostServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: "ServiceTypes",
        method: "POST",
        body: payload,
      }),
    }),

    PostUpdateServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: "ServiceTypes",
        method: "PUT",
        body: payload,
      }),
    }),
    PostDeleteServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: `ServiceTypes?_id=${payload._id}`,
        method: "DELETE",
        body: payload,
      }),
    }),
    PostContactUs: builder.mutation({
      query: (payload) => ({
        url: "contactus",
        method: "POST",
        body: payload,
      }),
    }),
    Pay: builder.mutation({
      query: (payload) => ({
        url: "pay",
        method: "POST",
        body: payload,
      }),
    }),


  }),


});



// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // tracking
  useTrackByReferenceMutation, useTrackByTrackingMutation,
  useLoginMutation,
  useGetUerProfileQuery,
  useGetUsersDataQuery,
  useGetShipmentHistoryDataMutation,
  useGetCreateAirwayBillyDataMutation,
  usePostasaGuestSchedulePickupDataMutation,
  usePostSchedulePickupyDataMutation,
  usePostSPickupHistoryDataMutation,
  usePostAirwayBillPDFFormatDataMutation,
  usePostDueInvoicesDataMutation,
  useGetDueInvoicesDataQuery,
  usePaymentDuesDataMutation,
  useUpdateUserDataMutation,
  useDeleteUserDataMutation,
  useGetCountryMasterQuery,
  usePostCityListMutation,
  useAddUserDataMutation,
  usePostAccountDayWiseShipmentsMutation,
  usePostPickupSummaryForAccountsMutation,
  usePostDeliveryDetailsForAccountsMutation,
  usePostRateFInderMutation,
  useGetAddressDataQuery,
  usePostAddressDataMutation,
  usePostUpdateAddressDataMutation,
  usePostDeleteAddressDataMutation,
  usePostDailyPickupDetailsForAccountssMutation,
  // Service Types
  useGetServiceTypesDataQuery,
  useGetUserServiceTypesDataQuery,
  usePostServiceTypesDataMutation,
  usePostUpdateServiceTypesDataMutation,
  usePostDeleteServiceTypesDataMutation,
  useGetActiveServiceTypesDataQuery,
  useRegisterMutation,
  useChangePasswordMutation,
  // reqciever address api
  useGetrecieveraddressAddressDataQuery,
  usePostrecieveraddressAddressDataMutation,
  usePostUpdaterecieveraddressAddressDataMutation,
  usePostDeleterecieveraddressAddressDataMutation,
  usePostContactUsMutation,
  usePayMutation,
  useMultipleCreateAirwayBillMutation,
  useGetBatchnumberDataQuery, usePostPrepaidPaymentHistoryMutation,
  useGetAllUserByAccountNoQuery, usePostPrepaidAccountStatusMutation,
  useTrackbybookingMutation,
  // reqciever address api
} = RTKQueryApi;


