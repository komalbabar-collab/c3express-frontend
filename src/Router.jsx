import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUerProfileQuery } from './service/apiServices';
import { setUserDetails, setUserLogout } from './redux/reducers/UserReducer';
import { toast } from 'react-toastify';
import Loader from './heplers/Loaders/Loader';
import DashboardLayout from './Components/Common/DashboardLayout';

// Frequently accessed components - no lazy loading
import Home from "./pages/Home";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ErrorBoundary from './ErrorBoundary';
import Blog from './pages/Blog/Blog';
import Blogdetails from './pages/Blog/Why-the-best-e-commerce-delivery-service-In-dubai-is-revolutionizing-online-shopping';
import CostSpeed from './pages/Blog/cost-vs-speed-analyzing-the-value-of-the-fastest-international-courier-services';
import Lastminute from './pages/Blog/last-minute-orders-no-worries-with-the-fastest-international-shipping';
import Delayshipment from './pages/Blog/avoiding-delays-how-to-prepare-your-shipments-for-smooth-customs-clearance-services';
import Signsfor from './pages/Blog/5-signs-you’re-using-the-best-international-parcel-service-in-UAE';

// Lazy loaded components
const About = lazy(() => import('./pages/Aboutus'));
const Services = lazy(() => import('./pages/Ourservices'));
const Career = lazy(() => import('./pages/Career'));
const DeliveryService = lazy(() => import('./pages/Deliveryservice'));
const Contact = lazy(() => import('./pages/Contact'));
const OurGallery = lazy(() => import('./pages/OurGallery'));
const HelpDesk = lazy(() => import('./pages/Helpdesk'));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage'));
const Thankyou = lazy(() => import('./pages/Thankyou'));
const ChangePassword = lazy(() => import('./pages/Auth/ChangePassword'));
const TransactionHistory = lazy(() => import('./Components/AirwayBils/AirWayBillHistory/TransactionHistory'));
const TermsConditions = lazy(() => import('./pages/Termsconditions'));
const PrivacyPolicy = lazy(() => import('./pages/Privacypolicy'));
const DomesticRatefinder = lazy(() => import('./pages/Ratefinder/DomesticRatefinder'));
const InternationalRatefinder = lazy(() => import('./pages/Ratefinder/InternationalRatefinder'));

// Lazy load service pages
const DomesticCouriers = lazy(() => import('./pages/services/domestic_couriers'));
const InternationalCouriers = lazy(() => import('./pages/services/International_couriers'));
const ImportClearance = lazy(() => import('./pages/services/Import_and_clearance_express'));
const ExportAirlandSea = lazy(() => import('./pages/services/Export_airland_sea'));
const EcommerceDelivery = lazy(() => import('./pages/services/Ecommerce_delivery'));
const EcommerceFulfilment = lazy(() => import('./pages/services/Ecommerce_fulfilment'));

// Lazy load admin/dashboard pages
const Dashboard = lazy(() => import('./pages/Admin/Dashboard'));
const TopupHistory = lazy(() => import('./pages/Admin/Topuphistory'));
const PrepaidTopupRequest = lazy(() => import('./pages/Admin/PrepaidTopuprequest'));
const TopupRequest = lazy(() => import('./pages/Admin/Toprequest'));
const PickupHistory = lazy(() => import('./pages/Admin/Pickuphistory'));
const SchedulePickupBooking = lazy(() => import('./pages/Admin/Schedulepickupbooking'));
const ManagingShipping = lazy(() => import('./pages/Admin/Managingshipping'));
const ManageSubUsers = lazy(() => import('./pages/Admin/ManageSubUsers'));
const ManageServiceType = lazy(() => import('./pages/Admin/ManageServiceTypes'));
const InvoicePage = lazy(() => import('./pages/Admin/Invoices'));
const PaymentDues = lazy(() => import('./pages/Admin/PaymentDues'));
const PrepaidAccountStatus = lazy(() => import('./pages/Admin/PrepaidAccountStatus'));
const ManageAddress = lazy(() => import('./pages/Admin/ManageAddress'));
const Bookshipment = lazy(() => import('./pages/BookShipments/Bookshipment'));
const SchedulePickupThankYouPage = lazy(() => import('./pages/Admin/SchedulePickupComponents/SchadulePickupThankYouPage'));

const SuspenseLoader = () => (
    <div className="w-full h-full flex items-center justify-center">
        <Loader />
    </div>
);

const Router = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.UserReducer);
    const ProfileData = useGetUerProfileQuery(undefined, {
        skip: !userData.access_token
    });

    const [initialLoading, setInitialLoading] = useState(true);

    useEffect(() => {
        // Only show initial loading for first page load
        const timer = setTimeout(() => setInitialLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (ProfileData.data && !ProfileData.isLoading) {
            dispatch(setUserDetails({ data: ProfileData.data }));
        } else if (!ProfileData.isLoading && ProfileData.isError) {
            dispatch(setUserLogout());
            toast.error(ProfileData.error?.data?.message || 'An error occurred.');
            window.location.assign("/login");
        }
    }, [ProfileData.data, ProfileData.isLoading, ProfileData.isError, dispatch]);

    if (initialLoading) {
        return <Loader />;
    }

    // Helper function for protected routes
    const ProtectedRoute = ({ children }) => {
        if (ProfileData.isLoading) {
            return <Loader />;
        }
        return children;
    };

    return (
        <BrowserRouter>
            <Suspense fallback={<SuspenseLoader />}>
                <ErrorBoundary>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home userAuthData={ProfileData} />} />
                        <Route path="/TransactionHistory" element={
                            <ProtectedRoute>
                                <TransactionHistory userAuthData={ProfileData} />
                            </ProtectedRoute>
                        } />
                        <Route path="/help-desk" element={<HelpDesk />} />
                        <Route path="/Helpdesk" element={<Navigate replace to="/help-desk" />} />
                        <Route path='/Thankyou/:id' element={<ThankYouPage />} />
                        <Route path='/PickupRequest/:id' element={<SchedulePickupThankYouPage />} />
                        <Route path="/Bookshipment" element={
                            <ProtectedRoute>
                                <Bookshipment userAuthData={ProfileData} />
                            </ProtectedRoute>
                        } />

                        {/* Basic Pages */}
                        <Route path="/about-us" element={<About />} />
                        <Route path="/Aboutus" element={<Navigate replace to="/about-us" />} />
                        <Route path="/Ourservices" element={<Services />} />
                        <Route path="/OurGallery" element={<OurGallery />} />
                        <Route path="/Career" element={<Career />} />
                        <Route path='/Deliveryservice' element={<DeliveryService />} />
                        <Route path="/contact-us" element={<Contact />} />
                        <Route path="/Contact" element={<Navigate replace to="/contact-us" />} />
                        <Route path="/Thankyou" element={<Thankyou />} />

                        {/* Service Routes */}
                        <Route path="/services/domestic-parcel-service-in-dubai" element={<DomesticCouriers />} />
                        <Route path="/services/domestic_couriers" element={<Navigate replace to="/services/domestic-parcel-service-in-dubai" />} />
                        <Route path="/services/international-courier-service-provider-in-dubai" element={<InternationalCouriers />} />
                        <Route path="/services/international_couriers" element={<Navigate replace to="/services/international-courier-service-provider-in-dubai" />} />
                        <Route path="/services/import-customs-clearance-in-dubai" element={<ImportClearance />} />
                        <Route path="/services/import_and_clearance_express" element={<Navigate replace to="/services/import-customs-clearance-in-dubai" />} />
                        <Route path="/services/international-shipping-by-land-sea-air" element={<ExportAirlandSea />} />
                        <Route path="/services/Export_airland_sea" element={<Navigate replace to="/services/international-shipping-by-land-sea-air" />} />
                        <Route path="/services/ecommerce-delivery-service-in-dubai" element={<EcommerceDelivery />} />
                        <Route path="/services/Ecommerce_delivery" element={<Navigate replace to="/services/ecommerce-delivery-service-in-dubai" />} />
                        <Route path="/services/ecommerce-fulfilment-service-in-dubai" element={<EcommerceFulfilment />} />
                        <Route path="/services/Ecommerce_fulfilment" element={<Navigate replace to="/services/ecommerce-fulfilment-service-in-dubai" />} />

                        {/* Legal & Info Pages */}
                        <Route path="/terms-and-conditions" element={<TermsConditions />} />
                        <Route path="/Termsconditions" element={<Navigate replace to="/terms-and-conditions" />} />
                        <Route path="/privacy-and-policy" element={<PrivacyPolicy />} />
                        <Route path="/Privacypolicy" element={<Navigate replace to="/privacy-and-policy" />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/why-the-best-e-commerce-delivery-service-In-dubai-is-revolutionizing-online-shopping" element={<Blogdetails />} />
                        <Route path="/blog/cost-vs-speed-analyzing-the-value-of-the-fastest-international-courier-services" element={<CostSpeed />} />
                        <Route path="/blog/last-minute-orders-no-worries-with-the-fastest-international-shipping" element={<Lastminute />} />
                        <Route path="/blog/avoiding-delays-how-to-prepare-your-shipments-for-smooth-customs-clearance-services" element={<Delayshipment />} />
                        <Route path="/blog/5-signs-you’re-using-the-best-international-parcel-service-in-UAE" element={<Signsfor />} />

                        {/* Rate Finder Routes */}
                        <Route path="/Ratefinder" element={<DomesticRatefinder />} />
                        <Route path="/InternationalRatefinder" element={<InternationalRatefinder />} />

                        {/* Auth Routes */}
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/ChangePassword" element={<ChangePassword />} />

                        {/* Protected Dashboard Routes */}
                        <Route path="/Dashboard" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <Dashboard userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Topuphistory" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <TopupHistory userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/PrepaidTopuprequest" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <PrepaidTopupRequest />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Topuprequest" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <TopupRequest userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Pickuphistory" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <PickupHistory userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Schedulepickupbooking" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <SchedulePickupBooking userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Managingshipping" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <ManagingShipping userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ManageSubUsers" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <ManageSubUsers userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ManageServiceTypes" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <ManageServiceType userAuthData={ProfileData} />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/Invoices" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <InvoicePage />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/PaymentDues" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <PaymentDues />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/PrepaidAccountStatus" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <PrepaidAccountStatus />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />
                        <Route path="/ManageAddress" element={
                            <ProtectedRoute>
                                <DashboardLayout userAuthData={ProfileData}>
                                    <ManageAddress />
                                </DashboardLayout>
                            </ProtectedRoute>
                        } />

                        {/* Catch all route */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </ErrorBoundary>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;