import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { getAllStore, updateIndiStore } from '../../api/AdminApis/AdminStore';

const EditStoreModal = (props) => {
  const [shopStatus, setShopStatus] = useState('')
  const updateUser = (e) => {
    e.preventDefault()
    const data = {
      "brand_store_id": e.target.brand_store_id.value,
      "fc_name": e.target.fc_name.value,
      "street_name": e.target.street_name.value,
      "pincode": e.target.pincode.value,
      "town": e.target.town.value,
      "city": e.target.city.value,
      "state": e.target.state.value,
      "country": e.target.country.value,
      "opening_hours": e.target.opening_hours.value,
      "opening_mins": e.target.opening_mins.value,
      "closing_hours": e.target.closing_hours.value,
      "closing_mins": e.target.closing_mins.value,
      "contact_person": e.target.contact_person.value,
      "contact_no": e.target.contact_no.value,
      "store_email_id": e.target.store_email_id.value,
      "gstn_code": e.target.gstn_code.value,
      "store_status": shopStatus,
    }
    updateIndiStore(props.singleShopData?._id, data)
      .then(res => {
        props.setSingleShopData(res);
        props.setModalShow(false);
        toast.success('Successfully Updated!');
        getAllStore().then((res) => {
          props.setData(res.stores)
          props.setLoader(false);
        })
      })
  }

  useEffect(() => {
    if (props && props.singleShopData && props.singleShopData.store_status) {
      setShopStatus(props.singleShopData.store_status)
    }
  }, [props])


  const shopStatusOptions = [
    'Active',
    'Not Active'
  ]

  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {
        !props.singleShopData ? <p>Loading...</p> :
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className=''
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Update Shop Information
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={updateUser}>
                <p className="catalogue_Hint">
                  Shop Brand Id
                </p>
                <input className="input-field" type="text" placeholder="Shop Brand Id" defaultValue={props.singleShopData?.brand_store_id} name="brand_store_id" id="Shop Brand Id" />
                <p className="catalogue_Hint">
                  Shop Name
                </p>
                <input className="input-field mt-2" type="text" placeholder="Shop Name" defaultValue={props.singleShopData?.fc_name} name="fc_name" id="" />
                <p className="catalogue_Hint">
                  Shop Street Name
                </p>
                <input className="input-field mt-2" type="text" placeholder="Shop Street Name" defaultValue={props.singleShopData?.street_name} name="street_name" id="" />
                <p className="catalogue_Hint">
                  Shop Pincode
                </p>
                <input className="input-field mt-2" type="text" placeholder="Shop Pincode" defaultValue={props.singleShopData?.pincode} name="pincode" id="" />
                <p className="catalogue_Hint">
                  Shop Town
                </p>
                <input className="input-field mt-2" type="text" placeholder="Shop Town" defaultValue={props.singleShopData?.town} name="town" id="" />
                <p className="catalogue_Hint">
                  Shop City
                </p>
                <input className="input-field mt-2" placeholder="Shop City" type="text" defaultValue={props.singleShopData?.city} name="city" />
                <p className="catalogue_Hint">
                  Shop State
                </p>
                <input className="input-field mt-2" placeholder="Shop State" type="text" defaultValue={props.singleShopData?.state} name="state" />
                <p className="catalogue_Hint">
                  Shop Country
                </p>
                <input className="input-field mt-2" placeholder="Shop Country" type="text" defaultValue={props.singleShopData?.country} name="country" />
                <p className="catalogue_Hint">
                  Shop Opening Hourse
                </p>
                <input className="input-field mt-2" placeholder="Shop Opening Hours" type="number" defaultValue={props.singleShopData?.opening_hours} name="opening_hours" />
                <p className="catalogue_Hint">
                  Shop Opening Minutes
                </p>
                <input className="input-field mt-2" placeholder="Shop Opening Minutes" type="number" defaultValue={props.singleShopData?.opening_mins} name="opening_mins" />
                <p className="catalogue_Hint">
                  Shop Closing Hours
                </p>
                <input className="input-field mt-2" placeholder="Shop Closing Hours" type="number" defaultValue={props.singleShopData?.closing_hours} name="closing_hours" />
                <p className="catalogue_Hint">
                  Shop Closing Minutes
                </p>
                <input className="input-field mt-2" placeholder="Shop Closing Minutes" type="number" defaultValue={props.singleShopData?.closing_mins} name="closing_mins" />
                <p className="catalogue_Hint">
                  Shop Contact Number
                </p>
                <input className="input-field mt-2" placeholder="Shop Contact Number" type="text" defaultValue={props.singleShopData?.contact_person} name="contact_person" />
                <p className="catalogue_Hint">
                  Shop Contact Person
                </p>
                <input className="input-field mt-2" placeholder="Shop Contact Person" type="text" defaultValue={props.singleShopData?.contact_no} name="contact_no" />
                <p className="catalogue_Hint">
                  Shop Contact Email
                </p>
                <input className="input-field mt-2" placeholder="Shop Contact Email" type="text" defaultValue={props.singleShopData?.store_email_id} name="store_email_id" />
                <p className="catalogue_Hint">
                  Shop GSTN Code
                </p>
                <input className="input-field mt-2" placeholder="Shop GSTN Code" type="text" defaultValue={props.singleShopData?.gstn_code} name="gstn_code" />
                <fieldset className='catelogue_Fieldset' >
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="catalogue_Dropdown">
                        {shopStatus ? (<p>{shopStatus}</p>) : (<p>Is Advance Payment Available?</p>)}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {
                        shopStatusOptions.map((item, index) => (
                          <Dropdown.Item key={index} value={item} onClick={() => setShopStatus(item)}>{item}</Dropdown.Item>
                        ))
                      }
                    </Dropdown.Menu>
                  </Dropdown>
                </fieldset>
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    className="btn btn-primary mr-auto float-right mt-2 px-5"
                  >
                    Update Shop Data
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
      }

    </div>
  );
};

export default EditStoreModal;