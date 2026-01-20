import msa1 from "../assets/images/clients/999.jpg";
import msa2 from "../assets/images/clients/222.jpg";
import msa3 from "../assets/images/clients/333.jpg";
import msa4 from "../assets/images/clients/444.jpg";
import msa5 from "../assets/images/clients/555.jpg";
import msa6 from "../assets/images/clients/666.jpg";
import msa7 from "../assets/images/clients/888.jpg";
import logo from "../assets/images/logo.png"
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Groupofcompanies = () => {
    const state = {
        autoplay: true,
        loop: true,
        dots: false,
        margin: 20,
        nav: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
            },
            450: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 3,
            },
        },
    };
    return (
        <div>
            <>
                <div className="container">
                    {/*container starts here*/}
                    <div className="recent_works mt-5">
                        {/*-recent_works starts here*/}
                        <h1>Group Of Companies</h1>
                        <div className="blog_box_cover">
                            <OwlCarousel
                                className='owl-theme'
                                loop={state.loop}
                                margin={state.margin}
                                responsive={state.responsive}
                                dots={state.dots}
                                nav={state.nav}
                                autoplay={state.autoplay}
                                autoplayTimeout={state.autoplayTimeout}
                                slideTransition={state.slideTransition} // Set the slide transition
                            >
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-right"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa1}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Dunes Hotel Apartment</h3>
                                                {/* <p class="m-2">At Dunes our prime objective is to ensure the comfort of our guests and make them feel at home. And to achieve this, we follow the highest industry standards. Stellar guest reviews on TripAdvisor, Booking.com and other online platforms stand testament to our world-class service. Our services standards, hospitality and management best practices have won us international recognition and awards.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-left"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa2}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Apex Employment Services</h3>
                                                {/* <p class="m-2">Approved by the Ministry of Human Resources & Emiratisation, UAE to recruit and outsource to its clients on permanent and temporary basis. An emerging service provider of Recruitment and Outsourcing solutions in the UAE, offering a wide variety of services that connects top quality candidates with employers looking to fill key positions. Managed by industry professionals with an average 2 decades of industry experience such as IT, Manufacturing, Construction, and Healthcare Services. Engaged by industry leaders to meet their staff augmentation needs with speed and quality. Has so far recruited and outsourced over 700 professionals and is currently working on big projects to supply 250 Healthcare professionals to the Ministry of Healths.
</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="zoom-in"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa7}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Dunes Properties</h3>
                                                {/* <p class="m-2">Dunes properties provides you a large numbers of Villas, Apartments,Ware House, Labor Accommodation,Shops for rent in Dubai,Sharjah.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-right"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa5}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Tajdeed Vehicle Testing Center</h3>
                                                {/* <p class="m-2">A comprehensive facility to help you through all your vehicle testing and passing hassles. Our solutions are specifically customized for each and every vehicle ranging from LUV,MUV,HUV to sports and luxury cars.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-right"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa4}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Bin Yaber Driving Institute</h3>
                                                {/* <p class="m-2">Bin Yaber Driving Institute is a spacious and modern facility. We complement this with brand new furniture, equipment, and vehicles for you to use. Since you will be spending a minimum of 30 days with us learning how to drive a Car, we want the experience to be pleasant. What our students enjoy the most is that we are not crowded as compared to other driving schools. This means you get to learn in smaller groups with individualized attention from our patient instructors.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-right"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid c3xlogoooo"
                                                src={logo}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>C3X Delivery Services</h3>
                                                {/* <p class="m-2">Kinguru Delivery Services is located at the center of Dubai, United Arab Emirates, and provides efficient and fast-track logistic solutions ranging from all business needs to personal ones. We service our clients with the utmost professionalism, speed, efficiency, and most importantly - the best customer experience. We provide a comprehensive, accurate, and round-the-clock customer follow-up on each delivery, helping our clients to stop worrying as we ensure every parcel is delivered on time, with the utmost professionalism which guarantees the best customer experience every time.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="item">
                                    <div
                                        className="blog_box_item"
                                        data-aos="fade-right"
                                        data-aos-duration={2000}
                                        data-aos-once="true"
                                    >
                                        <a href="javascript:">
                                            <img
                                                className="img-fluid"
                                                src={msa6}
                                                alt=""
                                            />
                                            <div className="services p-2 minht">
                                                <h3>Toufan Filling Station</h3>
                                                {/* <p class="m-2">Toufan filling station established in 1989 and is part of Bin Yaber Group of Companies renowed group in Dubai owned by prominent businessman Mr. Mohamad Jaber Al Harbi in United Arab Emirates.</p>*/}
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                    {/*-recent_works ends here*/}
                </div>
                {/*container ends here*/}
            </>

        </div>
    )
}

export default Groupofcompanies