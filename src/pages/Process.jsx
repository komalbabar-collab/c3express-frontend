import assest9 from "../assets/images/Asset 9.png"
import assest10 from "../assets/images/Asset 10.png"
import assest11 from "../assets/images/Asset 11.png"
const Process = () => {
    return (
        <div>
            <div className="container-fluid container_gray_bg tracking-result">
                <div className="container">
                    <section id="trackingResultSection">
                        <div className="container">
                            <div className="row" id="trackingResultDiv"></div>
                        </div>
                    </section>
                    <section id="service">
                        <div className="container pt-1 pb-3">
                            <div className="col-12">
                                <div className="sec-title text-center">
                                    <h2 className="wow animated bounceInLeft text-center">Process</h2>
                                    <h1>C3X’s Hassle-Free Process</h1>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn">
                                    <div className="service-item service_raj">
                                        <div className="service-icon ">
                                            <img src={assest9} />
                                        </div>
                                        <h3>Click to Order</h3>
                                        <p>
                                            Your delivery journey starts online. Covering industries from finance to social media.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn"
                                    data-wow-delay="0.3s">
                                    <div className="service-item service_raj">
                                        <div className="service-icon">
                                            <img src={assest10} />
                                        </div>
                                        <h3>Bring Your Package</h3>
                                        <p>
                                            Drop it off, and we’ll take care of the rest, whether it’s retail, travel, or beyond.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-md-4 col-sm-6 col-xs-12 text-center wow animated zoomIn"
                                    data-wow-delay="0.9s">
                                    <div className="service-item service_raj">
                                        <div className="service-icon">
                                            <img src={assest11} />
                                        </div>
                                        <h3>Transport Made Easy</h3>
                                        <p>
                                            We ensure secure, on-time transportation across industries like cybersecurity and ad tech.
                                        </p>
                                    </div>
                                </div>
                            </div> */}

                            <div className="process-row">

                                <div className="process-card">
                                    <div className="process-top">
                                    <span className="process-number">01</span>
                                    <img src={assest9} alt="Click to Order" />
                                    </div>
                                    <h3>Click to Order</h3>
                                    <p>
                                    Your delivery journey starts online. Covering industries from finance to social media.
                                    </p>
                                </div>

                                <div className="process-card">
                                    <div className="process-top">
                                    <span className="process-number">02</span>
                                    <img src={assest10} alt="Bring Your Package" />
                                    </div>
                                    <h3>Bring Your Package</h3>
                                    <p>
                                    Drop it off, and we’ll take care of the rest, whether it’s retail, travel, or beyond.
                                    </p>
                                </div>

                                <div className="process-card">
                                    <div className="process-top">
                                    <span className="process-number">03</span>
                                    <img src={assest11} alt="Transport Made Easy" />
                                    </div>
                                    <h3>Transport Made Easy</h3>
                                    <p>
                                    We ensure secure, on-time transportation across industries like cybersecurity and ad tech.
                                    </p>
                                </div>

                            </div>


                        </div>
                    </section>
                    {/* end Service section */}
                </div>
            </div>
        </div>
    )
}

export default Process