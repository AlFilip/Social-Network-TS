import React from "react";
import s from "./Profile.module.css"
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {ActionTypes, PostType} from "../../redux/store";

export type ProfilePagePropsType = {
    posts: Array<PostType>
    newPostMessage: string
    dispatch: (action: ActionTypes) => void
}

export function Profile(props:ProfilePagePropsType) {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}
                     dispatch={props.dispatch}
            newPostMessage={props.newPostMessage}/>
        </div>
    )
}
