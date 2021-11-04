import axios from "axios";
import {photosType} from "../components/Profile/ProfileContainer";
import {setProfile} from "../redux/profileReducer";

export const requestConfig = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
}


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

type getProfileResponseType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: photosType
}

const authInstance = axios.create(requestConfig)

export const profileApi = {
    getProfile: (userId: string) => authInstance
        .get<getProfileResponseType>(`profile/` + userId)
        .catch(err => console.log(err))
}