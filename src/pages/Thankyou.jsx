import React, { useEffect } from 'react';
import Header from '../Components/Common/Header1';
import Footer from '../Components/Common/Footer';

const Thankyou = () => {

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            // Redirect to another route after 3 seconds
            window.location.href = ("/")
        }, 3000); // 3000 milliseconds = 3 seconds

        // Clean up the timer on component unmount
        return () => clearTimeout(redirectTimer);
    }, [history]); // Ensure history is included as a dependency

    return (
        <div>
            <Header />
            <div className="mt-5 mb-5 pt-5 pb-5 text-center">
                <header className="site-header" id="header">
                    <h3 className="site-header__title sdsdsdas" data-lead-id="site-header-title">
                        THANK YOU!
                    </h3>
                </header>
                <div className="main-content">
                    <i className="fa fa-check main-content__checkmark" id="checkmark" />
                    <p className="main-content__body" data-lead-id="main-content-body">
                        Thank you for filling up the form.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Thankyou;