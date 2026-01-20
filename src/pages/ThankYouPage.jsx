import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePostasaGuestSchedulePickupDataMutation } from '../service/apiServices';
import Loader from '../heplers/Loaders/Loader';

const ThankYouPage = () => {
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const handleGoback = () => {
        localStorage.removeItem("pickupRequestNo")
        localStorage.removeItem('order')
        navigate("/Bookshipment")
    }
    const { id } = useParams()
    const [PickuRequstNumber, setPickuRequstNumber] = React.useState('')
    const [postAsGuestSchedulePickupData, { isLoading, isSuccess }] = usePostasaGuestSchedulePickupDataMutation();
    useEffect(() => {
        if (id === "cancelled") {
            handleGoback()
        }
        if (id === "authorised") {
            if (!state) {
                if (localStorage.getItem('order')) {
                    // localStorage.removeItem('order')
                    let data = JSON.parse(localStorage.getItem('order'))
                    postAsGuestSchedulePickupData(data).unwrap().then((res) => {

                        setPickuRequstNumber(res.data.PickupRequestNo)
                        localStorage.setItem("pickupRequestNo", res.data.PickupRequestNo)

                        localStorage.removeItem('order')
                    }
                    ).catch((err) => {
                        console.error(err)
                    })
                }
            } else if (state) {
                setPickuRequstNumber(state.PickupRequestNo)
            } else if (localStorage.getItem('pickupRequestNo')) {
                setPickuRequstNumber(localStorage.getItem('pickupRequestNo'))
            }
        }

    }, [id])
    if (isLoading) {
        return <Loader />
    } else {
        return (
            <>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title />
                <link
                    href="https://fonts.googleapis.com/css?family=Lato:300,400|Montserrat:700"
                    rel="stylesheet"
                    type="text/css"
                />
                <header className="site-header" id="header">
                    <h3 className="site-header__title assasas" style={{ fontSize: "2.25rem", color: "black" }} data-lead-id="site-header-title">
                        {
                            id === "authorised" ? (
                                <>
                                    THANK YOU!
                                </>
                            ) : id === "cancelled" || "declined" ? (
                                <>
                                    WE APOLOGIZE!
                                </>
                            ) : <></>
                        }
                    </h3>
                </header>
                <div className="main-conten thankyounksj">
                    <i className={`fa ${id === 'authorised' ? 'fa-check  bg-blue-color' : 'fa-close error'} main-content__checkmark`} id="checkmark" />
                    <p className="main-content__body" data-lead-id="main-content-body">
                        {
                            id === "authorised" ? (
                                <>
                                    Your pick-up request placed successfully
                                    <br />
                                    Your Pickup Request Number is <span className='bg-blue-color'>{PickuRequstNumber}</span>
                                </>
                            ) : id === "declined" ? (
                                <span className='error'> Sorry, your transaction has been declined. Kindly contact your bank.</span>
                            ) : <></>
                        }

                        <br />
                        <br />
                        <a onClick={() => handleGoback()} className='' > <button style={{ border: "3px", borderColor: "#2ca2c6" }} className='sddsds bg-blue  text-white'>Go Back</button> </a>
                    </p>
                </div>

            </>

        )
    }

}

export default ThankYouPage