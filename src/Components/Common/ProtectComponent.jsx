import React from "react";
import "../../pages/Admin/Dashboard.css";

import Loader from "../../heplers/Loaders/Loader";

const ProtectComponent = (props) => {
  if (props.userAuthData.isLoading) {
    return <Loader />
  } else if (props.userAuthData.error) {
    return <></>;
  }
  else if (props.userAuthData.data) {
    const userAuthData = props.userAuthData.data.data.user;
    const isAdmin = props.userAuthData.data.data.user.Role === "Admin";
    const dashboradprperty = props.dashboard;
    const isAuth = userAuthData.dashboard[dashboradprperty];
    if (isAdmin) {
      return props.children;
    } else if (!isAdmin && isAuth) {
      return props.children;
    }
    else {
      if (props.isDashboard) {
        return (<></>)
      } else {
        return (
          <h1 className="text-danger text-center">You are not authorized to access this page</h1>)
      }
    }
  }
};

export default ProtectComponent;
