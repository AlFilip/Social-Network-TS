import {v1} from "uuid"
import {resultCodes, usersAPI} from '../api/usersApi'
import {ThunkType} from './redux-store'
import {profileApi} from '../api/profileApi'
import {UserType} from "./usersReducer";


export type PostType = {
    id: string
    message: string
    likesCount: number
    isLiked: boolean
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
        {
            id: v1(),
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis fringilla iaculis augue, non vehicula ex. Donec facilisis faucibus iaculis. Vivamus purus purus, auctor vitae imperdiet non, congue ac nulla. Mauris finibus dui in nulla mollis, et blandit diam lacinia. Sed eget ligula in magna tincidunt facilisis varius vitae ipsum. Vivamus luctus sem orci, eu consectetur augue ornare quis. Aliquam erat volutpat. Maecenas finibus velit eget sapien sollicitudin, at aliquam velit molestie. Pellentesque sit amet ex at dolor dignissim ultrices. Pellentesque placerat consequat est ut iaculis. Sed diam magna, bibendum non diam id, rhoncus efficitur urna. Praesent non tincidunt libero. Quisque efficitur, tortor eu imperdiet imperdiet, quam risus consequat erat, at facilisis turpis justo eget libero.\n' +
                'Morbi ac eros vel odio ornare interdum. Morbi pharetra quam eu accumsan interdum. Nullam fringilla imperdiet turpis eu auctor. Aliquam non magna euismod, ultrices tellus a, lobortis felis. Fusce suscipit nulla quis ultricies aliquam. Morbi ac sem sem. Maecenas in ullamcorper ante. Quisque in molestie ex, eu laoreet tortor. Sed laoreet fringilla quam eu vestibulum. Quisque eu cursus enim.',
            likesCount: 50,
            isLiked: false
        },
        {id: v1(), message: 'How are you', likesCount: 150, isLiked: false},
    ] as Array<PostType>,
    currentProfile: null as profileType,
    status: '',
    additionalUserInfo: {} as UserType
}

const profileReducer = (state = initState, action: ProfileActionsTypes): profileStateType => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [action.message, ...state.posts]
            }
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
        case "SET_LIKED":
            return {
                ...state,
                posts: state.posts.map(post => post.id === action.postId ? {
                    ...post,
                    isLiked: action.isLiked,
                    likesCount: post.likesCount + (action.isLiked ? 1 : -1)
                } : post)
            }
        default:
            return state
    }
}


export type ProfileActionsTypes =
    AddPostActionType
    | OnPostChangeActionType
    | setProfileActionType
    | setStatusToStateActionType
    | setPhotosToStateActionType
    | setAdditionalInfoActionType
    | setProfileStateActionType
    | setLikedActionType

export type AddPostActionType = ReturnType<typeof addPost>
export type OnPostChangeActionType = ReturnType<typeof onPostChange>
export type setProfileActionType = ReturnType<typeof setProfile>
type setStatusToStateActionType = ReturnType<typeof setStatusToState>
type setPhotosToStateActionType = ReturnType<typeof setPhotosToState>
type setAdditionalInfoActionType = ReturnType<typeof setAdditionalInfo>
type setProfileStateActionType = ReturnType<typeof setProfileState>
type setLikedActionType = ReturnType<typeof setLiked>

export const addPost = (message: string) => ({
    type: 'ADD_POST',
    message: {id: v1(), likesCount: 0, message, isLiked: false}
} as const)
export const onPostChange = (newValue: string) => ({type: 'ON_POST_CHANGE', newValue} as const)
export const setProfile = (currentProfile: profileType) => ({type: 'SET_PROFILE', currentProfile} as const)
export const setPhotosToState = (photos: photosType) => ({type: 'SET_PHOTOS', photos} as const)
export const setStatusToState = (status: string) => ({type: 'SET_STATUS', status} as const)
export const setAdditionalInfo = (info: UserType) => ({type: 'SET_ADDITIONAL_INFO', info} as const)
export const setProfileState = (payload: Partial<profileStateType>) => ({type: 'SET_PROFILE_STATE', payload} as const)
export const setLiked = (postId: string, isLiked: boolean) => ({type: 'SET_LIKED', postId, isLiked} as const)

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
