import React from 'react'
import { useSelector } from 'react-redux';
import { Row, Col } from "react-bootstrap";

const History = ({ AwbDetails }) => {
    const { data } = useSelector((state) => state.TrackingDetailsReducer)
    let [{ AirWayBillNo = "", Destination = "", ForwardingNumber = "", Origin = "", ShipmentProgress = 0, ShipperReference = "", TrackingLogDetails = [] }] = data

    return (
        <div className='blocks-tab overflow-y-auto'>
            <div className="h-full overflow-hidden">
                <div className="p-4">
                    <div className="overflow-y-auto h-[calc(100%-3rem)] px-4 pb-4">
                        <div className="space-y-4">
                            {[...TrackingLogDetails]?.map((event, index) => (
                                <div key={index} className="d-flex ">
                                    <div className="block-one mb-2 ">
                                        <p className="mt-1 mb-0 text-end">{event.ActivityDate}</p>
                                        <p className="text-gray-600 text-end mb-1">{event.ActivityTime}</p>
                                    </div>
                                    <div className=" flex align-items-center mr-4">
                                        <div className="timeline-dot "></div>
                                        <div className="timeline-line "></div>

                                    </div>
                                    <div className="block-two mb-2">
                                        <p className="mt-1 mb-0">{
                                            event.Status === "POD" ? AwbDetails.Remarks :
                                                event.Remarks}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default History