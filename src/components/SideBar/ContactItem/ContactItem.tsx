import React from "react";

import s from './ContactItem.module.scss'
import defaultUserImg from '../../../assets/images/defaultUserImg.png'

import {UserType} from "../../../redux/usersReducer";


export const ContactItem = ({
                                name,
                                photos,
                                id,
                                status,
                                followed
                            }: UserType) => {
    return (
        <div className={s.contactItem}>


            <img className={s.userPhoto} src={photos.small ? photos.small : defaultUserImg} alt=""/>

            <span className={s.userName}>{name}</span>
        </div>
    )
}