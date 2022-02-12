import {Link} from "react-router-dom"
import React, {memo} from "react"
import s from "./SuperLink.module.scss"


export type LinkType = {
    to: string
    linkName: string
    isActive: boolean
    children?: JSX.Element
}

export const SuperLink = memo(({
                                   to,
                                   linkName,
                                   isActive,
                                   children,
                               }: LinkType) => {

    const linkClassName = `${s.superLink} ${isActive ? s.active : ''}`
    console.log('link')
    console.log({
        to,
        linkName,
        isActive,
        children,
    })
    return (
        <div className={linkClassName}>
            <Link
                to={to}
            >
                <span>
                {children}
                </span>
                {linkName}
            </Link>
        </div>
    )
})
