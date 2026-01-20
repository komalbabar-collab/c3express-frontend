import { createSlice } from "@reduxjs/toolkit";

var initialState = {

    AirwayBillData: {
        "AirWayBillCreatedBy": "TEST USER",
        "CODAmount": "0",
        "CODCurrency": "",
        "Destination": "BOM",
        "DutyConsigneePay": "0",
        "GoodsDescription": "ACUTAL CONTENT",
        "NumberofPeices": 1,
        "Origin": "DXB",
        "ProductType": "XPS",
        "ReceiversAddress1": "41 NARSI PANCHAYATH ROAD",
        "ReceiversAddress2": "KURLA MUMBAI",
        "ReceiversCity": "MUMBAI",
        "ReceiversSubCity": "",
        "ReceiversCountry": "IN",
        "ReceiversCompany": "XYZ COMPANY PVT LTD",
        "ReceiversContactPerson": "MR.GOPAL PANDYA",
        "ReceiversEmail": "",
        "ReceiversGeoLocation": "25.270206451,55.336395263",
        "ReceiversMobile": "+917844545445",
        "ReceiversPhone": "+91455454545",
        "ReceiversPinCode": "400001",
        "ReceiversProvince": "",
        "SendersAddress1": "2 C ABC STREET",
        "SendersAddress2": "UMM RAMOOL",
        "SendersCity": "DUBAI",
        "SendersSubCity ": "",
        "SendersCountry": "AE",
        "SendersCompany": "C3X EXPRESS COURIERS",
        "SendersContactPerson": "CONTACT PERSON NAME",
        "SendersEmail": "abc@xyz.com",
        "SendersGeoLocation": "",
        "SendersMobile": "+97155123455",
        "SendersPhone": "+97141111111",
        "SendersPinCode": "",
        "ServiceType": "NOR",
        "ShipmentDimension": "15X20X25",
        "ShipmentInvoiceCurrency": "USD",
        "ShipmentInvoiceValue": 10,
        "ShipperReference": "ABCDEF74",
        "ShipperVatAccount": "",
        "SpecialInstruction": "",
        "Weight": 1
    },
    // AccountNo: "10000",
    Country: "AE",
};
export const AirwayBill = createSlice({
    name: "AirwayBill",
    initialState: initialState,
    reducers: {
        setAirwayBillData: (state, action) => {
            const { name, value } = action.payload;
            state.AirwayBillData[name] = value;
        },
    },
});
// Action creators are generated for each case reducer function
export const { setAirwayBillData } = AirwayBill.actions;

export default AirwayBill.reducer;
