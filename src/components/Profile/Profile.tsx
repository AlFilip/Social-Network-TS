import React, {useEffect} from "react"
import s from "./Profile.module.scss"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo"
import {Posts} from "./Posts/Posts"
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../redux/redux-store'
import {selectAuthorisedUserId, selectScreenSize} from '../../redux/selectors'
import {getProfileWithAdditionalInfo, setProfile} from '../../redux/profileReducer'
import Chat from "../Chat/Chat";
import {RecentDialogs} from "../RecentDialogs/RecentDialogs";


export const Profile = () => {
    let {userId} = useParams()
    const dispatch = useDispatch()
    const authUserId = useAppSelector(selectAuthorisedUserId)
    const screenSize = useAppSelector(selectScreenSize)
    useEffect(() => {
        let id = userId
        if (!id && authUserId) {
            id = authUserId.toString()
        }
        id
        && dispatch(getProfileWithAdditionalInfo(id))

        return () => {
            dispatch(setProfile(null))
        }
    }, [userId, dispatch, authUserId])

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            {
                (screenSize === 'XL' || screenSize === 'L')
                && <>
                    <Chat/>
                    <RecentDialogs/>
                </>
            }
            <Posts/>

        </div>
    )
}
