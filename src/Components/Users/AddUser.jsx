import React, { useEffect, useRef, useState } from "react";
import { initialUsers } from "../../service/initialData";
import useFormSubmission from "../../hooks/useFormSubmission";
import { useAddUserDataMutation, useGetCountryMasterQuery, useGetServiceTypesDataQuery, usePostCityListMutation } from "../../service/apiServices";
import { toast } from "react-toastify";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useSelector } from "react-redux";
import Loader from "../../heplers/Loaders/Loader";
const AddUser = ({ setIsDelete, changeAvailability, setIsAvailable, userAuthData, isAdmin, isAuth }) => {
  let UserData = useSelector((state) => state.UserReducer);

  const [search, setSearch] = useState("");
  const { data, error, isLoading, refetch } = useGetServiceTypesDataQuery(search);
  let initalData = { ...initialUsers }
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(useAddUserDataMutation, { ...initalData, })
  const CountryMaster = useGetCountryMasterQuery("");
  const CityHandle = useFormSubmission(usePostCityListMutation, { Country: formData.Country })
  useEffect(() => {
    if (formData.Country) {
      CityHandle.setFormData({ Country: formData.Country })
    }
  }, [formData.Country])
  useEffect(() => {
    CountryMaster.refetch()
  }, [setIsAvailable])
  useEffect(() => {
    if (formData.Country) {
      CityHandle.handleSubmit()
    }
  }, [CityHandle.formData])
  useEffect(() => {
    if (errors.error) {
      toast.error(errors.message)
    }
    else if (!errors.error) {
      toast.success(Data?.message)
      setIsDelete(false)
      // changeAvailability()
    }
  }, [errors])
  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        SubuserId: userAuthData && userAuthData.data.data.user._id
      }
    })
  }, [FormData])
  const onChangeData = (e) => {
    const { name, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      dashboard: {
        ...prevData.dashboard,
        [name]: checked,
      },
    }));
  };
  if (errors.loading) {
    return <Loader />
  }
  return (
    <div className="p-content_section p-contact">
      <div className="row clearfix" style={{ justifyContent: "center" }}>
        <div className="col-md-12 col-lg-12 contact_form-adduser">
          <form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  User Name
                </label>
                <input
                  name="username"
                  value={formData["username"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  required=""
                  type="text"
                />

              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Account No
                </label>
                <input
                  name="AccountNo"
                  value={formData["AccountNo"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"

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
                  Contact Person Name
                </label>
                <input
                  name="full_name"
                  value={formData["full_name"]}
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
                  {!CountryMaster.isLoading && CountryMaster.data.data.CountryListLocation
                    && CountryMaster.data.data.CountryListLocation.length > 0 &&
                    CountryMaster.data.data.CountryListLocation.map((item, index) => (
                      <option value={item.CountryCode}>{item.CountryName}</option>
                    ))}
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
                    CityHandle.Data && CityHandle.Data.CityListLocation &&
                    CityHandle.Data.CityListLocation.length > 0 ?
                    CityHandle.Data.CityListLocation.map((item, index) => (
                      <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                    )) : <option value={""}>City Not Found</option>
                  }
                </select>
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Phone
                </label>
                <PhoneInput
                  // className="form-control"
                  countryCallingCodeEditable={false}
                  name="phone_number"
                  value={formData["phone_number"]}
                  international
                  placeholder="Phone  Number"
                  defaultCountry={formData["Country"]}
                  onChange={(v) => {
                    handleChange("phone_number", v);
                  }}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Telephone Number
                </label>
                <PhoneInput
                  // className="form-control"
                  countryCallingCodeEditable={false}
                  name="telephone_number"
                  value={formData["telephone_number"]}
                  international
                  placeholder="Phone  Number"
                  defaultCountry={formData["Country"]}
                  onChange={(v) => {
                    handleChange("telephone_number", v);
                  }}
                />
              </div>
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData["email"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>
              {/* <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  value={formData["password"]}
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
                  Confirm Password
                </label>
                <input
                  name="cpassword"
                  value={formData["cpassword"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div> */}
            </div>
          </form>
        </div>

        {
          UserData && UserData.data.data.user.Role == "Admin" ? <>
            <div className="col-md-12 col-lg-12 " style={{ marginTop: "30px" }}>
              <table className="table" style={{ border: "none" }}>
                <thead>
                  <tr style={{ backgroundColor: "palegoldenrod" }}>
                    <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                      Service Type Name
                    </th>
                    <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                      Service Type Value
                    </th>
                    <th
                      style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                      className="width-450"
                    />
                    <th
                      scope="col"
                      style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                      className="text-center"
                    >
                      Accessibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.data.ServiceType && data.data.ServiceType.length > 0 && data.data.ServiceType.map((item, index) => (
                    <tr>
                      <td className="text-uppercase">{item.title}</td>
                      <td>{item.value}</td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            id="manage_sub_users"
                            checked={formData.service_types && formData.service_types.includes(item._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({ ...prev, service_types: [...prev.service_types, item._id] }))
                              }
                              else {
                                setFormData(prev => ({ ...prev, service_types: prev.service_types.filter((itemm) => itemm !== item._id) }))
                              }
                            }}
                            name="service_types"
                            className="custom-control-input create-booking"

                          />
                          <label
                            className="custom-control-label"
                            htmlFor="manage_sub_users"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                  }


                </tbody>
              </table>
            </div>
          </> :
            UserData && UserData.data.data.user.Role == "User" ? <>
              <div className={"col-lg-12 col-md-12"} style={{ marginTop: "30px" }}>
                <table className="table" style={{ border: "none" }}>
                  <thead>
                    <tr style={{ backgroundColor: "palegoldenrod" }}>
                      <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                        Menu
                      </th>
                      <th scope="col" style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}>
                        Function
                      </th>
                      <th
                        style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                        className="width-450"
                      />
                      <th
                        scope="col"
                        style={{ color: 'white', backgroundColor: 'rgb(44 162 198)' }}
                        className="text-center"
                      >
                        Accessibility
                      </th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* <tr>
                        <td className="text-uppercase">MANAGE SUB USERS</td>
                        <td>Manage Sub Users</td>
                        <td className="width-450" />
                        <td>
                          <div
                            className="custom-control custom-checkbox mb-3 accesibilityy"
                            style={{ justifyContent: "center", display: "flex" }}
                          >
                            <input
                              type="checkbox"
                              id="manage_sub_users"
                              checked={formData.dashboard.Manage_Sub_Users}
                              onChange={onChangeData}
                              name="Manage_Sub_Users"
                              className="custom-control-input create-booking"

                              defaultValue="Manage Sub Users"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="manage_sub_users"
                            />
                          </div>
                        </td>
                      </tr> */}


                    <tr>
                      <td className="text-uppercase">
                        Pickup Request
                      </td>
                      <td>Create Booking</td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            id="manage_sub_users"
                            checked={formData.dashboard.Pickup_Request}
                            onChange={onChangeData}
                            name="Pickup_Request"
                            className="custom-control-input create-booking"

                            defaultValue="Manage Sub Users"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="manage_sub_users"
                          />
                        </div>
                      </td>
                    </tr>


                    <tr>
                      <td className="text-uppercase">PICKUP HISTORY </td>
                      <td>View Booking History</td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="view_booking_history"
                            checked={formData.dashboard.Pickup_History}
                            onChange={onChangeData}
                            name="Pickup_History"
                            defaultValue="View booking history"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="view_booking_history"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="text-uppercase">PRINT AIRWAYBILL</td>
                      <td>Print Airway Bill </td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            id="print_airway_bill"
                            className="custom-control-input"
                            checked={formData.dashboard.Print_Airway_Bill}
                            onChange={onChangeData}
                            name="Print_Airway_Bill"
                            defaultValue="Print airway bill"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="print_airway_bill"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="text-uppercase">AIRWAY BILL GENERATION </td>
                      <td>Pickup With AWB</td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            id="pickup_with_awb"
                            checked={formData.dashboard.Airway_Bill_Generation}
                            onChange={onChangeData}
                            className="custom-control-input"
                            name="Airway_Bill_Generation"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="pickup_with_awb"
                          />
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="text-uppercase">AIRWAY BILL HISTORY</td>
                      <td>View AWB Booking History</td>
                      <td className="width-450" />
                      <td>
                        <div
                          className="custom-control custom-checkbox mb-3 accesibilityy"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <input
                            type="checkbox"
                            id="view_awb_booking_history"
                            className="custom-control-input"
                            name="Air_Way_bill_history"
                            checked={formData.dashboard.Air_Way_bill_history}
                            onChange={onChangeData}
                            defaultValue="View awb booking history"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="view_awb_booking_history"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </> : <></>



        }

        <div className="  text-right p-2 add-the-sub ">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn bg-blue creat-add-btn  m-2 text-capitalize  "
              style={{ borderRadius: "20px", color: 'white' }}
            >
              Create  {UserData && UserData.data.data.user.Role == "User" ? "Sub User" : UserData && UserData.data.data.user.Role == "Admin" ? "Customer" : false}
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
export default AddUser;
