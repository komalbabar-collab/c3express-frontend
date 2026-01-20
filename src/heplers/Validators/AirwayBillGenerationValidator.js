import Joi from "joi"

function validateAirwayBillFormOne(data) {
  const AirWayBillDataFormOne = Joi.object({

    SendersCompany: Joi.string().required().label("Company Name").messages({ "string.empty": "Company Name is Required" }),
    SendersContactPerson: Joi.string().required().label("Contact Name").messages({ "string.empty": "Contact Name is Required" }),
    SendersAddress1: Joi.string().max(500).required().label("Address Line 1").messages({ "string.empty": "Address Line 1  is Required" }),
    SendersAddress2: Joi.string().max(100).required().label("Address Line 2").messages({ "string.empty": "Address Line 2 is Required" }),
    SendersCountry: Joi.string().required().label("Country").messages({ "string.empty": "Country is Required" }),
    SendersCity: Joi.string().required().label("City"),
    SendersPhone: Joi.string().min(10).max(15).required().label("Telehone Number"),
    SendersMobile: Joi.string().optional().allow("").label("Mobile Number"),
    SendersPinCode: Joi.any().allow(null).optional().allow("").label("Pin Code"),
    SendersEmail: Joi.string().allow("").email({ tlds: { allow: false } }).label("Email"),
  }).unknown(true)

  return AirWayBillDataFormOne.validate(data)
}
function validateAirwayBillFormTwo(data) {
  const AirWayBillDataFormOne = Joi.object({
    ReceiversContactPerson: Joi.string().required().label("Contact Person").messages({ "string.empty": "Contact Person is Required" }),
    ReceiversAddress1: Joi.string().max(500).required().label("Address Line 1").messages({ "string.empty": "Address Line 1  is Required" }),
    ReceiversAddress2: Joi.string().max(100).required().label("Address Line 2").messages({ "string.empty": "Address Line 2 is Required" }),
    ReceiversPhone: Joi.string().min(10).max(15).required().label("Telehone Number"),
    ReceiversMobile: Joi.string().optional().allow("").label("Mobile Number"),
    ReceiversCountry: Joi.string().required().label("Country").messages({ "string.empty": "Country is Required" }),
    ReceiversCity: Joi.string().required().label("City").messages({ "string.empty": "City is Required" }),
    ReceiversPinCode: Joi.any().allow(null).optional().allow("").label("Pin Code"),
    ProductType: Joi.string().required().label("Product Type").messages({ "string.empty": "Product Type is Required" }),
  }).unknown(true)

  return AirWayBillDataFormOne.validate(data)
}
function validateAirwayBillFormThree(data) {
  const AirWayBillDataFormOne = Joi.object({
    ServiceType: Joi.string().label("ServiceType").required().messages({ "string.empty": "ServiceType  is Required" }),
    NumberofPeices: Joi.string().label("Number of Peices").required(),
    Weight: Joi.string().label("Weight"),
    GoodsDescription: Joi.string().label("Goods Description").required(),
    ShipmentInvoiceCurrency: Joi.string().label("Currency"),
    ShipmentInvoiceValue: Joi.string().optional().allow("").label("Value Of Shipment"),
    SpecialInstruction: Joi.string().optional().allow("").label("Instruction"),
    ShipperReference: Joi.string().optional().allow("").label("Shipper Reference")
  }).unknown(true)

  return AirWayBillDataFormOne.validate(data)
}

export { validateAirwayBillFormThree, validateAirwayBillFormTwo, validateAirwayBillFormOne }