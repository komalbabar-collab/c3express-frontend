import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MinimumDate } from "../../heplers/DateValidator";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import SmalLoader from "../../heplers/Loaders/SmallLoader";
export default function ContentForStep3({
  SchadulePickupProps,
  onChangeData,
  ShipmentType,
  IsDimension,
  handleDimesionChange,
  handleChangeDimension,
  dimension,
  setCurrentStep,
  handleChangeData,
  Calculate
}) {
  var { Data, setFormData, formData, errors, isPosting } =
    SchadulePickupProps;


  const [isOnline, setisOnline] = useState(false)

  const [selectedDate, setSelectedDate] = useState(new Date(formData["BookingData"]["ShipmentReadyDate"]));

  const handleDateChange = (date) => {
    if (date) {
      const dayOfWeek = date.getDay();
      if (dayOfWeek === 0) {
        toast.error("Sunday is not allowed. Please select another date.");
      } else {
        setSelectedDate(date);
        onChangeData(date);
      }
    }
  };

  const disablePastDates = (date) => {
    const today = new Date();
    return date < today;
  };

  const disableSundays = (date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0;
  };
  return (
    <div className="location-form mt-3 mb-2">
      <div className="text-center mt-2">
        <h4 style={{ color: "#28337A", fontWeight: "600" }}>
          Shipment for Information
        </h4>
      </div>
      <div>
        <form>
          <div>
            <div>
              <label
                className="labelthird"
                style={{ margin: "5px", width: "100%" }}
              >
                <div style={{ fontWeight: "600" }}>Shipper Reference  :</div>
                <input
                  name="ShipperReference"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["ShipperReference"]}
                  type="text"
                  className="thirststep mt-0"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
            </div>
            <div>
              <label
                className="labelthird"
                style={{ margin: "5px", width: "100%" }}
              >
                <div style={{ fontWeight: "600" }}>Instruction :</div>
                <input
                  name="SpecialInstruction"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["SpecialInstruction"]}
                  type="text"
                  className="thirststep mt-0"
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
            </div>

            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div>
                <label className="labelthird m-2 p-0">

                  <div style={{ fontWeight: "600" }}>Pickup Date</div>

                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()} // Disable past dates
                  filterDate={(date) => !disableSundays(date)} // Disable Sundays
                  className="form-control"
                  style={{ border: "none", width: "140px" }}
                />


              </div>
              <div>
                <label className="labelthird m-2">
                  <div style={{ fontWeight: "600" }}>Pickup Time Slot:</div>
                  <select
                    name="ShipmentReadyTime"
                    onChange={(e) => {
                      onChangeData(e)
                    }}
                    value={formData["BookingData"]["ShipmentReadyTime"]}
                    className="form-control thirststep"
                    style={{
                      border: "none",
                      width: "100%",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <option>Select Pickup Time Range</option>
                    <option value={"09-12"}>09-12</option>
                    <option value={"09-17"}>09-17</option>
                    <option value={"12-16"}>12-16</option>
                    <option value={"12-17"}>12-17</option>
                  </select>
                </label>
              </div>
            </div>

            <div
              className="d-flex "
              style={{ justifyContent: "space-between" }}
            >
              {" "}
              <label className="labelthird m-2">
                <div style={{ fontWeight: "600" }}>Weight:</div>
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
                  name="Weight"
                  onChange={(e) => {
                    onChangeData(e)
                  }}
                  value={formData["BookingData"]["Weight"]}
                  className="form-control thirststep"
                  placeholder="Weight(in kgs)"
                  style={{
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
              <label className="labelthird m-2">
                <div style={{ fontWeight: "600" }}>Number of Pieces:</div>
                <input
                  name="NumberofPeices"
                  onChange={(e) => {
                    onChangeData(e)
                    setFormData(prevFormData => ({
                      ...prevFormData,
                      BookingData: {
                        ...prevFormData.BookingData,
                        NumberofShipments: e.target.value
                      }
                    }));
                  }}
                  value={formData["BookingData"]["NumberofPeices"]}
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
                  className="form-control thirststep"
                  style={{
                    border: "none",
                    borderBottom: "1px solid grey",
                  }}
                />
              </label>
            </div>

            <div>
              <input
                type="checkbox"
                className="m-2"
                onChange={handleDimesionChange}
              />
              I know the dimension of my shipment
            </div>

            {IsDimension && (
              <div className="m-2">
                <label>
                  <div style={{ fontWeight: "600" }}>Dimensions:</div>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    {" "}
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
                      className="m-2"
                      placeholder="L(cm)"
                      name="L"
                      onChange={(e) =>
                        handleChangeDimension("L", e.target.value)
                      }
                      value={dimension.L}
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
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
                      name="B"
                      onChange={(e) =>
                        handleChangeDimension("B", e.target.value)
                      }
                      value={dimension.B}
                      className="m-2"
                      placeholder="B(cm)"
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
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
                      className="m-2"
                      name="H"
                      onChange={(e) =>
                        handleChangeDimension("H", e.target.value)
                      }
                      value={dimension.H}
                      placeholder="H(cm)"
                      style={{
                        width: "80px",
                        border: "none",
                        borderBottom: "1px solid grey",
                      }}
                    />
                  </div>
                </label>
              </div>
            )}
          </div>
          {
            Calculate.isLoading ? <SmalLoader /> :
              <button type="button" className="btn btn-tracking bg-blue text-center pr-3 pl-3 mt-2"
                onClick={Calculate.handleCalculate}>
                Calculate
              </button>
          }
          {Calculate.CalucalteData && (
            <div className="labelthird " >

              <div className="text-end" style={{ fontSize: "20px" }} >  Total Amount: <span style={{ fontWeight: "600", fontSize: "20px" }}>AED {Calculate.CalucalteData.NetAmount}</span></div>
              <span className="text-danger">
                {
                  formData["BookingData"]["ShipmentType"] == "dom" ? ' NOTE : For Amazon FBA domestic deliveries, additional AED 50/- will be charged' : ' NOTE : Additional AED 50/- will be charged'
                }

              </span>

              <div className="row justify-content-center mt-3">
                <div className="col-md-12 col-xs-12 text-secondary  p-20">
                  Payment Method
                </div>
                <br />
                <br />
                <br />
                <div className="col-md-6 col-xs-4 text-start  p-0">
                  <div className="wizard-form-radio delevery-option text-start p-0 text-center">
                    <input
                      checked={isOnline ? false : true}
                      name="paytype"
                      id="cod"
                      type="radio"
                      defaultValue="cod"
                      className="paymenttype"
                      onChange={() => {
                        setisOnline(false)
                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            PaidAmount: 0,
                            CashonPickup: Calculate.CalucalteData.NetAmount,
                          },
                        }))
                      }
                      }
                    />
                    <span className="checkmark" />
                    <label htmlFor="cod">
                      <strong>

                        Cash on Pickup
                      </strong>
                    </label>
                  </div>
                </div>

                <div className="col-md-6 col-xs-4 ">
                  <div className="wizard-form-radio delevery-option text-center">
                    <input
                      checked={isOnline ? true : false}
                      name="paytype"
                      id="cod"
                      type="radio"
                      defaultValue="onlinepayment"
                      className="paymenttype"
                      onChange={() => {
                        setisOnline(true)
                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            PaidAmount: Calculate.CalucalteData.NetAmount,
                            CashonPickup: Calculate.CalucalteData.NetAmount,
                          },
                        }))
                      }}
                    />
                    <span className="checkmark" />
                    <label htmlFor="onlinepayment">
                      <strong>

                        Online Payment
                      </strong>
                    </label>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="col-md-12 col-xs-12 ">
                <div className=" row">
                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      className="m-2"
                      checked={formData["BookingData"]["DutyConsigneePay"]}
                      onChange={(e) => {

                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            DutyConsigneePay: e.target.checked
                          },
                        }))
                      }}
                    />
                    <span className="checkmark" />
                    <span >Destination Duties/Taxes will be applicable <span className="text-danger">*</span></span>
                  </div>
                  <div className="col-md-12">
                    <input
                      type="checkbox"
                      className="m-2"
                      checked={formData["BookingData"]["termandconditions"]}
                      onChange={(e) => {
                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            termandconditions: e.target.checked
                          },
                        }))
                      }}
                    />
                    <span className="checkmark" />
                    <a href="/terms-and-conditions" target="blank">Terms & Conditions <span className="text-danger">*</span></a>
                  </div>
                </div>
              </div>
            </div>
          )}


        </form>
      </div>
    </div>
  );

}
