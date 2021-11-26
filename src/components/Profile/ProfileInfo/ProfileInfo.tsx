import React from "react"
import s from "./ProfileInfo.module.css"
import { useSelector } from "react-redux"
import { AppStateType } from "../../../redux/redux-store"
import { profileType } from "../../../redux/profileReducer"
import { Preloader } from "../../Common/Preloader/Preloader"
import { ProfileStatus } from "./ProfileStatus/ProfileStatus"
import { selectCurrentProfile } from '../../../redux/selectors'


export function ProfileInfo() {
    const profile = useSelector<AppStateType, profileType>( selectCurrentProfile )
    const profileImg = ( profile && profile.photos && profile.photos.large ) ? profile.photos.large : "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
    // console.log('profileInfo')
    return (
        <>
            {
                profile
                    ? <div className={ s.profileInfo }>
                        <img src={ profileImg } alt=""/>
                        <div className={ s.description }>
                            { profile.fullName }
                            <ProfileStatus/>
                        </div>
                    </div>
                    : <Preloader/>
            }
        </>
    )
}
