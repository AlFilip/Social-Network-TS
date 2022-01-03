import React, { ChangeEventHandler, useEffect, useState } from "react"
import s from "./ProfileInfo.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Preloader } from "../../Common/Preloader/Preloader"
import { ProfileStatus } from "./ProfileStatus/ProfileStatus"
import { selectAuthorisedUserId, selectCurrentProfile } from '../../../redux/selectors'
import { useAppSelector } from '../../../redux/redux-store'
import { contactsType, setPhoto } from '../../../redux/profileReducer'
import { UpdateProfile } from './UpdateProfile/UpdateProfile'


export function ProfileInfo() {
    const [editMode, setEditMode] = useState( false )
    const profile = useSelector( selectCurrentProfile )
    const authorisedUserId = useAppSelector( selectAuthorisedUserId )
    const dispatch = useDispatch()
    const profileImg = ( profile && profile.photos.small ) ? profile.photos.small : "https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
    // console.log('profileInfo')
    const onPhotoClickHandler: ChangeEventHandler<HTMLInputElement> = e => {
        e.currentTarget.files &&
        dispatch( setPhoto( e.currentTarget.files[0] ) )
    }

    useEffect( () => {
        setEditMode( false )
    }, [profile] )

    return (
        <>
            {
                editMode
                && <UpdateProfile cancel={ () => setEditMode( false ) }/>
            }
            {
                profile
                    ? <div className={ s.profileInfo }>
                        <label htmlFor="image">
                            {
                                profile.userId === authorisedUserId &&
                                <input type="file" name="image" id="image" style={ { display: 'none' } }
                                       onChange={ onPhotoClickHandler }/>
                            }
                            <img src={ profileImg } alt=""/>
                        </label>
                        <div className={ s.description }>
                            { profile.fullName }
                            <ProfileStatus/>
                        </div>

                    </div>
                    : <Preloader/>
            }
            <div>
                <div>About me: {profile?.aboutMe}</div>
                <div>Looking for a job: {profile?.lookingForAJob ? 'yes' : 'no'}</div>
                { profile?.lookingForAJob && <div>Job description: { profile?.lookingForAJobDescription  }</div> }
                <div>Contacts:</div>
                {
                    profile
                    && Object.keys( profile.contacts )
                        .reduce( (acc, el) => {
                            const value = profile.contacts[el as keyof contactsType]
                            return value ? [...acc, <Contact value={ value } title={ el } key={ el }/>] : acc
                        }, [] as JSX.Element[] )
                }
            </div>

            {
                authorisedUserId === profile?.userId
                && <button onClick={ () => setEditMode( true ) }>edit profile</button>
            }
        </>
    )
}

const Contact: React.FC<{ title: string, value: string | null }> = ({ title, value }) => {
    return (
        <div style={{marginLeft: 15}}>{ title }: { value }</div>
    )
}