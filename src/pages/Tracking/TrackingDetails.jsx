import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBillingId, setTrackingDetails } from '../../redux/reducers/TrackingDetailsReducer'
import TrackingTable from './TrackingTable';
import Loader from '../../heplers/Loaders/Loader';
import ErrorComponent from '../../heplers/ErrorComponent';
import { toast } from 'react-toastify';
import logo from '../../assets/images/c3express-logo.png'
const TrackingDetails = () => {


    const dispatch = useDispatch()
    const trackingDetailsState = useSelector((state) => state.TrackingDetailsReducer)
    const [shownDetails, setShownDetails] = useState({})
    const handleShow = (id) => {
        setShownDetails(prevDetails => ({
            ...prevDetails,
            [id]: !prevDetails[id]
        }));
        dispatch(setBillingId(id))
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        trackingDetailsState.error && toast.error(trackingDetailsState.message)
    }, [trackingDetailsState.error])
    const moveToTrackShipment = () => {
        dispatch(setTrackingDetails({ data: [], error: false, loading: false }))
        const element = document.getElementById("trackingshipment");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className='container'>
                <div className="row" id="trackingResultDiv">
                    <div className="w-100  mt-3 ">

                        {trackingDetailsState.loading ? (<Loader />) : trackingDetailsState.error ? (<></>) : trackingDetailsState.data.length > 0 ?
                            (

                                <>
                                    <div className="pl-3 text-center track-another-shipment mb-3">
                                        <span className="sub-title pt-2">Result Summary</span>
                                        <button
                                            type="button"
                                            onClick={moveToTrackShipment}
                                            className="btn btn-tracking bg-blue text-center remove-trck pr-3 pl-3 p-2"
                                        >
                                            Track Another Shipment
                                        </button>
                                    </div>
                                    {
                                        (trackingDetailsState.data.map((item, index) => {
                                            if (!item.TrackingLogDetails) {
                                                return (<>
                                                    <div key={index} className="col-md-12">
                                                        <div className="media">
                                                            <div className="position-relative 
                                                                 w-100">
                                                                <div className="summary-forbss">
                                                                    <b>Airway Bill No : {item?.AirWayBillNo}</b>
                                                                    <br />
                                                                    <br />
                                                                    <br />
                                                                    <p>This tracking number is not found, please check again later or contact the sender.</p>
                                                                </div>


                                                                <div>

                                                                </div>

                                                            </div>
                                                            .
                                                        </div>


                                                    </div>
                                                </>)
                                            } else {
                                                return (
                                                    <>

                                                        <div key={index} className="col-md-12">
                                                            <div className="media">
                                                                <div className="position-relative 
                                                                 w-100">
                                                                    <div className="summary-forbss">
                                                                        <b>Airway Bill No : {item?.AirWayBillNo}</b>
                                                                        {trackingDetailsState.data.length > 1 && (

                                                                            <a style={{ float: "right", color: "#000", cursor: "pointer" }} onClick={() => handleShow(item?.AirWayBillNo)} >
                                                                                {shownDetails[item?.AirWayBillNo] ? 'Hide Details' : 'Show Details'}
                                                                            </a>

                                                                        )
                                                                        }
                                                                    </div>


                                                                    <div>

                                                                    </div>

                                                                </div>
                                                                .
                                                            </div>
                                                            <div className="media d-flex result-summary-status inactive-grey mt-5">
                                                                <div className="title-hold">
                                                                    {
                                                                        item.TrackingLogDetails && item.TrackingLogDetails.length > 0 && (
                                                                            <h4 className="green-title">{item.TrackingLogDetails[0].Remarks}
                                                                                {
                                                                                    item.TrackingLogDetails[0]["DeliveredTo"] ? `- ${item.TrackingLogDetails[0]["DeliveredTo"]}` : ''
                                                                                }
                                                                            </h4>
                                                                        )
                                                                    }

                                                                    <h6>
                                                                        <span className="para-1">
                                                                            Origin :{item?.Origin} {" "}
                                                                            <span className="para-1">
                                                                                Destination : {item?.Destination}
                                                                            </span>
                                                                        </span>
                                                                    </h6>
                                                                    {item.TrackingLogDetails && item.TrackingLogDetails.length > 0 && (
                                                                        <p>
                                                                            <span className="delivery-date">{item?.TrackingLogDetails[0]["ActivityDate"]}</span>
                                                                            <span className="delivery-time right-border"> {item?.TrackingLogDetails[0]["ActivityTime"]}</span>
                                                                            <span className="destination">{item?.TrackingLogDetails[0]["Location"]}</span>
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="step-counter">
                                                                <div className="stepper-wrapper">
                                                                    <div className={`stepper-item  ${item.ShipmentProgress > 0 && 'completed'} active margin-left-10`}>
                                                                        <div className="step-counter">✓</div>
                                                                    </div>
                                                                    <div className={`stepper-item  ${item.ShipmentProgress > 1 && 'completed'} active`}>
                                                                        <div className="step-counter">✓</div>
                                                                    </div>
                                                                    <div className={`stepper-item  ${item.ShipmentProgress > 2 && 'completed'} active`}>
                                                                        <div className="step-counter">✓</div>
                                                                    </div>
                                                                    <div className={`stepper-item   ${item.ShipmentProgress > 3 && 'completed'} active`}>
                                                                        <div className="step-counter">✓</div>
                                                                    </div>
                                                                    <div className={`stepper-item  ${item.ShipmentProgress > 4 && 'completed'}  margin-right-10`}>
                                                                        <div className="step-counter">✓</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="panel-body" id={item?.AirWayBillNo}>
                                                                <div className="card-body summary-details-tabs">
                                                                    {trackingDetailsState.data.length == 1 ? (
                                                                        <div className="table-responsivess">
                                                                            {item.TrackingLogDetails && item.TrackingLogDetails.length > 0 ? (<TrackingTable key={index} trackingLogDetails={item.TrackingLogDetails} />) : <>
                                                                            </>
                                                                            }
                                                                        </div>
                                                                    ) : shownDetails[item?.AirWayBillNo] && (
                                                                        <div className="table-responsivess">
                                                                            {item.TrackingLogDetails && item.TrackingLogDetails.length > 0 ? (<TrackingTable key={index} trackingLogDetails={item.TrackingLogDetails} />) : <>
                                                                            </>
                                                                            }
                                                                        </div>
                                                                    )}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }

                                        }))
                                    }
                                </>)
                            : <>

                            </>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default TrackingDetails