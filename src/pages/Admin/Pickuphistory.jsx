import { downloadExcel } from "react-export-table-to-excel";
import usePagination from "../../hooks/UsePagination";
import useFormSubmission from "../../hooks/useFormSubmission";
import { usePostSPickupHistoryDataMutation, useGetAllUserByAccountNoQuery } from "../../service/apiServices";
import {
  PickupHistoryheader,
  initialPickupHistoryData,
} from "../../service/initialData";
import "./Dashboard.css";
import Loader from "../../heplers/Loaders/Loader";
import ErrorComponent from "../../heplers/ErrorComponent";
import UsePagination from "../../hooks/UsePagination";
import { useEffect, useState } from "react";
import ProtectComponent from "../../Components/Common/ProtectComponent";
import { useSelector } from "react-redux";
import PrepadAccountStatusLeftMoney from "../../Components/Common/PrepadAccountStatusLeftMoney";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
const Pickuphistory = (props) => {
  const userData = useSelector((state) => state.UserReducer);
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(
      usePostSPickupHistoryDataMutation,
      {
        ...initialPickupHistoryData,
        AccountNo: userData.data && userData.data.data.user.AccountNo,
        // BookingPerson: userData.data && userData.data.data.user.username
      }
    );
  const [currentData, setcurrentMovies] = useState([]);
  const [limit, setLimit] = useState(10);
  // Number of items to display per page
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  useEffect(() => {
    // For All Data Sources
    if (Data && Data.BookingList && Data.BookingList.length > 0) {
      setNumberOfPages(Math.ceil(Data.BookingList.length / itemsPerPage));
      setcurrentMovies(
        Data.BookingList.slice(
          (pageNumber - 1) * itemsPerPage,
          (pageNumber - 1) * itemsPerPage + itemsPerPage
        )
      );
    } else {
      setNumberOfPages(0)
    }
  }, [pageNumber, Data, itemsPerPage]);
  function handleDownloadExcel() {
    if (!Data || (Data && Data.BookingList.length == 0)) {
      alert("Data is not available");
    } else {
      let data = Data.BookingList.map((item) => {
        return {
          Consignee: item.Consignee,
          PickupRequestDated: item.PickupRequestDated,
          OriginName: item.OriginName,
          PickupRequestNo: item.PickupRequestNo,
          ShipmentStatus: item.ShipmentStatus,
          Shipper: item.Shipper,
        };
      });
      downloadExcel({
        fileName: "Pickup History",
        sheet: "react-export-table-to-excel",
        tablePayload: {
          header: PickupHistoryheader,
          // accept two different data structures
          body: data,
        },
      });
    }
  }
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const { data, error, isLoading, refetch } = useGetAllUserByAccountNoQuery({ AccountNo: formData.AccountNo });
  useEffect(() => {
    refetch()
  }, [formData.AccountNo])

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 0;
  };

  return (
    <ProtectComponent isDashboard={true} dashboard={"Pickup_History"} userAuthData={props.userAuthData}>

      <main id="content" role="main">
        <div className="main-content">
          <div className="container-fluid">
            <h2 className="page-title">Pickup History  | <PrepadAccountStatusLeftMoney /></h2>
            <div className="card customcss mb-5">
              <div className="card-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit()
                }} >
                  <div className="row">
                    {userData.data && userData.data.data.user.Role == "Admin" &&
                      (<div className="col-lg-4 mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                          Account No
                        </label>
                        <input
                          type="text"
                          onChange={(e) => {
                            handleChange("AccountNo", e.target.value);
                          }}
                          value={formData.AccountNo}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Account No"
                          readOnly={userData.data && userData.data.data.user.Role == "Admin" ? false : true}
                        />
                      </div>)
                    }

                    <div className="col-lg-4 mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        From Date*
                      </label>
                      {/* <input
                        type="date"
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => {
                          handleChange("BookingFromDate", e.target.value);
                        }}
                        value={formData.BookingFromDate}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=" Amount"
                      /> */}

                      <br />
                      <ReactDatePicker
                        name="BookingFromDate"
                        value={formData.BookingFromDate}
                        onChange={(e) => {
                          handleChange("BookingFromDate", moment(e).format("YYYY-MM-DD"));
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
                      />

                    </div>
                    <div className="col-lg-4  mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        To Date*
                      </label>
                      <br />
                      {/* <input
                        type="date"
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={(e) => {
                          handleChange("BookingToDate", e.target.value);
                        }}
                        value={formData.BookingToDate}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder=" Contact Person"
                      /> */}

                      <ReactDatePicker
                        name="BookingToDate"
                        value={formData.BookingToDate}
                        onChange={(e) => {
                          handleChange("BookingToDate", moment(e).format("YYYY-MM-DD"));
                        }}
                        className="form-control"
                        onKeyDown={(e) => e.preventDefault()}
                        maxDate={new Date()}
                        minDate={formData.BookingFromDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        showIcon
                        filterDate={isWeekday}
                      />

                    </div>
                    <div className="col-lg-6 mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Booking Number
                      </label>
                      <input
                        type="text"
                        value={formData["PickupRequestNo"]}
                        name="PickupRequestNo"
                        onChange={(e) =>
                          handleChange("PickupRequestNo", e.target.value)
                        }
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder=" Booking Number"
                      />
                    </div>
                    {/* <div className="col-lg-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">
                        Users
                      </label>
                      <select name="CreatedBy" onChange={(e) => handleChange("BookingPerson", e.target.value)} value={
                        formData.BookingPerson
                      } className="form-control">

                        <option value={""}>{"Select User"}</option>
                        {
                          data && data.data && data.data.length > 0 && data.data.map((v, i) => (
                            <option value={v?.username}>{v?.full_name}</option>
                          ))
                        }
                      </select>
                    </div> */}
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit()
                    }}
                    className="btn btn-primary"
                    style={{ marginRight: "10px", marginLeft: "5px" }}
                  >
                    Show History
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadExcel}
                    className="btn btn-secondary"
                  >
                    Export
                  </button>
                </form>
              </div>
            </div>
            <span>{Data && Data.BookingList && "Total No Of Records " + Data.BookingList.length}</span>
            <h2 className="page-title">Pickup History List</h2>
            <div className="card customcss">
              <div className="card-body">
                {
                  errors.loading ? (<Loader />) :
                    errors.error ? (<ErrorComponent message={errors.message} />) : (<>

                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Sr.No</th>
                            <th scope="col">Consignee</th>
                            <th scope="col">Date</th>
                            <th scope="col">Origin</th>
                            <th scope="col">Pickup No</th>
                            <th scope="col">Status</th>
                            <th scope="col">Shipper</th>
                          </tr>
                        </thead>
                        <tbody>
                          {errors.loading ? (
                            <tr>
                              <td colSpan="8">
                                <Loader />
                              </td>
                            </tr>
                          ) : errors.error ? (<></>
                          ) : currentData && currentData.length > 0 ? (
                            currentData.map((item, index) => (
                              <tr key={item.Awbno}>
                                <td>{startIndex + index + 1}</td>
                                <td>{item.Consignee}</td>
                                <td>{item.PickupRequestDated}</td>
                                <td>{item.OriginName}</td>
                                <td>{item.PickupRequestNo}</td>
                                <td>{item.ShipmentStatus}</td>
                                <td>{item.Shipper}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8">No Data Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </>)}
                {pageComponent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectComponent>
  );
};

export default Pickuphistory;
