import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import { usePostContactUsMutation } from "../service/apiServices";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from 'react-bootstrap/Spinner';
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom";
const Contact = () => {
    const [postContactUs, { isLoading, error, data }] = usePostContactUsMutation();
    const Navigate = useNavigate();
    const canvasRef = useRef(null);
    const [formData, setFormData] = useState({
        message: "",
        subject: "",
        full_name: "",
        phone_number: "",
        email: "",
        captchaText: "",
        userInput: "",
    });
    const handleChange = (name, value) => {
        setFormData((prev) => { return { ...prev, [name]: value, } })
    }
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        initializeCaptcha(ctx);
    }, []);

    const generateRandomChar = (min, max) =>
        String.fromCharCode(Math.floor
            (Math.random() * (max - min + 1) + min));
    const generateCaptchaText = () => {
        let captcha = '';
        for (let i = 0; i < 1.5; i++) {
            // captcha += generateRandomChar(65, 90);
            captcha += generateRandomChar(97, 122);
            captcha += generateRandomChar(48, 57);
        }
        return captcha.split('').sort(
            () => Math.random() - 0.5).join('');
    };

    const drawCaptchaOnCanvas = (ctx, captcha) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        const textColors = ['rgb(0,0,0)', 'rgb(130,130,130)'];
        const letterSpace = 150 / captcha.length;
        for (let i = 0; i < captcha.length; i++) {
            const xInitialSpace = 25;
            ctx.font = '20px Roboto Mono';
            ctx.fillStyle = textColors[Math.floor(
                Math.random() * 2)];
            ctx.fillText(
                captcha[i],
                xInitialSpace + i * letterSpace,

                // Randomize Y position slightly 
                Math.floor(Math.random() * 16 + 25),
                100
            );
        }
    };

    const initializeCaptcha = (ctx) => {
        handleChange("userInput", '')
        const newCaptcha = generateCaptchaText();
        handleChange("captchaText", newCaptcha)
        drawCaptchaOnCanvas(ctx, newCaptcha);
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (formData["userInput"] === "") {
                toast.error("Please enter captcha")
            }
            else if (formData["captchaText"] !== formData["userInput"]) {
                toast.error("Please enter correct captcha")
            }
            else {
                let data = {
                    "full_name": formData["full_name"],
                    "email": formData["email"],
                    "phone_number": formData["phone_number"],
                    "subject": formData["subject"],
                    "message": formData["message"],
                }
                await postContactUs(data).unwrap();
                Navigate("/Thankyou");
            }

        } catch (error) {
            console.error("error", error)
        }
    }

    return (
        <div>
            <Helmet>
                <>
                    {/* HTML Meta Tags */}
                    <title>Contact Us for Your Global Courier Services</title>
                    <meta
                        name="description"
                        content="Global delivery simplified! C3X connects you with fast, secure shipments. Affordable international options for peace of mind. Contact us today!"
                    />
                    <link rel="https://www.c3xpress.com/contact-us" />
                    <meta name="og:site_name" content="C3xpress" />
                    <meta name="og:url" content="https://www.c3xpress.com/" />
                    <meta name="og:type" content="website" />
                    <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                    {/* Facebook Meta Tags */}
                    <meta property="og:url" content="https://www.c3xpress.com/" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:title"
                        content="Contact Us for Your Global Courier Services"
                    />
                    <meta
                        property="og:description"
                        content="Global delivery simplified! C3X connects you with fast, secure shipments. Affordable international options for peace of mind. Contact us today!"
                    />
                    <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />
                    {/* Twitter Meta Tags */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta property="twitter:domain" content="c3xpress.com" />
                    <meta property="twitter:url" content="https://www.c3xpress.com/" />
                    <meta
                        name="twitter:title"
                        content="Contact Us for Your Global Courier Services"
                    />
                    <meta
                        name="twitter:description"
                        content="Global delivery simplified! C3X connects you with fast, secure shipments. Affordable international options for peace of mind. Contact us today!"
                    />
                    <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
                </>
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
                                <span>CONTACT US</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <section>
                <div className="p-page_inner contact_page_cover">
                    <div className="p-section_head">
                        <h1>Contact us</h1>
                    </div>
                    <div className="container p-content_section p-contact">
                        <div className="row clearfix">
                            <div className="col-md-6 col-lg-6 contact_form">
                                <form
                                    method="post"
                                    action="#"
                                    onSubmit={handleSubmit}
                                    name="frmContact"
                                    id="frmContact"
                                >
                                    <div className="footer_form_outer">
                                        <input
                                            placeholder="Name *"
                                            name="full_name"
                                            onChange={(e) => handleChange("full_name", e.target.value)}
                                            autoComplete="off"
                                            id="contactName"
                                            value={formData["full_name"]}
                                            required=""
                                            type="text"
                                            className="form-control mb-3"
                                        />
                                        <input
                                            name="email"
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            id="contactEmail"
                                            autoComplete="off"
                                            value={formData["email"]}
                                            required=""
                                            placeholder="Email *"
                                            type="email"
                                            className="form-control mb-3"
                                        />
                                        <input
                                            name="phone_number"
                                            onChange={(e) => handleChange("phone_number", e.target.value)}
                                            id="contactPhone"
                                            autoComplete="off"
                                            value={formData["phone_number"]}
                                            required=""
                                            placeholder="Phone Number *"
                                            type="text"
                                            className="form-control mb-3"
                                        />
                                        <input
                                            name="subject"
                                            onChange={(e) => handleChange("subject", e.target.value)}
                                            id="contactSubject"
                                            autoComplete="off"
                                            value={formData["subject"]}
                                            required=""
                                            placeholder="Your subject *"
                                            type="text"
                                            className="form-control mb-3"
                                        />
                                        <textarea
                                            name="message"
                                            onChange={(e) => handleChange("message", e.target.value)}
                                            id="contactMessage"
                                            autoComplete="off"
                                            required=""
                                            placeholder="Your message *"
                                            value={formData["message"]}
                                            className="form-control mb-3"
                                        />
                                        <canvas ref={canvasRef}
                                            width="200"
                                            height="70">

                                        </canvas>
                                        <button id="reload-button" onClick={
                                            () => initializeCaptcha(
                                                canvasRef.current.getContext('2d'))}>
                                            Reload
                                        </button>
                                        <br /> <br />
                                        <input
                                            name="userInput"
                                            onChange={(e) => handleChange("userInput", e.target.value)}
                                            id="user_captcha"
                                            value={formData["userInput"]}
                                            autoComplete="off"
                                            required=""
                                            placeholder="Enter  the text shown above *"
                                            type="text"
                                            className="form-control mb-5"
                                        />
                                        {error ? <p className="error" > {error && error.data.message.replace(/"/g)} </p> : data ? <p className="success" > {data && data.message} </p> : null}
                                        {isLoading ? <Spinner animation="border" className="text-center" variant="light" /> : <div className="form_submit_btn  ">
                                            <input name="" defaultValue="Submit" type="submit" />
                                        </div>}

                                    </div>

                                    <br />
                                </form>
                            </div>
                            <div className="col-md-6 col-lg-6 p-contact_info">
                                <div className="p-info_single">
                                    <h5>
                                        <i className="fa fa-building" />
                                        Address
                                    </h5>
                                    <p>
                                        C3X International Couriers LLC WS-1, Ramool Avenue, 22A street Umm
                                        Ramool Dubai, United Arab Emirates,
                                        <br />
                                        <br />
                                        C3X International Couriers LLC
                                        R-20, near al Masar scaffolding 28, Al Hiraf 3 St , Musaffah -
                                        M-11 Abu Dhabi, United Arab Emirates
                                    </p>
                                </div>
                                <div className="p-info_single clearfix">
                                    <div>
                                        <h5>
                                            <i className="fa fa-phone" aria-hidden="true" /> Phone
                                        </h5>
                                        <a href="tel:+971 4 309 3333">+971 4 309 3333</a>
                                    </div>
                                    <div>
                                        <h5>
                                            <i className="fa fa-fax" aria-hidden="true" /> Fax
                                        </h5>
                                        <a href="tel:600 50 40 30">600 50 40 30</a>
                                    </div>
                                </div>
                                <div className="p-info_single">
                                    <h5>
                                        <i className="fa fa-envelope" aria-hidden="true" /> Email
                                    </h5>
                                    <a href="mailto:info@c3xpress.com">info@c3xpress.com</a>
                                </div>
                                <hr />
                                <div className="p-contact_text">
                                    <p>
                                        Feel free to contact us with any questions regarding C3X makes
                                        deliveries happen faster for businesses and consumers. We`ve
                                        developed a unique same-day and next-day delivery network
                                        positioned to enhance the speed and flexibility of last-mile
                                        delivery. We help consumers send international parcels more
                                        cost-effectively.
                                    </p>
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

export default Contact