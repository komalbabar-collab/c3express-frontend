import React from 'react'

export const useHadleChangeBookingDataPhoneNo = (setFormData, nesteformname) => {
    return {
        handleChangePhoneNo: (name, value) => {
            setFormData((prev) => {
                return {
                    ...prev,
                    [nesteformname]: {
                        ...prev[nesteformname],
                        [name]: value,
                    },
                };
            });
        },
    }
}

