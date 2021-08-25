import {NavLink} from "react-router-dom";
import React from "react";
import s from "./SuperLink.module.css"

type LinkType = {
    to: string
    name: string
}

function SuperLink (props:LinkType) {
    return (
        <div className={s.item}>
            <NavLink to={props.to} activeClassName={s.active}>
                {props.name}
            </NavLink>
        </div>
    )
}

export default SuperLink;