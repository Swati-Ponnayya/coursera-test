import Logo from "../img/account_circle.png"
import "./Navheader.css";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './Sidebar';


function Navheader() {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (<>
        <div className="Navheader">
            {/* <IconContext.Provider value={{ color: '#ff' }}>  sidebar  */}
            <div className='navbar'>
                <button  className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </button>

            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <button to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </button>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav> <a href="/"><h2>Cook Now</h2></a>
            <div className="User_info">
                <h3>abc</h3>
                <Link to="./login">
                <img src={Logo} alt="account_circle.png"/></Link>
            </div></div>
    </>
    )
}
export default Navheader;