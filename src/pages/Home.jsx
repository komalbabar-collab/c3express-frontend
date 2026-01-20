import Footer from "../Components/Common/Footer"
import Header from "../Components/Common/Header"
import Banner from "./Banner"
import Groupofcompanies from "./Groupofcompanies"
import Map from "./Map"
import Ourclients from "./Ourclients"
import Process from "./Process"
import Services from "./Services"
import Solutions from "./Solutions"
import Visionandmission from "./Visionandmission"
import { Helmet } from "react-helmet-async"
const Home = (props) => {

  return (
    <div>
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "WebSite",
              "name": "C3xpress",
              "url": "https://www.c3xpress.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.c3xpress.com/Ourservices{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
            `}
        </script>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "c3xpress",
              "url": "https://www.c3xpress.com/",
              "logo": "https://www.c3xpress.com/logo/logo.png",
              "sameAs": [
                "https://www.facebook.com/c3xpress",
                "https://www.linkedin.com/company/c3x-couriers",
                "https://www.c3xpress.com/#"
              ]
            }
          `}
        </script>
        <title>Get the Best Courier Service in Dubai - C3xpress</title>
        <meta name='description' content='Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference!' />
        <link rel="canonical" href="https://www.c3xpress.com" />
        <meta name="og:site_name" content="C3xpress" />
        <meta name="og:url" content="https://www.c3xpress.com/" />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="https://www.c3xpress.com/logo/logo.png" />

        <meta property="og:url" content="https://www.c3xpress.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Get the Best Courier Service in Dubai - C3xpress" />
        <meta property="og:description" content="Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference!" />
        <meta property="og:image" content="https://www.c3xpress.com/logo/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="c3xpress.com" />
        <meta property="twitter:url" content="https://www.c3xpress.com/" />
        <meta name="twitter:title" content="Get the Best Courier Service in Dubai - C3xpress" />
        <meta name="twitter:description" content="Get the Best Courier Service in Dubai: Fast, Reliable & Secure Delivery with C3xpress for all your needs. Get a FREE quote & experience the difference!" />
        <meta name="twitter:image" content="https://www.c3xpress.com/logo/logo.png" />
      </Helmet>
      <Header />

      {<Banner userAuthData={props.userAuthData && props.userAuthData} />}
      <Process />
      <Services />
      <Visionandmission />
      <Groupofcompanies />
      <Solutions />
      <Ourclients />
      <Map />
      <Footer />
    </div>
  )
}

export default Home
