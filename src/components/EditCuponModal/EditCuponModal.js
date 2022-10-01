import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateCupon } from '../../api/AdminApis/Cupon';

const EditCuponModal = (props) => {
    const { data } = props;
    const id = data._id;
    const submitHandle = (e) => {
        e.preventDefault();
        const submitData = {
            "discount": e.target.discount.value,
            "maxAmount": e.target.maxAmount.value,
            "expire": e.target.expire.value,
            "products": e.target.products.value,
            "code": e.target.code.value,
        }
        updateCupon(id, submitData)
            .then(res => console.log("Response data:", res.data))
    }
    console.log(data);
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className=''
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Coupon
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitHandle}>
                        <input className="input-field mt-2" type="number" placeholder="Discount" defaultValue={data.discount} name="discount" id="" />
                        <input className="input-field mt-2" type="number" placeholder="Max Amount" defaultValue={data.maxAmount} name="maxAmount" id="" />
                        <input className="input-field mt-2" type="text" defaultValue={data.code} placeholder="Code" name="code" id="" />
                        <p className="catalogue_Hint">
                            Expire in
                        </p>
                        <input className="input-field" defaultValue={data.expire} type="date" name="expire" id="" />
                        <input className="input-field mt-2" placeholder="Enter Product EAN" type="number" name="products" />
                        <div className="d-flex justify-content-end">
                            <Button
                                type="submit"
                                className="btn btn-primary mr-auto float-right mt-2 px-5"
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditCuponModal;