import Joi from "joi"
import { TimeValidation } from "../DateValidator"

function validateSchadulePickupFormOne(data) {
  const SchadulePickupFormOne = Joi.object({
    ProductType: Joi.string().required().messages({ "string.empty": "Product Type is Required" }).label("Produt Type"),
    SendersCompany: Joi.string().required().messages({ "string.empty": "Company Name is Required" }).label("Company Name"),
    ShipmentType: Joi.string().required().messages({ "string.empty": "Shipment Type is Required" }).label("Shipment Type"),
    SendersContactPerson: Joi.string().required().messages({ "string.empty": "Contact Name is Required" }).label("Contact Name"),
    SendersAddress1: Joi.string().max(500).required().messages({ "string.empty": "Address Line 1  is Required" }).label("Address Line 1"),
    SendersAddress2: Joi.string().max(100).required().messages({ "string.empty": "Address Line 2 is Required" }).label("Address Line 2"),
    SendersCountry: Joi.string().required().messages({ "string.empty": "Country is Required" }).label("Country"),
    SendersPhone: Joi.string().min(10).max(15).required().label("Phone Number"),
    SendersMobile: Joi.string().optional().allow("").label("Mobile Number"),
    SendersEmail: Joi.string().allow("").email({ tlds: { allow: false } }).label("Email"),
  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}
function validateSchadulePickupFormTwo(data) {
  const SchadulePickupFormOne = Joi.object({
    ReceiversAddress1: Joi.string().max(500).required().messages({ "string.empty": "Address Line 1  is Required" }).label("Address Line 1"),
    ReceiversAddress2: Joi.string().max(100).required().messages({ "string.empty": "Address Line 2 is Required" }).label("Address Line 2"),
    ReceiversCompany: Joi.string().required().messages({ "string.empty": "Company Name is Required" }).label("Company Name"),
    ServiceType: Joi.string().required().messages({ "string.empty": "Service Type is Required" }).label("Service Type"),
    ReceiversContactPerson: Joi.string().required().messages({ "string.empty": "Contact Person is Required" }).label("Contact Person"),
    ReceiversEmail: Joi.string().allow("").email({ tlds: { allow: false } }).label("Email"),
    ReceiversPhone: Joi.string().min(10).max(15).required().label("Telephone Number"),
    ReceiversMobile: Joi.string().optional().allow("").label("Mobile Number"),
    ReceiversPinCode: Joi.any().optional().allow("").label("Pin Code"),
    ReceiversCountry: Joi.string().required().messages({ "string.empty": "Country is Required" }).label("Country"),
    ReceiversCity: Joi.string().required().messages({ "string.empty": "City is Required" }).label("City"),
  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}

function validateSchadulePickupFormThree(data) {
  const SchadulePickupFormOne = Joi.object({
    ServiceType: Joi.string().required().messages({ "string.empty": "ServiceType  is Required" }).label("ServiceType"),
    NumberofPeices: Joi.string().required().messages({ "string.empty": "Number of Peices is Required" }).label("Number of Peices"),
    ReceiversAddress2: Joi.string().max(100).required().messages({ "string.empty": "Address Line 2 is Required" }).label("Address Line 2"),
    Weight: Joi.string().required().label("Weight"),
    // ShipmentInvoiceValue: Joi.string().optional().label("Value Of Shipment"),
    // ShipperReference: Joi.string().required().messages({ "string.empty": "Shipper Reference is Required" }).label("Shipper Reference"),
    ShipmentReadyDate: Joi.date().required().messages({ "string.empty": "Shipment Ready Date is Required" }).label("Shipment Ready Date"),
    ShipmentReadyTime: Joi.string().required().messages({ "string.empty": "Shipment Ready Time is Required" }).label("Shipment Ready Time"),
    SpecialInstruction: Joi.string().optional().allow("").label("Instruction"),
    GoodsDescription: Joi.string().required().messages({ "string.empty": "Goods Description is Required" }).label("Goods Description"),

  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}
function validateSchadulePickupFormFour(data) {
  const SchadulePickupFormOne = Joi.object({
    BookingContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    BookingEmail: Joi.string().allow("").email({ tlds: { allow: false } }),
    BookingCompanyName: Joi.string().required().label("Company Name").messages({ "string.empty": "Company Name is Required" }),
    BookingAddress1: Joi.string().max(500).required().label("Address Line 1").messages({ "string.empty": "Address Line 1 is Required" }),
    BookingAddress2: Joi.string().max(100).required().label("Address Line 2").messages({ "string.empty": "Address Line 2 is Required" }),
    BookingMobileNo: Joi.string().optional().allow("").label("Mobile Number"),
    BookingPhoneNo: Joi.string().min(10).max(15).required().label("Mobile Number").messages({ "string.empty": "Mobile Number is Required" }),
    BusinessClosingTime: Joi.string().required().label("Closing Time").messages({ "string.empty": "Closing Time is Required" }),
    Origin: Joi.string().required().label("Origin").messages({ "string.empty": "Origin is Required" }),
    Destination: Joi.string().required().label("Destination").messages({ "string.empty": "Destination is Required" }),


  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}
function validateSchadulePickupFormHomePageOne(data) {
  const SchadulePickupFormOne = Joi.object({
    // BookingContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    SendersAddress1: Joi.string().max(500).required().label("Address Line 1").messages({ "string.empty": "Pickup Address Details is Required" }),
    SendersAddress2: Joi.string().max(100).required().label("Address Line 2").messages({ "string.empty": "Area is Required" }),
    SendersMobileNo: Joi.string().optional().allow("").label("Mobile Number"),
    SendersEmail: Joi.string().allow("").email({ tlds: { allow: false } }).label("Email"),
    SendersContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    SendersCountry: Joi.string().required().label("Country").messages({ "string.empty": "Country is Required" }),
    SendersCity: Joi.string().required().label("City").messages({ "string.empty": "City is Required" }),

  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}
function validateSchadulePickupFormHomePagetWO(data) {
  const SchadulePickupFormOne = Joi.object({
    // BookingContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    ReceiversContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    ReceiversAddress1: Joi.string().max(500).required().label("Address Line 1").messages({ "string.empty": "Drop Off Details is Required" }),
    ReceiversAddress2: Joi.string().max(100).required().label("Address Line 2").messages({ "string.empty": "Street is Required" }),
    ReceiversMobile: Joi.string().optional().allow("").label("Mobile Number"),
    ReceiversCountry: Joi.string().required().label("Country").messages({ "string.empty": "Country is Required" }),
    ReceiversCity: Joi.string().required().label("City").messages({ "string.empty": "City is Required" }),



  }).unknown(true)

  return SchadulePickupFormOne.validate(data)
}
export { validateSchadulePickupFormTwo, validateSchadulePickupFormHomePagetWO, validateSchadulePickupFormHomePageOne, validateSchadulePickupFormOne, validateSchadulePickupFormThree, validateSchadulePickupFormFour }