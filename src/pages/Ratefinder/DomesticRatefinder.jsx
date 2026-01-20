import logo from "../../assets/images/logo.png"
import { useGetActiveServiceTypesDataQuery, useGetCountryMasterQuery, usePostCityListMutation, usePostRateFInderMutation } from "../../service/apiServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import Header from "../../Components/Common/Header"
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Link, useNavigate } from "react-router-dom"
import useFormSubmission from "../../hooks/useFormSubmission"
import Footer from "../../Components/Common/Footer"
const DomesticRatefinder = () => {
    const [showModal, setShowModal] = useState(false);
    const handleLaunchModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };
    const userData = useSelector((state) => state.UserReducer);
    const { data, error, isLoading, refetch } = useGetActiveServiceTypesDataQuery();
    const [ShipmentType, setActiveTab] = useState("dom")
    const [dimension, setdimenstion] = useState({
        L: 0,
        B: 0,
        H: 0
    })
    var { Data, setFormData, formData, errors, handleSubmit, handleChange } = useFormSubmission(usePostRateFInderMutation, {
        Destination: "",
        Dimension: dimension.L !== "" && dimension.B !== "" && dimension.H !== "" ? `${dimension.L}x${dimension.B}x${dimension.H}` : "",
        Origin: "AE",
        Product: "",
        ServiceType: "",
        Weight: "",
        Country: "AE"
    })
    const CountryMaster = useGetCountryMasterQuery("");
    const CityHandle = useFormSubmission(usePostCityListMutation, {
        Country: "AE",
    });
    useEffect(() => {
        CityHandle.handleSubmit()
    }, [])
    const [IsDimension, setisDimension] = useState(false)
    const handleDimesionChange = () => {
        setisDimension(!IsDimension)
    }
    const handleChangeDimension = (name, value) => {
        let nam = name;
        if (nam === "L") {
            nam = "Length"
        } else if (nam === "B") {
            nam = "Breadth"
        } else if (nam === "H") {
            nam = "Height"
        }

        if (value === "") {
            toast.error("Please enter " + nam);
        } else {
            // Update the dimension state
            setdimenstion(prevDim => ({
                ...prevDim,
                [name]: value
            }));
            const dimensionWeight = dimension.L * dimension.B * dimension.H
            // Wait for the dimension state to update

            // Update formData with the new dimensions
            setTimeout(() => {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    Dimension: `${dimension.L}x${dimension.B}x${dimension.H}`,
                    // Weight: dimensionWeight
                }));
            }, 0);

        }
    };
    useEffect(() => {
        if (ShipmentType === "inter") {
            setFormData(prevFormData => ({
                ...prevFormData,
                ServiceType: "NOR"
            }));
        } else if (ShipmentType === "dom") {
            setFormData(prevFormData => ({
                ...prevFormData,
                Country: "AE"

            }));
        }
        if (errors.error) {
            toast.error(errors.message)
        }
        else if (Data) {
            handleLaunchModal()
        }
    }, [ShipmentType, errors, Data])
    const navigate = useNavigate()
    return (
        <div>
            <Header />
            <section>
                {/* <h3>Rate Calculator
                </h3> */}

                <div style={{ paddingTop: "70px" }} className="p-page_inner contact_page_cover">
                    <Link to={"/"}>

                        <img style={{ marginLeft: '20px', width: '100px' }} src={logo} />
                    </Link>

                    <div className="container p-content_section p-contact">
                        <Tabs
                            defaultActiveKey={ShipmentType}
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            style={{ justifyContent: "center" }}
                        >
                            <Tab eventKey={"inter"} onClick={() => navigate("/InternationalRatefinder")} title="International">
                                <div className="row clearfix" style={{ justifyContent: 'center' }}>
                                    <div className="col-md-8 col-lg-8 contact_form rate_finder">
                                        <form
                                            method="post"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="footer_form_outer">
                                                <label>Origin Country</label>
                                                <select
                                                    name="Origin"
                                                    onChange={(e) => {
                                                        handleChange(e.target.name, e.target.value)
                                                        handleChange("Country", e.target.value)
                                                    }}
                                                    value={formData["Origin"]}
                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Country </option>
                                                    {!CountryMaster.isLoading && CountryMaster.data && CountryMaster.data.data.CountryListLocation
                                                        && CountryMaster.data.data.CountryListLocation.length > 0 ?
                                                        CountryMaster.data.data.CountryListLocation.map((item, index) => (
                                                            <option value={item.CountryCode}>{item.CountryName}</option>
                                                        )) :
                                                        <option value={""}>{"No Options Available"}</option>
                                                    }
                                                </select>
                                                <label>Destination Country</label>
                                                <select
                                                    name="Destination"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["Destination"]}
                                                    className="form-control"
                                                >
                                                    <option value={""}>Select Destination </option>
                                                    {!CountryMaster.isLoading && CountryMaster.data && CountryMaster.data.data.CountryListLocation
                                                        && CountryMaster.data.data.CountryListLocation.length > 0 ?
                                                        CountryMaster.data.data.CountryListLocation.map((item, index) => (
                                                            <option value={item.CountryCode}>{item.CountryName}</option>
                                                        )) :
                                                        <option value={""}>{"No Options Available"}</option>
                                                    }
                                                </select>
                                                <label>What are you shipping</label>
                                                <select
                                                    className="form-control"
                                                    name="Product"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["Product"]}

                                                >
                                                    <option value={""}>Choose  Product </option>
                                                    <option value={"DOX"}>Documents</option>
                                                    <option value={"XPS"}>Parcels</option>
                                                </select>
                                                {/* <label>Service Type</label>
                                        <select
                                            className="form-control"
                                            name={"ServiceType"}
                                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                                            value={formData["ServiceType"]}
                                        >
                                            <option value={""}>Select Service Type</option>
                                            {data && data.data.ServiceType && data.data.ServiceType.length > 0 ? data.data.ServiceType.map((item, index) => {
                                                return <option value={item.value}>{item.title}</option>;
                                            }) : <option> No Options Available</option>}
                                        </select> */}
                                                <label>Weight</label>
                                                <input
                                                    className="form-control"
                                                    name="Weight"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    autoComplete="off"
                                                    value={formData["Weight"]}
                                                    required=""
                                                    placeholder="Weight(kgs)"
                                                    type="text"
                                                />

                                                <input // prettier-ignore

                                                    type="checkbox"
                                                    onChange={handleDimesionChange}
                                                    checked={IsDimension}

                                                />
                                                <span>I know the dimensions of my shipment</span>

                                                {IsDimension && (
                                                    <div className="col-lg-12  mb-2">
                                                        <div className=" d-flex ">
                                                            <span style={{ position: 'relative', top: '7px', left: '-10px', marginBottom: '10px', fontSize: '15px', fontWeight: '500', color: 'black' }}> Dimesions {""}</span>
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
                                                                    onChange={(e) => handleChangeDimension("L", e.target.value)}
                                                                    className="form-control"
                                                                    placeholder={"L(cm)"}

                                                                />
                                                            </span>
                                                            <span >
                                                                <input
                                                                    onChange={(e) => handleChangeDimension("B", e.target.value)}
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

                                                                />
                                                            </span>
                                                            <span >
                                                                <input
                                                                    onChange={(e) => handleChangeDimension("H", e.target.value)}
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

                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="form_submit_btn">
                                                    <input name="" defaultValue="Submit" type="button" onClick={handleSubmit} />
                                                </div>
                                                {/* {Data && showModal && (<div>

                                                    <div
                                                        className="modal fade show"
                                                        tabIndex={-1}
                                                        role="dialog"
                                                        style={{ display: "block" }}
                                                    >
                                                        <div
                                                            className="modal-dialog modal-dialog-centered"
                                                            role="document"
                                                        >
                                                            <div className="modal-content">
                                                                <div className="modal-body" style={{ padding: '30px' }}>
                                                                    <button
                                                                        type="button"
                                                                        className="close"
                                                                        onClick={handleCloseModal}
                                                                        aria-label="Close" style={{ border: "none", backgroundColor: "white" }}
                                                                    >
                                                                        <span aria-hidden="true">×</span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-tracking bg-blue pr-3 pl-3 mt-2 "
                                                                    >
                                                                        <Link
                                                                            to="/Bookshipment"
                                                                            style={{ color: "white" }}
                                                                        >
                                                                            {" "}
                                                                            Sign in as Guest
                                                                        </Link>
                                                                    </button>

                                                                    <div className="p-2">OR</div>
                                                                    <button
                                                                        onClick={() => navigate("/Register")}
                                                                        type="button"
                                                                        className="btn btn-tracking bg-blue pr-3 pl-3 mt-2"
                                                                        style={{ color: "white", borderRadius: "22px" }}
                                                                    >
                                                                        Sign up for New Account
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>)} */}
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey={"dom"} onClick={() => navigate("/Ratefinder")} title="Domestic" >
                                <div className="row clearfix" style={{ justifyContent: 'center' }}>
                                    <div className="col-md-8 col-lg-8 contact_form rate_finder">
                                        <form
                                            method="post"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="footer_form_outer">
                                                <label>Origin City</label>
                                                <select
                                                    name="Origin"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["Origin"]}
                                                    className="form-control"
                                                >
                                                    <option value={""}>From  </option>
                                                    {!CityHandle.errors.loading &&
                                                        CityHandle.Data &&
                                                        CityHandle.Data.CityListLocation &&
                                                        CityHandle.Data.CityListLocation.length > 0 ? (
                                                        CityHandle.Data.CityListLocation.map((item, index) => (
                                                            <option value={item.CityCode} id={item.CityCode}>{item.CityName}</option>
                                                        ))
                                                    ) : (
                                                        <option value={""}>No City Found</option>
                                                    )}
                                                </select>
                                                <label>Destination Origin City</label>
                                                <select
                                                    name="Destination"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["Destination"]}
                                                    className="form-control"
                                                >
                                                    <option value={""}>From  </option>
                                                    {!CityHandle.errors.loading &&
                                                        CityHandle.Data &&
                                                        CityHandle.Data.CityListLocation &&
                                                        CityHandle.Data.CityListLocation.length > 0 ? (
                                                        CityHandle.Data.CityListLocation.map((item, index) => (
                                                            <option value={item.CityCode} id={item.CityCode}>{item.CityName}</option>
                                                        ))
                                                    ) : (
                                                        <option value={""}>Destination Not FOund</option>
                                                    )}
                                                </select>
                                                <label>What are you shipping</label>
                                                <select
                                                    className="form-control"
                                                    name="Product"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["Product"]}
                                                >
                                                    <option value={""}>Choose  Product </option>
                                                    <option value={"DOX"}>Documents</option>
                                                    <option value={"XPS"}>Parcels</option>
                                                </select>
                                                <label>Service Type</label>
                                                <select
                                                    className="form-control"
                                                    name={"ServiceType"}
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    value={formData["ServiceType"]}
                                                >
                                                    <option value={""}>Select Service Type</option>
                                                    {data && data.data.ServiceType && data.data.ServiceType.length > 0 ? data.data.ServiceType.map((item, index) => {
                                                        return <option value={item.value}>{item.title}</option>;
                                                    }) : <option> No Options Available</option>}
                                                </select>
                                                <label>Weight</label>
                                                <input
                                                    className="form-control"
                                                    name="Weight"
                                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                                    autoComplete="off"
                                                    defaultValue={formData["Weight"]}
                                                    required=""
                                                    placeholder="Weight(kgs)"
                                                    type="text"
                                                />

                                                <input // prettier-ignore

                                                    type="checkbox"
                                                    onChange={handleDimesionChange}
                                                    checked={IsDimension}

                                                />
                                                <span>I know the dimensions of my shipment</span>

                                                {IsDimension && (
                                                    <div className="col-lg-12  mb-2">
                                                        <div className=" d-flex ">
                                                            <span style={{ position: 'relative', top: '7px', left: '-10px', marginBottom: '10px', fontSize: '15px', fontWeight: '500', color: 'black' }}> Dimesions {""}</span>
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
                                                                    onChange={(e) => handleChangeDimension("L", e.target.value)}
                                                                    className="form-control"
                                                                    placeholder={"L(cm)"}

                                                                />
                                                            </span>
                                                            <span >
                                                                <input
                                                                    onChange={(e) => handleChangeDimension("B", e.target.value)}
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

                                                                />
                                                            </span>
                                                            <span >
                                                                <input
                                                                    onChange={(e) => handleChangeDimension("H", e.target.value)}
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

                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="form_submit_btn">
                                                    <input name="" defaultValue="Submit" type="button" onClick={handleSubmit} />
                                                </div>
                                                {/* {Data && (<div>
                                                    <h6 style={{ marginTop: "10px" }}> <Link to="/Bookshipment" state={{ ...formData, NetAmount: Data.NetAmount, ShipmentType, ProductType: formData.Product }}>Book Shipment{"AED " + Data.NetAmount}</Link></h6>
                                                </div>)} */}

                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </Tab>

                        </Tabs>

                    </div>
                </div>
            </section>
            <>
                {Data && showModal && (<div>

                    <div
                        className="modal fade show"
                        tabIndex={-1}
                        role="dialog"
                        style={{ display: "block" }}
                    >
                        <div
                            className="modal-dialog modal-dialog-centered"
                            role="document"
                        >
                            <div className="modal-content">
                                <div className="modal-body" style={{ padding: '30px' }}>
                                    <button

                                        type="button"
                                        className="close"
                                        onClick={handleCloseModal}
                                        aria-label="Close" style={{ border: "none", backgroundColor: "white" }}
                                    >
                                        <span aria-hidden="true">×</span>

                                    </button>

                                    <>
                                        <p style={{ textAlign: "center", fontSize: "x-large" }}>{Data.NetAmount}<b> AED</b></p>
                                        <button
                                            style={{ margin: "auto", display: "block", width: "50%" }}
                                            type="button"
                                            className="btn btn-tracking bg-blue pr-3 pl-3 mt-2 "
                                        >

                                            <Link to="/Bookshipment" state={{ ...formData, NetAmount: Data.NetAmount, ShipmentType, ProductType: formData.Product }}>Book Shipment</Link>
                                        </button>
                                    </>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </>
            <Footer />
        </div>
    )
}

export default DomesticRatefinder