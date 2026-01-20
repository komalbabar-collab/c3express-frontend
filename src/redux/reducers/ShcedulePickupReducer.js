import { createSlice } from "@reduxjs/toolkit";

var initialState = {
    BookingData: {
        // "AccountNo": "100",
        "AppoximateWeight": 1,
        "BookingAddress1": "22A Street, Ramool Avenue",
        "BookingAddress2": "Umm Ramool",
        "BookingCompanyName": "C3X International Couriers",
        "BookingContactPerson": "Santhosh Bhaskar",
        "BookingCreatedBy": "Santhosh Bhaskar",
        "BookingEmail": "santhosh@c3xpress.com",
        "BookingMobileNo": "0558453274",
        "BookingPhoneNo": "043093333",
        "BusinessClosingTime": "15:00",
        "Destination": "AUH",
        "GoodsDescription": "GARMENT SAMPLE",
        "NumberofPeices": 1,
        "NumberofShipments": 1,
        "Origin": "DXB",
        "ProductType": "DOX",
        "ReceiversAddress1": "45 WEST ZONE",
        "ReceiversAddress2": "ELECTRA STREET",
        "ReceiversCity": "ABU DHABI",
        "ReceiversContactPerson": "THOMAS",
        "ReceiversEmail": "",
        "ReceiversGeoLocation": "",
        "ReceiversMobile": "0501234567",
        "ReceiversCompany": "ABC Cargo LLC",
        "ReceiversPhone": "021234567",
        "ReceiversPinCode": "",
        "ShipperReference": "ABCDEFG123",
        "SendersAddress1": "XYS STREET 2 B",
        "SendersAddress2": "ABC BUILDING",
        "SendersCity": "DUBAI",
        "SendersContactPerson": "Ashok Nair",
        "SendersDepartment": "IT",
        "SendersEmail": "ashok@c3xpress.com",
        "SendersGeoLocation": "",
        "SendersMobile": "0501234567",
        "SendersCompany": "C3X International Couriers Corporate Office",
        "SendersPhone": "043093333",
        "SendersPinCode": "",
        "ServiceType": "NOR",
        "ShipmentReadyDate": "08/22/2023",
        "ShipmentReadyTime": "12:00",
        "SpecialInstruction": "PLEASE CALL BEFORE FROM RECEPTION",
        "PackageType": "BOX"
    },
    loading: false,
    error: false,
    message: "",
    PickupRequestNo: null
}
export const SchedulePickup = createSlice({
    name: "SchedulePickup",
    initialState: initialState,
    reducers: {
        setSchedulePickupDetails: (state, action) => {
            state.BookingData = action.payload;
            return {
                ...state,
            };
        },
        setSchedulePickupData: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});
// Action creators are generated for each case reducer function
export const { setSchedulePickupDetails, setSchedulePickupData } = SchedulePickup.actions;

export default SchedulePickup.reducer;
