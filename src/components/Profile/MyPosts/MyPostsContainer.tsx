import React from "react";
import {ActionTypes, PostType, StoreType} from "../../../redux/store";
import {AddPostAC, OnPostChangeAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import { MyContext } from "../../../storeContext";


export type MyPostsPropsContainerType = {
    newPostMessage: string
    posts: Array<PostType>
    dispatch: (action: ActionTypes) => void
}


export function MyPostsContainer(props: MyPostsPropsContainerType) {
    return (
        <MyContext.Consumer>
            {
                (store:StoreType) => {
                    const addPost = (): void => {
                        store.dispatch(AddPostAC())
                    }
                    const onPostChange = (value: string) => {
                        store.dispatch(OnPostChangeAC(value))
                    }
                    const profileData = store.getState().profile
                    return (
                        <MyPosts newPostMessage={profileData.newPostMessage}
                                 posts={profileData.posts}
                                 addPost={addPost}
                                 onPostChange={onPostChange}/>)
                }
            }
        </MyContext.Consumer>
    )
}
