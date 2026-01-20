import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePagination from "../../hooks/UsePagination";
import { usePostPrepaidPaymentHistoryMutation } from "../../service/apiServices";
import "./Dashboard.css";
import UsePagination from "../../hooks/UsePagination";
const Topuphistory = () => {
  const userData = useSelector((state) => state.UserReducer);
  const [AccountNo, setAccountNo] = useState(userData.data?.data.user.AccountNo || '');
  const [postDueInvoicesData, { data, error, isLoading }] = usePostPrepaidPaymentHistoryMutation();
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
    <>
      <main id="content" role="main">
        <div className="main-content">
          <div className="container-fluid">
            <h2 className="page-title">Top-Up Request History</h2>
            <div className="card customcss">
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Invoice No</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan="3">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="3">{error.data.message}</td>
                      </tr>
                    ) : (
                      currentData &&
                      currentData.length > 0 &&
                      currentData.map((item, index) => (
                        <tr key={item.Awbno}>
                          <td>{index + 1}</td>
                          <td>{item.InvoiceNo}</td>
                          <td>{item.InvoiceDate}</td>
                          <td>{item.InvoiceAmount}</td>
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
                </table>
                {pageComponent()}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Topuphistory;
