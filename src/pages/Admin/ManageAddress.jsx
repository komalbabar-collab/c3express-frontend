
import { useEffect, useState } from 'react';
import {
    useGetAddressDataQuery,

    usePostUpdateAddressDataMutation,
    usePostDeleteAddressDataMutation
} from '../../service/apiServices';
import './Dashboard.css';
import useFormSubmission from '../../hooks/useFormSubmission';
import AddAddress from '../../Components/ManageAddrees/AddAddress';
import AddressData from '../../Components/ManageAddrees/AddressData';
import UsePagination from '../../hooks/UsePagination';
import Loader from "../../heplers/Loaders/Loader"
const ManageAddress = () => {
    const [isAvailable, setIsAvailable] = useState(false)
    const [search, setSearch] = useState('')
    const [show, setShow] = useState(false);
    const [IsDelete, setIsDelete] = useState(null);
    const changeAvailability = () => {
        setIsAvailable(!isAvailable)
    }
    const [mutate] = usePostDeleteAddressDataMutation();
    const [mutateUpdate] = usePostUpdateAddressDataMutation();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { Data, setFormData, formData, errors, handleSubmit, handleChange } =
        useFormSubmission(usePostUpdateAddressDataMutation, {},);

    const { pageComponent, setNumberOfPages, pageNumber, itemsPerPage } = UsePagination();
    const { data, error, isLoading, refetch } = useGetAddressDataQuery({ search, page: pageNumber, limit: itemsPerPage });
    useEffect(() => {
        refetch();
    }, [Data, IsDelete, search]);
    useEffect(() => {
        if (data) {
            setNumberOfPages(Math.ceil(data.data.totalpages));
        }
    }, [data])
    const deleteUser = async (item) => {
        try {
            const res = await mutate(item).unwrap();
            setIsDelete(res)
        } catch (error) {
            console.error(error)
        }
    }
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return (
        <>
            {isLoading ? <Loader /> :
                <main id="content" role="main">
                    <div className="main-content">
                        <div className="container-fluid">
                            <button type="button" style={{ float: 'right' }} className="btn btn-primary" onClick={changeAvailability}>
                                {isAvailable ? 'Back ' : 'Add Address'}
                            </button>
                            <h2 className="page-title mb-5">Manage Address</h2>
                            <div className="card customcss">
                                <div className="card-body" style={{ overflowX: 'scroll' }}>
                                    {isAvailable ? (<AddAddress setIsAvailable={setIsAvailable} setIsDelete={setIsDelete} changeAvailability={changeAvailability} />) : (
                                        <>
                                            <div className="col-lg-6" style={{ padding: '0px' }}>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setSearch(e.target.value?.toLowerCase())}
                                                    value={search}
                                                    id="inputPassword6"
                                                    className="form-control"
                                                    aria-describedby="passwordHelpInline"
                                                    placeholder='Search By Company Name,City,Title'
                                                />
                                            </div>

                                            <AddressData startIndex={startIndex} setIsDelete={setIsDelete} mutateUpdate={mutateUpdate} data={data} error={error} isLoading={isLoading} Data={Data} setFormData={setFormData}
                                                formData={formData} errors={errors}
                                                handleSubmit={handleSubmit}
                                                handleChange={handleChange}
                                                show={show} handleShow={handleShow} handleClose={handleClose} deleteUser={deleteUser} />
                                            {pageComponent()}
                                        </>

                                    )}
                                </div>
                            </div>

                        </div>
                    </div >
                </main >
            }
        </>


    );
};

export default ManageAddress;