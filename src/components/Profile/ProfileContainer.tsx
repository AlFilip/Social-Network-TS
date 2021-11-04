import React, {useEffect} from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setProfile} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";

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

type PathParamsType = {
    userId: string
}
type propsType = RouteComponentProps<PathParamsType>

function ProfileContainer(props: propsType) {
    const dispatch = useDispatch()
    useEffect(() => {
        let userId = props.match.params.userId
        !userId
        && (userId = '2')

        axios.get<getProfileResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
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

export default withRouter(ProfileContainer)

