import React from "react";
import {ActionTypes, PostType} from "../../../redux/store";
import {AddPostAC, OnPostChangeAC} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";

export type MyPostsPropsContainerType = {
    newPostMessage: string
    posts: Array<PostType>
    dispatch: (action: ActionTypes) => void
}


export function MyPostsContainer(props: MyPostsPropsContainerType) {

    const addPost = (): void => {
        props.dispatch(AddPostAC())
    }

    const onPostChange = (value: string) => {
        props.dispatch(OnPostChangeAC(value))

    }

    return <MyPosts newPostMessage={props.newPostMessage}
                    posts={props.posts}
                    addPost={addPost}
                    onPostChange={onPostChange}/>
}
