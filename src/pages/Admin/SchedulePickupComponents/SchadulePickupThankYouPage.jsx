import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const SchadulePickupThankYouPage = () => {
    const { id } = useParams()
    const [PickuRequstNumber, setPickuRequstNumber] = React.useState('')
    useEffect(() => {
        if (id) {
            setPickuRequstNumber(id)
        }
    }, [id])

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

            <link
                rel="stylesheet"
                href="https://2-22-4-dot-lead-pages.appspot.com/static/lp918/min/default_thank_you.css"
            />
            <header className="site-header" id="header">
                <h1 className="site-header__title" style={{ fontSize: "5.25rem", color: "black" }} data-lead-id="site-header-title">
                    THANK YOU!
                </h1>
            </header>
            <div className="main-content">
                <i className={`fa ${PickuRequstNumber !== '' ? 'fa-check  bg-blue-color' : 'fa-close error'} main-content__checkmark`} id="checkmark" />
                <p className="main-content__body" data-lead-id="main-content-body">
                    {
                        PickuRequstNumber !== "" ? (<>
                            Your pick-up request placed successfully
                            <br />
                            Your Pickup Request Number is {PickuRequstNumber}
                        </>) : (<>
                            Your pick-up request is Not placed
                        </>)
                    }

                    <br />
                    <br />
                    <Link className='' to="/Schedulepickupbooking"> <button style={{ border: "3px", borderColor: "#2ca2c6" }} className='bg-blue  text-white'>Go Back</button> </Link>
                </p>
            </div>

        </>

    )
}

export default SchadulePickupThankYouPage