import { getcountryNameByCode } from "@/heplers/DateValidator";

const AddressList = ({ addresses, selectedAddress, setSelectedAddress, deleteUser, setFormData }) => {
    return (
        <>
            {addresses.map((item) => (
                <fieldset key={item._id}>
                    <div className="a-row address-row list-address-selected">
                        <span className="a-declarative">
                            <div className="a-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="submissionURL"
                                        onChange={() => {
                                            setSelectedAddress({
                                                id: item._id,
                                                name: "Edit",
                                            });
                                        }}
                                        checked={
                                            selectedAddress &&
                                                selectedAddress.id === item._id
                                                ? true
                                                : false
                                        }
                                    />
                                    <i className="a-icon a-icon-radio" />
                                    <span className="a-label a-radio-label">
                                        <span className="a-text-bold">
                                            {" "}
                                            <span className="break-word">
                                                {" "}
                                                {item.ReceiversContactPerson}{" "}
                                            </span>{" "}
                                        </span>
                                        <span className="break-word">
                                            {item.address_line_1 +
                                                item.address_line_2 +
                                                ", " +
                                                item.ZipCode ? item.ZipCode : "" +
                                                ", " +
                                                item.City +
                                                ", " +
                                            getcountryNameByCode(item.Country)}
                                        </span>
                                        <span className="address-edit-link">
                                            <span className="a-declarative">
                                                {" "}
                                                <abbr
                                                    className="a-link-normal"
                                                    onClick={() => {
                                                        handleShow();
                                                        setFormData(item);
                                                    }}
                                                >
                                                    {" "}
                                                    {/* Edit address{" "} */}
                                                </abbr>{" "}
                                                <span className="a-declarative" />{" "}
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </span>
                        <div className="address-edit-link">
                            <a onClick={() => deleteUser(item)} className="btn btn-danger">
                                Delete
                            </a>
                        </div>
                    </div>
                </fieldset>
            ))}
        </>
    );
};

export default AddressList