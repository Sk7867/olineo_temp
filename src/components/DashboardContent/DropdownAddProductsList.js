import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

import {
  hL1List,
  hL3List,
  hL2List,
  productClassifications,
} from "../../pages/CataloguePage/AddProductSection";

function DropdownAddProductsList({
  L1Selected,
  setL1Selected,
  L2Selected,
  setL2Selected,
  L3Selected,
  setL3Selected,
  classificationSelected,
  setClassificationSelected,
}) {
  return (
    <div className="d-flex">
      <DropdownButton
        className="mr-2 py-2"
        id="dropdown-item-button"
        title={L1Selected ? L1Selected : "Select L1"}
      >
        {hL1List.map((item, index) => (
          <Dropdown.Item
            key={index}
            value={item}
            onClick={() => setL1Selected(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        className="mr-2 py-2"
        id="dropdown-item-button"
        title={L2Selected ? L2Selected : "Select L2"}
      >
        {hL2List.map((item, index) => (
          <Dropdown.Item
            key={index}
            value={item}
            onClick={() => setL2Selected(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        className="mr-2 py-2"
        id="dropdown-item-button"
        title={L3Selected ? L3Selected : "Select L3"}
      >
        {hL3List.map((item, index) => (
          <Dropdown.Item
            key={index}
            value={item}
            onClick={() => setL3Selected(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton
        className="mr-2 py-2"
        id="dropdown-item-button"
        title={
          classificationSelected
            ? classificationSelected
            : "Select Product Classification"
        }
      >
        {productClassifications.map((item, index) => (
          <Dropdown.Item
            key={index}
            value={item}
            onClick={() => setClassificationSelected(item)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default DropdownAddProductsList;
