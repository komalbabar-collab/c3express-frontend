import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from "../../../src/assets/settings/footerlogo.png"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/reducers/UserReducer';
import Dropdown from 'react-bootstrap/Dropdown';
import { useGetUerProfileQuery } from '../../service/apiServices';
const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.UserReducer);
  const { data, error, isLoading } = useGetUerProfileQuery(undefined, {
    skip: !userData.access_token // Skip the query if the access token is not available
  });
  useEffect(() => {
    let isScrolling = false;
    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        if (window.scrollY > 20) {
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
  useEffect(() => {
    // refetch();
  }, [userData.access_token]);

  // useEffect(() => {
  //   if (data && !error) {
  //     dispatch(setUserDetails({ data }))
  //   } else {
  //     dispatch(setUserDetails({ access_token: null }))
  //   }
  // }, [data])
  const navigate = useNavigate()
  return (
    <div className='fixheader'>
      <div className="container upper_header_cover ">
        <div className="upper_header">
          <div className="cs3">
            customer experience is <span className="c3">3X</span> now
          </div>
          {!isLoading && !error && data ?
            (<>
              <span >Welcome {data?.data?.user?.full_name}</span>
              <Dropdown>
                <Dropdown.Toggle className="bg-blue" id="dropdown-basic">
                  Customer Portal
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* <Dropdown.Item><Link to={"/dashboard/changepassword"}>Change Password</Link></Dropdown.Item> */}
                  <Dropdown.Item><Link to={"/dashboard"}>DashBoard</Link></Dropdown.Item>
                  <Dropdown.Item><Link to={"/changepassword"}>Change Password</Link></Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    localStorage.removeItem('token')
                    dispatch(setUserDetails({ access_token: null }))
                  }} >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>)
            :
            (<>
              <ul className="header_contact_box">
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </ul>
              <ul className="header_social_box">
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </ul>
            </>)
          }
          <div className="border-right-raj" />
        </div>
      </div>
      <div className="ruler" />
      {window.location.pathname !== "/Ratefinder" && window.location.pathname !== "/Bookshipment" && (<div className={`top_fixedheader ${isSticky ? 'sticky' : ''}`}>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand}>
            <Container>
              <Navbar.Brand onClick={() => navigate("/")}>
                <img src='/logo/logo.png' />
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
                    <Nav.Link className="Homeee"><Link to="/">HOME</Link></Nav.Link>
                    <Nav.Link><Link to="/Aboutus">ABOUT US</Link></Nav.Link>
                    <Nav.Link><Link to="/Ourservices">SERVICE</Link></Nav.Link>
                    <Nav.Link><Link to="/Career">CAREERS</Link></Nav.Link>
                    <Nav.Link><Link to="/OurGallery">MEDIA</Link></Nav.Link>
                    <Nav.Link><Link to="/blog">BLOG</Link></Nav.Link>
                    <Nav.Link><Link to="/Contact">CONTACT</Link></Nav.Link>
                    <Nav.Link><Link to="/Deliveryservice">DELIVERY SERVICES</Link></Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>)}

    </div>
  )
}
export default Header