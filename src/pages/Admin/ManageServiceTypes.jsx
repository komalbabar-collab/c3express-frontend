import { useEffect, useState } from "react";
import {
  useGetServiceTypesDataQuery,
  usePostUpdateServiceTypesDataMutation,
  usePostDeleteServiceTypesDataMutation,
} from "../../service/apiServices";

import "./Dashboard.css";
import useFormSubmission from "../../hooks/useFormSubmission";
import AddServiceType from "../../Components/ManageServicetypes/AddServiceType";
import ServiceTypeData from "../../Components/ManageServicetypes/ServiceTypeData";
import UsePagination from "../../hooks/UsePagination";
import ProtectComponent from "../../Components/Common/ProtectComponent";
import Loader from "../../heplers/Loaders/Loader";
const ManageServiceType = (props) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [IsDelete, setIsDelete] = useState(null);
  const changeAvailability = () => {
    setIsAvailable(!isAvailable);
  };
  const [mutate] = usePostDeleteServiceTypesDataMutation();
  const [mutateUpdate] = usePostUpdateServiceTypesDataMutation();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
    useFormSubmission(usePostUpdateServiceTypesDataMutation, {});
  const [limit, setLimit] = useState(10);
  const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
  const { data, error, isLoading, refetch } =
    useGetServiceTypesDataQuery(search);
  useEffect(() => {
    refetch();
  }, [Data, IsDelete]);
  useEffect(() => {
    if (data) {
      setNumberOfPages(Math.ceil(data.data.totalPages));
    }
  }, [data])
  const startIndex = (pageNumber - 1) * limit;
  const deleteUser = async (item) => {
    try {
      const res = await mutate(item).unwrap();
      setIsDelete(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProtectComponent isDashboard={true} dashboard={"Manage_Service_Type"} userAuthData={props.userAuthData}>
      {isLoading ? <Loader /> : <main id="content" role="main">
        <div className="main-content">
          <div className="container-fluid">
            <button
              type="button"
              style={{ float: "right" }}
              className="btn btn-primary"
              onClick={changeAvailability}
            >
              {isAvailable ? "Back " : "Add ServiceType"}
            </button>
            <h2 className="page-title mb-5">Manage Service Types</h2>
            <div className="card customcss">
              <div className="card-body">
                {isAvailable ? (
                  <AddServiceType
                    setIsAvailable={setIsAvailable}
                    setIsDelete={setIsDelete}
                    changeAvailability={changeAvailability}
                  />
                ) : (
                  <>
                    <div className="col-lg-6" style={{ padding: "0px" }}>
                      <input
                        type="text"
                        onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                        value={search}
                        id="inputPassword6"
                        className="form-control"
                        aria-describedby="passwordHelpInline"
                        placeholder="Search By Title"
                      />
                      {/* <button onClick={()=>refetch()} className="searchbb">
                                            Search

                                        </button> */}
                    </div>

                    <ServiceTypeData
                      setIsDelete={setIsDelete}
                      mutateUpdate={mutateUpdate}
                      data={data}
                      error={error}
                      isLoading={isLoading}
                      Data={Data}
                      setFormData={setFormData}
                      formData={formData}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      show={show}
                      handleShow={handleShow}
                      handleClose={handleClose}
                      deleteUser={deleteUser}
                      startIndex={startIndex}
                    />
                    {pageComponent()}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>}

    </ProtectComponent>
  );
};

export default ManageServiceType;
