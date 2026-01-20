import { useEffect, useState } from "react";
import {
  useGetBatchnumberDataQuery,
} from "../../service/apiServices";

import "./Dashboard.css";
import UsePagination from "../../hooks/UsePagination";
import ProtectComponent from "../../Components/Common/ProtectComponent";
import Loader from "../../heplers/Loaders/Loader";
const ManageBulkBatchNumber = (props) => {

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  const { data, error, isLoading, refetch } =
    useGetBatchnumberDataQuery({ search, itemsPerPage, pageNumber });

  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.data.totalPages));
    }
  }, [data])
  useEffect(() => {
    refetch()
  }, [pageNumber, itemsPerPage, search])
  const startIndex = (pageNumber - 1) * itemsPerPage;
  return (
    <>
      {isLoading ? <Loader /> : <>
        <div className="col-lg-6" style={{ padding: "0px" }}>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value?.toLowerCase())}
            value={search}
            id="inputPassword6"
            className="form-control"
            aria-describedby="passwordHelpInline"
            placeholder="Search By Title"
          />

        </div>
        <div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Batch Number</th>
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td colSpan="2">{error.data?.message}</td>
                </tr>
              ) : (
                data.data && data.data.Batchnumbers.length > 0 ?
                  data.data.Batchnumbers.map((item, index) => (
                    <tr key={item._id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{item.BatchNumber}</td>
                    </tr>
                  )) : <tr>
                    <td colSpan="11">No Data Found</td>
                  </tr>
              )}
            </tbody>
          </table>



        </div>
        {pageComponent()}
      </>

      }
    </>
  );
};

export default ManageBulkBatchNumber;
