import {ActionTypes, AddPostActionType, OnPostChangeActionType, PostType, ProfilePageType} from "./store";
import {v1} from "uuid";

export const ADD_POST = 'ADD-POST';
export const ON_POST_CHANGE = "ON-POST-CHANGE";


export const AddPostAC = (): AddPostActionType => ({type: ADD_POST})
export const OnPostChangeAC = (newValue: string): OnPostChangeActionType => ({type: ON_POST_CHANGE, newValue})

export const profileReducer = (state: ProfilePageType, action: ActionTypes): ProfilePageType => {
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