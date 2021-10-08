import {ActionTypes,} from "./store";
import {v1} from "uuid";

export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type profileStateType = typeof initState

const initState = {
    posts: [
        {id: v1(), message: 'Hi man', likesCount: 50},
        {id: v1(), message: 'How are you', likesCount: 150}
    ] as Array<PostType>,
    newPostMessage: '',
}

export const profile = (state: profileStateType = initState, action: ActionTypes): profileStateType => {
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
        default:
            return state
    }
}

export const ADD_POST = 'ADD-POST';
export const ON_POST_CHANGE = "ON-POST-CHANGE";

export type AddPostActionType = ReturnType<typeof AddPostAC>
export type OnPostChangeActionType = ReturnType<typeof OnPostChangeAC>

export const AddPostAC = () => ({type: ADD_POST} as const)
export const OnPostChangeAC = (newValue: string) => ({type: ON_POST_CHANGE, newValue} as const)
