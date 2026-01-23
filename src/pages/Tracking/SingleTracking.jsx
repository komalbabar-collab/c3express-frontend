import { useState } from 'react'
import { setTrackingDetails } from '../../redux/reducers/TrackingDetailsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useTrackByReferenceMutation, useTrackByTrackingMutation, useTrackbybookingMutation } from '../../service/apiServices';
const SingleTracking = () => {
    const dispatch = useDispatch()
    const trackingDetailsState = useSelector((state) => state.TrackingDetailsReducer)
    const [trackByReference] = useTrackByReferenceMutation();
    const [trackByTracking] = useTrackByTrackingMutation();
    const [Trackbybooking] = useTrackbybookingMutation();
    const [TrackingData, setTrackingData] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'trackingType') {
            dispatch(setTrackingDetails({ trackingType: value }))
        } else {
            setTrackingData((prev) => ({ ...prev, [name]: value }))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (TrackingData.airWayBillNo) {
            const data = {
                "TrackingAWB":
                    [
                        {
                            "AirWayBillNo": TrackingData.airWayBillNo
                        }
                    ],
            }
            dispatch(setTrackingDetails({ error: false, loading: true }));

            try {
                const res = await (trackingDetailsState.trackingType === 'Reference'
                    ? trackByReference(data).unwrap() : trackingDetailsState.trackingType === 'Booking' ? Trackbybooking(data).unwrap()
                        : trackByTracking(data).unwrap());

                dispatch(setTrackingDetails({
                    data: res.data.AirwayBillTrackList,
                    error: false,
                    loading: false,
                }));

                const element = document.getElementById('trackingResultDiv');
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } catch (error) {
                console.error(error);

                dispatch(setTrackingDetails({ data: [], error: true, loading: false, message: error.data?.message }));
            }
        } else {
            toast.error('Please Enter Tracking Id');
        }
    };
    return (
        <form
            className="form-inline "
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
        >
            <div className="col-md-5 md-input-wrapper form-group for_form_input">
                <input
                    type="text"
                    className="md-form-control"
                    name="airWayBillNo"
                    id="airWayBillNo"
                    value={TrackingData.airWayBillNo}
                    onChange={handleChange}
                    placeholder="Enter your tracking id here"
                    required={true}
                />
            </div>
            <div className="col-md-4 md-input-wrapper form-group for_form_input">
                <select
                    className="md-form-control"
                    name="trackingType"
                    id="trackingType"
                    required=""
                    value={TrackingData.trackingType}
                    onChange={handleChange}
                >
                    <option
                        className="md-form-control-select"
                        value={"Airwaybill"}

                    >
                        Airwaybill Number
                    </option>
                    <option
                        className="md-form-control-select"
                        value={"Reference"}
                        disabled=""
                    >
                        Reference Number
                    </option>
                    <option
                        className="md-form-control-select"
                        value={"Booking"}
                        disabled=""
                    >
                        Booking Number
                    </option>
                </select>
            </div>
            <div className="col-md-3">
                <button onClick={handleSubmit} type="submit" className=" btn btn-tracking w-100 mt-3">
                    Track
                    <i className="fa fa-arrow-right" />
                </button>
            </div>
            {/* <div className="col-md-12 text-left mt-2">
                <a
                    href="javascript: void(0);"
                    className="multiple-link-awb"
                    id="trackform-label1"
                >
                    Multiple tracking numbers{" "}
                </a>
            </div> */}
        </form>
    )
}

export default SingleTracking