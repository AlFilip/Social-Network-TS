import React from "react";
import s from "./NavBar.module.css"
import {SuperLink} from "./SuperLink/SuperLink";

export function NavBar () {
    return (
        <nav className={s.nav}>
            <SuperLink to={'/profile'} linkName={'Profile'}/>
            <SuperLink to={'/dialogs'} linkName={'Messages'}/>
            <SuperLink to={'/users'} linkName={'Users'}/>
        </nav>
    )
}
