import {v1} from "uuid"
import {resultCodes, usersAPI} from '../api/usersApi'
import {ThunkType} from './redux-store'
import {profileApi} from '../api/profileApi'
import {UserType} from "./usersReducer";


export type PostType = {
    id: string
    message: string
    likesCount: number
}

export type contactsType = {
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
export type profileType = {
    aboutMe: string | null
    contacts: contactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string | null
    userId: number
    photos: photosType
} | null

export type profileStateType = typeof initState

const initState = {
    posts: [
        {id: v1(), message: 'Hi man', likesCount: 50},
        {id: v1(), message: 'How are you', likesCount: 150},
    ] as Array<PostType>,
    newPostMessage: '',
    currentProfile: null as profileType,
    status: '',
    additionalUserInfo: {} as UserType
}

const profileReducer = (state = initState, action: profileActionsTypes): profileStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return state.newPostMessage.trim()
                ? {
                    ...state,
                    posts: [
                        ...state.posts,
                        {id: v1(), message: state.newPostMessage, likesCount: 0},
                    ],
                    newPostMessage: '',
                }
                : {...state, newPostMessage: ''}
        case 'ON_POST_CHANGE':
            return {...state, newPostMessage: action.newValue}
        case 'SET_PROFILE':
            return {
                ...state,
                currentProfile: action.currentProfile,
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status,
            }
        case 'SET_PHOTOS':
            return state.currentProfile
                ? {
                    ...state,
                    currentProfile: {
                        ...state.currentProfile,
                        photos: action.photos,
                    },
                }
                : state
        case "SET_ADDITIONAL_INFO":
            return {
                ...state,
                additionalUserInfo: action.info
            }
        case "SET_PROFILE_STATE":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export type profileActionsTypes =
    AddPostActionType
    | OnPostChangeActionType
    | setProfileActionType
    | setStatusToStateActionType
    | setPhotosToStateActionType
    | setAdditionalInfoActionType
    | setProfileStateActionType

export type AddPostActionType = ReturnType<typeof addPost>
export type OnPostChangeActionType = ReturnType<typeof onPostChange>
export type setProfileActionType = ReturnType<typeof setProfile>
type setStatusToStateActionType = ReturnType<typeof setStatusToState>
type setPhotosToStateActionType = ReturnType<typeof setPhotosToState>
type setAdditionalInfoActionType = ReturnType<typeof setAdditionalInfo>
type setProfileStateActionType = ReturnType<typeof setProfileState>

export const addPost = () => ({type: 'ADD_POST'} as const)
export const onPostChange = (newValue: string) => ({type: 'ON_POST_CHANGE', newValue} as const)
export const setProfile = (currentProfile: profileType) => ({type: 'SET_PROFILE', currentProfile} as const)
export const setPhotosToState = (photos: photosType) => ({type: 'SET_PHOTOS', photos} as const)
export const setStatusToState = (status: string) => ({type: 'SET_STATUS', status} as const)
export const setAdditionalInfo = (info: UserType) => ({type: 'SET_ADDITIONAL_INFO', info} as const)
export const setProfileState = (payload: Partial<profileStateType>) => ({type: 'SET_PROFILE_STATE', payload} as const)

export const getProfileWithAdditionalInfo = (userId: string): ThunkType => async dispatch => {
    const profileResponse = await profileApi.getProfile(userId)
    let additionalInfoPromise
    if (profileResponse && profileResponse.data && profileResponse.data.fullName) {
        additionalInfoPromise = usersAPI.getUsers({term: profileResponse.data.fullName})
    }
    const GetStatusPromise = profileApi.getStatus(userId)

    const [additionalInfoResponse, statusResponse] = await Promise.all([additionalInfoPromise, GetStatusPromise])
    let result: Partial<profileStateType> = {}

    if (profileResponse.status === 200) {
        result.currentProfile = profileResponse.data
    }

    if (additionalInfoResponse?.status === 200) {
        const userData = additionalInfoResponse.data.items.find(user => user.id === +userId)
        if (userData) {
            result.additionalUserInfo = userData
        }
    }
    if (statusResponse.status === 200) {
        result.status = statusResponse.data
    }
    dispatch(setProfileState(result))
}

export const setStatus = (newStatus: string): ThunkType => async dispatch => {
    try {
        const {status, data: {messages, resultCode}} = await profileApi.setStatus(newStatus)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(setStatusToState(newStatus))
        }

        messages[0]
        && console.log(messages[0])
    } catch (e) {
        console.log(e)
    }
}


export const setPhoto = (photo: File): ThunkType => async dispatch => {
    try {
        const {status, data: {resultCode, messages, data: {photos}}} = await profileApi.setPhoto(photo)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(setPhotosToState(photos))
        }

        messages[0]
        && console.log(messages[0])
    } catch (e) {
        console.log(e)
    }
}

export const updateProfile = (profile: Partial<profileType>): ThunkType => async (dispatch, getState) => {
    try {
        const currentProfile = getState().profile.currentProfile
        console.log({...currentProfile, ...profile})
        await profileApi.updateProfile(profile)
        currentProfile
        && await dispatch(getProfileWithAdditionalInfo((currentProfile.userId).toString()))
        // messages[0]
        // && console.log( messages[0] )
        return true
    } catch (e) {
        console.log(e)
    }
}

export const getProfileUserInfo = (payload: { term: string, userId: number }): ThunkType => async dispatch => {
    const {userId, term} = payload
    try {
        const {data: {items}} = await usersAPI.getUsers({term})
        const user = items.filter(user => user.id === userId)[0]
        if (user) {
            dispatch(setAdditionalInfo(user))
        }

    } catch (e) {
        console.log(e)
    }
}

export const toggleUserProfileFollow = (userInfo: UserType): ThunkType => async dispatch => {
    try {
        const apiMethod = userInfo.followed ? usersAPI.follow : usersAPI.unFollow
        const {status, data: {resultCode}} = await apiMethod(userInfo.id)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(setAdditionalInfo(userInfo))
        }
    } catch (e) {
        console.log(e)
    }
}

export default profileReducer
