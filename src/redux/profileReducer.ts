import {ActionTypes, PostType, ProfilePageType} from "./store";
import {v1} from "uuid";

export const ADD_POST = 'ADD-POST';
export const ON_POST_CHANGE = "ON-POST-CHANGE";

export type AddPostActionType = ReturnType<typeof AddPostAC>
export type OnPostChangeActionType = ReturnType<typeof OnPostChangeAC>

export const AddPostAC = () => ({type: ADD_POST} as const)
export const OnPostChangeAC = (newValue: string) => ({type: ON_POST_CHANGE, newValue} as const)

const initState = {
    posts: [
        {id: v1(), message: 'Hi man', likesCount: 50},
        {id: v1(), message: 'How are you', likesCount: 150}
    ],
    newPostMessage: '',
}

export const profile = (state: ProfilePageType = initState, action: ActionTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST:
            if (state.newPostMessage.trim()) {
                const newPost: PostType = {
                    id: v1(),
                    message: state.newPostMessage,
                    likesCount: 0
                }
                state.posts.push(newPost)
            }
            state.newPostMessage = ''
            return state
        case ON_POST_CHANGE:
            state.newPostMessage = action.newValue
            return state
        default:
            return state
    }
}