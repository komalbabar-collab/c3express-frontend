import Vision from "../assets/images/Asset 13.png"
import Mission from "../assets/images/Asset 14.png"

const Visionandmission = () => {
    return (
        <div>
            <div className="testimonial_box_cover">
                <div className="testimonial_box_outer">
                    <div className="container">
                        <div className="mission">
                            <div className="row">
                                <div className="col-lg-3">
                                <img src={Mission} />
                                </div>
                                <div className="col-lg-3">
                                    <h1>Vision</h1>
                                    <p>
                                        To be the premier global courier company, connecting people,
                                        businesses, and communities through seamless and reliable
                                        logistics solutions.
                                    </p>
                                </div>
                                <div className="col-lg-3">
                                    <img src={Vision} />
                                </div>
                                <div className="col-lg-3">
                                    <h1>mission</h1>
                                    <p>
                                        Our mission is to provide efficient, secure, and innovative
                                        courier services that exceed customer expectations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Visionandmission