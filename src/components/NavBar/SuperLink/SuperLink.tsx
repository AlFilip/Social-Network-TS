import { Link, useLocation } from "react-router-dom"
import React from "react"
import s from "./SuperLink.module.css"


export type LinkType = {
    to: string
    linkName: string
}

export function SuperLink(props: LinkType) {
    const { pathname } = useLocation()
    return (
        <div className={ s.item }>
            <Link to={ props.to }
                  className={ pathname === props.to ? s.active : '' }
            >
                { props.linkName }
            </Link>
        </div>
    )
}
