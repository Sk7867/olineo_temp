import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DropdownAddProductsList from '../DashboardContent/DropdownAddProductsList';

const EditProductModal = (props) => {
  const [L1Selected, setL1Selected] = useState(props.data.hierarchyL1);
  const [L2Selected, setL2Selected] = useState(props.data.hierarchyL2);
  const [L3Selected, setL3Selected] = useState(props.data.hierarchyL3);
  const [classificationSelected, setClassificationSelected] = useState("");
  return (
    <div>
      <div>
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton className='mt-3'>
            {/* <Modal.Title id="contained-modal-title-vcenter">
                            Update Product Information
                        </Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <form className="card-body bg-light shadow-sm px-1">
              <h3>Update Product</h3>

              <DropdownAddProductsList
                L3Selected={L3Selected}
                setL3Selected={setL3Selected}
                L2Selected={L2Selected}
                setL2Selected={setL2Selected}
                L1Selected={L1Selected}
                setL1Selected={setL1Selected}
                classificationSelected={classificationSelected}
                setClassificationSelected={setClassificationSelected}
              />

              <h6 className="Catalogue_Section_Heading mt-2">Product Info</h6>
              <>
                <div className="catelogue_Form_Group" >
                  <input
                    defaultValue={props.data.name}
                    type="text"
                    name="ProductName"
                    id="Product Name"
                    // value={product.name}
                    className="input-field"
                    placeholder="Enter Product Name"
                  // // onChange={(value) => handleInput("name", value)}
                  />
                  <input
                    defaultValue={props.data.ean}
                    type="text"
                    name="ProductEAN"
                    id="Product EAN"
                    // value={product.EAN}
                    className="input-field"
                    placeholder="Enter Product EAN"
                  // // onChange={(value) => handleInput("EAN", value)}
                  />
                  <input
                    defaultValue={props.data.HSN}
                    type="text"
                    name="Product HSN"
                    id="Product HSN"
                    // value={product.HSN}
                    className="input-field mb-2"
                    placeholder="Enter Product HSN"
                  // // onChange={(value) => handleInput("HSN", value)}
                  />
                </div>
                <div className="catelogue_Form_Group">
                  <input
                    defaultValue={props.data.description}
                    type="text"
                    name="ProductDescription"
                    id="Product Description"
                    // value={product.description}
                    className="input-field"
                    placeholder="Enter Product Description"
                  />
                </div>
                <div className="catelogue_Form_Group">
                  <input
                    type="text"
                    name="imageUrl"
                    id="Product Color"
                    className="input-field"
                    placeholder="Image url"
                  />
                  <p className="catalogue_Hint">
                    Inward Date
                  </p>
                  <input
                    type="date"
                    name="InwardDate"
                    placeholder="Product Inward Date"
                    className="input-field"

                  />

                  <input
                    defaultValue={props.data.modelNo}
                    type="text"
                    name="modelNum"
                    id=""
                    className="input-field"
                    placeholder="Enter Model Number"
                  />
                  <input
                    type="text"
                    name="ProductMRP"
                    id="ProductMRP"
                    // value={product.MRP}
                    className="input-field"
                    placeholder="Enter Product MRP"
                  // // onChange={(value) => handleInput("MRP", value)}
                  />
                  <input
                    type="text"
                    name="ProductMOP"
                    id="Product MOP"
                    // value={product.MOP}
                    className="input-field"
                    placeholder="Enter Product MOP"
                  // onChange={(value) => handleInput("MOP", value)}
                  />
                  <input
                    type="text"
                    name="discountPrice"
                    id="Product discountPrice"
                    // value={product.MOP}
                    className="input-field"
                    placeholder="Enter Discount Price"
                  // onChange={(value) => handleInput("MOP", value)}
                  />
                </div>
              </>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  className="btn btn-primary mr-auto float-right mt-2 px-5"
                >
                  Add
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default EditProductModal;
