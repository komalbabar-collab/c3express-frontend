import React, { useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Shipment } from "../../../service/JsxHtmlTemplates";
import Loader from "../../../heplers/Loaders/Loader"
import { toast } from "react-toastify";
import { handlePdfDownload } from "../../../heplers/PdfDownloader";
import { useGetActiveServiceTypesDataQuery } from "../../../service/apiServices";
import { MinimumDate } from "../../../heplers/DateValidator";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";


const ScheduleShipinfo = ({ Data, formData, errors, handleChange, setFormData, handleSubmit }) => {
  const navigate = useNavigate();
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
  useEffect(() => {

    if (errors.error) {
      toast.error(errors.message)
    }
  }, [errors])
  const handleKeyDown = (e) => {
    // Disable keyboard arrows for number inputs
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  const handleWheel = (e) => {
    // Disable mouse wheel for number inputs
    e.target.blur();
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="row col-lg-9">
          <div className="shipping-form">
            <div className="col-lg-12">
              <h2 className="page-title background text-center" style={{ fontSize: "24px" }}>
                Shipment Information
              </h2>
              <div className="row d-flex justify-content-center">
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 mb-3">
                    <input
                      placeholder="Number of Pieces"
                      name="NumberofPeices"
                      onChange={(e) => {
                        onChangeData(e);
                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            NumberofShipments: e.target.value,
                          },
                        }));
                      }}
                      value={formData["BookingData"]["NumberofPeices"]}
                      type="number"
                      onKeyDown={(e) => {
                        // Disable keyboard arrows
                        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                          e.preventDefault();
                        }
                      }}
                      onWheel={(e) => {
                        // Disable mouse wheel
                        e.target.blur();
                      }}
                      className="form-control"
                    />

                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      placeholder="Weight(Kg)"
                      name="Weight"
                      onChange={(e) => {
                        onChangeData(e);
                      }}
                      value={formData["BookingData"]["Weight"]}
                      type="number"
                      onKeyDown={(e) => {
                        // Disable keyboard arrows
                        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                          e.preventDefault();
                        }
                      }}
                      onWheel={(e) => {
                        // Disable mouse wheel
                        e.target.blur();
                      }}
                      className="form-control"
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className=" m-2 p-0">
                      Pickup Date
                    </label>
                    {/* <input
                      name="ShipmentReadyDate"
                      onChange={(e) => {
                        onChangeData(e);
                      }}
                      value={formData["BookingData"]["ShipmentReadyDate"]}
                      type="date"
                      onKeyDown={(e) => e.preventDefault()}
                      min={MinimumDate()}
                      className="form-control"
                    /> */}
                    <ReactDatePicker
                      name="ShipmentReadyDate"
                      value={formData["BookingData"]["ShipmentReadyDate"]}
                      onChange={(e) => {
                        // onChangeData(e);
                        setFormData((prevData) => ({
                          ...prevData,
                          BookingData: {
                            ...prevData.BookingData,
                            ["ShipmentReadyDate"]: moment(e).format("YYYY-MM-DD"),
                          },
                        }));
                      }}
                      onKeyDown={(e) => e.preventDefault()}
                      minDate={MinimumDate()}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Select Date"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      showIcon
                      filterDate={isWeekday}
                      className="form-control"
                    />

                  </div>
                  <div className="col-lg-6 mb-3">
                    <label className="m-2">
                      Pickup Time Slot:
                    </label>
                    <select
                      name="ShipmentReadyTime"
                      onChange={(e) => {
                        onChangeData(e);
                      }}
                      value={formData["BookingData"]["ShipmentReadyTime"]}
                      className="form-control "
                    >
                      <option>Select Pickup Time Range</option>
                      <option value={"09-12"}>09-12</option>
                      <option value={"09-17"}>09-17</option>
                      <option value={"12-16"}>12-16</option>
                      <option value={"12-17"}>12-17</option>
                    </select>

                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      name="SpecialInstruction"
                      onChange={(e) => {
                        onChangeData(e);
                      }}
                      value={formData["BookingData"]["SpecialInstruction"]}
                      type="text"
                      className="form-control"
                      placeholder="Instruction"
                    />
                  </div>
                  <div className="col-lg-6 mb-3">
                    <input
                      placeholder="Goods Description"
                      name="GoodsDescription"
                      onChange={(e) => {
                        onChangeData(e);
                      }}
                      value={formData["BookingData"]["GoodsDescription"]}
                      type="text"
                      className="form-control"
                    />
                  </div>

                </div>
              </div>
              <div className="text-center mb-3 mt-2">
                {errors.loading ? (
                  <Loader />
                ) : errors.error ? (
                  <span className="text-danger">{""}</span>
                ) : Data && Data.PickupRequestNo && (<Navigate to={"/PickupRequest/" + Data?.PickupRequestNo} replace={true} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleShipinfo;
