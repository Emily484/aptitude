import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {TiLeaf} from 'react-icons/ti';
import {FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';
import { useSelector } from 'react-redux';
import {UserState} from '../../reducers/reducer';
import {IconContext} from 'react-icons/lib';

function NavBar() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false)

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <div className="navbar-container container">
                {user.role ? (
                        <Link to ='/applications' className="navbar-welcome">Welcome, {user.name}</Link>
                    ) : (
                        <Link to='/' className="navbar-logo" onClick=
                        {closeMobileMenu}>
                        <TiLeaf />
                        APTITUDE
                       
                    </Link>
                    )}
                    <div className="menu-icon" onClick={handleClick}>
                        {click ? <FaTimes /> : <FaBars />}
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className="nav-item">
                            <Link to='/' className="nav-links">
                                Home
                            </Link>
                        </li>
                        {user.role === 'Employee' ? (
                            <li className="nav-item">
                                <Link to='/submitApp' className="nav-links">
                                    TRMS
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link to='/services' className="nav-links">
                                    TRMS
                                </Link>
                            </li>
                        )} 
                        <li className="nav-item">
                            <Link to='/memberships' className="nav-links">
                                Memberships
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            </IconContext.Provider>
        </>
    )
}

export default NavBar
