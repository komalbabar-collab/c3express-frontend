import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteUserDataMutation,
  useGetCountryMasterQuery,
  useGetUsersDataQuery,
  usePostCityListMutation,
  useUpdateUserDataMutation,
} from "../../service/apiServices";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import useFormSubmission from "../../hooks/useFormSubmission";
import { setUserAdressChange } from "../../redux/reducers/UserReducer";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { getcountryNameByCode } from "../../heplers/DateValidator";
const AddressData = (props) => {
  const dispatch = useDispatch()
  const UpdateAddress = (name, value, id) => {
    props.setFormData((prev) => {
      const { Active, ...rest } = prev


      return {
        ...rest,
        _id: id,
        [name]: value
      };
    });
  };


  const updateStatus = async (e, item) => {
    e.preventDefault();
    try {
      const res = await props
        .mutateUpdate({
          _id: item._id,
          Active: e.target.checked,
        })
        .unwrap();
      props.setIsDelete(res);
      dispatch(setUserAdressChange({ Address: Date.now() }))
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, isLoading, refetch } = useGetCountryMasterQuery("");
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: props.formData.Country,
  });
  useEffect(() => {
    if (props.formData.Country) {
      CityHandle.setFormData({ Country: props.formData.Country });
    }
  }, [props.formData.Country, props.handleShow]);
  useEffect(() => {
    CityHandle.handleSubmit();
  }, [CityHandle.formData.Country]);
  return (
    <div>
      <table className="table table-bordered width_responss" style={{ width: '160%' }}>
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Name</th>
            <th scope="col">Company Name</th>
            <th scope="col">Country</th>
            <th scope="col">City</th>
            <th scope="col">Address Line 1</th>
            <th scope="col">Address Line 2</th>
            <th scope="col">Zip Code</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.error ? (
            <tr>
              <td colSpan="3">{"No records Found"}</td>
            </tr>
          ) : props.data.data.Address && props.data.data.Address.length > 0 ? (
            props.data.data.Address.map((item, index) => (
              <tr key={item._id}>
                <td>{props.startIndex + index + 1}</td>
                <td>{item.SendersContactPerson}</td>
                <td>{item.company_name}</td>
                <td>{getcountryNameByCode(item.Country)}</td>
                <td>{item.City}</td>
                <td>
                  {item.address_line_1}
                </td>
                <td>
                  {item.address_line_2}
                </td>
                <td>{item.ZipCode}</td>
                <td>{item.phone_number}</td>
                <td >
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="flexSwitchCheckDefault"

                      checked={item.Active}
                      onChange={(e) => updateStatus(e, item)}
                    />
                  </div>
                </td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      props.handleShow();
                      props.setFormData(item);
                    }}
                  >
                    Edit
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => props.deleteUser(item)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "18px" }}>Edit Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method="post" onSubmit={props.handleSubmit}>
            {props.formData && (
              <div className="footer_form_outer">
                <label>Name</label>
                <input
                  placeholder={"Name"}
                  name="SendersContactPerson"
                  className="form-control"
                  value={props.formData["SendersContactPerson"]}
                  onChange={(e) => UpdateAddress("SendersContactPerson", e.target.value, props.formData._id)}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Company Name</label>
                <input
                  placeholder={"Company Name"}
                  name="company_name"
                  className="form-control"
                  value={props.formData["company_name"]}
                  onChange={(e) => UpdateAddress("company_name", e.target.value, props.formData._id)}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Country</label>

                <select
                  name="Country"
                  value={props.formData["Country"]}
                  onChange={(e) => UpdateAddress("Country", e.target.value, props.formData._id)}
                  className="form-control"
                >
                  <option value={""}>Select Country</option>
                  {!isLoading &&
                    data && data.data.CountryListLocation &&
                    data.data.CountryListLocation.length > 0 &&
                    data.data.CountryListLocation.map((data, index) => (
                      <option value={data.CountryCode}>
                        {data.CountryName}
                      </option>
                    ))}
                </select>
                <label>City</label>
                <select
                  name="City"
                  className="form-control"
                  value={props.formData["City"]}
                  onChange={(e) => {
                    const selectedOption = e.target.options[e.target.selectedIndex]
                    const selectedId = selectedOption.getAttribute("id");
                    UpdateAddress("Origin", selectedId)
                    UpdateAddress("City", e.target.value, props.formData._id)
                  }}
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
                    <option value={""}>No City Found</option>
                  )}
                </select>
                <label>Address Line 1</label>
                <input
                  placeholder={"Address Line 1"}
                  name="address_line_1"
                  className="form-control"
                  value={props.formData["address_line_1"]}
                  onChange={(e) => UpdateAddress("address_line_1", e.target.value, props.formData._id)}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Address Line 2</label>
                <input
                  placeholder={"Address Line 2"}
                  name="address_line_2"
                  className="form-control"
                  value={props.formData["address_line_2"]}
                  onChange={(e) => UpdateAddress("address_line_2", e.target.value, props.formData._id)}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Zip Code</label>
                <input
                  placeholder={"Zip Code"}
                  name="ZipCode"
                  className="form-control"
                  value={props.formData["ZipCode"]}
                  onChange={(e) => UpdateAddress("ZipCode", e.target.value, props.formData._id)}
                  autoComplete="off"
                  required=""
                  type="text"
                />
                <label>Phone Number</label>

                <PhoneInput
                  // className="form-control"
                  placeholder={"Phone Number"}
                  countryCallingCodeEditable={false}
                  name="phone_number"
                  value={props.formData["phone_number"]}
                  onChange={(v) => UpdateAddress("phone_number", v, props.formData._id)}
                  international
                  defaultCountry={props.formData["Country"]}
                />
                <label>Phone Number</label>

                <PhoneInput
                  // className="form-control"
                  countryCallingCodeEditable={false}
                  placeholder={"Telephone Number"}
                  name="telephone_number"
                  value={props.formData["telephone_number"]}
                  onChange={(v) => UpdateAddress("telephone_number", v, props.formData._id)}
                  international
                  defaultCountry={props.formData["Country"]}
                />
              </div>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              props.handleClose();
              props.handleSubmit();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressData;
