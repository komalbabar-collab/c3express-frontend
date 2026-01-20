// Register.js
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/reducers/UserReducer';
import { toast } from 'react-toastify';
import { useChangePasswordMutation, useGetCountryMasterQuery, usePostCityListMutation, useRegisterMutation } from '../../service/apiServices';
import useFormSubmission from '../../hooks/useFormSubmission';

function ChangePassword() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const CountryMaster = useGetCountryMasterQuery("");

  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(useChangePasswordMutation, {
    oldPassword: "", newPassword: ""
  })
  useEffect(() => {
    if (errors.error) {
      toast.error(errors.message)
    } else if (Data) {
      toast.success("Password Changed Successfully")
      navigate("/dashboard")
    }
  }, [errors, Data])

  return (
    <>
      <Header />
      <div>
        <section>
          <div className="contact_page_cover" style={{ paddingTop: "140px" }}>
            <div className="p-section_head" style={{ paddingTop: '60px' }}>
              <h1>Change Password</h1>
            </div>
            <div className="container p-content_section p-contact">
              <div className="row clearfix" style={{ justifyContent: 'center' }}>
                <div className="col-md-6 col-lg-6 contact_form">
                  <form
                    method="post"
                    onSubmit={handleSubmit}
                  >
                    <div className="footer_form_outer">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Old Password
                      </label>
                      <input
                        autoComplete="off"
                        defaultValue=""
                        required=""
                        placeholder="Old Password*"
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className="form-control"
                      />
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        New Password
                      </label>
                      <input
                        autoComplete="off"
                        defaultValue=""
                        required=""
                        placeholder="Confirm Password*"
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className="form-control"
                      />
                      <div className="form_submit_btn" style={{ display: 'block' }}>
                        <input style={{ textAlign: 'center' }} defaultValue={"Update Password"} type="button" onClick={handleSubmit} />
                      </div>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default ChangePassword;
