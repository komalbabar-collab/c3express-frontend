import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNavDropDownDetails } from '../../redux/reducers/NavDropdownReducer'
import footerlogo from '../../../src/assets/settings/footerlogo.png'
import '../../pages/Admin/Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../../redux/reducers/UserReducer';
import Loader from '../../heplers/Loaders/Loader';
import ProtectComponent from './ProtectComponent';

const DashboardLayout = (props) => {
    const { data, isLoading, error } = props.userAuthData

    const isNavDrawerOpen = useSelector(state => state.NavDropdownReducer.isNavDrawerOpen)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const toggleNavDrawer = () => {
        dispatch(setNavDropDownDetails({ isNavDrawerOpen: !isNavDrawerOpen }))
    };
    const Logout = () => {
        localStorage.removeItem('token')
        dispatch(setUserDetails({ access_token: null }))
        navigate("/")
    }
    if (isLoading) {
        return <Loader />
    }
    else if (error) {
        localStorage.removeItem('token')
        dispatch(setUserDetails({ access_token: null }))
        navigate("/")
    } else {
        return (
            <>

                <div id="app" className={isNavDrawerOpen ? 'nav-drawer-is-open' : ''}>
                    <div className="sidenav">
                        <div className="sidenav-col sidenav-col-primary">

                            <ol className="nav-list">
                                <li className="nav-list-item nav-list-item-header">
                                    <img src={footerlogo} alt="logo" className="nav-list-item-header-logo" />
                                </li>
                                <li className="nav-list-item">
                                    <Link to="/" className='nav-list-item-link'>
                                        <i className="fa fa-home fa-fw" />
                                        <span className="nav-list-item-title">Home</span>
                                    </Link>
                                </li>
                                <li className="nav-list-item">
                                    <Link to="/dashboard" className='nav-list-item-link'>
                                        <i className="fa fa-home fa-fw" />
                                        <span className="nav-list-item-title">Dashboard</span>
                                    </Link>
                                </li>
                                <ProtectComponent isDashboard={true} dashboard={"Manage_Sub_Users"} userAuthData={props.userAuthData}>
                                    <li className="nav-list-item">
                                        <Link to="/ManageSubUsers" className='nav-list-item-link'>
                                            <i className="fa fa-shopping-cart fa-fw" />
                                            <span className="nav-list-item-title">
                                                {data && data.data.user.Role === "Admin" ? "Manage Customers" : "Manage Sub Users"}</span>
                                        </Link>
                                    </li>
                                </ProtectComponent>
                                <li className="nav-list-item">
                                    <Link to="/ManageAddress" className='nav-list-item-link'>
                                        <i className="fa fa-shopping-cart fa-fw" />
                                        <span className="nav-list-item-title">Manage Address</span>
                                    </Link>
                                </li>
                                {data && data.data.user.Role === "Admin" && (
                                    <li className="nav-list-item">
                                        <Link to="/ManageServiceTypes" className='nav-list-item-link'>
                                            <i className="fa fa-shopping-cart fa-fw" />
                                            <span className="nav-list-item-title">Manage Service Types</span>
                                        </Link>
                                    </li>
                                )}

                                {
                                    data && data.data.user &&
                                        data.data.user &&
                                        data.data.user &&
                                        data.data.user.dashboard &&
                                        !data.data.user.dashboard
                                            .Airway_Bill_Generation && !data.data.user.dashboard
                                                .Air_Way_bill_history && !data.data.user.dashboard
                                                    .Print_Airway_Bill ? (
                                        <></>
                                    ) : (<li className="nav-list-item">
                                        <Link to="/Managingshipping" className='nav-list-item-link'>
                                            <i className="fa fa-shopping-cart fa-fw" />
                                            <span className="nav-list-item-title">Manage Shipping</span>
                                        </Link>
                                    </li>)
                                }

                                <ProtectComponent isDashboard={true} dashboard={"Pickup_Request"} userAuthData={props.userAuthData}>
                                    <li className="nav-list-item">
                                        <Link to="/Schedulepickupbooking" className='nav-list-item-link'>
                                            <i className="fa fa-shopping-cart fa-fw" />
                                            <span className="nav-list-item-title">Schedule A Pickup</span>
                                        </Link>
                                    </li>
                                </ProtectComponent>
                                <ProtectComponent isDashboard={true} dashboard={"Pickup_History"} userAuthData={props.userAuthData}>

                                    <li className="nav-list-item">
                                        <Link to="/Pickuphistory" className="nav-list-item-link">
                                            <i className="fa fa-child fa-fw" />
                                            <span className="nav-list-item-title">Pickup History</span>
                                        </Link>
                                    </li>
                                </ProtectComponent>
                                {/* {!isLoading && data && data?.data?.AccountData?.PaymentType=="PP" && (
                                    <li className="nav-list-item">
                                        <Link to="/Topuprequest" className="nav-list-item-link">
                                            <i className="fa fa-child fa-fw" />
                                            <span className="nav-list-item-title">Top-Up Request</span>
                                        </Link>
                                    </li>
                                )}  */}
                                {!isLoading && data && data?.data?.AccountData?.PaymentType == "PP" && (
                                    <li className="nav-list-item">
                                        <Link to="/PrepaidTopuprequest" className="nav-list-item-link">
                                            <i className="fa fa-child fa-fw" />
                                            <span className="nav-list-item-title">Prepaid Top-Up Request</span>
                                        </Link>
                                    </li>
                                )}
                                {!isLoading && data && data?.data?.AccountData?.PaymentType == "PP" && (
                                    <li className="nav-list-item">
                                        <Link to="/Topuphistory" className="nav-list-item-link">
                                            <i className="fa fa-child fa-fw" />
                                            <span className="nav-list-item-title">Prepaid Top-Up Request History</span>
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-list-item">
                                    <Link to={"/invoices"} className="nav-list-item-link">
                                        <i className="fa fa-child fa-fw" />
                                        <span className="nav-list-item-title">Invoices</span>
                                    </Link>
                                </li>
                                <li className="nav-list-item">
                                    <Link to={"/PaymentDues"} className="nav-list-item-link">
                                        <i className="fa fa-child fa-fw" />
                                        <span className="nav-list-item-title">Payments Dues</span>
                                    </Link>
                                </li>
                                {!isLoading && data && data?.data?.AccountData?.PaymentType == "PP" && (
                                    <li className="nav-list-item">
                                        <Link to={"/PrepaidAccountStatus"} className="nav-list-item-link">
                                            <i className="fa fa-child fa-fw" />
                                            <span className="nav-list-item-title">Prepaid Account Status</span>
                                        </Link>
                                    </li>
                                )}
                                <li className="nav-list-item">
                                    <a style={{ cursor: "pointer" }} onClick={Logout} className="nav-list-item-link">
                                        <i className="fa fa-child fa-fw" />
                                        <span className="nav-list-item-title">Logout</span>
                                    </a>
                                </li>
                            </ol>
                        </div>

                    </div>
                    <div className="header-row">
                        <header className="header">
                            <button type="button" id="nav-button" onClick={toggleNavDrawer}>
                                <i className="fa fa-bars bars" />
                            </button>

                        </header>
                    </div>
                    {props.children}
                </div>
            </>
        )
    }

}

export default DashboardLayout 