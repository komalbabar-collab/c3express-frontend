import { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from "react-phone-number-input";

const useFormSubmission = (mutationHook, initialFormData, validate, toasterror) => {
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [formData, setFormData] = useState(initialFormData);
    const [Data, setData] = useState(null);
    const [errors, setErrors] = useState({ loading: false, error: false, message: '' });

    const [mutate] = mutationHook();

    const handleSubmit = async () => {
        try {
            // Create a copy of the formData object to avoid mutating the original
            const formattedData = { ...formData };
            if (!isPhoneValid) {
                toast.error("Please enter valid Mobile No Or Phone No");
                return
            }
            setErrors({ loading: true, error: false });
            const res = await mutate(formattedData).unwrap();
            setData(res.data);
            setErrors({ loading: false, error: false, message: res?.message });

            // You can handle the result as needed
            // For example, update state or navigate to another page
        } catch (error) {
            setErrors({
                loading: false,
                error: true,
                message: error.data ? error.data.message : 'An error occurred',
            });
            setData(null)

            // You can handle the error as needed
            // For example, show an error message to the user
        }
    };

    const handleChange = (name, value) => {

        if (name === "SendersCountry") {
        }

        if (name === "telephone_number") {
            if (value === '' || value === undefined) {
                setIsPhoneValid(true);
            } else {
                setIsPhoneValid(isValidPhoneNumber(value));
            }
        }
        else if (name === "phone_number") {
            if (value === '' || value === undefined) {
                setIsPhoneValid(true);
            } else {
                setIsPhoneValid(isValidPhoneNumber(value));
            }
        }
        if (formData.AirwayBillData) {
            setFormData((prevData) => ({
                ...prevData,
                AirwayBillData: {
                    ...prevData.AirwayBillData,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    return { Data, setFormData, formData, errors, handleSubmit, handleChange, setErrors, setData };
};

export default useFormSubmission;
