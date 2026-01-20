
import './Dashboard.css';

const Topuprequest = () => {
   
    return (
       
            <main id="content" role="main">
                <div className="main-content">
                    <div className="container-fluid">
                        <h2 className="page-title">Top-Up Request</h2>
                        <div className="card customcss">
                            <div className="card-body">
                                <form>
                                    <div className='row'>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label">
                                                Amount in(AED)*
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder='Enter Amount'
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Contact Person
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder='Enter Contact Person'
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Contact Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder='Enter Contact Number'
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Contact Email
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder='Enter Contact Email'
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="exampleInputPassword1" className="form-label">
                                                Remark*
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder='Enter Remark'
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginLeft: '5px' }}>
                                        Save
                                    </button>
                                    <button type="submit" className="btn btn-danger">
                                        Cancel
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
    
    );
};

export default Topuprequest;