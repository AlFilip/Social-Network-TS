import {Link, useLocation} from "react-router-dom"
import React from "react"
import s from "./SuperLink.module.scss"


export type LinkType = {
    to: string
    linkName: string
    children?: JSX.Element
}

export function SuperLink({
                              to,
                              linkName,
                              children,
                          }: LinkType) {

    const {pathname} = useLocation();
    const isActive = pathname.includes(to)

    const linkClassName = `${s.superLink} ${isActive ? s.active : ''}`
    return (
        <div className={linkClassName}>
            <Link
                to={to}
            >
                {children}
                {linkName}
            </Link>
        </div>
    )
}
