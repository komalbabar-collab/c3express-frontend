import React, { useState } from 'react'
import SmallLoader from '@/heplers/Loaders/SmallLoader';
import ErrorComponent from '@/heplers/ErrorComponent';
import { APi_Url } from '@/service/apiServices';
import { toast } from 'react-toastify';

const AirWayBillPrint = ({ AccountNo }) => {

    const [printState, setPS] = useState({ abn: "", printType: "A4", error: null, loading: false, response: "" });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPS(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        try {
            setPS(prev => ({ ...prev, loading: true }));
            const payload = { AccountNo: AccountNo, AirwayBillNumber: printState.abn, RequestUser: "", Country: "AE", PrintType: printState.printType };
            fetch(APi_Url + "AirwayBillPDFFormat", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })
                .then(async response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok")
                    };

                    // Determine file type from Content-Type header
                    const contentType = response.headers.get('Content-Type');

                    // Handle JSON response (error case)
                    if (contentType.includes('application/json')) {
                        const jsonData = await response.json();
                        if (jsonData.error || !jsonData.data) {
                            throw new Error(jsonData.message || "No data found");
                        }
                        toast.info("No record found!")
                        setPS((prev) => ({ ...prev, response: jsonData.data }))
                        return null;
                    }

                    // Handle file download
                    const contentDisposition = response.headers.get('Content-Disposition');
                    let filename = 'AirwayBill';

                    // Get file extension
                    if (contentType.includes('pdf')) {
                        filename += '.pdf';
                    } else if (contentType.includes('spreadsheetml')) {
                        filename += '.xlsx';
                    }

                    // Get filename from header if available
                    if (contentDisposition) {
                        const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                        if (filenameMatch && filenameMatch[1]) {
                            filename = filenameMatch[1].replace(/['"]/g, '');
                        }
                    }

                    const blob = await response.blob();
                    return { blob, filename };
                })
                .then(result => {
                    if (!result) {
                        return; // JSON response case, already handled
                    }

                    // Handle file download
                    const { blob, filename } = result;
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                })
                .catch(error => {
                    console.error('Error downloading the file:', error);
                    setPS(prev => ({
                        ...prev,
                        error: { message: error.message || "Download failed" }
                    }));
                    toast.error(error.message || "Download failed");
                });
        } catch (error) {
            setPS(prev => ({
                ...prev,
                loading: false,
                error: { message: error.message || "Download failed" }
            }));
            toast.error(error.message || "Download failed");
        } finally {
            setPS(prev => ({ ...prev, loading: false }));
        }
    };

    return (
        <>
            <div className="row  mt-5 mb-5" style={{ justifyContent: "center" }}  >
                <div className="col-auto">
                    <label
                        htmlFor="inputPassword6"
                        className="col-form-label"
                    >
                        AWB Number
                    </label>
                </div>
                <div className="col-auto d-flex">
                    <input
                        type="text"
                        name="abn"
                        onChange={handleChange}
                        value={printState.abn}
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                    />
                    <select
                        name='printType'
                        onChange={handleChange}
                        className="form-select" aria-label="Default select example"
                    >
                        <option hidden>Select a file type</option>
                        <option value="LABEL">Label</option>
                        <option value="A4">A4</option>
                        <option value="XLSX">XLSX</option>
                    </select>

                    <button onClick={handleSubmit} className="searchbb">
                        Download
                    </button>
                </div>
            </div>
            {
                printState.loading
                    ? <SmallLoader />
                    : printState.error
                        ? <ErrorComponent message={printState.error.message} />
                        : printState.response
                            ? <span>No record Found</span>
                            : <></>
            }
        </>
    )
}

export default AirWayBillPrint