import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addCupon } from "../../api/AdminApis/Cupon";

function DashboardAddDiscount(props) {

  const cuponSubmit = (e) => {
    e.preventDefault();
    const data = {
      "discount": e.target.discount.value,
      "maxAmount": e.target.maxAmount.value,
      "expire": e.target.expire.value,
      "products": e.target.products.value,
      "code": e.target.code.value,
    }
    console.log(data);
    addCupon(data)
      .then(res => console.log(res.data))
  }
  return (
    <div className="container">
      <Link to="/admin-discounts">
        <FontAwesomeIcon icon={faChevronLeft} /> Discounts
      </Link>
      <div className="card-body bg-light shadow-sm">
        <h3>Add Discount</h3>
      </div>
      <form onSubmit={cuponSubmit}>
        <input className="input-field mt-2" type="number" placeholder="Discount" name="discount" id="" />
        <input className="input-field mt-2" type="number" placeholder="Max Amount" name="maxAmount" id="" />
        <input className="input-field mt-2" type="text" placeholder="Code" name="code" id="" />
        <p className="catalogue_Hint">
          Expire in
        </p>
        <input className="input-field" type="date" name="expire" id="" />
        <input className="input-field mt-2" placeholder="Enter Product EAN" type="number" name="products" />
        <div className="d-flex justify-content-end">
          <Button
            type="submit"
            className="btn btn-primary mr-auto float-right mt-2 px-5"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}

export default DashboardAddDiscount;
