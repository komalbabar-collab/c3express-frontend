import Header1 from "../Components/Common/Header1"
import Footer from "../Components/Common/Footer"
import careerImg from "../assets/gallery/images/4.jpg"
import cultureImg from "../assets/gallery/images/2.jpg"
const Career = () => {
    return (
        <div>
            <Header1 />

            {/* Hero Section */}
            <div className="p-inner_head p-inner_contact career-hero">
                <div className="container text-center">
                    <h1 className="p-page-title">Careers</h1>
                    <ul className="p-breadcrumb">
                        <li>
                            <a href="https://c3xpress.com/">Home</a>
                        </li>
                        <li>
                            <span>CAREERS</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <section className="career-section">

            {/* Intro */}
            <div className="career-section-block bg-light">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6">
                    <h1 style={{ color: 'black' }} >Welcome to the C3X International Couriers LLC Careers Page!</h1>
                    <p>
                        We're thrilled that you're considering a career with us. At C3X International Couriers LLC,
                        we're committed to delivering excellence in everything we do, and our team is at the heart of our success.
                    </p>
                    </div>
                    <div className="col-md-6">
                    <img src={careerImg} className="img-fluid rounded shadow-sm" />
                    </div>
                </div>
                </div>
            </div>

            {/* Culture */}
            <div className="career-section-block">
                <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 order-md-2">
                    <h2>Our Culture:</h2>
                    <p>
                        Join a dynamic and passionate team that values collaboration, innovation, and a customer-centric approach.
                        We foster an inclusive environment that encourages growth, creativity, and continuous learning.
                    </p>
                    </div>
                    <div className="col-md-6 order-md-1">
                    <img src={cultureImg} className="img-fluid rounded shadow-sm" />
                    </div>
                </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="career-section-block bg-light">
                <div className="container">
                <div className="career-card">
                    <h2>Why Choose Us?</h2>
                    <ul className="two-col-list">
                    <li style={{ textAlign: 'justify' }} ><strong>Career Growth : </strong><br></br>We offer opportunities for career advancement and professional development within the logistics and courier industry.</li>
                    <li style={{  textAlign: 'justify' }} ><strong>Diverse Workforce : </strong> <br></br>Embrace a workplace that celebrates diversity, where unique perspectives and backgrounds are valued.</li>
                    <li style={{ textAlign: 'justify' }} ><strong>Cutting-Edge Technology : </strong><br></br>Be part of a company that leverages the latest technology to streamline operations and improve customer experiences.</li>
                    <li style={{  textAlign: 'justify' }} ><strong>Commitment to Excellence : </strong> <br></br>Join a team dedicated to delivering high-quality service and exceeding customer expectations.</li>
                    </ul>
                </div>
                </div>
            </div>

            {/* Openings + Benefits */}
           <div className="career-section-block">
                <div className="container">
                    <div className="row career-equal">

                    <div className="col-md-6">
                        <div className="career-card career-card-full">
                        <h2>Current Openings:</h2>
                        <p>
                            Browse our current job openings and find the perfect fit for your skills and expertise.
                        </p>

                        <div className="career-btn-wrap">
                            <a
                            href="https://www.linkedin.com/company/c3x-couriers/jobs"
                            className="career-link"
                            target="_blank"
                            rel="noreferrer"
                            >
                            <i className="fa fa-briefcase"></i> View Current Openings
                            </a>
                        </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="career-card career-card-full">
                        <h2>Benefits and Perks:</h2>
                        <ul className="career-benefits">
                            <li><i className="fa fa-money"></i> Competitive salary and benefits package</li>
                            <li><i className="fa fa-heartbeat"></i> Health insurance coverage</li>
                            <li><i className="fa fa-clock-o"></i> Flexible work arrangements</li>
                            <li><i className="fa fa-gift"></i> Employee discounts and rewards</li>
                        </ul>
                        </div>
                    </div>

                    </div>
                </div>
            </div>



  {/* Apply + Contact */}
  <div className="career-section-block bg-light">
    <div className="container">
      <div className="career-card">
        <h2>How to Apply:</h2>
        <p>
          Ready to join our team? Submit your resume and cover letter to
          <a href="mailto:hr@c3xpress.com"> hr@c3xpress.com</a>.
          We look forward to reviewing your application.
        </p>

        <hr />

        <h2>Contact Us:</h2>
        <p>
          Have questions or need more information? Reach out to our HR team at
          <a href="mailto:hr@c3xpress.com"> hr@c3xpress.com</a>
        </p>
      </div>
    </div>
  </div>

  {/* CTA */}
  <div className="career-cta">
    <h2>Join C3X International Couriers and Make a Difference in the Logistics Industry!</h2>
  </div>

</section>


            <Footer />
        </div>
    )
}

export default Career
