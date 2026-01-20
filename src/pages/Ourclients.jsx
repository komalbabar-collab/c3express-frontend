import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import first from "../assets/images/clients/a.jpg";
import second from "../assets/images/clients/b.jpg";
import third from "../assets/images/clients/c.jpg";
import fourth from "../assets/images/clients/D.jpg";
import fifth from "../assets/images/clients/e.jpg";
import six from "../assets/images/clients/f.jpg";
import seven from "../assets/images/clients/g.jpg";
import eight from "../assets/images/clients/h.png";
import nine from "../assets/images/clients/i.png";
const Ourclients = () => {
    const state = {
        autoplay: true,
        autoplayTimeout: 1000,
        loop: true,
        dots: false,
        margin: 10,
        lazyLoad: true,
        responsive: {
            0: {
                items: 2,
            },
            450: {
                items: 3,
            },
            600: {
                items: 4,
            },
            1000: {
                items: 6,
            },
        },
    };

    return (
        <div className='our_clients'>
            <OwlCarousel
                className='owl-theme'
                loop={state.loop}
                margin={state.margin}
                responsive={state.responsive}
                dots={state.dots}
                autoplay={state.autoplay}
                autoplayTimeout={state.autoplayTimeout}
                slideTransition={state.slideTransition} // Set the slide transition
            >
                <div className='item'>
                    <img src={first} alt="" />
                </div>
                <div className='item'>
                    <img src={second} alt="" />
                </div>
                <div className='item'>
                    <img src={third} alt="" />
                </div>
                <div className='item'>
                    <img src={fourth} alt="" />
                </div>
                <div className='item'>
                    <img src={fifth} alt="" />
                </div>
                <div className='item'>
                    <img src={six} alt="" />
                </div>
                <div className='item'>
                    <img src={seven} alt="" />
                </div>
                <div className='item'>
                    <img src={eight} alt="" />
                </div>
                <div className='item'>
                    <img src={nine} alt="" />
                </div>
            </OwlCarousel>
        </div>
    )
}

export default Ourclients;
