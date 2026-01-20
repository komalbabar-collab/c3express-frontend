import React, { useEffect, useState } from "react";
import { usePostPrepaidAccountStatusMutation } from "../../service/apiServices";
import { useSelector } from "react-redux";
import UsePagination from '../../hooks/UsePagination';
import Loader from '../../heplers/Loaders/Loader';
import ErrorComponent from '../../heplers/ErrorComponent';
const PrepaidAccountStatus = () => {
  const userData = useSelector((state) => state.UserReducer);
  const [AccountNo, setAccountNo] = useState(userData.data?.data.user.AccountNo || '');
  const [postDueInvoicesData, { data, error, isLoading }] = usePostPrepaidAccountStatusMutation();


  const handleSubmit = (e) => {
    e.preventDefault();
    postDueInvoicesData({ AccountNo }); // Assuming AccountNo is the parameter needed for the mutation
  };
  useEffect(() => {
    postDueInvoicesData({ AccountNo })
  }, [])
  return (
    <main id="content" role="main">
      <div className="main-content">
        <div className="container-fluid">
          <h2 className="page-title">Payment Dues</h2>
          <div className="card customcss">
            <div className="card-body">
              {userData.data && userData.data.data.user.Role == "Admin" && (<>
                <form action='/' onSubmit={handleSubmit}>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      onChange={(e) => setAccountNo(e.target.value)}
                      value={AccountNo}
                      id="inputPassword6"
                      className="form-control"
                      aria-describedby="passwordHelpInline"
                      placeholder='Search By  Name,Email,Account No'
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    style={{ marginRight: "10px", marginLeft: "5px" }}
                  >
                    Show History
                  </button>

                </form>
              </>)}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Credit</th>
                    <th scope="col">Description</th>
                    <th scope="col">Due Amount</th>
                    <th scope="col">Last Credit Amount</th>
                    <th scope="col">Last Credit Date</th>
                    <th scope="col">Last Transaction ID</th>
                    <th scope="col">Remarks</th>
                    <th scope="col">TodayCharge</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan="3">Loading...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3">{"Error"}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td >{data?.data?.Credit}</td>
                      <td >{data?.data?.Description}</td>
                      <td>{data?.data?.DueAmount}</td>
                      <td>{data?.data?.LastCreditAmount}</td>
                      <td>{data?.data?.LastCreditDate}</td>
                      <td>{data?.data?.LastTransactionID}</td>
                      <td>{data?.data?.Remarks}</td>
                      <td>{data?.data?.TodayCharge}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrepaidAccountStatus;