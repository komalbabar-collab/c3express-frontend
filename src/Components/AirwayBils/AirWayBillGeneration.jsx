import React, { useEffect, useState } from "react";
import useFormSubmission from "../../hooks/useFormSubmission";
import { InitialAirwayBilldata } from "../../service/initialData";
import { useGetCreateAirwayBillyDataMutation, usePostrecieveraddressAddressDataMutation } from "../../service/apiServices";
import Shipper from "./AirWayBillsComponents/Shipper";
import ShipmentInfo from "./AirWayBillsComponents/ShipmentInfo";
import Consignee from "./AirWayBillsComponents/Consignee";
import { validateAirwayBillFormOne, validateAirwayBillFormThree, validateAirwayBillFormTwo, } from "../../heplers/Validators/AirwayBillGenerationValidator";
import { toast } from "react-toastify";

const AirWayBillGeneration = (props) => {
  const [selectedAddress, setSelectedAddress] = useState({
    id: null,
    name: "Add",
  });
  const [mutate] = usePostrecieveraddressAddressDataMutation();
  const [IsDimension, setisDimension] = useState(false)
  const [dimension, setdimenstion] = useState({
    L: "",
    B: "",
    H: ""
  });
  const [FormNo, setFomNo] = useState(1);
  const handleBackButtonClick = () => {
    if (Data && Data?.AirwayBillNumber) {
      setFormData({
        // ...InitialAirwayBilldata,
        AirwayBillData: {
          ...InitialAirwayBilldata.AirwayBillData,
          AccountNo: props.userAuthData.data.data.user.AccountNo,
          ShipmentDimension: dimension.L !== "" && dimension.B !== "" && dimension.H !== "" ? `${dimension.L}x${dimension.B}x${dimension.H}` : ""
        },
        Country: InitialAirwayBilldata.Country,
      });
      setData(null);
      return setFomNo(1);
    }

    if (FormNo === 3) {
      setFomNo(2);
    } else if (FormNo === 2) {
      setFomNo(1);
    }
  };

  const handleNextButtonClick = async () => {
    let message = "";
    if (FormNo === 1) {
      let errorCheck = validateAirwayBillFormOne(formData.AirwayBillData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {
        setFomNo(2);
      }

    } else if (FormNo === 2) {
      console.log("came here no")
      let errorCheck = validateAirwayBillFormTwo(formData.AirwayBillData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else {
        try {
          const data = {
            company_name: formData.AirwayBillData.ReceiversCompany,
            Country: formData.AirwayBillData.ReceiversCountry,
            City: formData.AirwayBillData.ReceiversCity,
            address_line_1: formData.AirwayBillData.ReceiversAddress1,
            address_line_2: formData.AirwayBillData.ReceiversAddress2,
            ZipCode: formData.AirwayBillData.ReceiversPinCode,
            phone_number: formData.AirwayBillData.ReceiversMobile,
            telephone_number: formData.AirwayBillData.ReceiversPhone,
            ReceiversEmail: formData.AirwayBillData.ReceiversEmail,
            ReceiversContactPerson: formData.AirwayBillData.ReceiversContactPerson,
            ServiceType: formData.AirwayBillData.ServiceType,
            Destination: formData.AirwayBillData.Destination,
          }
          if (selectedAddress.id) {
            data["_id"] = selectedAddress.id
          }
          const res = await mutate(data).unwrap();

        } catch (error) {
          console.error(error);
        }
        setFomNo(3);
      }
    } else if (FormNo === 3) {
      console.log("came here now")
      let errorCheck = validateAirwayBillFormThree(formData.AirwayBillData)
      if (errorCheck.error) {
        message = errorCheck.error.details.length > 0 && errorCheck.error.details[0].message
        message = message.replace(/"/g, '')
        toast.error(message)
      } else if (IsDimension) {
        if (dimension.L === "" || dimension.B === "" || dimension.H === "") {
          toast.error("Please enter Length, Breadth and Height")
        } else {
          handleSubmit()
        }
      }
      else {
        handleSubmit()
      }
    }
  };

  const { Data, setFormData, formData, errors, handleSubmit, handleChange, setData } = useFormSubmission(
    useGetCreateAirwayBillyDataMutation,
    {
      // ...InitialAirwayBilldata,
      AirwayBillData: {
        ...InitialAirwayBilldata.AirwayBillData,
        AccountNo: props.userAuthData.data.data.user.AccountNo,
        ShipmentDimension: dimension.L !== "" && dimension.B !== "" && dimension.H !== "" ? `${dimension.L}x${dimension.B}x${dimension.H}` : ""
      },
      Country: InitialAirwayBilldata.Country,
    }
  );

  const handleChangeDimension = (name, value) => {
    let nam = name;


    if (value === "") {
      toast.error("Please enter " + nam);
    } else {
      // Update the dimension state
      setdimenstion(prevDim => ({
        ...prevDim,
        [name]: value
      }));

      // Wait for the dimension state to update
      setTimeout(() => {
        // Update formData with the new dimensions
        setFormData(prevFormData => ({
          ...prevFormData,
          AirwayBillData: {
            ...prevFormData.AirwayBillData,
            ShipmentDimension: `${dimension.L}x${dimension.B}x${dimension.H}`
          }
        }));
      }, 1);
    }
  };

  console.log("formData", formData, FormNo, Data);

  return (
    <div>
      <form className="font-form ">
        {FormNo === 2 ? (
          <Consignee formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            Data={Data}
            setFormData={setFormData}
            errors={errors}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        ) : FormNo === 3 ? (
          <ShipmentInfo
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            Data={Data}
            setFormData={setFormData}
            handleChangeDimension={handleChangeDimension}
            setisDimension={setisDimension}
            isDimension={IsDimension}
            errors={errors}

          />
        ) : (
          <Shipper formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            Data={Data}
            setFormData={setFormData}
            errors={errors} />
        )}
        <div className="d-flex ">
          {" "}
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
      </form>
    </div>
  );
};

export default AirWayBillGeneration;
