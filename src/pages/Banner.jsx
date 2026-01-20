import { useState } from "react";
import banne from "../assets/slow.mp4";
import SingleTracking from "./Tracking/SingleTracking";
import MultipleTracking from "./Tracking/MultipleTracking";
import TrackingDetails from "./Tracking/TrackingDetails";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Banner = (props) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  const [showModal, setShowModal] = useState(false);

  const handleLaunchModal = () => {
    props.userAuthData && props.userAuthData.data && props.userAuthData.data.data.user.dashboard.Pickup_Request ? navigate("/Schedulepickupbooking") : setShowModal(true)

  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();
  const [SingleChange, setSingleChange] = useState(true);
  const [MultipleChange, setMultipleChange] = useState(false);
  return (
    <div>
      <div className="banner_cover">
        <div>
          <div className="banner_item item" id="trackingshipment">
            <video muted autoPlay loop className="img-fluid" style={{ width: '100%' }} src={banne} alt="" />
            <div className="container">
              <div className="banner_content">
                <h3>welcome to</h3>
                <h2>c3x couriers</h2>
                <h3>COURIER, CARGO &amp; CUSTOMER  Care—Now 3X Better!</h3>
                <div className="round-cornner_cs3 mt-lg-5">
                  {SingleChange && <SingleTracking />}
                  {MultipleChange && <MultipleTracking />}

                  {SingleChange ? (
                    <div className="form-inline for_form1 col-md-12 text-left" style={{ paddingBottom: '30px' }}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSingleChange(false);
                          setMultipleChange(true);
                        }}
                        className="multiple-link-awb"
                        id="trackform-label1"
                      >
                        Multiple tracking numbers{" "}
                      </a>
                    </div>
                  ) : (
                    <div className="form-inline for_form1 col-md-12 text-left" style={{ paddingBottom: '30px' }}>
                      <a
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setSingleChange(true);
                          setMultipleChange(false);
                        }}
                        className="multiple-link-awb"
                        id="trackform-label1"
                      >
                        Single tracking number{" "}
                      </a>
                    </div>
                  )}
                </div>
                <div className="text-center mtrsp-30">
                  <button
                    onClick={() => navigate("/Ratefinder")}
                    type="button "
                    className="btn btn-tracking bg-blue text-center pr-3 pl-3 mt-2"
                  >
                    Rates and Transit Time
                  </button>
                  <button
                    type="button "
                    className="btn btn-tracking bg-blue text-center pr-3 pl-3 mt-2"
                    onClick={handleLaunchModal}
                  >
                    Book a shipment
                  </button>
                  {/* {isPopupOpen && (
                    <div className="popup-box text-center">
                      <button
                        type="button"
                        className="btn btn-tracking bg-blue pr-3 pl-3 mt-2 " 
                      >
                        <Link to="/Bookshipment"style={{color:"white"}} > Sign in as Guest</Link>
                      </button>

                      <div className="p-2">OR</div>
                      <button
                        type="button"
                        className="btn btn-tracking bg-blue pr-3 pl-3 mt-2"
                        style={{ color: "white", borderRadius: "22px" }}
                      >
                        Sign up for New Account
                      </button>
                      <span className="close" onClick={closePopup}>
                        &times;
                      </span>
                    </div>
                  )} */}
                  <div>
                    {showModal && (
                      <div
                        className="modal fade show"
                        tabIndex={-1}
                        role="dialog"
                        style={{ display: "block" }}
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-body" style={{ padding: '30px' }}>
                              <button
                                type="button"
                                className="close"
                                onClick={handleCloseModal}
                                aria-label="Close" style={{ border: "none", backgroundColor: "white" }}
                              >
                                <span aria-hidden="true">×</span>
                              </button>
                              <button
                                type="button"
                                className="btn btn-tracking bg-blue pr-3 pl-3 mt-2 "
                              >
                                <Link
                                  to="/Bookshipment"
                                  style={{ color: "white" }}
                                >
                                  {" "}
                                  Sign in as Guest
                                </Link>
                              </button>

                              <div className="p-2">OR</div>
                              <button
                                onClick={() => navigate("/Register")}
                                type="button"
                                className="btn btn-tracking bg-blue pr-3 pl-3 mt-2"
                                style={{ color: "white", borderRadius: "22px" }}
                              >
                                Sign up for New Account
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrackingDetails />
    </div>
  );
};

export default Banner;
