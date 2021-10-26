import React, {useEffect} from "react";
import {Profile} from "./Profile";
import {setIsFetching} from "../../redux/usersReducer";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setProfile} from "../../redux/profileReducer";

type contactsType = {
    facebook: string | null
    website: string | null
    vk: string | null
    twitter: string | null
    instagram: string | null
    youtube: string | null
    github: string | null
    mainLink: string | null
}

export type photosType = {
    small: string | null
    large: string | null
}

type getProfileResponseType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: photosType
}

export function ProfileContainer() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setIsFetching(true))
        axios.get<getProfileResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                if (response.status === 200) {
                    const {aboutMe, fullName, userId, photos} = response.data
                    dispatch(setProfile({aboutMe, fullName, userId, photos}))
                }
            })
    }, [])

    return (
        <Profile/>
    )
}
