import React from "react";
import s from "./Header.module.css"
import {LoginFormContainer} from "./LoginForm/LoginFormContainer";


function Header() {
    return (
        <header className={s.header}>
            <img src="https://brandmark.io/logo-rank/imagecache/701d7e7db0c5bcc76a3f7bd29d4a8890.png" alt=""/>
            <LoginFormContainer/>
        </header>
    )
}

export default Header;