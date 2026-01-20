import React, { useEffect, useState } from 'react';
import UsersData from '../../Components/Users/UsersData';
import AddUser from '../../Components/Users/AddUser';
import { useDeleteUserDataMutation, useGetUsersDataQuery, useUpdateUserDataMutation } from '../../service/apiServices';
import useFormSubmission from '../../hooks/useFormSubmission';
import UsePagination from '../../hooks/UsePagination';
import ProtectComponent from '../../Components/Common/ProtectComponent';
import { toast } from 'react-toastify';
import { initialUsers } from '../../service/initialData';

const ManageSubUsers = (props) => {
    const isAdmin = props.userAuthData && props.userAuthData.data && props.userAuthData.data.data.user.Role === "Admin";
    const isAuth = (propertyname) => {
        return props.userAuthData && props.userAuthData.data && props.userAuthData.data.data.user.dashboard[propertyname];
    }

    const [isAvailable, setIsAvailable] = useState(false)
    const [search, setSearch] = useState('')
    const [activate, setActive] = useState("");
    const [show, setShow] = useState(false);
    const [IsDelete, setIsDelete] = useState(null);
    const changeAvailability = () => {
        setIsAvailable(!isAvailable)
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [mutate] = useDeleteUserDataMutation()
    const [mutateUpdate] = useUpdateUserDataMutation();
    const { Data, setFormData, formData, errors, handleSubmit, handleChange, setData } =
        useFormSubmission(useUpdateUserDataMutation, { ...initialUsers, service_types: [] },);


    const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();

    const { data, error, isLoading, refetch } = useGetUsersDataQuery({ activate, search, page: pageNumber, limit: itemsPerPage });
    useEffect(() => {
        refetch();
    }, [refetch, Data, IsDelete]);
    useEffect(() => {
        if (!error && data && data.data) {
            setNumberOfPages(Math.ceil(data.data.totalPages));
        }
        if (error) {
            setNumberOfPages(0);
        }

    }, [data, error])
    const startIndex = (pageNumber - 1) * itemsPerPage;

    // Number of items to display per page
    const deleteUser = async (id) => {
        try {
            const res = await mutate(id).unwrap();

            toast.success(res.data)
            setIsDelete(res)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        Data && toast.success(errors.message) && setData(null)
    }, [Data])
    // console.log(formData)
    return (
        <ProtectComponent isDashboard={true} dashboard={"Manage_Sub_Users"} userAuthData={props.userAuthData}>
            <main id="content" role="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <button type="button" style={{ float: 'right' }} className="btn btn-primary" onClick={changeAvailability}>
                            {isAvailable ? 'Back ' : isAdmin ? "Add Customer" : "Add Sub User"}
                        </button>
                        <h2 className="page-title mb-5">{isAdmin ? "Manage Customer" : "Manage Sub Users"}</h2>
                        <div className="card customcss">
                            <div className="card-body">
                                {isAvailable ? (<AddUser setIsAvailable={setIsAvailable} setIsDelete={setIsDelete} changeAvailability={changeAvailability} userAuthData={props.userAuthData} isAdmin={isAdmin} isAuth={isAuth} />) : (
                                    <div className='row'>
                                        <div className="col-lg-6">
                                            <select className="form-control" id="exampleFormControlSelect1" onChange={(e) => setActive(e.target.value)}>
                                                <option value="">All</option>
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6">
                                            <input
                                                type="text"
                                                onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                                                value={search}
                                                id="inputPassword6"
                                                className="form-control"
                                                aria-describedby="passwordHelpInline"
                                                placeholder='Search By  Name,Email,Account No'
                                            />
                                        </div>
                                        <UsersData data={data} error={error} mutateUpdate={mutateUpdate} isLoading={isLoading} Data={Data} setFormData={setFormData}
                                            formData={formData} errors={errors}
                                            handleSubmit={handleSubmit}
                                            handleChange={handleChange}
                                            setIsDelete={setIsDelete}
                                            show={show} handleShow={handleShow} handleClose={handleClose} deleteUser={deleteUser} startIndex={startIndex}
                                            isAdmin={isAdmin} isAuth={isAuth}
                                        />
                                        {pageComponent()}

                                    </div>
                                )
                                }
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </ProtectComponent>
    );
};

export default ManageSubUsers;
