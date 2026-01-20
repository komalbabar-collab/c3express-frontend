import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import { Helmet } from "react-helmet-async"
const Privacypolicy = () => {

    return (
        <div>
            <Helmet>
                <title>Privacy and Policy - C3xpress</title>
                <meta
                    name="description"
                    content="Secure your data with C3X. See how we protect your information & use it responsibly. Read our Privacy Policy."
                />
                <link rel="https://www.c3xpress.com/privacy-and-policy" />
                <meta name="og:site_name" content="C3xpress" />
                <meta name="og:url" content="https://www.c3xpress.com/" />
                <meta name="og:type" content="website" />
                <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Facebook Meta Tags */}
                <meta property="og:url" content="https://www.c3xpress.com/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Privacy and Policy - C3xpress" />
                <meta
                    property="og:description"
                    content="Secure your data with C3X. See how we protect your information & use it responsibly. Read our Privacy Policy."
                />
                <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="c3xpress.com" />
                <meta property="twitter:url" content="https://www.c3xpress.com/" />
                <meta name="twitter:title" content="Privacy and Policy - C3xpress" />
                <meta
                    name="twitter:description"
                    content="Secure your data with C3X. See how we protect your information & use it responsibly. Read our Privacy Policy."
                />
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
                                <span>PRIVACY POLICY</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div id="services_c3x" style={{ paddingBottom: '70px' }}>
                    <div className="services_c3x">
                        <div className="p-section_title">
                            <div className="p-section_head">
                                <h1>PRIVACY POLICY</h1>
                            </div>
                        </div>
                        <p>
                            {/* <span style={{ fontSize: 15 }}>
                                <span style={{ fontFamily: "myriadpro-regular,poppins" }}>
                                    C3X makes deliveries happen faster for businesses and consumers. We’ve developed a unique same-day and next-day delivery network positioned to enhance the speed and flexibility of last-mile delivery. We help consumers send international parcels more cost-effectively and get products more quickly while lowering the cost of distribution for the businesses they buy from. In addition to being an ideal delivery partner for e-retailers and e-commerce companies, we offer expertise in a wide range of solutions across a wide range of industries that support time-critical delivery ranging from business to business, banks, and financial services, to healthcare logistics. We are part of the Bin Yaber Group, a conglomerate of various industries ranging from the Hotel industry, driving schools, real estate & property management, to car care and express deliveries. We share a passion for great service, leveraged by the use of our in-house systems to monitor each aspect of your parcel journey with our drivers to ensure a reliable and on-time delivery seven days a week, enabling our expanding delivery couriers to reach more people every day.
                                </span>
                            </span> */}
                            <span style={{ fontSize: 15 }}>
                                <span style={{ fontFamily: "myriadpro-regular,poppins" }}>
                                    As a company, we at C3X International Couriers LLC are mindful of the importance of protecting the privacy of the users of https://c3xpress.com. When you use this website, the data collected is for the purposes of marketing and improving the services offered by us and our subsidiaries, to enhance the content on https://c3xpress.com, and in order to contact you with timely updates to this website or for any additional relevant marketing purposes.
                                </span>
                            </span>
                            <ul className="mt-4">
                                <li className="mb-2">•	All credit/debit cards’ details and personally identifiable information will NOT be stored, sold, shared, rented, or leased to any third parties.
                                </li>
                                <li className="mb-2">•<a href="	https://c3xpress.com/">	https://c3xpress.com/</a> will not pass any debit/credit card details to third parties.</li>
                                <li className="mb-2">•	<a href="https://c3xpress.com/">https://c3xpress.com/</a> takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However,<a href=" https://c3xpress.com/"> https://c3xpress.com/</a> cannot guarantee the security of any information that is disclosed online’</li>
                                <li className="mb-2">•	The <a href="https://c3xpress.com/">  https://c3xpress.com/</a> is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. You should contact these entities directly if you have any questions about their use of the information that they collect.</li>
                                <li>•	The Website Policies and Terms & Conditions may be changed or updated occasionally to meet the requirements and standards. Therefore, the Customers are encouraged to frequently visit these sections to be updated about the changes on the website. Modifications will be effective on the day they are posted.</li>
                            </ul>
                        </p>
                        <div className="p-blog_list_foot">
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Privacypolicy