import Solution from "../assets/images/option1.jpg"

const Solutions = () => {
    return (
        <section className="cta-section">
            <div className="container">
                <div className="row align-items-center">

                    {/* Left Content */}
                    <div className="col-lg-6">
                        <div className="cta-content">
                            <span className="cta-subtitle">Need Assistance?</span>
                            <h2>
                                Smart & Reliable <br />
                                Logistic Solutions
                            </h2>
                            <p style={{ color:"white"}}>
                                Fast, secure, and cost-effective courier services
                                tailored to your business needs.
                            </p>

                            <div className="cta-buttons">
                                <a href="tel:600504030" className="cta-call">
                                    Call Now: 600 50 40 30
                                </a>
                                <a href="/contact" className="cta-btn">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6">
                        <div className="cta-image">
                            <img src={Solution} alt="Logistic Solution" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Solutions