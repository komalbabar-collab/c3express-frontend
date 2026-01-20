import React, { useEffect, useState } from 'react'
import { useGetDueInvoicesDataQuery, usePostDueInvoicesDataMutation } from '../../service/apiServices'
import UsePagination from '../../hooks/UsePagination';
import Loader from '../../heplers/Loaders/Loader';
import ErrorComponent from '../../heplers/ErrorComponent';
import { useSelector } from 'react-redux';

const InvoicePage = () => {
  const userData = useSelector((state) => state.UserReducer);
  const [AccountNo, setAccountNo] = useState(userData.data?.data.user.AccountNo || '');
  const [postDueInvoicesData, { data, error, isLoading }] = usePostDueInvoicesDataMutation();
  const [currentData, setCurrentData] = useState([]);
  const [limit, setLimit] = useState(10); // Consider if this is needed as state
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  useEffect(() => {
    if (data?.data?.InvoiceList) {
      setNumberOfPages(Math.ceil(data.data.InvoiceList.length / itemsPerPage));
      setCurrentData(data.data.InvoiceList.slice((pageNumber - 1) * itemsPerPage, pageNumber * itemsPerPage));
    }
  }, [pageNumber, data, itemsPerPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    postDueInvoicesData({ AccountNo }); // Assuming AccountNo is the parameter needed for the mutation
  };
  useEffect(() => {
    postDueInvoicesData({ AccountNo })
  }, [])
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return (
    <main id="content" role="main">
      <div className="main-content">
        <div className="container-fluid">
          <h2 className="page-title">Due Invoices</h2>
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

              {isLoading ? (<Loader />) : error ? (<ErrorComponent message={error.data.message} />) : <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Invoice No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Due Days</th>
                    <th scope="col">Currency</th>
                    {/* <th scope="col">Download</th> */}
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <>

                    </>
                  ) : error ? (
                    <>

                    </>
                  ) : (
                    currentData && currentData.length > 0 &&
                    currentData.map((item, index) => (
                      <tr key={item.Awbno}>
                        <td>{startIndex + index + 1}</td>
                        <td>{item.InvoiceNo}</td>
                        <td>{item.InvoiceDate}</td>
                        <td>{item.InvoiceAmount}</td>
                        <td>{item.DueDate}</td>
                        <td>{item.DueDays}</td>
                        <td>{item.Currency}</td>
                        {/* <td>
               <DownloadTableExcel
                 filename="users table"
                 sheet="users"
                 currentTableRef={tableRef.current}
               >
                 <button> Export excel </button>
               </DownloadTableExcel>
             </td> */}
                      </tr>
                    ))
                  )}
                </tbody>


              </table>}

              {pageComponent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default InvoicePage