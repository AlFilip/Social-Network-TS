import React from "react";
import s from "./ProfileInfo.module.css"
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {profileType} from "../../../redux/profileReducer";
import {Preloader} from "../../Common/Preloader/Preloader";

export function ProfileInfo() {
    const profile = useSelector<AppStateType, profileType>(state => state.profile.currentProfile)
    const profileImg = (profile && profile.photos && profile.photos.large) ? profile.photos.large : "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
    return (
        <>
            {
                profile
                    ? <div className={s.profileInfo}>
                        <img src={profileImg} alt=""/>
                        <div className={s.description}>{profile.fullName}</div>
                    </div>
                    : <Preloader/>
            }
        </>
    )
}
