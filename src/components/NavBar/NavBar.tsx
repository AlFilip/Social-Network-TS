import React from "react";
import s from "./NavBar.module.css"
import SuperLink from "./SuperLink/SuperLink";

function NavBar () {
    return (
        <nav className={s.nav}>
            <SuperLink to={'/profile'} name={'Profile'}/>
            <SuperLink to={'/dialogs'} name={'Messages'}/>
            <SuperLink to={'/users'} name={'Users'}/>
        </nav>
    )
}

export default NavBar;