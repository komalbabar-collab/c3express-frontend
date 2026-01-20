import React, { useEffect, useRef, useState } from "react";
import { initialUsers } from "../../service/initialData";
import useFormSubmission from "../../hooks/useFormSubmission";
import {
  usePostAddressDataMutation,
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "../../service/apiServices";
import CountryCodes from "../../service/CountryCodes.json"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const AddAddress = ({ setIsDelete, changeAvailability, setIsAvailable }) => {
  const CountryMaster = useGetCountryMasterQuery("");
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(usePostAddressDataMutation, {
      SendersContactPerson: "",
      company_name: "",
      address_line_1: "",
      address_line_2: "",
      phone_number: "",
      Extension: "+971",
      Country: "AE",
      City: "",
      ZipCode: "",
      telephone_number: "",
      Origin: ""
    });
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData.Country,
  });
  useEffect(() => {
    if (formData.Country) {
      CityHandle.setFormData({ Country: formData.Country });
    }
  }, [formData.Country]);
  useEffect(() => {
    if (formData.Country) {
      CityHandle.handleSubmit();
    }
  }, [CityHandle.formData]);
  useEffect(() => {
    if (errors.error) {
      alert(errors.message);
    } else if (Data && !errors.error) {
      setIsDelete(false);
      changeAvailability();
    }
  }, [errors]);
  return (
    <div className="p-content_section p-contact">
      <div className="row clearfix" style={{ justifyContent: "center" }}>
        <div className="col-md-12 col-lg-12 contact_form-adduser">
          <form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Name
                </label>
                <input
                  name="SendersContactPerson"
                  value={formData["SendersContactPerson"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>

              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Company Name
                </label>
                <input
                  name="company_name"
                  value={formData["company_name"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Address Line 1
                </label>
                <input
                  name="address_line_1"
                  value={formData["address_line_1"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Address Line 2
                </label>
                <input
                  name="address_line_2"
                  value={formData["address_line_2"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Country
                </label>
                <select
                  name="Country"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={formData["Country"]}
                  className="form-control"
                >
                  <option value={""}>Select Country</option>
                  {!CountryMaster.isLoading &&
                    CountryMaster.data.data.CountryListLocation &&
                    CountryMaster.data.data.CountryListLocation.length > 0 &&
                    CountryMaster.data.data.CountryListLocation.map(
                      (item, index) => (
                        <option value={item.CountryCode}>
                          {item.CountryName}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  City
                </label>
                <select
                  name="City"
                  onChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex]
                    const selectedId = selectedOption.getAttribute("id");
                    handleChange("Origin", selectedId)
                    handleChange(e.target.name, e.target.value)
                  }}
                  value={formData["City"]}
                  className="form-control"
                >
                  <option value={""}>Select City</option>
                  {!CityHandle.errors.loading &&
                    CityHandle.Data &&
                    CityHandle.Data.CityListLocation &&
                    CityHandle.Data.CityListLocation.length > 0 ? (
                    CityHandle.Data.CityListLocation.map((item, index) => (
                      <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                    ))
                  ) : (
                    <option value={""}>No Records Found</option>
                  )}
                </select>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  TelePhone Number
                </label>
                <PhoneInput
                  name="telephone_number"
                  value={formData["telephone_number"]}
                  international
                  countryCallingCodeEditable={false}
                  placeholder="Telephone Number"
                  defaultCountry={formData["Country"]}
                  onChange={(v) => {
                    handleChange("telephone_number", v)

                  }} />
                <div className="row">
                  {/* <div className="col-md-3">
                   <select
                          name="Extenson"
                          onChange={(e) => handleChange(e.target.name, e.target.value)}
                          value={formData["Extenson"]}
                          className="form-control"
                        >
                          {CountryCodes.map((item, index) => (
                            <option value={item.dial_code}>{item.dial_code}</option>
                          ))}
                        </select>
                   </div> */}
                  <div className="col-md-12">
                    {/* 
                <input
                  name="telephone_number"
                  value={formData["telephone_number"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="number" onKeyDown={(e) => {
                    // Disable keyboard arrows
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                      e.preventDefault();
                    }
                  }}
                  onWheel={(e) => {
                    // Disable mouse wheel
                    e.target.blur();
                  }}
                /> */}
                  </div>

                </div>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Phone
                </label>
                <PhoneInput
                  countryCallingCodeEditable={false}
                  name="phone_number"
                  value={formData["phone_number"]}
                  international
                  placeholder="Phone  Number"
                  defaultCountry={formData["Country"]}
                  onChange={(v) => {
                    handleChange("phone_number", v)

                  }} />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Zip Code
                </label>
                <input
                  name="ZipCode"
                  value={formData["ZipCode"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="number" onKeyDown={(e) => {
                    // Disable keyboard arrows
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                      e.preventDefault();
                    }
                  }}
                  onWheel={(e) => {
                    // Disable mouse wheel
                    e.target.blur();
                  }}

                />
              </div>
            </div>
          </form>
        </div>

        <div className="  text-right p-2 add-the-sub ">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn bg-blue creat-add-btn  m-2 text-capitalize  "
              style={{ borderRadius: "20px", color: "white" }}
            >
              Create Address
            </button>

            <button
              type="button"
              onClick={changeAvailability}
              className="btn  creat-add-btn cancel-shadow the-request m-2 "
              style={{ borderRadius: "20px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddAddress;
