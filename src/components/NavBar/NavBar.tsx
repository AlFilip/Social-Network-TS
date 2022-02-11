import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import s from "./NavBar.module.scss"
import {SuperLink} from "./SuperLink/SuperLink";
import {faComments, faHouseUser, faPeopleArrowsLeftRight, faUsers} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faRocketchat} from "@fortawesome/free-brands-svg-icons";


export function NavBar() {


    return (
        <nav className={s.nav}>
            <SuperLink to={'/profile'} linkName={'My Profile'}>
                <FontAwesomeIcon icon={faHouseUser as IconProp}/>
            </SuperLink>
            <SuperLink to={'/dialogs'} linkName={'Messages'}>
                <FontAwesomeIcon icon={faComments as IconProp}/>
            </SuperLink>
            <SuperLink to={'/users'} linkName={'Users'}>
                <FontAwesomeIcon icon={faUsers as IconProp}/>
            </SuperLink>
            <SuperLink to={'/friends'} linkName={'Friends'}>
                <FontAwesomeIcon icon={faPeopleArrowsLeftRight as IconProp}/>
            </SuperLink>
            <SuperLink to={'/chat'} linkName={'Chat'}>
                <FontAwesomeIcon icon={faRocketchat as IconProp}/>
            </SuperLink>
        </nav>
    )
}
