import React, {FC} from "react";
import {SuperLink} from "./SuperLink/SuperLink";

type NavBarLinkItemPropsType = {
    isActive: boolean
    to: string
    name: string
}
export const NavbarLinkItem: FC<NavBarLinkItemPropsType> = ({
                                                                to,
                                                                isActive,
                                                                name,
                                                                children
                                                            }) => (
    <SuperLink to={to} linkName={name} isActive={isActive}>
        <>{children}</>
    </SuperLink>
)

