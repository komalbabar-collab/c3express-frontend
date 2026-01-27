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
                  {/* part 1 */}
                  <div className="dashboard-header-card mb-4">
                    <div className="row g-3 align-items-center">

                      <div className="col-12 col-lg-4">
                        <div className="dashboard-title">
                          <span className="breadcrumb-text">
                            Dashboard
                            <svg width="10" height="8" viewBox="0 0 8 6" className="mx-1">
                              <path d="M1 1L3.21411 3.21411L1.16982 5.29609" stroke="#DC6C09" strokeLinecap="round" />
                              <path d="M4.66797 1L6.88208 3.21411L4.83779 5.29609" stroke="#DC6C09" strokeLinecap="round" />
                            </svg>
                          </span>
                          <h3 className="mb-0">Summary Analytics</h3>
                        </div>
                      </div>

                      <div className="col-12 col-lg-8">
                        <form className="row g-2 align-items-end dashboard-filter">

                          <div className="col-12 col-sm-6 col-md-3">
                            <label>From</label>
                            <ReactDatePicker
                              className="form-control"
                              value={AccountDayWiseShipments.formData.FromDate}
                              onChange={(e) => {
                                const date = moment(e).format("YYYY-MM-DD");
                                AccountDayWiseShipments.setFormData(p => ({ ...p, FromDate: date }));
                                PickupSummaryForAccounts.setFormData(p => ({ ...p, FromDate: date }));
                                DeliveryDetailsForAccounts.setFormData(p => ({ ...p, FromDate: date }));
                                DailyPickupDetailsForAccounts.setFormData(p => ({ ...p, FromDate: date }));
                              }}
                              maxDate={new Date()}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select date"
                              showMonthDropdown
                              showYearDropdown
                            />
                          </div>

                          <div className="col-12 col-sm-6 col-md-3">
                            <label>To</label>
                            <ReactDatePicker
                              className="form-control"
                              value={AccountDayWiseShipments.formData.ToDate}
                              onChange={(e) => {
                                const date = moment(e).format("YYYY-MM-DD");
                                AccountDayWiseShipments.setFormData(p => ({ ...p, ToDate: date }));
                              }}
                              minDate={AccountDayWiseShipments.formData.FromDate}
                              maxDate={new Date()}
                              dateFormat="dd/MM/yyyy"
                              placeholderText="Select date"
                              showMonthDropdown
                              showYearDropdown
                            />
                          </div>

                          {userData?.data?.data?.user?.Role === "Admin" && (
                            <div className="col-12 col-sm-6 col-md-3">
                              <label>Account No</label>
                              <input
                                type="text"
                                className="form-control"
                                name="AccountCode"
                                value={AccountDayWiseShipments.formData.AccountCode}
                                onChange={handleChange}
                                placeholder="Enter account"
                              />
                            </div>
                          )}

                          <div className="col-12 col-sm-6 col-md-3 d-grid">
                            <button
                              type="button"
                              onClick={handleSubmit}
                              className="btn btn-primary"
                              style={{ height: "40px" }}
                            >
                              Apply
                            </button>
                          </div>

                        </form>
                      </div>

                    </div>
                  </div>
                  {/* part 2 */}
                  <PrepadAccountStatusLeftMoney />
                  <hr className=" mb-4" style={{ color: "#2ca2c6" }} />
                  {AccountDayWiseShipments.errors.error && AccountDayWiseShipments.errors.message ? <ErrorComponent message={AccountDayWiseShipments.errors.message} />

                    : <>
                      <div className="row mt-4">

                        
                        <div className="col-xl-4 col-lg-4">
                          <div className="stats-card">
                            <div className="stats-header">
                              <div className="stats-icon orange">
                                <i className="fa fa-truck"></i>
                              </div>
                              <span className="stats-title">Total Shipments</span>
                            </div>

                            <div className="stats-value">
                              {data[0] + data[1] + data[2]}
                            </div>

                            <div className="stats-progress">
                              <div
                                className="stats-progress-fill orange"
                                style={{ width: `${(data[0] / (data[0] + data[1] + data[2])) * 100}%` }}
                              ></div>
                            </div>

                            <div className="stats-footer">
                              <span>Delivered: {data[0]}</span>
                              <a href="/manage-shipping">Manage →</a>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-4">
                          <div className="stats-card">
                            <div className="stats-header">
                              <div className="stats-icon blue">
                                <i className="fa fa-suitcase"></i>
                              </div>
                              <span className="stats-title">Total Pickups</span>
                            </div>

                            <div className="stats-value">{pickedupudata[0]}</div>

                            <div className="stats-progress">
                              <div
                                className="stats-progress-fill blue"
                                style={{ width: "70%" }}
                              ></div>
                            </div>

                            <div className="stats-footer">
                              <span>Completed: {pickedupudata[1]}</span>
                              <a href="/pickup-history">History →</a>
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-4 col-lg-4">
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
                                <div className="pickup-progress-wrapper">
                                  {pickedupudata && pickedupudata.length > 0 && pickedupudata.map((item, index) => {
                                    const label = index === 0 ? "Booking" : index === 1 ? "Completed" : "Pending";
                                    const percent = item; // assuming item is already percentage like 45, 60, etc.

                                    return (
                                      <div className="pickup-progress-row" key={index}>
                                        <div className="progress-label">
                                          <span>{label}</span>
                                          <span className="progress-value">{percent}</span>
                                        </div>

                                        <div className="progress-track">
                                          <div
                                            className={`progress-fill ${index === 0 ? 'booking' : index === 1 ? 'completed' : 'pending'}`}
                                            style={{ width: `${percent}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>


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

                        <div className="shipment-status-panel mt-3">
                          <div className="status-header">
                            <div className="status-icon">
                              <i className="fa fa-truck" aria-hidden="true"></i>
                            </div>
                            <h6>Shipment Status</h6>
                          </div>

                          <div className="status-body">
                            {data && data.length > 0 && data.map((item, index) => (
                              <div key={index} className={`status-row ${index === 0 ? 'delivered' : index === 1 ? 'pending' : 'returned'}`}>
                                <span className="status-label">
                                  {index === 0 ? "Delivered" : index === 1 ? "Pending" : "Returned"}
                                </span>
                                <span className="status-value">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>



                        {/* old UI */}
                        {/* <div className=" first-graph mt-5">
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
                        </div> */}

                        {/* new UI */}
                        {/* <div className="first-graph mt-5">
                          <div className="row g-4">

                            <div className="col-12 col-md-6">
                              <div className="graph-card text-center p-3 h-100">
                                <h6 className="graph-title mb-2">Pickup Status</h6>
                                <div className="graph-wrapper">
                                  <DoughnutChart data={pickedupudata} labels={['Booking', 'Picked Up', 'Pending']} />
                                </div>
                              </div>
                            </div>

                            <div className="col-12 col-md-6">
                              <div className="graph-card text-center p-3 h-100">
                                <h6 className="graph-title mb-2">Shipment Delivery Status</h6>
                                <div className="graph-wrapper">
                                  <DoughnutChart data={data} labels={['Delivered', 'Not Delivered', 'Returned']} />
                                </div>
                              </div>
                            </div>

                          </div>
                        </div> */}

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
