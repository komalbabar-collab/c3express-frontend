import React, { useEffect, useState } from "react";
import {
    useGetrecieveraddressAddressDataQuery,
    usePostDeleterecieveraddressAddressDataMutation,
    usePostUpdaterecieveraddressAddressDataMutation
} from "@/service/apiServices";
import Loader from "@/heplers/Loaders/Loader";
import { toast } from "react-toastify";
import PaginationControls from "./PaginationControls"
import AddressList from "./AddressList"
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import useFormSubmission from "@/hooks/useFormSubmission";
const SavedReciversAddessress = (props) => {
    const [visibleAddresses, setVisibleAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({
        id: null,
        name: "Add",
    });

    const { setFormData, formData, handleSubmit } =
        useFormSubmission(usePostUpdaterecieveraddressAddressDataMutation, {});
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1);
    const [mutate] = usePostDeleterecieveraddressAddressDataMutation();
    const { data, error, isLoading, refetch } = useGetrecieveraddressAddressDataQuery({
        page: page,
        limit: 2,
        search: search
    });
    useEffect(() => {
        if (data) {
            if (page === 1) {
                setVisibleAddresses([...data.data.Address]);
                return;
            }
            if (data?.data?.totalItems !== visibleAddresses.length && page > 1) {
                data.data.Address.length > 0 && setVisibleAddresses(prev => ([...prev, ...data.data.Address]));
                return;
            }
        }
    }, [data]);

    const handleNext = () => setPage(prev => prev + 1);
    const dispableNext = visibleAddresses.length === data?.data?.totalItems;
    const handlePrevious = () => setPage(prev => prev - 1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deleteUser = async (item) => {
        try {
            await mutate(item).unwrap();
            // Reset pagination and visible addresses
            setPage(1);
            setVisibleAddresses([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div
                aria-label="Select a delivery address "
                className="a-section"
                role="form"
            >
                <div className="a-row a-spacing-small">
                    <div className="a-column a-span10">
                        <h3 className="a-color-state">
                            <span className="a-letter-space" />
                            Select a Reciever address
                        </h3>
                    </div>
                </div>
                <div className="a-fixed-left-grid">
                    <div className="a-fixed-left-grid-inner" style={{ paddingLeft: 35 }}>
                        <div
                            className="a-fixed-left-grid-col a-col-right"
                            style={{ paddingLeft: "0%", float: "left" }}
                        >
                            <div className="a-row a-spacing-none">
                                <div className="a-box-group a-spacing-small">
                                    <div className="a-box">
                                        <div className="a-box-inner">
                                            <input
                                                type="text"
                                                placeholder="Search By Contact Person/Company,  Address line 1"
                                                value={search}
                                                className="form-control w-50 mb-2"
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                            {isLoading ? (
                                                <Loader />
                                            ) : visibleAddresses.length > 0 ? (
                                                <>
                                                    <AddressList
                                                        addresses={visibleAddresses}
                                                        selectedAddress={selectedAddress}
                                                        setSelectedAddress={setSelectedAddress}
                                                        deleteUser={deleteUser}
                                                        setFormData={props.setFormData}
                                                    />
                                                    <PaginationControls
                                                        page={page}
                                                        handleNext={handleNext}
                                                        handlePrevious={handlePrevious}
                                                        dispableNext={dispableNext}
                                                    />
                                                </>
                                            ) : (
                                                <div className="text-center">No Address Found</div>
                                            )}
                                            <AddAddress setSelectedAddress={setSelectedAddress} handleShow={handleShow} />
                                        </div>
                                    </div>
                                    {
                                        visibleAddresses.length > 0 && <div className="a-box a-box-title">
                                            <div className="a-box-inner">
                                                <span
                                                    id="shipToThisAddressButton"
                                                    className="a-button a-button-primary primary-action-button"
                                                >
                                                    <span className="a-button-inner">
                                                        <span
                                                            id="shipToThisAddressButton-announce"
                                                            className="a-button-text a-text-center"
                                                            onClick={() => {
                                                                if (!selectedAddress.id) {
                                                                    toast.error("Please select address");
                                                                } else {
                                                                    if (visibleAddresses.length > 0) {
                                                                        let UseAddress = visibleAddresses.find(
                                                                            (item) => item._id === selectedAddress.id
                                                                        );
                                                                        if (window.location.pathname === "/Schedulepickupbooking") {
                                                                            props.setFormData((prevFormData) => ({
                                                                                ...prevFormData,
                                                                                BookingData: {
                                                                                    ...prevFormData.BookingData,
                                                                                    ReceiversCompany: UseAddress.company_name,
                                                                                    ReceiversCountry: UseAddress.Country,
                                                                                    ReceiversCity: UseAddress.City,
                                                                                    ReceiversAddress1: UseAddress.address_line_1,
                                                                                    ReceiversAddress2: UseAddress.address_line_2,
                                                                                    ReceiversPinCode: UseAddress.ZipCode,
                                                                                    ReceiversPhone: UseAddress.telephone_number,
                                                                                    ReceiversMobile: UseAddress.phone_number,
                                                                                    ReceiversContactPerson: UseAddress.ReceiversContactPerson,
                                                                                    ReceiversEmail: UseAddress.ReceiversEmail,
                                                                                    BookingAddress1: UseAddress.address_line_1,
                                                                                    BookingAddress2: UseAddress.address_line_2,
                                                                                    BookingCity: UseAddress.City,
                                                                                    Destination: UseAddress.Destination,
                                                                                    BookingPinCode: UseAddress.ZipCode,
                                                                                    BookingCountry: UseAddress.Country,
                                                                                    BookingPhone: UseAddress.telephone_number,
                                                                                    BookingMobile: UseAddress.phone_number,
                                                                                    BookingEmail: UseAddress.ReceiversEmail,
                                                                                    BookingCompanyName: UseAddress.company_name,
                                                                                    BookingContactPerson: UseAddress.ReceiversContactPerson,
                                                                                },
                                                                            }));
                                                                        } else {
                                                                            props.setFormData((prevFormData) => ({
                                                                                ...prevFormData,
                                                                                AirwayBillData: {
                                                                                    ...prevFormData.AirwayBillData,
                                                                                    ReceiversCompany: UseAddress.company_name,
                                                                                    ReceiversCountry: UseAddress.Country,
                                                                                    ReceiversCity: UseAddress.City,
                                                                                    Destination: UseAddress.Destination,
                                                                                    ReceiversAddress1: UseAddress.address_line_1,
                                                                                    ReceiversAddress2: UseAddress.address_line_2,
                                                                                    ReceiversPinCode: UseAddress.ZipCode,
                                                                                    ReceiversPhone: UseAddress.telephone_number,
                                                                                    ReceiversMobile: UseAddress.phone_number,
                                                                                    ReceiversContactPerson: UseAddress.ReceiversContactPerson,
                                                                                },
                                                                            }));
                                                                        }
                                                                    }
                                                                }
                                                            }}
                                                        >
                                                            Use this address
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EditAddress {...{ selectedAddress, show, handleClose, handleSubmit, formData, setFormData }} />
        </>
    );
};

export default SavedReciversAddessress;
