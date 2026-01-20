import React, { useEffect, useRef, useState } from "react";
import { initialUsers } from "../../service/initialData";
import useFormSubmission from "../../hooks/useFormSubmission";
import { usePostServiceTypesDataMutation } from "../../service/apiServices";
const AddServiceType = ({ setIsDelete, changeAvailability, setIsAvailable }) => {

  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(usePostServiceTypesDataMutation, {
    "title": "",
    "value": "",
  }
  )

  useEffect(() => {
    if (errors.error) {
      alert(errors.message)
    }
    else if (Data && !errors.error) {
      setIsDelete(false)
      changeAvailability()
    }
  }, [errors])
  return (
    <div className="p-contact">
      <div className="row clearfix" style={{ justifyContent: "center" }}>
        <div className="col-md-12 col-lg-12 contact_form-adduser">
          <form method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  name="title"
                  value={formData["title"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  defaultValue=""
                  required=""
                  type="text"
                />
              </div>

              <div className="col-lg-6 mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Value
                </label>
                <input
                  name="value"
                  value={formData["value"]}
                  className="form-control"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  autoComplete="off"
                  type="text"
                />
              </div>

            </div>
          </form>
        </div>

        <div className="  text-right p-2 add-the-sub ">
          <div className="d-flex justify-content-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn bg-blue creat-add-btn  m-2 text-capitalize  "
              style={{ borderRadius: "20px", color: 'white' }}
            >
              Create Service Type
            </button>

            <button
              type="button"
              onClick={changeAvailability}
              className="btn  creat-add-btn cancel-shadow the-request m-2 "
              style={{ borderRadius: "20px" }}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>

  );
};
export default AddServiceType;
