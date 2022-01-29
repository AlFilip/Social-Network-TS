import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faInstagram, faTwitter, faVk, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {faPortrait} from "@fortawesome/free-solid-svg-icons";
import {contactsType} from "../../../../redux/profileReducer";

import s from './ProfileLinks.module.scss'

type ProfileLinksPropsType = {
    contacts: contactsType
}


export const ProfileLinks: React.FC<ProfileLinksPropsType> = ({
                                                                  contacts
                                                              }) => {

    return (
        <div className={s.profileLinks}>
            {
                contacts.facebook
                && <a href={contacts.facebook}>
                    <FontAwesomeIcon icon={faFacebook} size='2x'/>
                </a>
            }
            {
                contacts.vk
                && <a href={contacts.vk}>
                    <FontAwesomeIcon icon={faVk} size='2x'/>
                </a>
            }
            {
                contacts.github
                && <a href={contacts.github}>
                    <FontAwesomeIcon icon={faGithub} size='2x'/>
                </a>
            }
            {
                contacts.instagram
                && <a href={contacts.instagram}>
                    <FontAwesomeIcon icon={faInstagram} size='2x'/>
                </a>
            }
            {
                contacts.twitter
                && <a href={contacts.twitter}>
                    <FontAwesomeIcon icon={faTwitter} size='2x'/>
                </a>
            }
            {
                contacts.website
                && <a href={contacts.website}>
                    <FontAwesomeIcon icon={faYoutube} size='2x'/>
                </a>
            }
            {
                contacts.website
                && <a href={contacts.website}>
                    <FontAwesomeIcon icon={faPortrait} size='2x'/>
                </a>
            }
        </div>
    )
}

