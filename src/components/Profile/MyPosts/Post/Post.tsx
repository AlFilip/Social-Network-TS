import React from "react";
import s from "./Post.module.css"

export type PostType = {
    message: string
    likesCount: number
}

function Post (props:PostType) {
    return (
        <div className={s.postItem}>
            <div className={s.postContent}>
                <img src="https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png" alt=""/>
                <div className={s.postMessage}>{props.message}</div>
            </div>
            <div className={s.likesCount}>
                Likes: {props.likesCount}
            </div>
        </div>
    )
}

export default Post;