import React, { useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => {
    setCollapsed(collapsed);
  };

  const { icon, title, items } = props;

  return <p>asd</p>
  // return (
  //   <Nav.Item className={classNames({ open: !collapsed })}>
  //     <Accordion>
  //       <Accordion.Toggle
  //         as={Nav.Link}
  //         variant="link"
  //         eventKey="0"
  //         onClick={toggleNavbar}
  //       >
  //         <FontAwesomeIcon icon={icon} className="mr-2" />
  //         {title}
  //         <FontAwesomeIcon
  //           icon={collapsed ? faCaretDown : faCaretUp}
  //           className="float-right"
  //         />
  //       </Accordion.Toggle>

  //       <Accordion.Collapse eventKey="0">
  //         <nav className="nav flex-column">
  //           {items.map((item) => {
  //             return (
  //               <a
  //                 className={`nav-link nav-item pl-5 ${
  //                   item === "Active" ? "active" : ""
  //                 } `}
  //                 href="/"
  //                 key={item}
  //               >
  //                 {item}
  //               </a>
  //             );
  //           })}
  //         </nav>
  //       </Accordion.Collapse>
  //     </Accordion>
  //   </Nav.Item>
  // );

  // return (
  //   <div>
  //     <NavItem
  //       onClick={this.toggleNavbar}
  //       className={classNames({ "menu-open": !this.state.collapsed })}
  //     >
  //       <NavLink className="dropdown-toggle" href="#">
  //         <FontAwesomeIcon icon={icon} className="mr-2" />
  //         {title}
  //       </NavLink>
  //     </NavItem>
  //     <Collapse
  //       isOpen={!this.state.collapsed}
  //       navbar
  //       className={classNames("items-menu", {
  //         "mb-1": !this.state.collapsed
  //       })}
  //     >
  //       {items.map(item => (
  //         <NavItem key={item} className="pl-4">
  //           <NavLink>{item}</NavLink>
  //         </NavItem>
  //       ))}
  //     </Collapse>
  //   </div>
  // );
};

export default SubMenu;
