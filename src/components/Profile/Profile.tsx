import React from "react";
import s from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {PostType} from "../../redux/profileReducer";
import {ActionTypes} from "../../redux/store";

export type ProfilePagePropsType = {
    posts: Array<PostType>
    newPostMessage: string
    dispatch: (action: ActionTypes) => void
}

export function Profile(props:ProfilePagePropsType) {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPostsContainer/>
        </div>
    )
}
