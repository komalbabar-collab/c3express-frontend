import React, { useEffect } from "react";
import { Consignee } from "../../../service/JsxHtmlTemplates";
import {
  useGetUserServiceTypesDataQuery,
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "../../../service/apiServices";
import useFormSubmission from "../../../hooks/useFormSubmission";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useHadleChangeBookingDataPhoneNo } from "../../../hooks/useHadleChangePhoneNo";
import SavedReciversAddessress from "../../../Components/ManageAddrees/SavedReciversAddessress";
const ScheduleConsignee = ({
  formData,
  handleChange,
  setFormData,
  Countryquery,
  setCountryquery,
  selectedAddress, setSelectedAddress
}) => {
  const ActiveServicetypes = useGetUserServiceTypesDataQuery();
  const onChangeData = (e) => {
    const { name, value, id } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      BookingData: {
        ...prevData.BookingData,
        [name]: value,
      },
    }));
  };
  const { data, error, isLoading, refetch } =
    useGetCountryMasterQuery(Countryquery);
  const Data = data;
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData.BookingData.ReceiversCountry,
  });
  useEffect(() => {
    if (formData.BookingData.ReceiversCountry) {
      CityHandle.setFormData({
        Country: formData.BookingData.ReceiversCountry,
      });
    }
  }, [formData.BookingData.ReceiversCountry]);
  useEffect(() => {
    CityHandle.formData.ReceiversCountry &&
      CityHandle.handleSubmit(CityHandle.formData);
    !CityHandle.formData.ReceiversCountry &&
      CityHandle.handleSubmit(CityHandle.formData);
  }, [CityHandle.formData]);
  const handleKeyDown = (e) => {
    // Disable keyboard arrows for number inputs
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  const handleWheel = (e) => {
    // Disable mouse wheel for number inputs
    e.target.blur();
  };
  const { handleChangePhoneNo } = useHadleChangeBookingDataPhoneNo(
    setFormData,
    "BookingData"
  );

  return (
    <>
      <SavedReciversAddessress setFormData={setFormData} formData={formData}
        selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />

      <div className="row  d-flex justify-content-center ">
        <div className="row col-lg-9 shipping-form ">
          <div className="col-lg-12 ">
            <h2
              className="page-title backgorindd text-center"
              style={{ fontSize: "24px" }}
            >
              Recievers Details
            </h2>
          </div>
          <div className="row d-flex justify-content-center ">
            <div className="col-lg-6 mb-3">
              <input
                type={"text"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"Recievers Name/Receivers Company"}
                name={"ReceiversContactPerson"}
                value={formData["BookingData"]["ReceiversContactPerson"]}
                onChange={(e) => {
                  onChangeData(e);
                  handleChangePhoneNo("ReceiversCompany", e.target.value);

                }}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type={"text"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"Address Line 1"}
                name={"ReceiversAddress1"}
                value={formData["BookingData"]["ReceiversAddress1"]}
                onChange={(e) => {
                  onChangeData(e);
                }}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type={"text"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"Address Line 2"}
                name={"ReceiversAddress2"}
                value={formData["BookingData"]["ReceiversAddress2"]}
                onChange={(e) => { onChangeData(e); }}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <PhoneInput
                countryCallingCodeEditable={false}
                defaultCountry={formData["BookingData"]["ReceiversCountry"]}
                international
                placeholder={"Telephone Number"}
                name={"ReceiversPhone"}
                onChange={(v) => handleChangePhoneNo("ReceiversPhone", v)}
                value={formData["BookingData"]["ReceiversPhone"]}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <PhoneInput
                countryCallingCodeEditable={false}
                defaultCountry={formData["BookingData"]["ReceiversCountry"]}
                international
                placeholder={"Mobile No"}
                name={"ReceiversMobile"}
                onChange={(v) => handleChangePhoneNo("ReceiversMobile", v)}
                value={formData["BookingData"]["ReceiversMobile"]}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="ReceiversCountry"
                onChange={onChangeData}
                value={formData["BookingData"]["ReceiversCountry"]}
                className="form-control"
              >
                <option value={""}>Select Country</option>
                {!isLoading &&
                  Data && Data.data.CountryListLocation && Data.data.CountryListLocation.length > 0 ? Data.data.CountryListLocation.map((data, index) => (
                    <option value={data.CountryCode}>{data.CountryName}</option>
                  )) : <option value={""}>No Country Found</option>}
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="ReceiversCity"
                onChange={(e) => {
                  onChangeData(e)
                  const selectedOption = e.target.options[e.target.selectedIndex]
                  const selectedId = selectedOption.getAttribute("id");
                  handleChangePhoneNo("Destination", selectedId)
                }}
                value={formData["BookingData"]["ReceiversCity"]}
                className="form-control"
              >
                <option value={""}>Select City</option>
                {!CityHandle.errors.loading &&
                  CityHandle.Data && CityHandle.Data.CityListLocation && CityHandle.Data.CityListLocation.length > 0 ?
                  CityHandle.Data.CityListLocation.map((item, index) => (
                    <option value={item.CityName} id={item.CityCode}>{item.CityName}</option>
                  )) : <option value={""}>No City Found</option>}
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <select
                name="ServiceType"
                onChange={onChangeData}
                value={formData["BookingData"]["ServiceType"]}
                className="form-control"
                defaultValue={"Select Service Type"}
              >
                <option value="Select Service Type" >Select Service Type</option>
                {ActiveServicetypes.data && ActiveServicetypes.data.data.ServiceType && ActiveServicetypes.data.data.ServiceType.length > 0 ? ActiveServicetypes.data.data.ServiceType.filter(item => formData["BookingData"]["ProductType"] === "DOX" ? item.value === "COD" === false : true).map((item, index) => {
                  return <option value={item.value}>{item.title}</option>;
                }) : <option> No Options Available</option>}
              </select>
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type={"email"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"Email"}
                name={"ReceiversEmail"}
                value={formData["BookingData"]["ReceiversEmail"]}
                onChange={(e) => { onChangeData(e); }}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type={"text"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder={"Pin Code / Zip Code"}
                name={"ReceiversPinCode"}
                value={formData["BookingData"]["ReceiversPinCode"]}
                onChange={(e) => { onChangeData(e); }}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleConsignee;
