import React from "react";
import s from "./Navbar.module.css"

function Navbar () {
    return (
        <nav className={s.nav}>
            <div>Profile</div>
            <div>Messages</div>
            <div>Users</div>
        </nav>
    )
}

export default Navbar;