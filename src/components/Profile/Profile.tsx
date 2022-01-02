import React, { useEffect } from "react"
import s from "./Profile.module.css"
import { ProfileInfo } from "./ProfileInfo/ProfileInfo"
import { MyPosts } from "./MyPosts/MyPosts"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/redux-store'
import { selectAuthorisedUserId } from '../../redux/selectors'
import { initProfile, setProfile } from '../../redux/profileReducer'


type PathParamsType = {
    userId: string
}

export const Profile = () => {
    let { userId } = useParams<PathParamsType>()
    const dispatch = useDispatch()
    const authUserId = useAppSelector( selectAuthorisedUserId )
    useEffect( () => {
        if (!userId && authUserId) {
            userId = authUserId.toString()
        }
        userId
        && dispatch( initProfile( userId ) )
        return () => {
            dispatch( setProfile( null ) )
        }
    }, [userId] )

    return (
        <div className={ s.profile }>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}
