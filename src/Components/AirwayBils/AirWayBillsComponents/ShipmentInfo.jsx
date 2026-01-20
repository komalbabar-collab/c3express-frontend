import React from "react";
import { Shipment } from "../../../service/JsxHtmlTemplates";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { APi_Url, useGetUserServiceTypesDataQuery, usePostAirwayBillPDFFormatDataMutation } from "../../../service/apiServices";
import Loader from "../../../heplers/Loaders/Loader";
import { toast } from "react-toastify";
import CoutrycodesCuurency from "../../../service/country-by-currency-code.json";
import { handlePdfDownload } from "../../../heplers/PdfDownloader";
import { useSelector } from "react-redux";

const ShipmentInfo = ({ formData, handleChange, handleSubmit, Data, setFormData, handleChangeDimension, setisDimension, isDimension, errors }) => {
  const userData = useSelector((state) => state.UserReducer);
  const prepaidStattus = userData?.data?.data?.AccountData?.PaymentType == "PP" ? true : false;

  const [MutateAirwayBilBatch] = usePostAirwayBillPDFFormatDataMutation();
  const { data, error, isLoading, refetch } = useGetUserServiceTypesDataQuery(formData?.AirwayBillData?.ReceiversCountry);

  const handleDimesionChange = () => setisDimension(!isDimension);

  const [MultipleAirwayBillData, setMultipleAirwayBillData] = useState({ loading: false, Data: null, error: null, PrintType: "LABEL" });

  const hanleDownloadAirwayBatchPdfFormate = async (e) => {
    e.preventDefault()
    try {
      if (Data && Data.AirwayBillNumber) {
        let payload = {
          AccountNo: formData.AirwayBillData.AccountNo,
          AirwayBillNumber: Data.AirwayBillNumber,
          RequestUser: "",
          Country: "AE",
          PrintType: MultipleAirwayBillData.PrintType,
        }
        setMultipleAirwayBillData((prev) => ({ ...prev, loading: true }));

        fetch(APi_Url + "AirwayBillPDFFormat", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            // Determine file type from Content-Type header
            const contentType = response.headers.get('Content-Type');
            if (contentType.startsWith("application/json;") && MultipleAirwayBillData.PrintType === "XLSX") {
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

      } else {
        toast.error("Please Submit First")
      }

    } catch (error) {
      setMultipleAirwayBillData((prev) => ({ ...prev, loading: false, error: error }))
      toast.error(error?.data?.message)
    }
  };

  useEffect(() => {
    if (Data && Data.AirwayBillNumber) {
      toast.success(`Submitted Successfully.`)
    } else if (errors && errors.error) {
      toast.error(errors.message)
    }
  }, [Data, errors]);

  useEffect(() => {
    formData["AirwayBillData"]["ServiceType"] !== "COD" && setFormData({
      ...formData,
      AirwayBillData: {
        ...formData.AirwayBillData,
        CODAmount: 0
      }
    })
  }, [formData.AirwayBillData.ServiceType]);

  return (
    <div className="row d-flex justify-content-center mt-5 ">
      <div className="col-lg-9 shipping-form  p-2">
        <h2 className="page-title backgorindd text-center" style={{ fontSize: "24px" }}>
          Shipment Information
        </h2>
        <div className="row d-flex justify-content-center">
          <div className="row d-flex  justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="number"
                onKeyDown={(e) => {
                  // Disable keyboard arrows
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                onWheel={(e) => {
                  // Disable mouse wheel
                  e.target.blur();
                }}
                className="form-control"
                placeholder={"Number of Pieces"}
                name="NumberofPeices"
                onChange={(e) => {

                  handleChange(e.target.name, e.target.value)
                }}
                value={formData["AirwayBillData"]["NumberofPeices"]}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <select
                className="form-control"
                name={"ServiceType"}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["ServiceType"]}
              >
                <option value={""}>Select Service Type</option>
                {data && data.data.ServiceType && data.data.ServiceType.length > 0
                  ? data.data.ServiceType.filter(item => formData["AirwayBillData"]["ProductType"] === "DOX" && !prepaidStattus ? item.value === "COD" === false : true).map((item, index) => {
                    return <option value={item.value}>{item.title}</option>;
                  })
                  : <option> No Options Available</option>
                }
              </select>
            </div>
          </div>
          <div className="row d-flex  justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="number" onKeyDown={(e) => {
                  // Disable keyboard arrows
                  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                onWheel={(e) => {
                  // Disable mouse wheel
                  e.target.blur();
                }}
                className="form-control"
                placeholder={"Weight(Kgs)"}
                name="Weight"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["Weight"]}
              />
            </div>
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={"Goods Description"}
                name="GoodsDescription"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["GoodsDescription"]}
              />
            </div>
          </div>
          <div className="row d-flex  justify-content-center">
            {formData["AirwayBillData"]["ProductType"] === "XPS" && formData["AirwayBillData"]["ServiceType"] === "COD" ? <div className="col-lg-6 mb-3">
              <select
                className="form-control"
                name="CODCurrency"
                onChange={(e) => {
                  handleChange(e.target.name, e.target.value)
                  handleChange("ShipmentInvoiceCurrency", e.target.value)
                }}
                value={formData["AirwayBillData"]["CODCurrency"]}
              >
                <option value={""}>Select COD Currency</option>
                {CoutrycodesCuurency.length > 0 ? (
                  CoutrycodesCuurency.map((item, index) => {
                    return <option value={item.CURRENCY_CODE}>{item.CURRENCY_CODE}</option>;
                  })
                ) : (
                  <option> No Options Available</option>
                )}
              </select>
            </div> : <div className="col-lg-6 mb-3"></div>}


            {formData["AirwayBillData"]["ProductType"] === "XPS" ? (
              <div className={formData["AirwayBillData"]["ServiceType"] !== "COD" ? "col-lg-12 mb-3" : "col-lg-6 mb-3"}>
                <input
                  type="number" onKeyDown={(e) => {
                    // Disable keyboard arrows
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                      e.preventDefault();
                    }
                  }}
                  onWheel={(e) => {
                    // Disable mouse wheel
                    e.target.blur();
                  }}
                  className="form-control"
                  placeholder={"Value Of Shipment"}
                  name="ShipmentInvoiceValue"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={formData["AirwayBillData"]["ShipmentInvoiceValue"]}
                />
              </div>) : (<div className="col-lg-6 mb-3">
              </div>)}

          </div>
          <div className="row d-flex  justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={"Instruction"}
                name="SpecialInstruction"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["SpecialInstruction"]}
              />
            </div>
            <div className="col-lg-6 mt-2">
              <Form.Check // prettier-ignore
                //   type={"checkbox"}
                onChange={handleDimesionChange}
                checked={isDimension}
                label={`I know the dimensions of my shipment`}
              />
            </div>
          </div>
          <div className="row d-flex  justify-content-center">
            <div className="col-lg-6 mb-3">
              <input
                type="text"
                className="form-control"
                placeholder={"Shipper Reference"}
                name="ShipperReference"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData["AirwayBillData"]["ShipperReference"]}
              />
            </div>
            <div className="col-lg-6 mt-2">
              {isDimension && (
                <div className="col-lg-12  mb-3">
                  <div className=" d-flex ">
                    <span style={{ position: 'relative', top: '15px', left: '-10px' }}> Dimesions {""}</span>
                    <span >
                      <input
                        type="number" onKeyDown={(e) => {
                          // Disable keyboard arrows
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => {
                          // Disable mouse wheel
                          e.target.blur();
                        }}
                        className="form-control"
                        placeholder={"L(cm)"}
                        name="L"
                        onChange={(e) => handleChangeDimension(e.target.name, e.target.value)}

                      />
                    </span>
                    <span >
                      <input
                        type="number" onKeyDown={(e) => {
                          // Disable keyboard arrows
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => {
                          // Disable mouse wheel
                          e.target.blur();
                        }}
                        className="form-control"
                        placeholder={"B(cm)"}
                        name="B"
                        onChange={(e) => handleChangeDimension(e.target.name, e.target.value)}
                      />
                    </span>
                    <span >
                      <input
                        type="number" onKeyDown={(e) => {
                          // Disable keyboard arrows
                          if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                            e.preventDefault();
                          }
                        }}
                        onWheel={(e) => {
                          // Disable mouse wheel
                          e.target.blur();
                        }}
                        className="form-control"
                        placeholder={"H(cm)"}
                        name="H"
                        onChange={(e) => handleChangeDimension(e.target.name, e.target.value)}
                      />
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row d-flex  justify-content-center">
            {formData["AirwayBillData"]["ServiceType"] === "COD" && (
              <div className="col-lg-6 mb-3">
                <input
                  type="number"
                  onKeyDown={(e) => {
                    // Disable keyboard arrows
                    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                      e.preventDefault();
                    }
                  }}
                  onWheel={(e) => {
                    // Disable mouse wheel
                    e.target.blur();
                  }}
                  className="form-control"
                  placeholder={"COD Amount"}
                  name="CODAmount"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  value={formData["AirwayBillData"]["CODAmount"] == 0 ? "" : formData["AirwayBillData"]["CODAmount"]}
                />
              </div>
            )}
            <div className="col-lg-6 mb-3">
            </div>
            {/* <div className="col-lg-6 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={"Shipper Address"}
                    name="ShipperAddress"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    value={formData["AirwayBillData"]["ShipperAddress"]}
                  />
                </div> */}

          </div>

        </div>

        {errors.loading ? (
          <Loader />
        ) : errors.error ? (
          <span className="text-danger">{errors.message}</span>
        ) : (
          <>
            {
              Data && (<>
                <span> {`Please Download Your Bill ${Data?.AirwayBillNumber ? Data.AirwayBillNumber : ''}`}</span>
                <select value={MultipleAirwayBillData.PrintType} onChange={(e) => setMultipleAirwayBillData(prev => ({ ...prev, PrintType: e.target.value }))}>
                  <option hidden>Select a file type</option>
                  <option value="A4">A4</option>
                  <option value="LABEL">Label</option>
                  {/* <option value="LABEL">LABEL</option> */}
                </select>
                <button
                  type="button"
                  className="bg-blue"
                  style={{ cursor: "pointer" }}
                  onClick={hanleDownloadAirwayBatchPdfFormate}>
                  Download
                </button>
              </>)
            }
          </>
        )}
      </div>

    </div>
  );
};

export default ShipmentInfo;
