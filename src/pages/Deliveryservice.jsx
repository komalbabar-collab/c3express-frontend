import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import serviceImg from "../assets/gallery/images/5.jpg"
import fleetImg from "../assets/gallery/images/6.jpg"

const Deliveryservice = () => {
    return (
        <div>
            <Header1 />

            {/* HERO */}
            <div className="p-inner_head p-inner_contact">
                <div className="container text-center">
                    <h1 className="p-page-title">Delivery Services</h1>
                    <ul className="p-breadcrumb">
                        <li>
                            <a href="https://c3xpress.com/">Home</a>
                        </li>
                        <li>
                            <span>DELIVERY SERVICES</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <section className="delivery-section">
                <div className="container">

                    <div className="p-section_head text-center">
                        <h1>C3X Delivery Services</h1>
                    </div>

                    {/* INTRO */}
                    <div className="row align-items-center delivery-block">
                        <div className="col-lg-6">
                            <p>
                                C3X Delivery Services is one of the rapidly growing third-party logistics companies based in the United Arab Emirates,
                                dedicated to providing unmatched solutions for businesses in need of superior delivery services. Over the years, C3X Delivery Services has combined a large fleet of bike riders who transport goods in a hyperlocal area as well as intracity deliveries using a well-developed transportation network. One of the foundation stones of our success lies in our massive fleet of riders who are skilled and efficient in their duties and responsibilities.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img src={serviceImg} alt="C3X Delivery Services" className="img-fluid rounded" />
                        </div>
                    </div>

                    {/* JOURNEY */}
                    <div className="row align-items-center delivery-block flex-row-reverse">
                        <div className="col-lg-6">
                            <p>
                                C3X delivery services emerged with a vision to transform the logistics and delivery industry. Established in 2022, our journey began with an assurance to fill the gaps in the industry and provide a dependable, efficient, and technologically advanced delivery solution to businesses across the UAE.
                            </p>

                            <p>
                                In the subsequent years, C3X Delivery Services strategically expanded its operations. The company's motto of innovation and customer-centric solutions earned it a reputation as a trusted third-party logistics provider within the United Arab Emirates.
                            </p>
                        </div>
                        <div className="col-lg-6">
                            <img src={fleetImg} alt="C3X Fleet" className="img-fluid rounded" />
                        </div>
                    </div>

                    {/* CCC */}
                    <div className="delivery-card">
                        <h2>Client-Customized Complete Mile Solution (CCC)</h2>
                        <p>
                            C3X Delivery Services is well known for its process-driven operations. "CCC" stands for Client Customized Complete Mile Solution. Here at C3X Deliveries, our clients have the freedom to customize their rate cards, based on their requirements and volume.
                        </p>
                    </div>

                    {/* SERVICES */}
                    <div className="delivery-card">
                        <h2>Services Offered:</h2>
                        <ul className="delivery-list">
                            <li>
                                <i className="fa fa-calendar-check-o"></i>
                                Monthly Subscription Model
                            </li>
                            <li>
                                <i className="fa fa-truck"></i>
                                Individual deliveries / Order per delivery rates
                            </li>
                            <li>
                                <i className="fa fa-clock-o"></i>
                                Same day delivery
                            </li>
                            <li>
                                <i className="fa fa-bolt"></i>
                                Bullet delivery
                            </li>
                            <li>
                                <i className="fa fa-random"></i>
                                Multi-pick-up and Single drop-off
                            </li>
                        </ul>
                    </div>


                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Deliveryservice
