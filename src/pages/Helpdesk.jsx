import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import { Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"


const HelpDesk = () => {

    const [activeTab, setActiveTab] = useState("guideline");
    const switchToGuideline = () => {
        setActiveTab("guideline");
    };

    const switchToDownload = () => {
        setActiveTab("download");
    };

    const switchToItem = () => {
        setActiveTab("item");
    };

    return (
        <div>
            <Helmet>
                <>
                    {/* HTML Meta Tags */}
                    <title>Help Desk | C3xpress</title>
                    <meta
                        name="description="
                        content="Visit our help desk for clear guidelines on shipping with C3X, including shipper and consignee details, AWB, invoices, declarations."
                    />
                    <link rel="https://www.c3xpress.com/help-desk" />
                    <meta name="og:site_name" content="C3xpress" />
                    <meta name="og:url" content="https://www.c3xpress.com/" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                    {/* Facebook Meta Tags */}
                    <meta property="og:url" content="https://www.c3xpress.com/" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Help Desk | C3xpress" />
                    <meta
                        property="og:description"
                        content="Visit our help desk for clear guidelines on shipping with C3X, including shipper and consignee details, AWB, invoices, declarations."
                    />
                    <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                    {/* Twitter Meta Tags */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="c3xpress.com" />
                    <meta property="twitter:url" content="https://www.c3xpress.com/" />
                    <meta name="twitter:title" content="Help Desk | C3xpress" />
                    <meta
                        name="twitter:description"
                        content="Visit our help desk for clear guidelines on shipping with C3X, including shipper and consignee details, AWB, invoices, declarations."
                    />
                    <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
                </>

            </Helmet>
            <Header1 />
            <div className="p-inner_head p-inner_contact">
                <div className="p-page_title">
                    <div className="container">
                        <ul className="p-breadcrumb">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <span>Help Desk</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section>
                <div className="p-page_inner ">
                    <div className="p-section_head">
                        <h1>Help Desk</h1>
                    </div>
                    <div className="justify-content-center">
                        <div >
                            <div className="container">
                                <div className="col-md-12 col-lg-12 ">
                                    <div className="text-center"> <span>
                                        <Button
                                            className={`btn btn-guideline  text-center pr-3 pl-3 mt-2 ${activeTab === "guideline" ? "active" : ""
                                                }`}
                                            style={{
                                                backgroundColor:
                                                    activeTab === "guideline" ? "skyblue" : "whitesmoke",
                                                color: activeTab === "guideline" ? "white" : "black",
                                                borderColor:
                                                    activeTab === "guideline" ? "skyblue" : "whitesmoke",
                                                borderRadius: "50px",
                                                marginTop: "0",
                                                margin: "1%",
                                                padding: "0px 7px", width: "200px",
                                                height: "38px",
                                            }}
                                            onClick={switchToGuideline}
                                        >
                                            <div style={{ fontSize: "15px", fontWeight: "500" }}>
                                                <i className="fa fa-book" ></i> Guideline
                                            </div>
                                        </Button>
                                        <Button
                                            className={`btn  btn-guideline   text-center pr-3 pl-3 mt-2 ${activeTab === "download" ? "active" : ""
                                                }`}
                                            style={{
                                                backgroundColor:
                                                    activeTab === "download" ? "skyblue" : "whitesmoke",
                                                color: activeTab === "download" ? "white" : "black",
                                                borderColor:
                                                    activeTab === "download" ? "skyblue" : "whitesmoke",
                                                borderRadius: "50px",
                                                margin: "1%",
                                                padding: "0px 7px",
                                                width: "200px",
                                                height: "38px",
                                            }}
                                            onClick={switchToDownload}
                                        >
                                            <div style={{ fontSize: "15px", fontWeight: "500" }}>
                                                <i className="fa fa-download "></i> Download
                                            </div>
                                        </Button>
                                        <Button
                                            className={`btn btn-guideline  text-center pr-3 pl-3 mt-2 ${activeTab === "item" ? "active" : ""
                                                }`}
                                            style={{
                                                backgroundColor:
                                                    activeTab === "item" ? "skyblue" : "whitesmoke",
                                                color: activeTab === "item" ? "white" : "black",
                                                borderColor:
                                                    activeTab === "item" ? "skyblue" : "whitesmoke",
                                                borderRadius: "50px",
                                                marginTop: "0",
                                                margin: "1%",
                                                padding: "0px 7px", width: "200px",
                                                height: "38px",
                                            }}
                                            onClick={switchToItem}
                                        >
                                            <div style={{ fontSize: "15px", fontWeight: "500" }}>
                                                <i className="fa fa-ban"></i> Prohibited Item
                                            </div>
                                        </Button>

                                    </span></div>
                                </div>
                            </div>
                            <div className=" container xd-container " >
                                <div className="container">
                                    <section
                                        id="guideline-section"
                                        className={
                                            activeTab === "guideline"
                                                ? "tab-content-active"
                                                : "d-none"
                                        }>

                                        <div className="mt-5 ">
                                            <Row>

                                                <Col lg={12} md={11} sm={12} xs={12} className="mb-3">
                                                    <div className="mb-4" style={{ fontSize: "35px", fontWeight: "500" }}><b>Guideline</b></div>
                                                    <div>
                                                        <ul>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i> Name and address of shipper including contact name and telephone number.</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i> Name and address of consignee including contact name and telephone number.</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i> C3X AWB.</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i> Invoice. (One original + three copies)</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i> Declaration.</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i>Packing list. (FUll description of contents of consignment)</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i>Why is the consignment being sent. (eg: Simple, repairs, etc.)</li>
                                                            <li className="font-size mb-2"><i className="fa fa-book m-2" ></i><span>For testing C3X Packing list. (FUll description of contents of<div>consignment)Packing list. (FUll description of contents of consignment)</div> </span></li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </section>
                                    <section
                                        id="download-section"
                                        className={
                                            activeTab === "download"
                                                ? "tab-content-active"
                                                : "d-none"

                                        }>
                                        <div className="mt-5"> <Row>

                                            <Col lg={11} md={11} sm={12} xs={12} className="mb-3">
                                                <div style={{ fontSize: "35px", fontWeight: "500" }} className="mb-3"><b>Download</b></div>
                                                <div>
                                                    <Row>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"><b>Online User Guide</b></Col>
                                                        <Col lg={6} md={6} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Online User Guide Prepaid Users</a></span></div></Col>
                                                        <Col lg={6} md={6} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Online User Guide Credit Users</a></span></div></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><b><a download href="/downloads/HScodeEN.pdf">Dubai Customs</a></b></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><b><a download href="/downloads/Indemnity-Letter_DHL.doc">Indemnity Letter</a></b></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }}>Dubai Customs</a></span></div></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Indemnity Letter</a></span></div></Col>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"><b>KYC</b></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }}  >individual</a></span></div></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }}  >Company</a></span></div></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Authority Letter</a></span></div></Col>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"><b>Packaging Guidelines</b></Col>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Packaging Guidelines</a></span></div></Col>
                                                        <Col lg={12} md={12} sm={12} xs={12} className="mb-3"><b>Proforma</b></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Proforma Invoice-Excel</a></span></div></Col>
                                                        <Col lg={6} md={12} sm={12} xs={12} className="mb-3"><div className="download-help"><span><a style={{ cursor: "pointer" }} >Proforma Invoice-Word</a></span></div></Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row></div>
                                    </section>
                                    <section
                                        id="item-section"
                                        className={
                                            activeTab === "item"
                                                ? "tab-content-active"
                                                : "d-none"
                                        }>
                                        <div className="mt-5 "> <Row className="custom">

                                            <Col lg={12} md={12} sm={12} xs={12} className="mb-3">
                                                <div style={{ fontSize: "35px", fontWeight: "500" }}><b>Prohibited Item</b></div>
                                                <div className="mt-3">
                                                    <Row>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3" ><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img1} /> */}
                                                        </div> <div>Alcoholic Beverages</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img2} /> */}
                                                        </div> <div>Furs</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img3} /> */}
                                                        </div> <div>Plants</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img4} /> */}
                                                        </div> <div>Animal Products</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img5} /> */}
                                                        </div> <div>Hazardous Materials</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img6} /> */}
                                                        </div> <div>Pornographic Materials</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img7} /> */}
                                                        </div> <div> Articles Of Unusual Value</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img8} /> */}
                                                        </div> <div>Ivory</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img9} /> */}
                                                        </div> <div>Poisonous Articles</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img10} /> */}
                                                        </div> <div>Precious & Semi Precious Items</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img11} /> */}
                                                        </div> <div>Live Animals</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img12} /> */}
                                                        </div> <div>Indian Postal Departments Items</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img13} /> */}
                                                        </div> <div>Currency</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img15} /> */}
                                                        </div> <div>Negotiable Bonds / Drafts</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img16} /> */}
                                                        </div> <div>Corrosive Materials</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img17} /> */}
                                                        </div> <div>Dangerous Goods</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img18} /> */}
                                                        </div> <div>Perishables</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img19} /> */}
                                                        </div> <div>Radioactive Materials</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img19} /> */}
                                                        </div> <div>Firearms</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img20} /> */}
                                                        </div> <div>Persian Rugs</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img21} /> */}
                                                        </div> <div>Liquids And Semi Liquids</div></div></Col>

                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img22} /> */}
                                                        </div> <div>Firearm Parts</div></div></Col>
                                                        <Col lg={4} md={4} sm={12} xs={12} className="p-3"><div className=" d-flex"><div className="img-circle" >
                                                            {/* <img alt="img1" src={img23} /> */}
                                                        </div> <div>Personal Effects</div></div></Col>

                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>

            <Footer />
        </div>
    )


}

export default HelpDesk