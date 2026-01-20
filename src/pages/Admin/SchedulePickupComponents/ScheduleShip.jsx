import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetCountryMasterQuery, usePostCityListMutation } from "../../../service/apiServices";
import useFormSubmission from "../../../hooks/useFormSubmission";
import { useEffect } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useHadleChangeBookingDataPhoneNo } from "../../../hooks/useHadleChangePhoneNo";
import SavedAddress from "../../../Components/ManageAddrees/savedAddress";
const ScheduleShip = ({ formData, handleChange, setFormData, Countryquery, setCountryquery }) => {
  const userData = useSelector((state) => state.UserReducer);
  const onChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      BookingData: {
        ...prevData.BookingData,
        [name]: value,
      },
    }));
  };

  const { data, error, isLoading, refetch } = useGetCountryMasterQuery(Countryquery);

  const { handleChangePhoneNo } = useHadleChangeBookingDataPhoneNo(setFormData, "BookingData")
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: formData.BookingData.SendersCountry })
  useEffect(() => {
    if (formData.BookingData.SendersCountry) {
      CityHandle.setFormData({ Country: formData.BookingData.SendersCountry })
    }
  }, [formData.BookingData.SendersCountry])
  useEffect(() => {
    CityHandle.formData.SendersCountry && CityHandle.handleSubmit(CityHandle.formData)
    !CityHandle.formData.SendersCountry && CityHandle.handleSubmit(CityHandle.formData)
  }, [CityHandle.formData])
  useEffect(() => {
    if (formData["BookingData"]["ShipmentType"] === "dom") {
      handleChangePhoneNo("SendersCountry", "AE")
      handleChangePhoneNo("RecieversCountry", "AE")
      handleChangePhoneNo("BookingCountry", "AE")
      handleChangePhoneNo("RecieversCity", "")
      handleChangePhoneNo("City", "")
      handleChangePhoneNo("BookingCity", "")
    }
  }, [formData.BookingData.ShipmentType])

  return (
    <>
      <SavedAddress user={userData.data && userData.data.data.user} setFormData={setFormData} />
      <div className="row d-flex justify-content-center mt-2">
        <div className="row">
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-lg-9 shipping-form ">
              <h2
                className="page-title backgorindd text-center"
                style={{ fontSize: "24px" }}
              > Sender Details
              </h2>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-4 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Account
                  </label>
                  <input
                    type="text"
                    name="AccountNo"
                    value={formData.BookingData.AccountNo}
                    onChange={onChangeData}
                    readOnly={userData.data && userData.data.data.user.Role == "Admin" ? false : true}
                    // {props?.data?.data?.full_name}
                    className="form-control"
                  />
                </div>
                <div className="col-lg-4 mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Product*
                  </label>
                  <select
                    name="ProductType"
                    onChange={onChangeData}
                    value={formData["BookingData"]["ProductType"]}
                    className="form-control"
                  >
                    <option value={""}>Select Product Type</option>
                    <option value={"DOX"}>Documents</option>
                    <option value={"XPS"}>Parcels</option>

                  </select>
                </div>
                <div className="col-lg-4 mb-3">

                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Shipment Type*
                  </label>
                  <select
                    name="ShipmentType"
                    onChange={(e) => {
                      onChangeData(e)
                      setCountryquery(e.target.value === "dom" ? "AE" : "")
                    }}
                    value={formData["BookingData"]["ShipmentType"]}
                    className="form-control"
                  >
                    <option value={""}>Select Shipment Type</option>
                    <option value={"dom"}>Domestic</option>
                    <option value={"inter"}>International</option>
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="SendersCompany"
                    value={formData["BookingData"]["SendersCompany"]}
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo("BookingCompanyName", e.target.value)
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Company Name"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="SendersContactPerson"
                    value={formData["BookingData"]["SendersContactPerson"]}
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo(e.target.name.replace("Senders", "Booking"), e.target.value)
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Contact Person"
                  />
                </div>
              </div>


              <div className="row  d-flex justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="SendersAddress1"
                    value={formData["BookingData"]["SendersAddress1"]}
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo(e.target.name.replace("Senders", "Booking"), e.target.value)
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Address Line 1"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="SendersAddress2"
                    value={formData["BookingData"]["SendersAddress2"]}
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo(e.target.name.replace("Senders", "Booking"), e.target.value)
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="  Address Line 2"
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mb-3">

                  <PhoneInput
                    countryCallingCodeEditable={false}
                    international
                    placeholder="Telephone Number"
                    defaultCountry="AE"
                    name="SendersPhone"
                    value={formData["BookingData"]["SendersPhone"]}
                    onChange={(v) => {
                      handleChangePhoneNo("SendersPhone", v)
                      handleChangePhoneNo("BookingPhone", v)
                    }} />
                </div>
                <div className="col-lg-6 mb-3">
                  <PhoneInput
                    countryCallingCodeEditable={false}
                    international
                    placeholder="Mobile Number"
                    defaultCountry="AE"
                    name="SendersMobile"
                    value={formData["BookingData"]["SendersMobile"]}
                    onChange={(v) => {
                      handleChangePhoneNo("SendersMobile", v)
                      handleChangePhoneNo("BookingMobileNo", v)
                    }} />

                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mb-3">

                  <select
                    name="SendersCountry"
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo("BookingCountry", e.target.value)
                    }}
                    value={formData["BookingData"]["SendersCountry"]}
                    className="form-control"
                  >
                    <option value={""}>Select Country</option>
                    {!isLoading && data && data.data.CountryListLocation && data.data.CountryListLocation.length > 0 ? data.data.CountryListLocation.map((data, index) => (
                      <option value={data.CountryCode}>{data.CountryName}</option>
                    )) : <option value={""}>No Country Found</option>
                    }
                  </select>
                </div>
                <div className="col-lg-6 mb-3">

                  <select
                    name="SendersCity"
                    onChange={(e) => {
                      onChangeData(e)
                      const selectedOption = e.target.options[e.target.selectedIndex]
                      const selectedId = selectedOption.getAttribute("id");
                      handleChangePhoneNo("Origin", selectedId)
                      handleChangePhoneNo("BookingCity", e.target.value)
                    }}
                    value={formData["BookingData"]["SendersCity"]}
                    className="form-control"
                  >
                    <option value={""}>Select City</option>
                    {!CityHandle.errors.loading &&
                      CityHandle.Data && CityHandle.Data.CityListLocation && CityHandle.Data.CityListLocation.length > 0 ?
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
                    name="SendersEmail"
                    value={formData["BookingData"]["SendersEmail"]}
                    onChange={(e) => {
                      onChangeData(e)
                      handleChangePhoneNo(e.target.name.replace("Senders", "Booking"), e.target.value)
                    }}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Email"
                  />
                </div>
                <div className="col-lg-6 mb-3">  </div>
              </div>



            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleShip;
