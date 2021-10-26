import {v1} from "uuid";
import {photosType} from "../components/Profile/ProfileContainer";

export type PostType = {
    id: string
    message: string
    likesCount: number
}

export type profileType = {
    aboutMe: string | null
    fullName: string | null
    userId: number
    photos: photosType
} | null

export type profileStateType = typeof initState

const initState = {
    posts: [
        {id: v1(), message: 'Hi man', likesCount: 50},
        {id: v1(), message: 'How are you', likesCount: 150}
    ] as Array<PostType>,
    newPostMessage: '',
    profile: null as profileType,
}

export const profile = (state: profileStateType = initState, action: profileActionsTypes): profileStateType => {
    switch (action.type) {
        case ADD_POST:
            return state.newPostMessage.trim()
                ? {
                    ...state,
                    posts: [
                        ...state.posts,
                        {id: v1(), message: state.newPostMessage, likesCount: 0}
                    ],
                    newPostMessage: '',
                }
                : {...state, newPostMessage: ''}
        case ON_POST_CHANGE:
            return {...state, newPostMessage: action.newValue}
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state
    }
}

export const ADD_POST = 'ADD_POST';
export const ON_POST_CHANGE = "ON_POST_CHANGE";
export const SET_PROFILE = "SET_PROFILE";

export type profileActionsTypes = AddPostActionType | OnPostChangeActionType | setProfileActionType

export type AddPostActionType = ReturnType<typeof addPost>
export type OnPostChangeActionType = ReturnType<typeof onPostChange>
export type setProfileActionType = ReturnType<typeof setProfile>

export const addPost = () => ({type: ADD_POST} as const)
export const onPostChange = (newValue: string) => ({type: ON_POST_CHANGE, newValue} as const)
export const setProfile = (profile: profileType) => ({type: SET_PROFILE, profile} as const)
