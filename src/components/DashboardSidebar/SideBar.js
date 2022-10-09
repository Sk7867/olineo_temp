import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faUser,
  faTimes,
  faTags,
  faPercent,
  faCartArrowDown,
  faMoneyBill,
  faShop,
  faCancel,
  faImages,
  faGift,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./SubMenu";
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import logo_mob from "../../assets/vector/navbar_logo_mob.svg";
import logo_desk from "../../assets/vector/navbar_logo_desk.svg";
import logo_tab from "../../assets/vector/navbar_logo_tab.svg";

const SideBar = ({ isOpen, toggle }) => {
  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <Button variant="link" onClick={toggle} style={{ color: "#fff" }} className="mt-4">
          <FontAwesomeIcon icon={faTimes} pull="right" size="xs" />
        </Button>
        <h3>
          <Link to={"/"} className="navLogo">
            {/* <img src={logo_mob} alt="" className="logo_mob" /> */}
            <img src={logo_desk} alt="" className="logo_deskk" />
            {/* <img src={logo_tab} alt="" className="logo_tab" /> */}
          </Link>
          {/* OlineO Admin Panel */}
        </h3>
      </div>

      <Nav className="flex-column pt-2">
        {/* <p className="ml-3">Dashboard</p> */}

        <Nav.Item
          className={(isActive) => "nav-link" + (!isActive ? " active" : "active")}
          // className="active"
        >
          <Link className="dash_sidebar_a nav-link" to="/admin-home">
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Home
          </Link>
        </Nav.Item>

        {/* <SubMenu
          title="Pages"
          icon={faCopy}
          items={["Link", "Link2", "Active"]}
        /> */}

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-products">
            <FontAwesomeIcon icon={faTags} className="mr-2" />
            Products
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-banner">
            <FontAwesomeIcon icon={faImages} className="mr-2" />
            Banner Images
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-orders">
            <FontAwesomeIcon icon={faCartArrowDown} className="mr-2" />
            Orders
          </Link>
        </Nav.Item>

        <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link" to="/admin-discounts">
            <FontAwesomeIcon icon={faPercent} className="mr-2" />
            Discounts
          </Link>
        </Nav.Item>
        {/* <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link" to="/admin-discounts">
            <FontAwesomeIcon icon={faPercent} className="mr-2" />
            Offers
          </Link>
        </Nav.Item> */}
        <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link" to="/admin-alluser">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            All Users
          </Link>
        </Nav.Item>
        <Nav.Item className="">
          <Link className="dash_sidebar_a nav-link" to="/admin-shops">
            <FontAwesomeIcon icon={faShop} className="mr-2" />
            Shops
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-payments">
            <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
            Payments
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-cancellation">
            <FontAwesomeIcon icon={faCancel} className="mr-2" />
            Cancellation
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-query">
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </Link>
        </Nav.Item>

        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link className="dash_sidebar_a nav-link" to="/admin-ifd">
            <FontAwesomeIcon icon={faCheckDouble} className="mr-2" />
            Indian Festival Days
          </Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default SideBar;
