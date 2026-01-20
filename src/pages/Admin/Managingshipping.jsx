import { useState } from "react";
import "./Dashboard.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AirWayBillHistory from "../../Components/AirwayBils/AirWayBillHistory";
import AirWayBillGeneration from "../../Components/AirwayBils/AirWayBillGeneration";
import { APi_Url, useMultipleCreateAirwayBillMutation, usePostAirwayBillPDFFormatDataMutation } from "../../service/apiServices";
import useFormSubmission from "../../hooks/useFormSubmission";
import moment from "moment";
import SmalLoader from "../../heplers/Loaders/SmallLoader";
import ErrorComponent from "../../heplers/ErrorComponent";
import { handleExcelDownload, handlePdfDownload } from "../../heplers/PdfDownloader";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ManageBulkBatchNumber from "./ManageBulkBatchNumber";
import PrepadAccountStatusLeftMoney from "../../Components/Common/PrepadAccountStatusLeftMoney";
import AirWayBillPrint from "@/Components/AirwayBils/AirWayBillPrint";
import BulkAIrwaylBillPrint from "@/Components/AirwayBils/BulkAirWayBillPrint";

const Managingshipping = (props) => {
  const userData = useSelector((state) => state.UserReducer);

  const [selectedFIle, setselectedFIle] = useState(null);
  const [AccountNo, setAccountNo] = useState(userData?.data?.data?.user?.AccountNo);
  const [AirwayBillNumber, setAirwayBillNumber] = useState('');
  const [MultipleAirwayBillData, setMultipleAirwayBillData] = useState({ loading: false, error: null, Data: null });
  const [PrintType, setPrintType] = useState("LABEL");

  const TodayDate = moment().format("MMM Do YY");
  const initialData = { AccountNo: AccountNo, AirwayBillNumber: "", RequestUser: "", Country: "AE", PrintType: "LABEL" };

  const [PostBatchAirWayBillData, { data, error, isLoading }] = useMultipleCreateAirwayBillMutation();

  const hanleDownloadAirwayBatchPdfFormate = async (Batch) => {
    try {
      setMultipleAirwayBillData(prev => ({ ...prev, loading: true }));
      let payload = { AccountNo: AccountNo, AirwayBillNumber: Batch, RequestUser: "", Country: "AE", PrintType: PrintType };

      fetch(APi_Url + "AirwayBillBatchPDFFormat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok")
          };

          // Determine file type from Content-Type header
          const contentType = response.headers.get('Content-Type');
          if (contentType.startsWith("application/json;") && PrintType === "LABEL") {
            return toast.error("Failed to download XLSX file.")
          }

          console.log(contentType);

          let fileExtension = '.' + contentType.split("/").pop();
          if (contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            fileExtension = '.xlsx';
          }

          // Get filename from the Content-Disposition header if available
          const contentDisposition = response.headers.get('Content-Disposition');
          let filename = 'AirwayBill' + fileExtension;
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '');
            }
          }

          // Return both the blob and the filename
          return response.blob().then(blob => {
            return { blob, filename };
          });
        })
        .then(({ blob, filename }) => {
          // Create a URL for the blob
          const url = window.URL.createObjectURL(blob);

          // Create an anchor element and set its attributes
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;

          // Append to the document, click it, and remove it
          document.body.appendChild(a);
          a.click();

          // Clean up
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        })
        .catch(error => {
          console.error('Error downloading the file:', error);
        });

      setMultipleAirwayBillData(prev => ({ ...prev, error: null }))
      // handlePdfDownload(data.data, Batch);
    } catch (error) {
      setMultipleAirwayBillData(prev => ({ ...prev, error: error.data.message }));
      toast.error(error?.data?.message);
    } finally {
      setMultipleAirwayBillData(prev => ({ ...prev, loading: false }));
    }
  };

  const { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(usePostAirwayBillPDFFormatDataMutation, { ...initialData, PrintType: PrintType });

  const handleMultipleAirwayBillSubmit = async (e) => {
    e.preventDefault();
    try {
      setMultipleAirwayBillData({ error: null, loading: true, AirwayBillNumber: "" })

      // return false
      const Bearertoken = localStorage.getItem("token")
      var myHeaders = new Headers();
      myHeaders.append("authorization", "Bearer " + Bearertoken);
      var formdata = new FormData();
      formdata.append("AirwayBill", selectedFIle);
      formdata.append("AccountNo", AccountNo);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(APi_Url + "MultipleCreateAirwayBill", requestOptions)
        .then(response => response.json())
        .then(result => {

          if (result.statusCode === 201) {
            setMultipleAirwayBillData({ loading: false, Data: result.data, error: null })
          }
          else if (result.statusCode >= 400) {
            setMultipleAirwayBillData({ loading: false, Data: null, error: result.message })
          }
        })
        .catch(error => {
          console.error("error", error)
          setMultipleAirwayBillData({ loading: false, Data: null, error: "Something is Wrong Please Try Again" })
        });
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      setMultipleAirwayBillData({ loading: false, Data: null, error: "Something is wrong please try again" })
      console.error({ error })
    }
  };

  const handleBatchAirWayBillSubmit = async (e) => {
    e.preventDefault();
    try {
      await PostBatchAirWayBillData({
        AirwayBillNumber: AirwayBillNumber,
        AccountNo: AccountNo,
        RequestUser: "",
        Country: "AE",
        PrintType: PrintType,
      }).unwrap()
      // Handle success or any other logic
    } catch (error) {
      // Handle error
      console.error(error.data.message)
      toast.error(error?.data?.message)
    }
  };

  return (
    <main id="content" role="main">
      <div className="main-content">
        <div className="container-fluid">
          <h2 className="page-title">Manage Shipping  | <PrepadAccountStatusLeftMoney /> </h2>
          <div className="card customcss">
            <div className="card-body">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                style={{ justifyContent: "center" }}
              >
                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Airway_Bill_Generation && (
                    <Tab eventKey="home" title="Airway Bill Generation">
                      <AirWayBillGeneration
                        userAuthData={props.userAuthData}
                      />
                    </Tab>
                  )}

                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Air_Way_bill_history &&
                  (<Tab eventKey="profile" title="Airway Bill History">
                    <AirWayBillHistory
                      userAuthData={props.userAuthData}
                      handlePdfDownload={handlePdfDownload}
                    />
                  </Tab>)}
                {
                  props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Print_Airway_Bill && (
                    <Tab eventKey="contact" title="Airway Bill Print">
                      <AirWayBillPrint AccountNo={AccountNo} />
                    </Tab>
                  )
                }
                {
                  props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Print_Airway_Bill && (
                    <Tab eventKey="BulkAIrwaylBillPrint" title="Bulk Airway Bill Print">
                      <BulkAIrwaylBillPrint AccountNo={AccountNo} />
                      <ManageBulkBatchNumber handlePdfDownload={handlePdfDownload} />
                    </Tab>
                  )
                }
                {props.userAuthData.data &&
                  props.userAuthData.data.data &&
                  props.userAuthData.data.data.user &&
                  props.userAuthData.data.data.user.dashboard &&
                  props.userAuthData.data.data.user.dashboard
                    .Airway_Bill_Generation && (
                    <Tab eventKey="bulk" title="Bulk Generations">
                      <>
                        <div className='row mt-5 mb-5' style={{ justifyContent: 'center' }}>
                          <div className='col-lg-6'>
                            <form onSubmit={handleMultipleAirwayBillSubmit}>
                              <div className="input-group mb-3">
                                {userData?.data?.data?.user?.Role == "Admin" && (

                                  <input
                                    type="text"
                                    onChange={(e) => setAccountNo(e.target.value)}
                                    value={AccountNo}
                                    id="inputPassword6"
                                    className="form-control"
                                    aria-describedby="passwordHelpInline"
                                    placeholder='Account No'
                                  />
                                )}
                                <input type="file" onChange={(e) => setselectedFIle(e.target.files[0])} name="AirwayBill" className="form-control" id="inputGroupFile02" />

                                <button
                                  onClick={handleMultipleAirwayBillSubmit}
                                  className="btn btn-primary"
                                >
                                  Upload
                                </button>

                              </div>
                            </form>
                          </div>

                          <>
                            <a
                              className="btn btn-success"
                              href="/Sample.xlsx"
                              download="Sample.xlsx"
                            >
                              Download Sample File
                            </a>
                          </>
                          <>
                            {MultipleAirwayBillData.loading ? (
                              <SmalLoader />
                            ) : MultipleAirwayBillData.error ? (
                              <ErrorComponent message={MultipleAirwayBillData.error} />
                            ) : MultipleAirwayBillData?.Data?.BatchNumber ? (
                              <div className="d-flex  ">
                                <div className="">
                                  Your Bill No :{" "}
                                  <span>{MultipleAirwayBillData?.Data?.BatchNumber}</span>
                                </div>
                                <div className="  ">
                                  <select onChange={(e) => setPrintType(e.target.value)} className="form-select" aria-label="Default select example">
                                    <option hidden>Select a file type</option>
                                    <option value="A4">A4</option>
                                    <option value="LABEL">Label</option>
                                    <option value="XLSX">XLSX</option>
                                  </select>
                                  <button
                                    onClick={() => hanleDownloadAirwayBatchPdfFormate(MultipleAirwayBillData?.Data?.BatchNumber)}
                                    className="btn btn-primary"
                                  >
                                    Download
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <span></span>
                            )}
                          </>

                        </div>

                      </>
                    </Tab>
                  )}

              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Managingshipping;
