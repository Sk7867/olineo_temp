import React, { useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/vector/navbar_logo_desk.svg'
import humBurger from '../../assets/vector/hamburger_icon.svg'
import './dashboard.css';

const Dashboard = () => {
    const [resSidenav, setResSidenav] = useState('d-none')
    return (
        <>
            <div className='px-1 px-md-5 dashboard_nav text-white'>
                <Navbar >
                    {
                        resSidenav === "d-block" ?
                            <button className='btn text-white' onClick={() => setResSidenav("d-none")}>X</button> :
                            <img className='d-block d-md-none' onClick={() => setResSidenav("d-block")} src={humBurger} alt="" />
                    }
                    <Link className='d-none d-md-block ms-2 ms-md-0' to='/'><img src={logo} alt="" /></Link>
                    <Link className='d-block d-md-none ms-2 ms-md-0' to='/'><img width="60%" src={logo} alt="" /></Link>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className='text-white'>
                            Signed in as: <a className='text-white' href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <div className='d-flex'>
                <div className='d-none d-md-block side_nav shadow '>
                    <div className='d-flex flex-column'>
                        <NavLink className='px-5 py-2 sidenav_btb'
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "#1b325e60" : "",
                                };
                            }}
                            to="page1">Page1</NavLink>
                        <NavLink className='px-5 py-2 sidenav_btb'
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "#1b325e60" : "",
                                };
                            }}
                            to="page2">Page2</NavLink>
                        <NavLink className='px-5 py-2 sidenav_btb'
                            style={({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? "#1b325e60" : "",
                                };
                            }}
                            to="page3">Page3</NavLink>
                    </div>
                </div>
                <div className='d-block d-md-none side_nav shadow '>
                    <div className={resSidenav} >
                        <div className='d-flex flex-column'>
                            <NavLink className='px-5 py-2 sidenav_btb'
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? "#1b325e60" : "",
                                    };
                                }}
                                to="page1">Page1</NavLink>
                            <NavLink className='px-5 py-2 sidenav_btb'
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? "#1b325e60" : "",
                                    };
                                }}
                                to="page2">Page2</NavLink>
                            <NavLink className='px-5 py-2 sidenav_btb'
                                style={({ isActive }) => {
                                    return {
                                        backgroundColor: isActive ? "#1b325e60" : "",
                                    };
                                }}
                                to="page3">Page3</NavLink>
                        </div>
                    </div>
                </div>
                <div className='dashboard_body' onClick={() => setResSidenav("d-none")}>
                    <div className='p-2 ms-5'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>

    );
};

export default Dashboard;