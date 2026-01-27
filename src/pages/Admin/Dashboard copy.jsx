import "./Dashboard.css";
import ReactDatePicker from "react-datepicker";
import DoughnutChart from "./ChartComponent/Doghounut";
import BarChart from "./ChartComponent/BarChart";
import {
  usePostAccountDayWiseShipmentsMutation,
  usePostPickupSummaryForAccountsMutation,
  usePostDeliveryDetailsForAccountsMutation,
  usePostDailyPickupDetailsForAccountssMutation
} from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import { useEffect, useState } from "react";
import moment from "moment";
import { ValidateDate, todaydate, nextday } from "../../service/datevalidator";
import { useMemo } from "react";
import Loader from "../../heplers/Loaders/Loader"
import ErrorComponent from "../../heplers/ErrorComponent"
import { useSelector } from "react-redux";
import PrepadAccountStatusLeftMoney from "../../Components/Common/PrepadAccountStatusLeftMoney";
const Dashboard = () => {
  const userData = useSelector((state) => state.UserReducer);
  const AccountDayWiseShipments =
    useFormSubmission(usePostAccountDayWiseShipmentsMutation, {
      "Country": "AE",
      "FromDate": todaydate(),
      "ToDate": nextday(),
      "AccountCode": userData.data && userData.data.data.user.AccountNo
    },);
  const PickupSummaryForAccounts =
    useFormSubmission(usePostPickupSummaryForAccountsMutation, {
      "Country": "AE",
      "FromDate": todaydate(),
      "ToDate": nextday(),
      "AccountCode": userData.data && userData.data.data.user.AccountNo
    },);
  const DeliveryDetailsForAccounts =
    useFormSubmission(usePostDeliveryDetailsForAccountsMutation, {
      "Country": "AE",
      "FromDate": todaydate(),
      "ToDate": nextday(),
      "AccountCode": userData.data && userData.data.data.user.AccountNo
    },);
  const DailyPickupDetailsForAccounts =
    useFormSubmission(usePostDailyPickupDetailsForAccountssMutation, {
      "Country": "AE",
      "FromDate": todaydate(),
      "ToDate": nextday(),
      "AccountCode": userData.data && userData.data.data.user.AccountNo
    },);

  const handleChange = (event) => {
    const { name, value } = event.target;
    AccountDayWiseShipments.setFormData(prev => ({ ...prev, [name]: value }));
    PickupSummaryForAccounts.setFormData(prev => ({ ...prev, [name]: value }));
    DeliveryDetailsForAccounts.setFormData(prev => ({ ...prev, [name]: value }));
    DailyPickupDetailsForAccounts.setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    if (AccountDayWiseShipments.formData.AccountCode) {
      AccountDayWiseShipments.handleSubmit()
      PickupSummaryForAccounts.handleSubmit()
      DeliveryDetailsForAccounts.handleSubmit()
      DailyPickupDetailsForAccounts.handleSubmit()
    } else {
      alert("Please enter Account No")
    }
  }
  //   APi's 
  const [AccountCode, setAccountCode] = useState(userData.data && userData.data.data.user.AccountNo)
  useEffect(() => {

    AccountDayWiseShipments.setFormData(prev => ({ ...prev, AccountCode: userData.data && userData.data.data.user.AccountNo }));
    PickupSummaryForAccounts.setFormData(prev => ({ ...prev, AccountCode: userData.data && userData.data.data.user.AccountNo }));
    DeliveryDetailsForAccounts.setFormData(prev => ({ ...prev, AccountCode: userData.data && userData.data.data.user.AccountNo }));
    DailyPickupDetailsForAccounts.setFormData(prev => ({ ...prev, AccountCode: userData.data && userData.data.data.user.AccountNo }));
    setAccountCode(userData.data && userData.data.data.user.AccountNo)

  }, [userData])
  useEffect(() => {
    if (AccountDayWiseShipments.formData.AccountCode) {
      AccountDayWiseShipments.handleSubmit()
      PickupSummaryForAccounts.handleSubmit()
      DeliveryDetailsForAccounts.handleSubmit()
      DailyPickupDetailsForAccounts.handleSubmit()
    }
  }, [userData, AccountCode])

  const data = useMemo(() => {
    let DeliverdShipments = 0, NonDelivered = 0, Returned = 0
    if (DeliveryDetailsForAccounts.Data && DeliveryDetailsForAccounts.Data.JasonString) {
      DeliveryDetailsForAccounts.Data.JasonString.length > 0 ? DeliveryDetailsForAccounts.Data.JasonString.map((item) => {
        DeliverdShipments += item.DeliverdShipments
        NonDelivered += item.NonDelivered
        Returned += item.Returned
      }) :
        [DeliverdShipments, NonDelivered, Returned]
    }
    return [DeliverdShipments, NonDelivered, Returned]
  }, [DeliveryDetailsForAccounts.Data, DeliveryDetailsForAccounts.Data])
  const pickedupudata = useMemo(() => {
    let Booking = 0, PickedpUp = 0, Pending = 0
    if (PickupSummaryForAccounts.Data && PickupSummaryForAccounts.Data.JasonString) {
      PickupSummaryForAccounts.Data.JasonString.length > 0 ? PickupSummaryForAccounts.Data.JasonString.map((item) => {
        Booking += item.Booking
        PickedpUp += item.Completed
        Pending += item.Pending
      }) :
        [Booking, PickedpUp, Pending]
    }
    return [Booking, PickedpUp, Pending]
  }, [PickupSummaryForAccounts.Data, PickupSummaryForAccounts.Data])


  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  console.log(AccountDayWiseShipments.formData)

  if (AccountDayWiseShipments.errors && AccountDayWiseShipments.errors.loading) {
    return <Loader />
  }
  else {
    return (
      <>
        <main id="content" role="main">
          <div className="main-content">
            <div className="container-fluid">
              <div className="card customcss">
                <div className="card-body">
                  <div className="row mb-4">
                    <div>
                      <div className="row dashboard-head m-0 d-flex mb-2 ">
                        <div
                          className="col-lg-3 ds-head"
                          style={{ color: "black" }}
                        >
                          <h5 style={{ color: " #2ca2c6" }}>
                            Dashboard{" "}
                            <svg
                              width={8}
                              height={6}
                              viewBox="0 0 8 6"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L3.21411 3.21411L1.16982 5.29609"
                                stroke="#DC6C09"
                                strokeLinecap="round"
                              />
                              <path
                                d="M4.66797 1L6.88208 3.21411L4.83779 5.29609"
                                stroke="#DC6C09"
                                strokeLinecap="round"
                              />
                            </svg>
                          </h5>
                          <h3 style={{ color: "black" }}>Summary Analytics</h3>
                        </div>
                        <div className="col-lg-9 date-filter">
                          <div className="row">
                            <div className="col-lg-3 text-center mt-4">
                              <h3
                                style={{
                                  fontSize: "16px",
                                  color: "#024CA7",
                                  fontWeight: 600,
                                }}
                              >
                                <svg
                                  width={26}
                                  height={22}
                                  viewBox="0 0 26 22"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.632812"
                                    y="17.2316"
                                    width="24.5492"
                                    height="1.5"
                                    fill="#024CA7"
                                  />
                                  <rect
                                    x="0.632812"
                                    y="3.21021"
                                    width="24.5492"
                                    height="1.5"
                                    fill="#024CA7"
                                  />
                                  <rect
                                    x="0.632812"
                                    y="9.98328"
                                    width="24.5492"
                                    height="1.5"
                                    fill="#024CA7"
                                  />
                                  <circle
                                    cx="18.1709"
                                    cy="3.96019"
                                    r="2.82713"
                                    fill="#024CA7"
                                    stroke="white"
                                  />
                                  <circle
                                    cx="7.83299"
                                    cy="10.7333"
                                    r="2.82713"
                                    fill="#024CA7"
                                    stroke="white"
                                  />
                                  <circle
                                    cx="18.1709"
                                    cy="17.9816"
                                    r="2.82713"
                                    fill="#024CA7"
                                    stroke="white"
                                  />
                                </svg>{" "}
                                Date Filter
                              </h3>
                            </div>
                            <div className="col-lg-9 date-main ">
                              <form
                                className="form-date-filter d-flex p-2"
                                id="dashboardFliter"
                                method="POST"
                                style={{
                                  boxShadow: "4px 4px 21px rgba(76,64,247,.2)",
                                  borderRadius: "10px",
                                }}
                              >
                                <div>
                                  <label
                                    htmlFor="from-date"
                                    className="w-50 p-1"
                                    style={{ fontSize: "13px" }}
                                  >
                                    From Date
                                  </label>
                                  {/* <input
                                    type="date"
                                    onKeyDown={(e) => e.preventDefault()}
                                    id="from-date"
                                    style={{
                                      marginRight: "5px",
                                      border: "none",
                                      width: "80%",
                                    }}
                                    name="FromDate"
                                    value={AccountDayWiseShipments.formData.FromDate}
                                    onChange={handleChange}
                                  />
                                   */}

                                  <ReactDatePicker
                                    name="FromDate"
                                    value={AccountDayWiseShipments.formData.FromDate}
                                    onChange={(e) => {
                                      AccountDayWiseShipments.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      PickupSummaryForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      DeliveryDetailsForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      DailyPickupDetailsForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                    }}
                                    className="form-control"
                                    id="from-date"
                                    onKeyDown={(e) => e.preventDefault()}
                                    maxDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    showYearDropdown
                                    showMonthDropdown
                                    dropdownMode="select"
                                    showIcon
                                    filterDate={isWeekday}
                                  />
                                </div>
                                <div className="">
                                  <label
                                    htmlFor="to-date"
                                    className="w-100 p-1 ml-1"
                                    style={{ fontSize: "13px" }}
                                  >
                                    To Date
                                  </label>
                                  {/* <input
                                    type="date"
                                    onKeyDown={(e) => e.preventDefault()}
                                    id="to-date"
                                    name="ToDate"
                                    value={AccountDayWiseShipments.formData.ToDate}
                                    onChange={handleChange}
                                    style={{
                                      marginRight: "3px",
                                      border: "none",
                                      width: "80%",
                                    }}

                                  /> */}

                                  <ReactDatePicker
                                    name="ToDate"
                                    value={AccountDayWiseShipments.formData.ToDate}
                                    onChange={(e) => {
                                      AccountDayWiseShipments.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      PickupSummaryForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      DeliveryDetailsForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                      DailyPickupDetailsForAccounts.setFormData(prev => ({ ...prev, ["FromDate"]: moment(e).format("YYYY-MM-DD") }));
                                    }}
                                    className="form-control"
                                    onKeyDown={(e) => e.preventDefault()}
                                    maxDate={new Date()}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Select Date"
                                    showYearDropdown
                                    showMonthDropdown
                                    dropdownMode="select"
                                    showIcon
                                    filterDate={isWeekday}
                                    minDate={AccountDayWiseShipments.formData.FromDate}
                                  />
                                </div>

                                {
                                  userData.data && userData.data.data.user.Role === "Admin" && <div className="">
                                    <label
                                      htmlFor="to-date"
                                      className="w-100 p-1 ml-1"
                                      style={{ fontSize: "13px" }}
                                    >
                                      Account No
                                    </label>
                                    <input
                                      type="text"
                                      id="to-date"
                                      name="AccountCode"
                                      value={AccountDayWiseShipments.formData.AccountCode}
                                      onChange={handleChange}
                                      style={{
                                        marginRight: "3px",
                                        border: "none",
                                        width: "80%",
                                      }}

                                    />
                                  </div>
                                }

                                <button
                                  type="button"
                                  onClick={handleSubmit}
                                  className="go-cn"
                                  style={{ marginLeft: '-3px', borderRadius: '9px', backgroundColor: 'rgb(44, 162, 198)', color: 'white', border: 'none', padding: '0px 15px', height: '40px', marginTop: '6px' }}
                                >
                                  Submit</button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <PrepadAccountStatusLeftMoney />
                  <hr className=" mb-4" style={{ color: "#2ca2c6" }} />
                  {AccountDayWiseShipments.errors.error && AccountDayWiseShipments.errors.message ? <ErrorComponent message={AccountDayWiseShipments.errors.message} />

                    : <>
                      <div className="row mt-4">
                        <div className="col-xl-3 col-lg-3">
                          <div
                            className="card tilebox-one"
                            style={{
                              boxShadow: "4px 4px 21px rgba(76,64,247,.2)",
                              borderRadius: "10px",
                              border: "1px solid white",
                            }}
                          >
                            <div className="card-body">
                              <i
                                className="fa fa-truck"
                                aria-hidden="true"
                                style={{ color: "orange" }}
                              ></i>

                              <h6 className="text-uppercase mt-0">Total Shipments</h6>
                              <h2 className="my-2" id="active-users-count">
                                {data[0] + data[1] + data[2]}
                              </h2>
                              {/* <hr style={{ color: "#2ca2c6" }} /> */}
                              {/* <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                  ></i>
                                  5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                              </p> */}
                            </div>{" "}
                            {/* end card-body*/}
                          </div>
                          <div className="row">
                            <div className="col-lg-5"></div>
                            <div className="col-lg-7"></div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                          <div
                            className="card tilebox-one"
                            style={{
                              boxShadow: "4px 4px 21px rgba(76,64,247,.2)",
                              borderRadius: "10px",
                              border: "1px solid white",
                            }}
                          >
                            <div className="card-body">
                              <i
                                className="fa fa-suitcase"
                                aria-hidden="true"
                                style={{ color: "#034DA8" }}
                              ></i>

                              <h6 className="text-uppercase mt-0">Total Pickups</h6>
                              <h2 className="my-2" id="active-users-count">
                                {pickedupudata[0]}
                              </h2>
                              {/* <hr style={{ color: "#2ca2c6" }} /> */}
                              {/* <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                  ></i>
                                  5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                              </p> */}
                            </div>{" "}
                            {/* end card-body*/}
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                          <div
                            className="card tilebox-one"
                            style={{
                              boxShadow: "4px 4px 21px rgba(76,64,247,.2)",
                              borderRadius: "10px",
                              border: "1px solid white",
                            }}
                          >
                            <div className="card-body">
                              <i
                                className="fa fa-truck"
                                aria-hidden="true"
                                style={{ color: "orange" }}
                              ></i>

                              <h6 className="text-uppercase mt-0">Shipment Status</h6>
                              {data && data.length > 0 && data.map((item, index) => (
                                <>
                                  <span>{index === 0 ? "Delivered" : index === 1 ? "Pending" : "Returned"} {item}</span>
                                  <br />
                                </>
                              ))}
                              {/* <hr style={{ color: "#2ca2c6" }} />
                              <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                  ></i>
                                  5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                              </p> */}
                            </div>{" "}
                            {/* end card-body*/}
                          </div>
                          <div className="row">
                            <div className="col-lg-5"></div>
                            <div className="col-lg-7"></div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3">
                          <div
                            className="card tilebox-one"
                            style={{
                              boxShadow: "4px 4px 21px rgba(76,64,247,.2)",
                              borderRadius: "10px",
                              border: "1px solid white",
                            }}
                          >
                            <div className="card-body">
                              <i
                                className="fa fa-suitcase"
                                aria-hidden="true"
                                style={{ color: "#034DA8" }}
                              ></i>

                              <h6 className="text-uppercase mt-0">Pickup Status</h6>

                              {pickedupudata && pickedupudata.length > 0 && pickedupudata.map((item, index) => (
                                <>
                                  <span>{index === 0 ? "Booking" : index === 1 ? "Completed" : "Pending"} {item}</span>
                                  <br />
                                </>
                              ))}

                              {/* <hr style={{ color: "#2ca2c6" }} />
                              <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                  <i
                                    className="fa fa-level-up"
                                    aria-hidden="true"
                                  ></i>
                                  5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                              </p> */}
                            </div>{" "}
                            {/* end card-body*/}
                          </div>
                        </div>
                        <div className=" first-graph mt-5">
                          <div className="row">

                            <div className="col-md-6">
                              <div className="graph text-center">

                                <DoughnutChart data={pickedupudata} labels={['Booking', 'PickedpUp', 'Pending']} />
                                <div className="text-center">
                                  {" "}
                                  Pick Up  status
                                </div>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="graph text-center">
                                <DoughnutChart data={data} labels={['Delivered', 'Not Delivered', 'Returned']} />

                                <div className="text-center">
                                  {" "}
                                  Delivered shipment status
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        <div className=" first-graph mt-4">
                          <div className="row">
                            <div className="col-md-6">

                              <div className="graph">
                                <h5 style={{ color: " #2ca2c6" }}>
                                  {DailyPickupDetailsForAccounts.Data && DailyPickupDetailsForAccounts.Data.JasonString && DailyPickupDetailsForAccounts.Data.JasonString.length > 0 && <BarChart data={DailyPickupDetailsForAccounts.Data && DailyPickupDetailsForAccounts.Data.JasonString} isValue={"DailyPickupDetailsForAccounts"} />}

                                  <div className="text-center">
                                    {" "}
                                    Pick Up  shipment status
                                  </div>
                                </h5>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="graph">
                                <h5 style={{ color: " #2ca2c6" }}>
                                  {AccountDayWiseShipments.Data && AccountDayWiseShipments.Data.JasonString && AccountDayWiseShipments.Data.JasonString.length > 0 && <BarChart data={AccountDayWiseShipments.Data.JasonString} isValue={"AccountDayWiseShipments"} />}
                                  <div className="text-center">
                                    {" "}
                                    Delivered shipment status
                                  </div>
                                </h5>
                              </div>
                            </div>


                          </div>
                        </div>

                      </div>
                    </>}

                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

};

export default Dashboard;
