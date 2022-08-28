import React from "react";
import s from "./NavBar.module.scss"
import {faComments, faHouseUser, faPeopleArrowsLeftRight, faUsers} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faRocketchat} from "@fortawesome/free-brands-svg-icons";
import {useLocation} from "react-router-dom";
import {NavbarLinkItem} from "./NavbarLinkItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const navbarLinks = [
    {
        to: '/profile',
        icon: faHouseUser,
        name: 'Profile',
    },
    {
        to: '/dialogs',
        icon: faComments,
        name: 'Messages',
    },
    {
        to: '/users',
        icon: faUsers,
        name: 'Users',
    },
    {
        to: '/friends',
        icon: faPeopleArrowsLeftRight,
        name: 'Friends',
    },
    {
        to: '/chat',
        icon: faRocketchat,
        name: 'Chat',
    },
]

export function NavBar() {

    const {pathname} = useLocation();

    return (
        <nav className={s.nav}>
            {
                navbarLinks.map(item => (
                    <NavbarLinkItem
                        key={item.to}
                        to={item.to}
                        isActive={pathname.includes(item.to)}
                        name={item.name}
                    >
                        <FontAwesomeIcon icon={item.icon as IconProp}/>
                    </NavbarLinkItem>
                ))
            }
        </nav>
    )
}