// Register.js
import React, { useState, useEffect, useRef } from "react";
import Header from "../../Components/Common/Header";
import Footer from "../../Components/Common/Footer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../redux/reducers/UserReducer";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png"
import {
  useGetCountryMasterQuery,
  usePostCityListMutation,
  useRegisterMutation,
} from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import CountryCodes from "../../service/CountryCodes.json";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const CountryMaster = useGetCountryMasterQuery("");
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(useRegisterMutation, {
      username: "",
      full_name: "",
      phone_number: "",
      // password: "",
      // cpassword: "",
      email: "",
      company_name: "",
      address_line_1: "",
      address_line_2: "",
      telephone_number: "",
      // Extenson: "+971",
      Country: "AE",
      City: "",
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
      toast.error(errors.message);
    } else if (Data) {
      toast.success("Your Account is Created We Will Notify as well as soon");

    }
  }, [errors, Data]);
  return (
    <div>
      <section>
        <div className="contact_page_cover">
          <Link to="/">
            <img
              style={{ width: "120px", padding: "10px", position: "absolute" }}
              src={logo}
            />
          </Link>
          <div className="p-section_head" style={{ paddingTop: "60px" }}>
            <h1>Register</h1>
          </div>
          <div className="container p-content_section p-contact">
            <div className="row clearfix" style={{ justifyContent: "center" }}>
              <div className="col-md-6 col-lg-6 contact_form">
                <form method="post" onSubmit={handleSubmit}>
                  <div className="footer_form_outer">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      User Name
                    </label>
                    <input
                      placeholder="User Name *"
                      name="username"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                      value={formData.username}
                      required=""
                      type="text"
                      className="form-control"
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      placeholder="Name *"
                      name="full_name"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      value={formData.full_name}
                      autoComplete="off"
                      className="form-control"
                      required=""
                      type="text"
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email ID
                    </label>
                    <input
                      autoComplete="off"
                      className="form-control"
                      required=""
                      placeholder="Email ID*"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                    />

                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Company Name
                    </label>
                    <input
                      name="company_name"
                      value={formData["company_name"]}
                      className="form-control"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      type="text"
                    />

                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Address Line 1
                    </label>
                    <input
                      name="address_line_1"
                      value={formData["address_line_1"]}
                      className="form-control"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      type="text"
                    />

                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Address Line 2
                    </label>
                    <input
                      name="address_line_2"
                      value={formData["address_line_2"]}
                      className="form-control"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      type="text"
                    />

                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Country
                    </label>
                    <select
                      name="Country"
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      value={formData["Country"]}
                      className="form-control"
                    >
                      <option value={""}>Select Country</option>
                      {!CountryMaster.isLoading &&
                        CountryMaster.data.data.CountryListLocation &&
                        CountryMaster.data.data.CountryListLocation.length >
                        0 &&
                        CountryMaster.data.data.CountryListLocation.map(
                          (item, index) => (
                            <option value={item.CountryCode}>
                              {item.CountryName}
                            </option>
                          )
                        )}
                    </select>

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
                        <option value={""}>City Not Found</option>
                      )}
                    </select>
                    {/* <label htmlFor="exampleInputEmail1" className="form-label">
                      Password
                    </label>
                    <input
                      autoComplete="off"
                      required=""
                      placeholder="Password*"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      className="form-control"
                    />
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      autoComplete="off"
                      defaultValue=""
                      required=""
                      placeholder="Confirm Password*"
                      type="password"
                      name="cpassword"
                      value={formData.cpassword}
                      onChange={(e) =>
                        handleChange(e.target.name, e.target.value)
                      }
                      className="form-control"
                    /> */}
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Phone Number
                    </label>

                    <PhoneInput
                      name="phone_number"
                      countryCallingCodeEditable={false}
                      value={formData["phone_number"]}
                      international
                      placeholder="Phone  Number"
                      defaultCountry={formData["Country"]}
                      onChange={(v) => {
                        handleChange("phone_number", v);
                      }}
                    />
                    <label
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      Telephone Number
                    </label>
                    <PhoneInput
                      countryCallingCodeEditable={false}
                      name="telephone_number"
                      value={formData["telephone_number"]}
                      international
                      placeholder="Telephone  Number"
                      defaultCountry={formData["Country"]}
                      onChange={(v) => {
                        handleChange("telephone_number", v);
                      }}
                    />


                    <div
                      className="form_submit_btn mt-2"
                      style={{ display: "block" }}
                    >
                      <input
                        style={{ textAlign: "center" }}
                        defaultValue={"Register"}
                        type="button"
                        onClick={handleSubmit}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
