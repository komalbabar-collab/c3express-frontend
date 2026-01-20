import React from "react";
import { useGetCountryMasterQuery } from "../../../service/apiServices";

const BookingPersonDetails = ({ formData, handleChange, setFormData }) => {
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
  const { data, error, isLoading, refetch } = useGetCountryMasterQuery("");


  return (
    <>
      <div className="row d-flex justify-content-center mt-2">
        <div className="row">
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-lg-9 shipping-form ">
              <h2
                className="page-title backgorindd text-center"
                style={{ fontSize: "24px" }}
              >
                Booking Person Details
              </h2>
              <div className="row d-flex justify-content-center">

                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="BookingContactPerson"
                    value={formData["BookingData"]["BookingContactPerson"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Booking Person Name"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="BookingCompanyName"
                    value={formData["BookingData"]["BookingCompanyName"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Booking Company Name"
                  />
                </div>
              </div>
              <div className="row  d-flex justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="BookingAddress1"
                    value={formData["BookingData"]["BookingAddress1"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Booking Address Line 1"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="BookingAddress2"
                    value={formData["BookingData"]["BookingAddress2"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Booking Address Line 2"
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mb-3">
                  <select
                    name="Destination"
                    onChange={onChangeData}
                    value={formData["BookingData"]["Destination"]}
                    className="form-control"
                  >
                    <option value={""}>Select Destination</option>
                    {!isLoading && data && data.data.CountryListLocation &&
                      data && data.data.CountryListLocation.length > 0 ? data.data.CountryListLocation.map((data, index) => (
                        <option value={data.CountryCode}>{data.CountryName}</option>
                      )) : <option value={""}>No Country Found</option>}
                  </select>
                </div>
                <div className="col-lg-6 mb-3">
                  <select
                    name="Origin"
                    onChange={onChangeData}
                    value={formData["BookingData"]["Origin"]}
                    className="form-control"
                  >
                    <option value={""}>Select Origin</option>

                    <option value={"DXB"}>{"DXB"}</option>

                  </select>
                </div>




              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
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
                    name="BookingPhoneNo"
                    value={formData["BookingData"]["BookingPhoneNo"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Telephone Number"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <input
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
                    name="BookingMobileNo"
                    value={formData["BookingData"]["BookingMobileNo"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Mobile Number"
                  />
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    name="BookingEmail"
                    value={formData["BookingData"]["BookingEmail"]}
                    onChange={onChangeData}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder=" Booking Person Email"
                  />
                </div>
                <div className="col-lg-6 mb-3">
                  <select name="BusinessClosingTime"
                    onChange={onChangeData}
                    value={formData["BookingData"]["BusinessClosingTime"]}
                    className="form-control">
                    <option value={""}>Select Business Closing Time</option>
                    <option value={"12:00"}>12:00</option>
                    <option value={"12:30"}>12:30</option>
                    <option value={"01:00"}>01:00</option>
                    <option value={"01:30"}>01:30</option>
                    <option value={"02:00"}>02:00</option>

                  </select>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPersonDetails;
