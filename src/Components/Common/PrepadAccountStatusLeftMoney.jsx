import React, { useEffect, useState } from "react";
import { usePostPrepaidAccountStatusMutation } from "../../service/apiServices";
import { useSelector } from "react-redux";
const PrepadAccountStatusLeftMoney = () => {
    const userData = useSelector((state) => state.UserReducer);
    const [postDueInvoicesData, { data, error, isLoading }] = usePostPrepaidAccountStatusMutation();
    useEffect(() => {
        postDueInvoicesData({ AccountNo: userData.data?.data.user.AccountNo })
    }, [userData.data?.data.user.AccountNo])
    return (
        < >
            {isLoading ? (
                <span >Loading...</span>

            ) : error ? (
                <span >Something Went Wrong</span>
            ) : userData.data && userData.data?.data?.AccountData?.PaymentType == "PP" && (<span style={{ color: "rgb(44, 162, 198)" }}>Credit AED: {data?.data?.Credit}</span>)
            }
        </>
    )
}

export default PrepadAccountStatusLeftMoney;