import { Tab } from "bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { usePostAirwayBillPDFFormatDataMutation } from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import UsePagination from "../../hooks/UsePagination";
import SmalLoader from "../../heplers/Loaders/SmallLoader";
import ErrorComponent from "../../heplers/ErrorComponent";
import Loader from "../../heplers/Loaders/Loader";
import { useSelector } from "react-redux";
// import ReactPaginate from "react-paginate";
const BulkAirWayBillHistory = ({ userAuthData, handlePdfDownload }) => {
  const userData = useSelector((state) => state.UserReducer);
  const PdfForm = useFormSubmission(usePostAirwayBillPDFFormatDataMutation, {
    AirwayBillNumber: "",
    RequestUser: "",
    Country: "AE",
    PrintType: "LABEL",
    AccountNo: userData.data && userData.data.data.user.AccountNo,
  });

  const tableRef = useRef(null);
  const [currentData, setcurrentMovies] = useState([]);
  const [limit, setLimit] = useState(10);
  // Number of items to display per page
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination()

  useEffect(() => {
    // For All Data Sources
    if (Data && Data.AwbList && Data.AwbList.length > 0) {
      setNumberOfPages(Math.ceil(Data.AwbList.length / itemsPerPage))
      setcurrentMovies(Data.AwbList.slice((pageNumber - 1) * itemsPerPage, (pageNumber - 1) * itemsPerPage + itemsPerPage))
    }

  }, [pageNumber, Data, itemsPerPage])

  useEffect(() => {
    PdfForm.Data && handlePdfDownload(PdfForm.Data, PdfForm.formData.AirwayBillNumber)
  }, [PdfForm.Data])
  useEffect(() => {
    PdfForm.handleSubmit()
  }, [PdfForm.formData.AirwayBillNumber])

  const startIndex = (pageNumber - 1) * itemsPerPage;

  return (
    < >

      {errors.loading ? <Loader /> : errors.error ? (<ErrorComponent message={errors.message} />) : (<>
        <table ref={tableRef} className="table table-bordered table-data">
          <thead className="table-head">
            <tr className="table-head">
              <th scope="col">Airway Bill No</th>
              <th scope="col">Download</th>
            </tr>
          </thead>
          <tbody>
            {errors.loading ? (
              <tr>
                <td colSpan="3"><SmalLoader /></td>
              </tr>
            ) : errors.error ? (
              <></>
            ) : (
              currentData &&
                currentData.length > 0 ?
                currentData.map((item, index) => (
                  <tr key={item.Awbno}>
                    <td>{startIndex + index + 1}</td>

                    <td style={{ width: item.Awbno.length }}>{item.Awbno}</td>

                    <td>

                      <button className="download-button " onClick={() => {
                        PdfForm.setFormData(prev => ({ ...prev, AirwayBillNumber: item.Awbno, }))

                      }} style={{ border: "none" }}>
                        {" "}
                        <i class="fa fa-download" aria-hidden="true"></i>
                      </button>

                    </td>
                  </tr>
                )) : <tr>
                  <td colSpan="3">{"No Records Found"}</td>
                </tr>
            )}
          </tbody>
        </table>
      </>)}

      <>
      </>
      {pageComponent()}
    </>
  );
};

export default BulkAirWayBillHistory;
