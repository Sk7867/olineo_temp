import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { updateUseer } from '../../api/AdminApis/Users';

const EditUserModal = (props) => {
    const updateUser = (e) => {
        e.preventDefault()
        const data = {
            "fullName": e.target.fullName.value,
            "email": e.target.email.value,
            "mobileNumber": e.target.mobileNumber.value
        }
        updateUseer(props.user?.user?._id, data)
            .then(res => {
                props.setUser(res);
                // props.setModalShow(false);
                toast.success('Successfully Updated!')
            })
    }
    return (
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            {
                !props.user ? <p>Loading...</p> :
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className=''
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Update User Information
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={updateUser}>
                                <p className="catalogue_Hint">
                                    Name
                                </p>
                                <input className="input-field" type="text" placeholder="Name" defaultValue={props.user?.user?.fullName} name="fullName" id="" />
                                <p className="catalogue_Hint">
                                    Email
                                </p>
                                <input className="input-field mt-2" type="email" placeholder="Email" defaultValue={props.user?.user?.email} name="email" id="" />
                                <p className="catalogue_Hint">
                                    Mobile Number
                                </p>
                                <input className="input-field mt-2" placeholder="Number" type="number" defaultValue={props.user?.user?.mobileNumber} name="mobileNumber" />
                                <div className="d-flex justify-content-end">
                                    <Button
                                        type="submit"
                                        className="btn btn-primary mr-auto float-right mt-2 px-5"
                                    >
                                        Update User
                                    </Button>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
            }

        </div>
    );
};

export default EditUserModal;