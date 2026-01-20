import domestic from "../assets/service/domestic_courier.jpg"
import international from "../assets/service/international.jpg"
import Clearance from "../assets/service/import.jpg"
import Sea from "../assets/service/sea.jpg"
import delivery from "../assets/service/delivery.jpg"
import fullfilment from "../assets/service/fullfilment.jpg"
import { Link } from "react-router-dom"
const Services = () => {
    return (
        <div>
            <div className="container">
                <div id="services_c3x">
                    <div className="services_c3x">
                        <h2>services</h2>
                        <h1>C3X SERVICE </h1>
                        <div className="gallery_box_cover">
                            <div className="container gallery_cont">
                                <div className="gallery_box row">
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="services/domestic-parcel-service-in-dubai.html">
                                                        <h3>
                                                            <span>Domestic Couriers</span>
                                                        </h3>
                                                    </a>
                                                    <p />
                                                    <p>
                                                        Domestic shipping, often known as a domestic courier,
                                                        refers to sending an item through a carrier within the
                                                        boundaries of a nation. Domestic couri....
                                                    </p>
                                                    <div className="text-center">
                                                        <a href="services/domestic-parcel-service-in-dubai.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={domestic}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="services/international-courier-service-provider-in-dubai.html">
                                                        <h3>
                                                            <span>International Couriers</span>
                                                        </h3>
                                                    </a>
                                                    <p />
                                                    <p>
                                                        Whether you have an important document that needs a more
                                                        personal hand delivery or a shipment of critical
                                                        components that needs to be delivered to ....
                                                    </p>
                                                    <div className="text-center">
                                                        <a href="services/international-courier-service-provider-in-dubai.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={international}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="services/import-customs-clearance-in-dubai.html">
                                                        <h3>
                                                            <span>Import and Clearance </span>
                                                        </h3>
                                                    </a>
                                                    <p>
                                                        We offer an import Express service for our customers who
                                                        require documents or packages from all over the world to
                                                        be delivered to the UAE. Our import ....
                                                    </p>
                                                    <div className="text-center">
                                                        <a href="services/import-customs-clearance-in-dubai.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={Clearance}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="services/international-shipping-by-land-sea-air.html">
                                                        <h3>
                                                            <span>Export Air, Land &amp; Sea</span>
                                                        </h3>
                                                    </a>
                                                    <p />
                                                    <p>
                                                        In today’s ever-evolving and highly competitive business
                                                        environment, effective logistics and fulfillment services
                                                        are essential for business....
                                                    </p>
                                                    <div className="text-center">
                                                        <a
                                                            href="services/international-shipping-by-land-sea-air.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={Sea}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="services/ecommerce-delivery-service-in-dubai.html">
                                                        <h3>
                                                            <span>E-commerce Delivery</span>
                                                        </h3>
                                                    </a>
                                                    <p />
                                                    <p>
                                                        We have the tools and infrastructure to provide a complete
                                                        fulfillment solution from point of sale to delivery. We
                                                        manage the entire eCommerce proc....
                                                    </p>
                                                    <div className="text-center">
                                                        <a
                                                            href="/services/ecommerce-delivery-service-in-dubai.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={delivery}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="col-md-4 wow fadeInRight animated"
                                        data-wow-delay=".4s"
                                    >
                                        <div className="mask rounded">
                                            <div className="cover rounded">
                                                <div className="c-inner">
                                                    <a href="/services/ecommerce-fulfilment-service-in-dubai.html">
                                                        <h3>
                                                            <span>E-Commerce Fulfilment</span>
                                                        </h3>
                                                    </a>
                                                    <p />
                                                    <p>
                                                        In today’s ever-evolving and highly competitive business
                                                        environment, effective logistics and fulfillment services
                                                        are essential for business....
                                                    </p>
                                                    <div className="text-center">
                                                        <a
                                                            href="/services/ecommerce-fulfilment-service-in-dubai.html"
                                                            className="btn btn-service"
                                                        >
                                                            <i className="fa fa-arrow-right" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <img
                                                src={fullfilment}
                                                alt=""
                                                className="img-responsive"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*div class services c3x class*/}
                        </div>
                        {/*-- services c3x ends here*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services