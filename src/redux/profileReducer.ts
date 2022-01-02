import { v1 } from "uuid"
import { resultCodes } from '../api/usersApi'
import { thunkType } from './redux-store'
import { profileApi } from '../api/profileApi'


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
        { id: v1(), message: 'Hi man', likesCount: 50 },
        { id: v1(), message: 'How are you', likesCount: 150 },
    ] as Array<PostType>,
    newPostMessage: '',
    currentProfile: null as profileType,
    status: '',
}

const profileReducer = (state = initState, action: profileActionsTypes): profileStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return state.newPostMessage.trim()
                ? {
                    ...state,
                    posts: [
                        ...state.posts,
                        { id: v1(), message: state.newPostMessage, likesCount: 0 },
                    ],
                    newPostMessage: '',
                }
                : { ...state, newPostMessage: '' }
        case 'ON_POST_CHANGE':
            return { ...state, newPostMessage: action.newValue }
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

export type AddPostActionType = ReturnType<typeof addPost>
export type OnPostChangeActionType = ReturnType<typeof onPostChange>
export type setProfileActionType = ReturnType<typeof setProfile>
type setStatusToStateActionType = ReturnType<typeof setStatusToState>
type setPhotosToStateActionType = ReturnType<typeof setPhotosToState>

export const addPost = () => ( { type: 'ADD_POST' } as const )
export const onPostChange = (newValue: string) => ( { type: 'ON_POST_CHANGE', newValue } as const )
export const setProfile = (currentProfile: profileType) => ( { type: 'SET_PROFILE', currentProfile } as const )
export const setPhotosToState = (photos: photosType) => ( { type: 'SET_PHOTOS', photos } as const )
export const setStatusToState = (status: string) => ( { type: 'SET_STATUS', status } as const )

export const initProfile = (userId: string): thunkType => async dispatch => {
    const getProfilePromise = profileApi.getProfile( userId )
    const GetStatusPromise = profileApi.getStatus( userId )

    const [profileResponse, statusResponse] = await Promise.all( [getProfilePromise, GetStatusPromise] )
    if (profileResponse.status === 200 && statusResponse.status === 200) {
        dispatch( setProfile( profileResponse.data ) )
        dispatch( setStatusToState( statusResponse.data ) )
    }
}

export const setStatus = (newStatus: string): thunkType => async dispatch => {
    try {
        const { status, data: { messages, resultCode } } = await profileApi.setStatus( newStatus )
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( setStatusToState( newStatus ) )
        }

        messages[0]
        && console.log( messages[0] )
    } catch (e) {
        console.log( e )
    }
}


export const setPhoto = (photo: File): thunkType => async dispatch => {
    try {
        const { status, data: { resultCode, messages, data: { photos } } } = await profileApi.setPhoto( photo )
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( setPhotosToState( photos ) )
        }

        messages[0]
        && console.log( messages[0] )
    } catch (e) {
        console.log( e )
    }
}

export const updateProfile = (profile: Partial<profileType>): thunkType => async (dispatch, getState) => {
    try {
        const currentProfile = getState().profile.currentProfile
        console.log({ ...currentProfile, ...profile })
        const res = await profileApi.updateProfile( profile )
        console.log(res)
        // messages[0]
        // && console.log( messages[0] )
        return true
    } catch (e) {
        console.log( e )
    }
}

export default profileReducer
