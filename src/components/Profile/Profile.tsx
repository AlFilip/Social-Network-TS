import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {PostType} from "../../redux/state";

type ProfilePagePropsType = {
    posts: Array<PostType>
    addPost: () => void
    onNewPostChange: (newValue: string) => void
    newPostMessage: string
}

function Profile(props:ProfilePagePropsType) {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts posts={props.posts}
                     onNewPostChange={props.onNewPostChange}
                     addPost={props.addPost}
            newPostMessage={props.newPostMessage}/>
        </div>
    )
}

export default Profile;