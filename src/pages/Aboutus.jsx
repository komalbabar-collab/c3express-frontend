import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import aboutus from "../assets/images/aboutus-dummy.jpg"
import { Helmet } from "react-helmet-async"
const Aboutus = ({ pageURL }) => {
    return (
        <div>
            <Helmet>
                {/* HTML Meta Tags */}
                <title>About Us | International Courier Company - C3xpress</title>
                <link rel="canonical" href={pageURL} />
                <meta name="description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <link rel="canonical" content="https:www.c3xpress.com about-us" />
                <meta name="og:site_name" content="C3xpress" />
                <meta name="og:url" content="https://www.c3xpress.com/" />
                <meta name="og:type" content="website" />
                <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Facebook Meta Tags */}
                <meta property="og:url" content="https://www.c3xpress.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="About Us | International Courier Company - C3xpress" />
                <meta property="og:description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="c3xpress.com" />
                <meta property="twitter:url" content="https://www.c3xpress.com/" />
                <meta name="twitter:title" content="About Us | International Courier Company - C3xpress" />
                <meta name="twitter:description" content="Global Delivery Experts: C3xpress! Know about our trusted international courier services & commitment to excellence. Get a FREE quote today!" />
                <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
            </Helmet>
            <Header1 />
            <div className="p-inner_head p-inner_contact">
                <div className="p-page_title">
                    <div className="container">
                        <ul className="p-breadcrumb">
                            <li>
                                <a href="https://c3xpress.com/">Home</a>
                            </li>
                            <li>
                                <span>About Us</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div id="p-why_choose">
                <div className="container p-page_inner">
                    <div className="row clearfix p-why_choose" style={{ alignItems: 'center' }}>
                        <div className="col-md-8 col-lg-8 pull-right">
                            <div className="p-section_title">
                                <div className="p-section_head">
                                    <h1>About Us</h1>
                                </div>
                            </div>
                            <div className="p-our_booth_text">
                                <p>
                                    <span style={{ fontSize: 15 }}>
                                        <span style={{ fontFamily: "myriadpro-regular,poppins" }}>
                                            At C3X, we’re on a mission to make deliveries faster, smarter, and more reliable for businesses and consumers. Our innovative same-day and next-day delivery network is designed to bring speed and flexibility to the last mile, ensuring every package gets where it needs to go on time.<br /><br />
                                            Whether you’re easily shipping international parcels or receiving products faster than ever, C3X is here to save you time and money. For businesses, we streamline distribution costs while enhancing customer satisfaction, making us the ultimate delivery partner for e-retailers, e-commerce giants, and beyond.<br /><br />
                                            But we don’t stop there. Our expertise spans industries that depend on time-critical deliveries, business-to-business services, banking and financial logistics, and even healthcare. No matter the challenge, we deliver solutions that work.
                                            As part of the renowned Bin Yaber Group, our roots run deep in excellence, spanning industries like hospitality, real estate, car care, and logistics. Every day, our dedicated team and advanced systems work together to track, monitor, and guarantee seamless delivery, 7 days a week.<br /><br />
                                            From global parcels to local deliveries, C3X connects people and possibilities, making the world smaller and service bigger. We’re not just delivering parcels, we’re delivering promises.<br /><br />
                                            Let’s go further, faster—together with C3X.
                                        </span>
                                    </span>
                                </p>
                                <p />
                            </div>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 p-about_img mt-12" style={{ marginTop: '6.5rem' }}>
                            <div className="photo_frame_box">
                                <img
                                    src={aboutus}
                                    className="img-fluid"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="diff_hr" />
            </div>

            <Footer />
        </div>
    )
}

export default Aboutus