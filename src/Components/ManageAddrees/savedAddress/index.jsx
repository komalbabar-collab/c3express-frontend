import React, { useEffect, useState } from "react";
import { useGetAddressDataQuery, usePostUpdateAddressDataMutation, usePostAddressDataMutation, usePostCityListMutation, usePostDeleteAddressDataMutation, useGetCountryMasterQuery, } from "@/service/apiServices";
import useFormSubmission from "@/hooks/useFormSubmission";
import Loader from "@/heplers/Loaders/Loader";
import "react-phone-number-input/style.css";
import PaginationControls from "./PaginationControls";
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";
import SelectThisAddress from "./UseAddress";
import EditAddress from "./EditAddress";

const SavedAddress = (props) => {
  const [visibleAddresses, setVisibleAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({
    id: null,
    name: "Add",
  });
  const [show, setShow] = useState(false);
  const [mutate] = usePostDeleteAddressDataMutation();

  const { setFormData, formData, handleSubmit } =
    useFormSubmission(usePostUpdateAddressDataMutation, {});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteUser = async (item) => {
    try {
      await mutate(item).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const { data, isLoading } = useGetAddressDataQuery({
    page: page,
    limit: 2,
    search: search
  });

  useEffect(() => {
    if (data) {
      if (page === 1 || search.length > 0) {
        setVisibleAddresses([...data.data.Address])
        return
      }
      if (data?.data?.totalItems !== visibleAddresses.length && page > 1) {
        data.data.Address.length > 0 && setVisibleAddresses(prev => ([...prev, ...data.data.Address]))
        return
      }
    }
  }, [data]);

  const handleNext = () => setPage(prev => prev + 1)
  const dispableNext = visibleAddresses.length === data?.data?.totalItems
  const handlePrevious = () => setPage(prev => prev - 1)

  return (
    <>
      <div
        aria-label="Select a delivery address "
        className="a-section deliverydelivery"
        role="form"
      >
        <div className="a-row a-spacing-small">
          <div className="a-column a-span10">
            <h3 className="a-color-state">
              <span className="a-letter-space" />
              Select a sender address
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
                        placeholder="Search By Sender, Company Address line 1"
                        className="form-control w-50 mb-2"
                        value={search}
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
                            handleShow={handleShow}
                            setFormData={setFormData}
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
                  <SelectThisAddress {...{
                    selectedAddress,
                    visibleAddresses,
                    formData,
                    setSenderForm: props.setFormData,
                    setFormData,  // Add this
                    user: props.user       // Add this
                  }} />
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

export default SavedAddress;
