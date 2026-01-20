import React, { useEffect } from 'react'
import { useGetCountryMasterQuery, usePostCityListMutation } from '../../../service/apiServices';
import useFormSubmission from '../../../hooks/useFormSubmission';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useHadleChangeBookingDataPhoneNo } from "../../../hooks/useHadleChangePhoneNo";
import SavedReciversAddessress from '../../ManageAddrees/SavedReciversAddessress';
const Consignee = (props) => {
  const { formData, handleChange, setFormData } = props;

  const { data, error, isLoading, refetch } = useGetCountryMasterQuery("");
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: formData.AirwayBillData.ReceiversCountry })

  useEffect(() => {
    if (formData.AirwayBillData.ReceiversCountry) {
      if (formData.AirwayBillData.ReceiversCountry === "AE") {
        setFormData({
          ...formData,
          AirwayBillData: {
            ...formData.AirwayBillData,
            ShipmentInvoiceCurrency: "AED",
            CODCurrency: "AED",
          }
        })
      } else {
        setFormData({
          ...formData,
          AirwayBillData: {
            ...formData.AirwayBillData,
            ShipmentInvoiceCurrency: "USD",
            CODCurrency: "USD",
          }
        })
      }

      CityHandle.setFormData({ Country: formData.AirwayBillData.ReceiversCountry })
    }
  }, [formData.AirwayBillData.ReceiversCountry])

  useEffect(() => {
    CityHandle.handleSubmit(CityHandle.formData)
  }, [CityHandle.formData])

  const { handleChangePhoneNo } = useHadleChangeBookingDataPhoneNo(setFormData, "AirwayBillData")
  return (
    <>
      <SavedReciversAddessress
        setFormData={setFormData}
        formData={formData}
        selectedAddress={props.selectedAddress}
        setSelectedAddress={props.setSelectedAddress}
      />

      <div className="row d-flex justify-content-center">
        <div className="col-lg-9 shipping-form mt-4 p-4">
          <h2
            className="page-title backgorindd text-center"
            style={{ fontSize: "24px" }}
          >
            Reciever Details
          </h2>
          <div className="row d-flex justify-content-center">
            {" "}
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="ReceiversContactPerson"
                value={formData.AirwayBillData.ReceiversContactPerson}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value)
                  // handleChange("ReceiversCompany", e.target.value)
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Contact Person"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="ReceiversCompany"
                value={formData.AirwayBillData.ReceiversCompany}
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value)
                  // handleChange("ReceiversCompany", e.target.value)
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Company Name"
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            {" "}
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="ReceiversAddress1"
                value={formData.AirwayBillData.ReceiversAddress1}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Address Line 1"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="ReceiversAddress2"
                value={formData.AirwayBillData.ReceiversAddress2}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Address Line 2"
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            {" "}
            <div className="col-lg-6 mb-3">
              <select
                name="ReceiversCountry"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value)
                  handleChange("ShipmentInvoiceCurrency", e.target.value)
                  // handleChange("ShipmentInvoiceCurrency", e.target.value)

                }}
                value={formData["AirwayBillData"]["ReceiversCountry"]}
                className="form-control"
              >
                <option value={""}>Select Country</option>
                {!isLoading && data && data.data && data.data.CountryListLocation &&
                  data.data.CountryListLocation.length > 0 ?
                  data.data.CountryListLocation.map((data, index) => (
                    <option value={data.CountryCode}>{data.CountryName}</option>
                  )) : <option value={""}>No Country Found</option>}
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <PhoneInput
                name="ReceiversPhone"
                value={formData.AirwayBillData.ReceiversPhone}
                international
                countryCallingCodeEditable={false}
                placeholder="Telephone Number"
                defaultCountry={formData.AirwayBillData.ReceiversCountry || "AE"}
                onChange={(v) => handleChangePhoneNo("ReceiversPhone", v)}
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            {" "}
            <div className="col-lg-6 mb-3">
              <PhoneInput
                name="ReceiversMobile"
                value={formData.AirwayBillData.ReceiversMobile}
                international
                countryCallingCodeEditable={false}
                placeholder="Reciever Mobile  Number"
                defaultCountry={formData.AirwayBillData.ReceiversCountry || "AE"}
                onChange={(v) => handleChangePhoneNo("ReceiversMobile", v)}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="ReceiversCity"
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const selectedId = selectedOption.getAttribute("id");

                  handleChange(e.target.name, e.target.value)
                  handleChange("Destination", selectedId)
                }}
                value={formData["AirwayBillData"]["ReceiversCity"]}
                className="form-control"
              >
                <option value={""}>Select City</option>
                {!CityHandle.errors.loading &&
                  CityHandle.Data && CityHandle.Data.CityListLocation &&
                  CityHandle.Data.CityListLocation.length > 0 ?
                  CityHandle.Data.CityListLocation.map((item, index) => (
                    <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                  )) : <option value={""}>No City Found</option>
                }
              </select>
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                //  onKeyDown={(e) => {
                //   // Disable keyboard arrows
                //   if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                //     e.preventDefault();
                //   }
                // }}
                // onWheel={(e) => {
                //   // Disable mouse wheel
                //   e.target.blur();
                // }}
                name="ReceiversPinCode"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value)

                }}
                value={formData["AirwayBillData"]["ReceiversPinCode"]}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Pin Code"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="ProductType"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["ProductType"]}
                className="form-control"
              >
                <option value={""}>Select Product Type</option>
                <option value={"DOX"}>Documents</option>
                <option value={"XPS"}>Parcels</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Consignee