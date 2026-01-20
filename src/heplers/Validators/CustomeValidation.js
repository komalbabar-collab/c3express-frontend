export const validateSenderPhone_No = (value, helpers) => {
    const { SendersMobile, SendersPhone } = value;
    if (!(SendersMobile || SendersPhone)) {
        // Neither field is provided
        return helpers.message("At least one of SendersMobile or SendersPhone is required");
    }

    if (
        (SendersMobile && (SendersMobile.length < 10 || SendersMobile.length > 15)) ||
        (SendersPhone && (SendersPhone.length < 10 || SendersPhone.length > 15))
    ) {
        return helpers.message("Enter Phone Number between 10 to 15 digits");
    }

    return value;
};

export const validateRecieverPhone_No = (value, helpers) => {
    const { ReceiversMobile, ReceiversPhone } = value;

    if (!(ReceiversMobile || ReceiversPhone)) {
        // Neither field is provided
        return helpers.message("At least one of ReceiversMobile or ReceiversPhone is required");
    }

    if (
        (ReceiversMobile && (ReceiversMobile.length < 10 || ReceiversMobile.length > 15)) ||
        (ReceiversPhone && (ReceiversPhone.length < 10 || ReceiversPhone.length > 15))
    ) {
        return helpers.message("Enter Phone Number between 10 to 15 digits");
    }

    return value;
};

