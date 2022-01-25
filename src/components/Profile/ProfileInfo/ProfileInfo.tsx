import React, {ChangeEventHandler, useEffect, useState} from "react"
import s from "./ProfileInfo.module.css"
import {useDispatch, useSelector} from "react-redux"
import {Preloader} from "../../Common/Preloader/Preloader"
import {ProfileStatus} from "./ProfileStatus/ProfileStatus"
import {selectAdditionalUserInfo, selectAuthorisedUserId, selectCurrentProfile} from '../../../redux/selectors'
import {useAppSelector} from '../../../redux/redux-store'
import {contactsType, setPhoto, toggleUserProfileFollow} from '../../../redux/profileReducer'
import {UpdateProfile} from './UpdateProfile/UpdateProfile'
import {ProfileContact} from "./ProfileContact/ProfileContact";


export function ProfileInfo() {
    const [editMode, setEditMode] = useState(false)
    const profile = useSelector(selectCurrentProfile)
    const authorisedUserId = useAppSelector(selectAuthorisedUserId)
    const additionalUserInfo = useAppSelector(selectAdditionalUserInfo)
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const dispatch = useDispatch()
    const profileImg = (profile && profile.photos.small) ? profile.photos.small : "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
    // console.log('profileInfo')
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

    useEffect(() => {
        if (isBtnDisabled) setIsBtnDisabled(false)
    }, [additionalUserInfo])

    const isAuthorisedUserProfile = profile?.userId === authorisedUserId

    useEffect(() => {
        if (editMode) setEditMode(false)
    }, [profile])

    return (
        <>
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
                            {profile.fullName}
                            <ProfileStatus/>
                        </div>
                        {
                            profile && authorisedUserId && !isAuthorisedUserProfile
                            && (
                                <button onClick={toggleFollowClickHandle} disabled={isBtnDisabled}>
                                    {additionalUserInfo.followed ? 'Unfollow' : 'Follow'}
                                </button>
                            )}

                    </div>
                    : <Preloader/>
            }
            <div>
                <div>About me: {profile?.aboutMe}</div>
                <div>Looking for a job: {profile?.lookingForAJob ? 'yes' : 'no'}</div>
                {profile?.lookingForAJob && <div>Job description: {profile?.lookingForAJobDescription}</div>}
                <div>Contacts:</div>
                {
                    profile
                    && Object.keys(profile.contacts)
                        .reduce((acc, el) => {
                            const value = profile.contacts[el as keyof contactsType]
                            return value ? [...acc, <ProfileContact value={value} title={el} key={el}/>] : acc
                        }, [] as JSX.Element[])
                }
            </div>

            {
                isAuthorisedUserProfile
                && <button onClick={() => setEditMode(true)}>edit profile</button>
            }
        </>
    )
}

