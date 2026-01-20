import React from 'react'

const AddAddress = ({ setSelectedAddress, handleShow }) => {
    return (
        <div className="a-row a-spacing-extra-large addressbook-footer">
            <span className="a-declarative">
                <img
                    alt=""
                    src="https://m.media-amazon.com/images/G/31/checkout/assets/addAddress._CB454652023_.png"
                    className="add-address-image cursor-pointer"
                />
                <a
                    id="add-new-address-popover-link"
                    className="a-size-base a-link-normal"
                    href="#"
                    onClick={() => {
                        setSelectedAddress({ id: null, name: "Add" });
                        handleShow();
                    }}
                >
                    Add a new address
                </a>
                <span className="a-declarative" />
            </span>
        </div>
    )
}

export default AddAddress
