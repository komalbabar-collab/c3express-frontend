import { useGetCountryMasterQuery, usePostCityListMutation, usePostrecieveraddressAddressDataMutation } from '@/service/apiServices';
import React, { useState, useEffect } from 'react'
import PhoneInput from "react-phone-number-input";
import { Button, Modal } from "react-bootstrap";
import useFormSubmission from '@/hooks/useFormSubmission';
import { toast } from 'react-toastify';
const EditAddress = ({ selectedAddress = {}, show, handleClose, handleSubmit, formData, setFormData }) => {
    const [mutateAdd] = usePostrecieveraddressAddressDataMutation();
    const [AAddresFormData, setAddressFormData] = useState({ ReceiversContactPerson: "", company_name: "", address_line_1: "", address_line_2: "", phone_number: "", Country: "AE", City: "", ZipCode: "", telephone_number: "", Destination: "" })

    const CountryMaster = useGetCountryMasterQuery("");

    const CityHandle = useFormSubmission(usePostCityListMutation, {
        Country:
            selectedAddress && selectedAddress.name === "Edit"
                ? formData.Country
                : AAddresFormData.Country,
    });
    const UpdateAddress = (name, value, id) => {
        setFormData((prev) => {
            const { Active, ...rest } = prev;
            return {
                ...rest,
                _id: id,
                [name]: value,
            };
        });
    };
    const handleChangeAddress = (name, value) => {
        setAddressFormData((prev) => ({ ...prev, [name]: value }));
    }
    const handleSubmitData = async () => {
        try {
            if (selectedAddress?.name === "Edit") {
                handleSubmit()
            } else if (selectedAddress?.name === "Add") {
                await mutateAdd(AAddresFormData).unwrap();
            }
            handleClose()
        } catch (error) {
            toast.info(error?.data?.message || error?.message)
        }
    }
    useEffect(() => {
        CityHandle.setFormData({
            Country:
                selectedAddress && selectedAddress.name === "Edit"
                    ? formData.Country
                    : AAddresFormData.Country,
        });
    }, [formData.Country, AAddresFormData.Country]);
    useEffect(() => {
        CityHandle.handleSubmit();
    }, [CityHandle.formData.Country]);;


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ fontSize: "18px" }}>{selectedAddress && selectedAddress.name == "Edit"
                    ? "Edit"
                    : "Add"} Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form method="post" onSubmit={handleSubmitData}>
                    {formData && (
                        <div className="footer_form_outer">
                            <label>Receivers Contact Person</label>
                            <input
                                placeholder={"Name"}
                                name="ReceiversContactPerson"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["ReceiversContactPerson"]
                                        : AAddresFormData["ReceiversContactPerson"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                autoComplete="off"
                                required=""
                                type="text"
                            />
                            <label>Company Name</label>
                            <input
                                placeholder={"Company Name"}
                                name="company_name"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["company_name"]
                                        : AAddresFormData["company_name"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                autoComplete="off"
                                required=""
                                type="text"
                            />
                            <label>Country</label>

                            <select
                                name="Country"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["Country"]
                                        : AAddresFormData["Country"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                className="form-control"
                            >
                                <option value={""}>Select Country</option>
                                {Array.isArray(CountryMaster?.data?.data?.CountryListLocation) && CountryMaster?.data?.data?.CountryListLocation?.map(
                                    (data, index) => (
                                        <option value={data.CountryCode}>
                                            {data.CountryName}
                                        </option>
                                    )
                                )}
                            </select>
                            <label>City</label>
                            <select
                                name="City"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["City"]
                                        : AAddresFormData["City"]
                                }
                                onChange={(e) => {
                                    const selectedOption = e.target.options[e.target.selectedIndex]
                                    const selectedId = selectedOption.getAttribute("id");
                                    if (selectedAddress && selectedAddress.name == "Edit") {
                                        UpdateAddress(
                                            "Destination",
                                            selectedId,
                                            formData._id
                                        )
                                        UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                    }
                                    else {
                                        handleChangeAddress(e.target.name, e.target.value)
                                        handleChangeAddress("Destination", selectedId)
                                    }
                                }}
                            >
                                <option value={""}>Select City</option>
                                {Array.isArray(CityHandle?.Data?.CityListLocation) ? (
                                    CityHandle?.Data?.CityListLocation.map((item, index) => (
                                        <option value={item.CityName} id={item.CityCode}>
                                            {item.CityName}
                                        </option>
                                    ))
                                ) : (
                                    <option value={""}>No City Found</option>
                                )}
                            </select>
                            <label>Address Line 1</label>
                            <input
                                placeholder={"Address Line 1"}
                                name="address_line_1"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["address_line_1"]
                                        : AAddresFormData["address_line_1"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                autoComplete="off"
                                required=""
                                type="text"
                            />
                            <label>Address Line 2</label>
                            <input
                                placeholder={"Address Line 2"}
                                name="address_line_2"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["address_line_2"]
                                        : AAddresFormData["address_line_2"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                autoComplete="off"
                                required=""
                                type="text"
                            />
                            <label>Zip Code</label>
                            <input
                                placeholder={"Zip Code"}
                                name="ZipCode"
                                className="form-control"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["ZipCode"]
                                        : AAddresFormData["ZipCode"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress(
                                            e.target.name,
                                            e.target.value,
                                            formData._id
                                        )
                                        : handleChangeAddress(e.target.name, e.target.value);
                                }}
                                autoComplete="off"
                                required=""
                                type="text"
                            />
                            <label>Phone Number</label>

                            <PhoneInput
                                // className="form-control"
                                countryCallingCodeEditable={false}
                                placeholder={"Phone Number"}
                                name="phone_number"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["phone_number"]
                                        : AAddresFormData["phone_number"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress("phone_number", e, formData._id)
                                        : handleChangeAddress("phone_number", e);
                                }}
                                international
                                defaultCountry={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["Country"]
                                        : AAddresFormData["Country"]
                                }
                            />
                            <label>Phone Number</label>

                            <PhoneInput
                                // className="form-control"
                                placeholder={"Telephone Number"}
                                countryCallingCodeEditable={false}
                                name="telephone_number"
                                value={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["telephone_number"]
                                        : AAddresFormData["telephone_number"]
                                }
                                onChange={(e) => {
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? UpdateAddress("telephone_number", e, formData._id)
                                        : handleChangeAddress("telephone_number", e);
                                }}
                                international
                                defaultCountry={
                                    selectedAddress && selectedAddress.name == "Edit"
                                        ? formData["Country"]
                                        : AAddresFormData["Country"]
                                }
                            />
                        </div>
                    )}
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmitData}
                >
                    {selectedAddress && selectedAddress.name == "Edit"
                        ? "Update"
                        : "Add"}
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default EditAddress
