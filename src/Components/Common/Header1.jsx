import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../../src/assets/settings/footerlogo.png"
import { Link, useLocation, useNavigate } from 'react-router-dom';
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;

        if (window.scrollY > 250) {
          setTimeout(() => setIsSticky(true), 100);
        } else {
          setIsSticky(false);
        }
        setTimeout(() => {
          isScrolling = false;
        }, 200);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const location = useLocation().pathname;

  const navigate = useNavigate()
  return (
    <div className={`top_fixedheader ${isSticky ? 'sticky' : ''}`}>
      {['md'].map((expand) => (
        <Navbar className='secondheader' key={expand} expand={expand}>
          <Container>
            <Navbar.Brand onClick={() => navigate("/")}>
              <img src={logo} />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img src={logo} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link className={`${location === "/" ? 'active_url' : ''}`}>
                    <Link to="/" >HOME</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/Aboutus" ? 'active_url' : ''}`}>
                    <Link to="/Aboutus" >ABOUT US</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/Ourservices" ? 'active_url' : ''}`}>
                    <Link to="/Ourservices" >SERVICES & PRODUCTS</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/Career" ? 'active_url' : ''}`}>
                    <Link to="/Career" >CAREERS</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/blog" ? 'active_url' : ''}`}>
                    <Link to="/blog" >BLOG</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/OurGallery" ? 'active_url' : ''}`}>
                    <Link to="/OurGallery" >MEDIA</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/Contact" ? 'active_url' : ''}`}>
                    <Link to="/Contact" >CONTACT</Link>
                  </Nav.Link>
                  <Nav.Link className={`${location === "/Deliveryservice" ? 'active_url' : ''}`}>
                    <Link to="/Deliveryservice" >DELIVERY SERVICES</Link>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  )
}

export default Header
