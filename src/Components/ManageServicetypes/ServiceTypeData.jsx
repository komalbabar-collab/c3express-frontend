import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteUserDataMutation, useGetUsersDataQuery, useUpdateUserDataMutation } from "../../service/apiServices";
import { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

const ServiceTypeData = (props) => {
  const UpdateAddress = (e, id) => {
    e.preventDefault()
    const { name, value, checked } = e.target
    props.setFormData(prev => ({ ...prev, [name]: name == "Active" ? checked : value, _id: id }))
  }
  const updateStatus = async (e, id) => {
    try {
      const res = await props.mutateUpdate({
        ...id,
        Active: e.target.checked
      }).unwrap();
      props.setIsDelete(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Title</th>
            <th>Value</th>
            <th style={{ width: "2%" }}>Status</th>
            <th style={{ width: "14%" }} >Action</th>
          </tr>
        </thead>
        <tbody>
          {props.error ? (
            <tr>
              <td colSpan="3">{props.error.data?.message}</td>
            </tr>
          ) : (
            props.data.data.ServiceType && props.data.data.ServiceType.length > 0 ?
              props.data.data.ServiceType.map((item, index) => (
                <tr key={item._id}>
                  <td>{props.startIndex + index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.value}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"

                        checked={item.Active}
                        onChange={(e) => updateStatus(e, item)}
                      />
                    </div>
                  </td>
                  <td className="d-flex justify-content-between">
                    <Button variant="primary" onClick={() => {
                      props.handleShow()
                      props.setFormData(item)
                    }}>
                      Edit
                    </Button>

                    <Button variant="danger" onClick={() => props.deleteUser(item)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              )) : <tr>
                <td colSpan="11">No Data Found</td>
              </tr>
          )}
        </tbody>
      </table>



      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: '18px' }}>Edit Service Type</Modal.Title>
        </Modal.Header>
        <Modal.Body><form method="post" onSubmit={props.handleSubmit}>
          {props.formData && (<div className="footer_form_outer">
            <label>Title</label>
            <input
              placeholder={"Title"}
              name="title"
              className="form-control"
              value={props.formData["title"]}
              onChange={(e) => UpdateAddress(e, props.formData._id)}
              autoComplete="off"
              required=""
              type="text"
            />
            <label>Value</label>
            <input
              placeholder={"Company Name"}
              name="value"
              className="form-control"
              value={props.formData["value"]}
              onChange={(e) => UpdateAddress(e, props.formData._id)}
              autoComplete="off"
              required=""
              type="text"
            />

          </div>)}
        </form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            props.handleClose()
            props.handleSubmit()
          }}>

            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ServiceTypeData;
