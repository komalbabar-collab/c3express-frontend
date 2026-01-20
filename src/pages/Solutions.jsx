import Solution from "../assets/images/Asset 20.png"

const Solutions = () => {
    return (
        <div>
            <section className="cta-ticket bg-ticket ">
                <div className="container">
                    <div className="need">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="content-block">
                                    <h1>For any logistic solutions</h1>
                                    <h2>
                                        {" "}
                                        contact us on : <a href="tel:600 50 40 30"> 600 50 40 30</a>
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="image-block">
                    <img
                        src={Solution}
                        alt=""
                        className="img-fluid"
                    />
                </div>
            </section>

        </div>
    )
}

export default Solutions