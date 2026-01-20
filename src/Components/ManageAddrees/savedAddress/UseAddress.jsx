import React from 'react'
import { toast } from 'react-toastify';

const SelectThisAddress = ({ selectedAddress = {}, visibleAddresses = [], user, setSenderForm, formData }) => {
    const handleSetMaheShiping = () => {
        try {
            let UseAddress = visibleAddresses.find(
                (item) => item._id === selectedAddress.id
            );
            setSenderForm((prevFormData) => ({
                ...prevFormData,
                AirwayBillData: {
                    ...prevFormData.AirwayBillData,
                    SendersAddress1:
                        UseAddress?.address_line_1 ? UseAddress?.address_line_1 : "",
                    SendersAddress2:
                        UseAddress?.address_line_2 ? UseAddress?.address_line_2 : "",
                    SendersCity: UseAddress?.City ? UseAddress?.City : "",
                    Origin: UseAddress?.Origin ? UseAddress?.Origin : "",
                    SendersPinCode: UseAddress?.ZipCode ? UseAddress?.ZipCode : "",
                    SendersCountry: UseAddress?.Country ? UseAddress?.Country : "",
                    SendersPhone: UseAddress?.telephone_number ? UseAddress?.telephone_number : "",
                    SendersMobile: UseAddress?.phone_number ? UseAddress?.phone_number : "",
                    SendersCompany: UseAddress?.company_name ? UseAddress?.company_name : "",

                    SendersContactPerson: UseAddress?.SendersContactPerson ? UseAddress?.SendersContactPerson : "",
                    SendersEmail: UseAddress?.SendersEmail ? UseAddress?.SendersEmail : "",

                },
            }));
        } catch (error) {
            console.error(error)
        }
    }
    const hamdleSchadulePickUpBooking = () => {
        try {
            let UseAddress = visibleAddresses.find(
                (item) => item._id === selectedAddress.id
            );
            setSenderForm((prevFormData) => ({
                BookingData: {
                    ...prevFormData.BookingData,
                    SendersAddress1: UseAddress?.address_line_1 ? UseAddress?.address_line_1 : "",
                    SendersAddress2: UseAddress?.address_line_2 ? UseAddress?.address_line_2 : "",
                    SendersCity: UseAddress?.City,
                    Origin: UseAddress?.Origin ? UseAddress?.Origin : "",
                    SendersPinCode: UseAddress?.ZipCode ? UseAddress?.ZipCode : "",
                    SendersCountry: UseAddress?.Country ? UseAddress?.Country : "AE",
                    SendersPhone: UseAddress?.telephone_number ? UseAddress?.telephone_number : "",
                    SendersMobile: UseAddress?.phone_number ? UseAddress?.phone_number : "",
                    SendersEmail: UseAddress?.SendersEmail ? UseAddress?.SendersEmail : "",
                    BookingCreatedBy: user.AccountNo,
                    SendersCompany: UseAddress?.company_name ? UseAddress?.company_name : "",
                    SendersContactPerson: UseAddress?.SendersContactPerson ? UseAddress?.SendersContactPerson : "",
                    BookingAddress1: UseAddress?.address_line_1 ? UseAddress?.address_line_1 : "",
                    BookingAddress2: UseAddress?.address_line_2 ? UseAddress?.address_line_2 : "",
                    BookingCity: UseAddress?.City ? UseAddress?.City : "",
                    BookingPinCode: UseAddress?.ZipCode ? UseAddress?.ZipCode : "",
                    BookingCountry: UseAddress?.Country ? UseAddress?.Country : "AE",
                    BookingPhone: UseAddress?.telephone_number ? UseAddress?.telephone_number : "",
                    BookingMobile: UseAddress?.phone_number ? UseAddress?.phone_number : "",
                    BookingEmail: UseAddress?.SendersEmail ? UseAddress?.SendersEmail : "",
                    BookingCompanyName: UseAddress?.company_name ? UseAddress?.company_name : "",
                    BookingContactPerson: UseAddress?.SendersContactPerson ? UseAddress?.SendersContactPerson : "",


                },
            }));
        } catch (error) {
            console.error(error)
        }
    }
    const handleAddresUse = () => {
        try {
            if (!selectedAddress.id) {
                toast.error("Please select address");
                return
            }
            if (window.location.pathname.includes("/Schedulepickupbooking")) {
                hamdleSchadulePickUpBooking()
                return

            } else if (window.location.pathname.includes("/Managingshipping")) {
                handleSetMaheShiping()
                return
            }
        } catch (error) {
            console.error("error", error)
        }

    }
    if (visibleAddresses?.length > 0) {
        return (
            <div className="a-box a-box-title">
                <div className="a-box-inner">
                    <span
                        id="shipToThisAddressButton"
                        className="a-button a-button-primary primary-action-button"
                    >
                        <span className="a-button-inner">
                            <span
                                id="shipToThisAddressButton-announce"
                                className="a-button-text a-text-center"
                                onClick={() => handleAddresUse()}
                            >
                                Use this address
                            </span>
                        </span>
                    </span>
                </div>
            </div>
        )
    }
}

export default SelectThisAddress
