import Header1 from "../../Components/Common/Header1"
import Footer from "../../Components/Common/Footer"
import domestic from "../../assets/service/domestic_courier.jpg"
import international from "../../assets/service/international.jpg"
import Clearance from "../../assets/service/import.jpg"
import Sea from "../../assets/service/sea.jpg"
import delivery from "../../assets/service/delivery.jpg"
import fullfilment from "../../assets/service/fullfilment.jpg"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
const Ecommerce_delivery = () => {
    const ldJson = {
        "@context": "http://schema.org",
        "@type": "Service",
        "serviceType": "E-commerce Delivery",
        "areaServed": "Worldwide",
        "description": "Professional e-commerce delivery and shipping services in Dubai, ensuring fast, reliable order fulfillment for your online business",
        "review": [
            {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "reviewBody": "Their e-commerce same-day pick-up and delivery offer excellent services in the competitive market"
            }
        ]
    };
    return (
        <div>
            <Helmet>
                <title>E-Commerce Delivery Service in Dubai | E-commerce Shipping</title>
                <meta name='description' content='Professional e-commerce delivery and shipping services in Dubai, ensuring fast, reliable order fulfillment for your online business.' />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
            </Helmet>
            <Header1 />
            <div className="p-inner_head p-inner_contact">
                <div className="p-page_title">
                    <div className="container">
                        <ul className="p-breadcrumb">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <span>E-commerce Delivery</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section>
                <div className="p-page_inner">
                    <div className="container p-content_section p-blog-snigle">
                        <div className="row clearfix">
                            <div className="col-md-8 col-lg-8 p-blog_listing">
                                <div className="p-blogpage_list_single clearfix">
                                    <div className="p-blog_list_img">
                                        <img
                                            src={delivery}
                                            className="img-fluid"
                                            alt=""
                                        />
                                    </div>
                                    <div className="p-blog_list_detail">
                                        <h1>E-COMMERCE DELIVERY</h1>
                                        <p></p>
                                        <p>
                                            We have the tools and infrastructure to provide a complete fulfillment solution from point of sale to delivery. We manage the entire eCommerce process so that our clients can spend their time on other important tasks.
                                        </p>
                                        <p />
                                        <p></p>
                                        <p>
                                            We have the tools and infrastructure to provide a complete fulfillment solution from point of sale to delivery. We manage the entire eCommerce process so that our clients can spend their time on other important tasks. We have a proven track record of delivering goods on time and on schedule. As a customer-focused company, we offer the following courier services for your online shopping. Cash on delivery Same day pickup Multiple delivery attempts Daily/weekly cash remittance options API integration Technology-driven software for simple booking and tracking of shipments Dedicated customer support Scalable capacity.
                                        </p>
                                        <p />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 p-sidebar">
                                <div className="p-side_single">
                                    <h5>Other services &amp; products</h5>
                                    <div className="p-side_posts">
                                        <div className="p-side_single_post">
                                            <img
                                                src={domestic}
                                                className="img-fluid other-service"
                                                alt=""
                                            />
                                            <div className="p-side_blog_text">
                                                <Link to="/services/domestic_couriers">
                                                    Domestic Couriers
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-side_single_post">
                                            <img
                                                src={international}
                                                className="img-fluid other-service"
                                                alt=""
                                            />
                                            <div className="p-side_blog_text">
                                                <Link to="/services/international_couriers">
                                                    International Courses{" "}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-side_single_post">
                                            <img
                                                src={Clearance}
                                                className="img-fluid other-service"
                                                alt=""
                                            />
                                            <div className="p-side_blog_text">
                                                <Link to="/services/import_and_clearance_express">
                                                    IMPORT AND CLEARANCE
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-side_single_post">
                                            <img
                                                src={Sea}
                                                className="img-fluid other-service"
                                                alt=""
                                            />
                                            <div className="p-side_blog_text">
                                                <Link to="/services/Export_airland_sea">
                                                    EXPORT AIR, LAND & SEA
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="p-side_single_post">
                                            <img
                                                src={fullfilment}
                                                className="img-fluid other-service"
                                                alt=""
                                            />
                                            <div className="p-side_blog_text">
                                                <Link to="/services/Ecommerce_fulfilment">
                                                    E-Commerce Fulfilment
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Ecommerce_delivery