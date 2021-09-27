import React from "react";
import s from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, PostType} from "../../redux/store";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";

export type ProfilePagePropsType = {
    posts: Array<PostType>
    newPostMessage: string
    dispatch: (action: ActionTypes) => void
}

export function Profile(props:ProfilePagePropsType) {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPostsContainer posts={props.posts}
                     dispatch={props.dispatch}
            newPostMessage={props.newPostMessage}/>
        </div>
    )
}
