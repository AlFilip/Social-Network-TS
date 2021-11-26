import React, { useEffect } from "react"
import { Profile } from "./Profile"
import { useDispatch, useSelector } from "react-redux"
import { initProfile, setProfile } from "../../redux/profileReducer"
import { RouteComponentProps, withRouter } from "react-router-dom"
import { AppStateType } from "../../redux/redux-store"
import { redirectHOC } from "../Common/redirectHOC/redirectHOC"
import { selectIsUserId } from '../../redux/selectors'


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

const ProfileContainer = redirectHOC( (props: propsType) => {
    const authUserId = useSelector<AppStateType, number | null>( selectIsUserId )
    const dispatch = useDispatch()
    useEffect( () => {
        let userId = props.match.params.userId
        !userId
        && authUserId
        && ( userId = authUserId.toString() )

        dispatch( initProfile( userId ) )
        return () => {
            dispatch( setProfile( null ) )
        }
    }, [props.match.params.userId] )

    return (
        <Profile/>
    )
} )

export default withRouter( ProfileContainer )