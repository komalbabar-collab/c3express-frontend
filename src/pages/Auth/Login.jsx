// Login.js
import React, { useState, useEffect, useRef } from 'react';
import Header from '../../Components/Common/Header';
import Footer from '../../Components/Common/Footer';
import logo from "../../assets/images/logo.png"
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/reducers/UserReducer';
import { useLoginMutation } from '../../service/apiServices';
import Loader from '../../heplers/Loaders/Loader';

function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [Error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await login({ email: formData.email, password: formData.password }).unwrap();
      dispatch(setUserDetails({ access_token: res.data.access_token }));
      if (res.data.first === true) {
        navigate("/ChangePassword");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.data ? err.data.message : err.error);
    }
  };

  return (
    <div>
      {isLoading ? (<Loader />) : (
        <section>
          <div className="contact_page_cover" style={{ height: '100vh' }}>
            <Link to="/">
              <img style={{ width: '120px', padding: '10px', position: 'absolute' }} src={logo} />
            </Link>
            <div className="p-section_head" style={{ paddingTop: '60px' }}>
              <h1>Login</h1>
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
                        Email ID*
                      </label>
                      <input

                        className="form-control"
                        autoComplete="off"
                        defaultValue=""
                        required=""
                        placeholder="Email ID Or Username*"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Password*
                      </label>
                      <input

                        className="form-control mb-4"
                        autoComplete="off"
                        defaultValue=""
                        required=""
                        placeholder="Password*"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {/* <canvas ref={canvasRef}
               width="200"
               height="70">

             </canvas>
             <button id="reload-button" onClick={
               () => initializeCaptcha(
                 canvasRef.current.getContext('2d'))}>
               Reload
             </button>
             <br /> <br />
             <input
               name="userInput"
               id="user_captcha"
               defaultValue=""
               autoComplete="off"
               required=""
               placeholder=" the text shown above *"
               type="text"
               value={formData.userInput}
               onChange={handleChange}

             /> */}
                      {Error && <p>{Error}</p>}
                      <div className="form_submit_btn" style={{ display: 'block' }}>
                        <input style={{ textAlign: 'center' }} name="" defaultValue="Login" type="submit" onClick={handleSubmit} />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export default Login;
