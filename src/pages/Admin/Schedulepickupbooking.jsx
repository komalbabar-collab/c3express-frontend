
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import React, { useState } from "react";
import { useEffect } from 'react';
import { usePostSchedulePickupyDataMutation, usePostrecieveraddressAddressDataMutation, usePostUpdateAddressDataMutation } from '../../service/apiServices';
import useFormSubmission from '../../hooks/useFormSubmission';
import { InitialShcdulePickupdata } from '../../service/initialData';
import { Consignee, Shipment } from '../../service/JsxHtmlTemplates';
import ScheduleShip from './SchedulePickupComponents/ScheduleShip';
import ScheduleConsignee from './SchedulePickupComponents/ScheduleConsignee';
import ScheduleShipinfo from './SchedulePickupComponents/ScheduleShipinfo';
import { validateSchadulePickupFormTwo, validateSchadulePickupFormFour, validateSchadulePickupFormOne, validateSchadulePickupFormThree } from '../../heplers/Validators/SchadulePickupValidator';
import { toast } from 'react-toastify';
import ProtectComponent from '../../Components/Common/ProtectComponent';
import PrepadAccountStatusLeftMoney from '../../Components/Common/PrepadAccountStatusLeftMoney';
const Schedulepickupbooking = (props) => {
  const [selectedAddress, setSelectedAddress] = useState({
    id: null,
    name: "Add",
  });
  const [mutate] = usePostrecieveraddressAddressDataMutation();
  const [mutateAdd] = usePostUpdateAddressDataMutation();
  const [FormNo, setFomNo] = useState(1);
  const [Countryquery, setCountryquery] = useState("")
  const { Data, setFormData, formData, errors, handleSubmit, handleChange, setErrors } = useFormSubmission(usePostSchedulePickupyDataMutation, {
    // ...InitialShcdulePickupdata,
    BookingData: {
      ...InitialShcdulePickupdata.BookingData,
      AccountNo: props.userAuthData.data.data.user.AccountNo,
      // BookingPerson: props.userAuthData.data.data.user.username

    },
  })

  const handleBackButtonClick = async () => {
    if (FormNo === 3) {
      setFomNo(2);
    }
    else if (FormNo === 2) {
      setFomNo(1);
    }

  };
  const handleNextButtonClick = async () => {
    const data = {
      company_name: formData.BookingData.ReceiversCompany,
      Country: formData.BookingData.ReceiversCountry,
      City: formData.BookingData.ReceiversCity,
      address_line_1: formData.BookingData.ReceiversAddress1,
      address_line_2: formData.BookingData.ReceiversAddress2,
      ZipCode: formData.BookingData.ReceiversPinCode,
      phone_number: formData.BookingData.ReceiversMobile,
      telephone_number: formData.BookingData.ReceiversPhone,
      ReceiversEmail: formData.BookingData.ReceiversEmail,
      ReceiversContactPerson: formData.BookingData.ReceiversContactPerson,
      ServiceType: formData.BookingData.ServiceType,
      Destination: formData.BookingData.Destination,

    }
    if (selectedAddress.id) {
      data["_id"] = selectedAddress.id
    }

    let message = ""
    if (FormNo === 1) {
      let errorCheck = validateSchadulePickupFormOne(formData.BookingData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {

        setFomNo(2);
      }

    }
    else if (FormNo === 2) {
      let errorCheck = validateSchadulePickupFormTwo(formData.BookingData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)

      } else if (formData["BookingData"]["ShipmentType"] === "inter") {
        if (formData["BookingData"]["ReceiversPinCode"] === "") {
          toast.error("Please Enter Receivers PinCode")
        } else {
          try {
            const res = await mutate(data).unwrap();
          } catch (error) {
            console.error(error);
          }
          setFomNo(3);
        }
      }
      else {

        try {
          const res = await mutate(data).unwrap();

        } catch (error) {
          console.error(error);
        }
        setFomNo(3);

      }
    } else if (FormNo == 3) {
      let errorCheck = validateSchadulePickupFormThree(formData.BookingData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {
        handleSubmit()
      }
    }
  };
  return (
    <ProtectComponent isDashboard={true} dashboard={"Pickup_Request"} userAuthData={props.userAuthData}>

      <main id="content" role="main">
        <div className="main-content">
          <div className="container-fluid">
            <h2 className="page-title">Pickup Schedule Request | <PrepadAccountStatusLeftMoney /></h2>
            <div className="card customcss">
              <div className="card-body">
                <form>
                  <div>

                    {FormNo === 3 ? (
                      <ScheduleShipinfo
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        Data={Data}
                        setFormData={setFormData}
                        errors={errors}
                        Countryquery={Countryquery}
                        setCountryquery={setCountryquery}
                      />
                    ) : FormNo === 2 ? (
                      <ScheduleConsignee
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        Countryquery={Countryquery}
                        setCountryquery={setCountryquery}
                        selectedAddress={selectedAddress}
                        setSelectedAddress={setSelectedAddress}
                      />
                    ) : (
                      <ScheduleShip
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        Countryquery={Countryquery}
                        setCountryquery={setCountryquery}
                      />
                    )
                    }
                    <div className="d-flex justify-content-center">
                      <div className="col-lg-6 d-flex d-flex justify-content-center mt-4 p-2">
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={handleBackButtonClick}
                          style={{
                            width: "150px",
                            borderRadius: "15px",
                            backgroundColor: "#B31312",
                          }}
                        >
                          Back
                        </button>
                      </div>
                      <div className="col-lg-6 d-flex justify-content-center mt-4 p-2">
                        <button
                          type="button"
                          className="btn btn-secondary "
                          onClick={handleNextButtonClick}
                          style={{ width: "150px", borderRadius: "15px" }}
                        >
                          {FormNo === 3 ? "Submit" : "Next"}
                        </button>
                      </div>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectComponent>
  );
};

export default Schedulepickupbooking;