import React, { useEffect, useState } from "react";
import { usePaymentDuesDataMutation } from "../../service/apiServices";
import { useSelector } from "react-redux";
import Loader from "../../heplers/Loaders/Loader";
import ErrorComponent from "../../heplers/ErrorComponent";

const PaymentDues = () => {
  const userData = useSelector((state) => state.UserReducer);
  const [AccountNo, setAccountNo] = useState(userData.data?.data.user.AccountNo || '');
  const [postDueInvoicesData, { data, error, isLoading }] = usePaymentDuesDataMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    postDueInvoicesData({ AccountNo }); // Assuming AccountNo is the parameter needed for the mutation
  };
  useEffect(() => {
    postDueInvoicesData({ AccountNo })
  }, [])
  return (
    <>
      {
        isLoading ? <Loader /> : error ? <ErrorComponent message={error.data.message} /> : (
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
                    {/* <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">Credit</th>
                          <th scope="col">Currency</th>
                          <th scope="col">Description</th>
                          <th scope="col">Due Amount</th>
                        </tr>
                      </thead>
                      <tbody>

                        <tr>
                          <td >{data?.data?.Credit}</td>
                          <td >{data?.data?.Currency}</td>
                          <td >{data?.data?.Description}</td>
                          <td>{data?.data?.DueAmount}</td>
                        </tr>

                      </tbody>
                    </table> */}
                    <div className=" mt-5">

                      <button className="btn btn-primary"><b>Due Amount:</b> {data?.data?.DueAmount}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )
      }
    </>

  );
};

export default PaymentDues;
