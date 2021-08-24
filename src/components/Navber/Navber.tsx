import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css"

function Navbar () {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to={'/profile'}>
                    Profile
                </NavLink>
            </div>
            <div>
                <NavLink to={'/dialogs'}>
                    Messages
                </NavLink>
            </div>
            <div>
                <NavLink to={'/users'}>
                    Users
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;