import React from "react";
import s from "./Profile.module.css"
import MyPosts from "./MyPosts/MyPosts";

function Profile () {
    return (
        <div className={s.profile}>
            <div>ava + description</div>
            <MyPosts />
        </div>
    )
}

export default Profile;