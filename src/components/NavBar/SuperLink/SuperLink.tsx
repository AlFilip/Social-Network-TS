import {NavLink} from "react-router-dom";
import React from "react";
import s from "./SuperLink.module.css"

export type LinkType = {
    to: string
    linkName: string
}

export function SuperLink (props:LinkType) {
    return (
        <div className={s.item}>
            <NavLink to={props.to} activeClassName={s.active}>
                {props.linkName}
            </NavLink>
        </div>
    )
}
