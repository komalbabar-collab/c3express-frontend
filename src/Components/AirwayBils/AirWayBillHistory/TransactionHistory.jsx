import React, { useState } from "react";
import { Modal, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import Brief from "../AirWayBillHistory/Brief"
import History from "../AirWayBillHistory/History"
import { useSelector } from "react-redux";
import moment from "moment";
import POD from "./POD";
import POA from "./POA";
import.meta.env.VITE_IMAGE_STORAGE_API
const TransactionHistory = ({ AwbDetails, onClose }) => {

    const { data, loading, error } = useSelector((state) => state.TrackingDetailsReducer)
    const [key, setKey] = useState("home");
    const [activeTab, setActiveTab] = useState("tab1");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    return (
        <Modal className="transaction" show={true} onHide={onClose} centered size="lg">
            <Modal.Header className="d-block pb-0">

                <br />
                <Row style={{ width: "100%" }}>
                    <Col lg={3} md={6}>
                        <h6 className="text-dark">Tracking: {AwbDetails?.Awbno}</h6>
                        <h6 className="text-dark">Shipper Ref : {AwbDetails?.ShipperReference}</h6>

                    </Col>
                    <Col lg={3} md={6}>
                        <div className="d-inline-flex">
                            <div className="tracking-icons">
                                <i className="fa fa-plus"></i>
                            </div>
                            <span className="mx-2">
                                <h6 className="text-dark">Status</h6>
                                <h6 className="text-dark">{AwbDetails?.Status}</h6>
                            </span>
                        </div>

                    </Col>
                    <Col lg={3} md={6}>
                        <div className="d-inline-flex">
                            <div className="tracking-icons">
                                <i className="fa fa-arrow-up"></i>
                            </div>

                            <span className="mx-2">
                                <h6 className="text-dark">   Airway Created on</h6>
                                <h6 className="text-dark"> {AwbDetails?.Dated}</h6>
                            </span>
                        </div>

                    </Col>
                </Row>
                <br />

                <div className="tab-buttons transaction d-inline-flex">
                    <div
                        className={activeTab === "tab1" ? "active" : ""}
                        onClick={() => handleTabClick("tab1")}
                    >
                        <h6 className="text-dark headtab"> Summary</h6>
                    </div>
                    <div
                        className={activeTab === "tab2" ? "active" : ""}
                        onClick={() => handleTabClick("tab2")}
                    >
                        <h6 className="text-dark headtab">  History </h6>

                    </div>
                    <div
                        className={activeTab === "tab3" ? "active" : ""}
                        onClick={() => handleTabClick("tab3")}
                    >
                        <h6 className="text-dark headtab"> POD</h6>
                    </div>
                    <div
                        className={activeTab === "tab4" ? "active" : ""}
                        onClick={() => handleTabClick("tab4")}
                    >
                        <h6 className="text-dark headtab"> Proof Of Attempt</h6>
                    </div>
                    <div>
                        <h6 className="text-dark headtab">Transaction History for AWB No: {AwbDetails?.Awbno}</h6>
                    </div>

                </div>

            </Modal.Header>
            <Modal.Body>
                <div className="tabs-container">


                    {/* Tab content */}
                    <div className="tab-content">
                        {activeTab === "tab1" && (
                            <div>
                                <Brief AwbDetails={AwbDetails} />
                            </div>
                        )}
                        {activeTab === "tab2" && (
                            <div>
                                {data.length > 0 && <History AwbDetails={AwbDetails} />}
                            </div>
                        )}
                        {activeTab === "tab3" && (
                            <div className="blocks-tab">
                                <p className="text-dark">Proof of Delivery.</p>
                                <POD AwbDetails={AwbDetails} />
                            </div>
                        )}
                        {activeTab === "tab4" && (
                            <div className="blocks-tab">
                                {/* <p className="text-dark">Proof of Attempt.</p> */}
                                <POA AwbDetails={AwbDetails} />
                            </div>
                        )}

                    </div>
                </div>

            </Modal.Body>

        </Modal>
    );


};

export default TransactionHistory;
