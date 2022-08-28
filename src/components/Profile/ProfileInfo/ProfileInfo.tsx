import React, {ChangeEventHandler, useEffect, useMemo, useState} from "react"
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {Nullable} from "../../../redux/appReducer";

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

    const renderedEditForm = useMemo(() => {
        if (!editMode) return null
        return <UpdateProfile cancel={() => setEditMode(false)}/>
    }, [editMode])


    const renderField = ({title, text}: { title: string, text?: Nullable<string> }) => (
        <div className={s.additionalInfoField}>
            <div className={s.additionalInfoFieldTitle}>{`${title}: `}</div>
            {' '}
            <div className={s.additionalInfoFieldText}>{text}</div>
        </div>
    )

    const renderProfile = () => {
        if (!profile) return <Preloader/>

        return (
            <div className={s.profileInfo}>
                <label htmlFor="image">
                    {
                        isAuthorisedUserProfile &&
                        <input type="file" name="image" id="image" style={{display: 'none'}}
                               onChange={onPhotoClickHandle}/>
                    }
                    <img src={profileImg} alt="" style={isAuthorisedUserProfile ? {cursor: 'pointer'} : {}}/>
                </label>

                <div className={s.description}>
                    <SubHeader className={s.userName}>
                        {profile.fullName || ''}
                        {
                            isAuthorisedUserProfile
                            && <FontAwesomeIcon icon={faPen as IconProp} onClick={() => setEditMode(true)}/>
                        }
                    </SubHeader>

                    <ProfileStatus/>

                    <div className={s.additionalInfo}>
                        {renderField({title: 'About me', text: profile?.aboutMe})}
                        {renderField({title: 'Looking for a job', text: profile?.lookingForAJob ? 'yes' : 'no'})}
                        {profile?.lookingForAJob && renderField({
                            title: 'Job description',
                            text: profile?.lookingForAJobDescription
                        })}
                    </div>
                </div>
                {
                    profile && authorisedUserId && !isAuthorisedUserProfile
                    && <>
                        <button onClick={toggleFollowClickHandle} disabled={isBtnDisabled}>
                            {
                                additionalUserInfo.followed
                                    ? 'Unfollow'
                                    : 'Follow'
                            }
                        </button>
                        <button onClick={sendMessageClickHandle}>
                            Send message
                        </button>
                    </>}

                <div className={s.profileLinksWrapper}>
                    <ProfileLinks contacts={profile.contacts}/>
                </div>

            </div>
        )
    }

    return (
        <div className={s.profileInfoWrapper}>
            <img src={bgImg} alt="background image"/>
            {renderedEditForm}
            {renderProfile()}
        </div>
    )
}

