import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "@/service/apiServices";
import useFormSubmission from "@/hooks/useFormSubmission";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useHadleChangeBookingDataPhoneNo } from "@/hooks/useHadleChangePhoneNo";
import SavedAddress from "@/Components/ManageAddrees//savedAddress";
import { countryCodes } from "@/utils/countryCodes";
const Shipper = (props) => {
  const { formData, handleChange, setFormData } = props;
  const userData = useSelector((state) => state.UserReducer);
  const CountryMaster = useGetCountryMasterQuery("");
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData.AirwayBillData.SendersCountry,
  });

  const [phoneCountry, setPhoneCountry] = useState(formData.AirwayBillData.SendersCountry || "AE");

  // Add effect to watch country changes
  useEffect(() => {
    if (formData.AirwayBillData.SendersCountry &&
      countryCodes.includes(formData.AirwayBillData.SendersCountry)) {
      setPhoneCountry(formData.AirwayBillData.SendersCountry);
    }
  }, [formData.AirwayBillData.SendersCountry]);


  useEffect(() => {
    if (formData.AirwayBillData.ReceiversCountry) {
      CityHandle.setFormData({
        Country: formData.AirwayBillData.SendersCountry,
      });
    }
  }, [formData.AirwayBillData.SendersCountry]);

  useEffect(() => {
    CityHandle.handleSubmit(CityHandle.formData);
  }, [CityHandle.formData]);
  const { handleChangePhoneNo } = useHadleChangeBookingDataPhoneNo(setFormData, "AirwayBillData")

  return (
    <>
      <SavedAddress
        user={userData.data && userData.data.data.user}
        setFormData={setFormData}
      />
      <div
        className="row d-flex justify-content-center mt-5"
        style={{ fontSize: "14px" }}
      >
        <div className="col-lg-9 shipping-form p-2">
          <h1
            className="page-title backgorindd text-center"
            style={{ fontSize: "24px" }}
          >
            Sender Details
          </h1>

          <div className="row d-flex justify-content-center">
            <div className="col-lg-12 mb-3">
              <input
                type="text"
                name="AccountNo"
                value={formData.AirwayBillData.AccountNo}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Account No"
                readOnly={userData.data && userData.data.data.user.Role == "Admin" ? false : true}
              />
            </div>
            {/* product type */}
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="SendersCompany"
                value={formData.AirwayBillData.SendersCompany}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    AirwayBillData: {
                      ...prev.AirwayBillData,
                      "SendersCompany": e.target.value,
                      // "SendersContactPerson": e.target.value,
                    }
                  }));
                }}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Company Name"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="SendersContactPerson"
                value={formData.AirwayBillData.SendersContactPerson}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Contact Name"
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="SendersAddress1"
                value={formData.AirwayBillData.SendersAddress1}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Address line 1"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="SendersAddress2"
                value={formData.AirwayBillData.SendersAddress2}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Address Line 2"
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <select
                name="SendersCountry"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["SendersCountry"]}
                className="form-control"
              >
                <option value={""}>Select Country</option>
                {!CountryMaster.isLoading &&
                  CountryMaster.data.data.CountryListLocation &&
                  CountryMaster.data.data.CountryListLocation.length > 0 ?
                  CountryMaster.data.data.CountryListLocation.map(
                    (item, index) => (
                      <option value={item.CountryCode}>
                        {item.CountryName}
                      </option>
                    )
                  ) : <option value={""}>No Country Found</option>
                }
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="SendersCity"
                onChange={(e) => {
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const selectedId = selectedOption.getAttribute("id");
                  handleChange("Origin", selectedId)
                  handleChange(e.target.name, e.target.value)
                }}
                value={formData["AirwayBillData"]["SendersCity"]}
                className="form-control"
              >
                <option value={""}>Select City</option>
                {!CityHandle.errors.loading && CityHandle.Data && CityHandle.Data.CityListLocation && CityHandle.Data.CityListLocation.length > 0
                  ? (
                    CityHandle.Data.CityListLocation.map((item, index) => (
                      <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                    ))
                  )
                  : (<option value={""}>No City Found</option>)
                }
              </select>
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <PhoneInput
                key={phoneCountry}
                name="SendersPhone"
                value={formData.AirwayBillData.SendersPhone}
                international
                countryCallingCodeEditable={false}
                placeholder="Telephone Number"
                defaultCountry={phoneCountry}
                onChange={(v) => handleChangePhoneNo("SendersPhone", v)}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <PhoneInput
                name="SendersMobile"
                countryCallingCodeEditable={false}
                value={formData.AirwayBillData.SendersMobile}
                international
                placeholder="Sender Mobile  Number"
                defaultCountry={phoneCountry}
                onChange={(v) => handleChangePhoneNo("SendersMobile", v)}
              />
            </div>

          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="email"
                name="SendersEmail"
                value={formData.AirwayBillData.SendersEmail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Email"
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                name="SendersPinCode"
                value={formData.AirwayBillData.SendersPinCode}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Pin Code"
              />
            </div>

          </div>
        </div>
      </div>

    </>
  );
};

export default Shipper;
