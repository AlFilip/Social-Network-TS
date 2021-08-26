import React from "react";
import s from "./ProfileInfo.module.css"

function ProfileInfo() {
    return (
        <div className={s.profileInfo}>
            <img
                src="https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
                alt=""/>
            <div className={s.description}>ava + description</div>
        </div>
    )
}

export default ProfileInfo;