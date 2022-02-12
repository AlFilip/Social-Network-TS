import {SuperLink} from "./SuperLink/SuperLink";
import React, {useMemo} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type NavBarLinkItemPropsType = {
    isActive: boolean
    to: string
    name: string
    icon: IconProp
}
export const NavbarLinkItem = ({
                                   to,
                                   isActive,
                                   icon,
                                   name
                               }: NavBarLinkItemPropsType) => {

    return (
        <SuperLink to={to} linkName={name} isActive={isActive}>
            {
                useMemo(() => <FontAwesomeIcon icon={icon}/>, [])
            }
        </SuperLink>
    )
}