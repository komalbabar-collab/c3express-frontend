import React from "react";
import { Shipment, Consignee } from "../../service/JsxHtmlTemplates";
import useFormSubmission from "../../hooks/useFormSubmission";
import { InitialAirwayBilldata } from "../../service/initialData";
import { useGetCreateAirwayBillyDataMutation } from "../../service/apiServices";

const AirWayBillGeneration = () => {

  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(useGetCreateAirwayBillyDataMutation, { ...InitialAirwayBilldata, Country: InitialAirwayBilldata.Country })
  return (
    <div>
      <form>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Account
            </label>
            <input
              type="text"
              name="AccountNo"
              value={formData.AccountNo}

              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder=" Account"
              readOnly
            />
          </div>
          <div className="col-lg-6 mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Product*
            </label>
            <select
              name="ProductType"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData["ProductType"]}
              className="form-control"
            >
              <option value={"Documents"}>Documents</option>
              <option value={"Parcels"}>Parcels</option>
            </select>
          </div>
          <div className="col-lg-6">
            <h2 className="page-title backgorindd">Shipper</h2>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                name="SendersCompany"
                value={formData.SendersCompany}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Contact Name
              </label>
              <input
                type="text"
                name="SendersContactPerson"
                value={formData.SendersContactPerson}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                name="SendersAddress1"
                value={formData.SendersAddress1}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                name="SendersAddress2"
                value={formData.SendersAddress2}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="SendersCountry"
                value={formData.SendersCountry}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                City
              </label>
              <input
                type="text"
                name="SendersCity"
                value={formData.SendersCity}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Phone
              </label>
              <input
                type="text"
                name="SendersPhone"
                value={formData.SendersPhone}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                name="SendersMobile"
                value={formData.SendersMobile}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="SendersEmail"
                value={formData.SendersEmail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
            <div className="col-lg-12 mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="SendersCountry"
                value={formData.SendersCountry}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" Company Name"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <h2 className="page-title backgorindd">Consignee</h2>
            {Consignee.map((data, index) => (
              <div className="col-lg-12 mb-3">
                <label
                  htmlFor={"exampleInputPassword1" + index}
                  className="form-label"
                  key={index}
                >
                  {data.label}
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder={" " + data.label}
                    name={data.name}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    value={formData[data.name]}

                  />
                </label>
              </div>
            ))}
          </div>
          <div className="col-lg-12">
            <h2 className="page-title backgorindd">Shipment Information</h2>
            <div className="row">
              {Shipment.map((data, index) => {
                if (data.type === "select") {
                  return (<div className="col-lg-6 mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      {data.label}
                    </label>
                    <select className="form-control" name={data.name} onChange={(e) => handleChange(e.target.name, e.target.value)} value={formData[data.name]}>
                      {data.options.map((option, index) => (
                        <option value={option.value} key={index}>{option.label}</option>
                      ))}
                    </select>
                  </div>)
                }
                return (<div className="col-lg-6 mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    {data.label}
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    placeholder={" " + data.label}
                    name={data.name}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    value={formData[data.name]}
                  />
                </div>)
              }


              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ marginRight: "10px", marginLeft: "5px" }}
            >
              Submit
            </button>
            <button
              type="button"

              className="btn btn-danger"
            >
              Reset
            </button>
            {errors.loading ? (<span>{"wait"}</span>) : errors.error ? (<span className="text-danger">{errors.message}</span>) : (<span className="text-success">{errors.message}</span>)}
          </div>

        </div>
      </form>
    </div>
  );
};

export default AirWayBillGeneration;
