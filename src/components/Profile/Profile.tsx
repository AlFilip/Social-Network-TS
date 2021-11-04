import React from "react";
import s from "./Profile.module.css"
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPosts} from "./MyPosts/MyPosts";


export const  Profile = () =>  {
    return (
        <div className={s.profile}>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}
