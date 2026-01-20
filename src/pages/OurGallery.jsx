import Header1 from "../Components/Common/Header1";
import Footer from "../Components/Common/Footer";
import One from "../assets/gallery/images/1.jpg";
import Two from "../assets/gallery/images/2.jpg";
import Three from "../assets/gallery/images/3.jpg";
import Four from "../assets/gallery/images/4.jpg";
import Five from "../assets/gallery/images/5.jpg";
import Six from "../assets/gallery/images/6.jpg";
const OurGallery = () => {
    return (
        <div>
            <Header1 />
            <div className="p-inner_head p-inner_contact">
                <div className="p-page_title">
                    <div className="container">
                        <ul className="p-breadcrumb">
                            <li>
                                <a href="https://c3xpress.com/">Home</a>
                            </li>
                            <li>
                                <span>GALLERY</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container Gallery">
                <div id="services_c3x" style={{ paddingBottom: '70px' }}>
                    <div className="services_c3x">
                        <div className="p-section_title">
                            <div className="p-section_head">
                                <h1>GALLERY</h1>
                            </div>
                        </div>
                    </div>
                    <div className="gallery-wrapper row">
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-1">
                                <img src={One} />
                            </a>
                        </div>
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-2">
                                <img src={Two} alt="" />
                            </a>
                        </div>
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-3">
                                <img src={Three} alt="" />
                            </a>
                        </div>
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-4">
                                <img src={Four} alt="" />
                            </a>
                        </div>
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-5">
                                <img src={Five} alt="" />
                            </a>
                        </div>
                        <div className="image-wrapper col-lg-4">
                            <a href="#lightbox-image-6">
                                <img src={Six} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="gallery-lightboxes">
                        <div className="image-lightbox" id="lightbox-image-1">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-3" className="arrow-left" />
                                <a href="#lightbox-image-2" className="arrow-right" />
                                <img src={One} alt="" />
                            </div>
                        </div>
                        <div className="image-lightbox" id="lightbox-image-2">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-1" className="arrow-left" />
                                <a href="#lightbox-image-3" className="arrow-right" />
                                <img src={Two} alt="" />
                            </div>
                        </div>
                        <div className="image-lightbox" id="lightbox-image-3">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-2" className="arrow-left" />
                                <a href="#lightbox-image-1" className="arrow-right" />
                                <img src={Three} alt="" />
                            </div>
                        </div>
                        <div className="image-lightbox" id="lightbox-image-4">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-2" className="arrow-left" />
                                <a href="#lightbox-image-1" className="arrow-right" />
                                <img src={Four} alt="" />
                            </div>
                        </div>
                        <div className="image-lightbox" id="lightbox-image-5">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-2" className="arrow-left" />
                                <a href="#lightbox-image-1" className="arrow-right" />
                                <img src={Five} alt="" />
                            </div>
                        </div>
                        <div className="image-lightbox" id="lightbox-image-6">
                            <div className="image-lightbox-wrapper">
                                <a href="#" className="close" />
                                <a href="#lightbox-image-2" className="arrow-left" />
                                <a href="#lightbox-image-1" className="arrow-right" />
                                <img src={Six} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default OurGallery