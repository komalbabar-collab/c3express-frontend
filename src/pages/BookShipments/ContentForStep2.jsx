import { useEffect, useState } from "react";
import {
  useGetCountryMasterQuery,
  usePostCityListMutation,
} from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useHadleChangeBookingDataPhoneNo } from "../../hooks/useHadleChangePhoneNo";

export default function ContentForStep2({
  SchadulePickupProps,
  onChangeData,
  ShipmentType,
  handleChangeData
}) {
  const [value, setValue] = useState()
  const { setFormData, formData } =
    SchadulePickupProps;
  const [Country, setCountry] = useState(
    formData.BookingData.ShipmentType === "dom" ? "AE" : ""
  );
  const CountryMaster = useGetCountryMasterQuery(Country);
  const CityHandle = useFormSubmission(usePostCityListMutation, {
    Country: formData["BookingData"]["SendersCountry"],
  });
  useEffect(() => {
    if (formData.BookingData.SendersCountry) {
      CityHandle.setFormData({
        Country: formData["BookingData"]["SendersCountry"],
      });
    }
  }, [formData["BookingData"]["SendersCountry"]]);
  useEffect(() => {
    CityHandle.handleSubmit(CityHandle.formData);
  }, [CityHandle.formData]);

  const { handleChangePhoneNo } = useHadleChangeBookingDataPhoneNo(setFormData, "BookingData")
  return (
    <div className="location-form mt-5 ">
      <h4
        className=" text-center"
        style={{ color: "#28337A", fontWeight: "600" }}
      >
        Enter Pickup Location
      </h4>
      {/* Content for Step 2 */}
      <form className="mb-3">
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Pickup Address Details:</label>
            <input
              placeholder="Appartment Number and Building Name"
              type="text"
              name="SendersAddress1"
              value={formData["BookingData"]["SendersAddress1"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Area</label>
            <input
              placeholder="Enter Area"
              type="text"
              name="SendersAddress2"
              value={formData["BookingData"]["SendersAddress2"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Building/Landmark</label>
            <input
              placeholder="Enter Landmark"
              type="text"
              name="SendersAddress3"
              value={formData["BookingData"]["SendersAddress3"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Your Name</label>
            <input
              placeholder="Enter Name"
              type="text"
              name="SendersContactPerson"
              value={formData["BookingData"]["SendersContactPerson"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
                handleChangeData("SendersCompany", e.target.value)
                handleChangeData("BookingCompanyName", e.target.value)
              }}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Mobile Number</label>
            <PhoneInput
              countryCallingCodeEditable={false}
              international
              placeholder="Sender Mobile Number"
              defaultCountry="AE"
              name="SendersMobile"
              value={formData["BookingData"]["SendersMobile"]}
              onChange={(v) => {
                handleChangePhoneNo("SendersMobile", v)
                handleChangePhoneNo("BookingMobileNo", v)
                handleChangePhoneNo("BookingPhoneNo", v)
                handleChangePhoneNo("SendersPhone", v)

              }} />
            {/* <input
              placeholder="Sender Mobile Number"
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
              name="SendersMobileNo"
              value={formData["BookingData"]["SendersMobileNo"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            /> */}
          </div>
          <div className="m-2">
            <label style={{ fontWeight: "600" }}>Your Email address</label>
            <input
              name="SendersEmail"
              value={formData["BookingData"]["SendersEmail"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
              placeholder="Enter Email"
              type="text"
              className="form-control"
              style={{
                fontSize: "14px",
                width: "100%",
                border: "none",
                borderBottom: "1px solid grey",
              }}
            />
          </div>
        </div>
        <div className="d-flex" style={{ justifyContent: "space-between" }}>

          <div className="m-2 ">
            <div >
              <label style={{ fontWeight: "600" }}>Country</label>
            </div>
            <select
              className="thirststep m-2"
              style={{
                border: "none",
                width: "17  0px",
                width: "175px",
                borderBottom: "1px solid grey",
              }}
              name="SendersCountry"
              value={formData["BookingData"]["SendersCountry"]}
              onChange={(e) => {
                onChangeData(e)
                handleChangeData(e.target.name.replace("Senders", "Booking"), e.target.value)
              }}
            >
              <option value={""}>Select Country</option>
              {!CountryMaster.isLoading &&
                CountryMaster.data &&
                CountryMaster.data.data.CountryListLocation &&
                CountryMaster.data.data.CountryListLocation.length > 0 ? (
                CountryMaster.data.data.CountryListLocation.map(
                  (item, index) => (
                    <option value={item.CountryCode}>{item.CountryName}</option>
                  )
                )
              ) : (
                <option value={""}>{"No Options Available"}</option>
              )}
            </select>
          </div>
          <div className="m-2 ">
            <div style={{ marginLeft: "9px" }}>
              <label style={{ fontWeight: "600" }}>City</label>
            </div>
            <select
              name="SendersCity"
              value={formData["BookingData"]["SendersCity"]}
              onChange={(e) => {
                onChangeData(e)
                const selectedOption = e.target.options[e.target.selectedIndex]
                const selectedId = selectedOption.getAttribute("id");
                handleChangeData("Origin", selectedId)
                handleChangeData(e.target.name.replace("Senders", "Booking"), selectedId)
              }}
              className="thirststep "
              style={{
                border: "none",
                width: "185px",
                border: "none",
                borderBottom: "1px solid grey",
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
          </div>
        </div>

      </form>
    </div>
  );
}
