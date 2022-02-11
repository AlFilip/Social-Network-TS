import React, {ChangeEventHandler, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom";

import s from "./ProfileInfo.module.scss"

import {Preloader} from "../../Common/Preloader/Preloader"
import {ProfileStatus} from "./ProfileStatus/ProfileStatus"
import {selectAdditionalUserInfo, selectAuthorisedUserId, selectCurrentProfile} from '../../../redux/selectors'
import {useAppSelector} from '../../../redux/redux-store'
import {setPhoto, toggleUserProfileFollow} from '../../../redux/profileReducer'
import {UpdateProfile} from './UpdateProfile/UpdateProfile'
import bgImg from "../../../assets/images/profileBg.jpg";
import {ProfileLinks} from "./ProfileLinks/ProfileLinks";
import {SubHeader} from "../../Common/SubHeader/SubHeader";


export function ProfileInfo() {
    const [editMode, setEditMode] = useState(false)
    const profile = useSelector(selectCurrentProfile)
    const authorisedUserId = useAppSelector(selectAuthorisedUserId)
    const additionalUserInfo = useAppSelector(selectAdditionalUserInfo)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const profileImg = (profile && profile.photos.large) ? profile.photos.large : "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
    const onPhotoClickHandle: ChangeEventHandler<HTMLInputElement> = e => {
        e.currentTarget.files &&
        dispatch(setPhoto(e.currentTarget.files[0]))
    }

    const toggleFollowClickHandle = () => {
        setIsBtnDisabled(true)
        dispatch(toggleUserProfileFollow({
            ...additionalUserInfo,
            followed: !additionalUserInfo.followed
        }))
    }

    const sendMessageClickHandle = () => navigate(`/dialogs/${profile?.userId}`)

    useEffect(() => {
        if (isBtnDisabled) setIsBtnDisabled(false)
    }, [additionalUserInfo, isBtnDisabled])

    const isAuthorisedUserProfile = profile?.userId === authorisedUserId

    useEffect(() => {
        if (editMode) setEditMode(false)
    }, [profile])

    return (
        <div className={s.profileInfoWrapper}>
            <img src={bgImg} alt="background image"/>
            {
                editMode
                && <UpdateProfile cancel={() => setEditMode(false)}/>
            }
            {
                profile
                    ? <div className={s.profileInfo}>
                        <label htmlFor="image">
                            {
                                isAuthorisedUserProfile &&
                                <input type="file" name="image" id="image" style={{display: 'none'}}
                                       onChange={onPhotoClickHandle}/>
                            }
                            <img src={profileImg} alt=""/>
                        </label>
                        <div className={s.description}>
                            <SubHeader title={profile.fullName || ''}/>
                            {
                                isAuthorisedUserProfile
                                && <button onClick={() => setEditMode(true)}>edit profile</button>
                            }
                            <ProfileStatus/>

                            <div>About me: {profile?.aboutMe}</div>
                            <div>Looking for a job: {profile?.lookingForAJob ? 'yes' : 'no'}</div>
                            {profile?.lookingForAJob && <div>Job description: {profile?.lookingForAJobDescription}</div>}
                        </div>
                        {
                            profile && authorisedUserId && !isAuthorisedUserProfile
                            && <>
                                <button onClick={toggleFollowClickHandle} disabled={isBtnDisabled}>
                                    {additionalUserInfo.followed ? 'Unfollow' : 'Follow'}
                                </button>
                                <button onClick={sendMessageClickHandle}>
                                    Send message
                                </button>

                            </>}

                        <div className={s.profileLinksWrapper}>
                            <ProfileLinks contacts={profile.contacts}/>
                        </div>

                    </div>
                    : <Preloader/>
            }
        </div>
    )
}

