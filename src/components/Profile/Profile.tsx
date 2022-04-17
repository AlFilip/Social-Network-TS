import React, {useEffect, useMemo} from "react"
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
import {SCREEN_SIZE} from "../../redux/appReducer";


export const Profile = () => {
    let {userId} = useParams()
    const dispatch = useDispatch()
    const authUserId = useAppSelector(selectAuthorisedUserId)
    const screenSize = useAppSelector(selectScreenSize)
    useEffect(() => {
        let currentProfileId = userId
        if (!currentProfileId && authUserId) {
            currentProfileId = authUserId.toString()
        }
        currentProfileId
        && dispatch(getProfileWithAdditionalInfo(currentProfileId))
        if (window.scrollY) {
            window.scrollTo(0, 0)
        }

        return () => {
            dispatch(setProfile(null))
        }
    }, [userId, authUserId])

    const renderedModules = useMemo(() => {
        if (screenSize === SCREEN_SIZE.SMALL || screenSize === SCREEN_SIZE.EXTRA_SMALL || screenSize === SCREEN_SIZE.MEDIUM) {
            return null
        }
        return (
            <>
                <Chat/>
                <RecentDialogs/>
            </>
        )
    }, [screenSize])

    return (
        <div className={s.profile}>
            <ProfileInfo/>
            {renderedModules}
            <Posts/>
        </div>
    )
}
