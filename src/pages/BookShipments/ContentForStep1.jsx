import { useEffect } from "react";

export default function ContentForStep1({ SchadulePickupProps, onChangeData }) {
  const {  formData, } =
    SchadulePickupProps;

  return (
    <>

      <div>
        {/* Content for Step 1 */}
        <div className="container d-flex justify-content-center mt-5 ">
          <form className="form1">
            <div style={{ fontSize: "21px", color: "#28337A" }}>
              Choose the Type of Package
            </div>
            <label
              className=" d-flex "
              style={{ justifyContent: "space-between", fontSize: "18px" }}
            >
              <div className="box1 p-4 m-2">
                <input
                  type="radio"
                  checked={
                    formData["BookingData"]["ProductType"] === "DOX"
                      ? true
                      : false
                  }
                  id="Domestic"
                  name="ProductType"
                  onChange={onChangeData}
                  value={"DOX"}
                  className="m-2 firstfield "
                />
                <span className="checkmark"></span>
                <label for="Documents">
                  <i className="m-2">
                    <img src="https://firstflightme.com/wp-content/themes/first-flight/images/002-files.png" />
                  </i>
                  Documents
                </label>
              </div>
              <div className=" box1 p-4 m-2">
                <input
                  type="radio"
                  checked={
                    formData["BookingData"]["ProductType"] === "XPS"
                      ? true
                      : false
                  }
                  id="Parcels"
                  name="ProductType"
                  onChange={onChangeData}
                  value={"XPS"}
                  class=" firstfield m-2"
                />
                <span class="checkmark"></span>
                <label
                  for="
                "
                >
                  <i className="m-2">
                    <img src="https://firstflightme.com/wp-content/themes/first-flight/images/001-parcel.png" />
                  </i>
                  Parcels
                </label>
              </div>
            </label>
            <br />

            <div style={{ fontSize: "21px", color: "#28337A" }}>
              Select Delivery Option
            </div>
            <label
              className="d-flex"
              style={{ justifyContent: "space-between", fontSize: "18px" }}
            >
              <div className="p-2 m-2">
                <input type="radio" className="m-2"

                  checked={
                    formData["BookingData"]["ShipmentType"] === "dom"
                      ? true
                      : false
                  }
                  id="Parcels"
                  name="ShipmentType"
                  onChange={onChangeData}
                  value={"dom"} />

                <label for="Documents">Domestic</label>
              </div>
              <div
                className="p-2 m-2"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <input type="radio" className="m-2"

                  checked={
                    formData["BookingData"]["ShipmentType"] === "inter"
                      ? true
                      : false
                  }
                  id="Parcels"
                  name="ShipmentType"
                  onChange={onChangeData}
                  value={"inter"} />


                <label for="Documents">International</label>
              </div>
            </label>
          </form>
        </div>
      </div>
    </>
  );
}
