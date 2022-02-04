import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import s from "./PostItem.module.scss"
import {PostType} from "../../../../redux/profileReducer";
import {useAppSelector} from "../../../../redux/redux-store";
import {
    selectAuthorisedUserId,
    selectCurrentProfileUserId,
    selectCurrentProfileUserName
} from "../../../../redux/selectors";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";


function PostItem(props: PostType) {
    const userName = useAppSelector(selectCurrentProfileUserName)
    const currentProfileUserId = useAppSelector(selectCurrentProfileUserId)
    const authorisedUserId = useAppSelector(selectAuthorisedUserId)

    return (
        <div className={s.postItem}>
            <div className={s.senderInfo}>
                <img
                    src="https://e7.pngegg.com/pngimages/931/209/png-clipart-computer-icons-symbol-avatar-logo-person-with-helmut-miscellaneous-black.png"
                    alt=""/>
                <span className={s.userName}>
                    {userName}
                </span>
            </div>
            <div className={s.postContent}>
                <div className={s.postMessage}>{props.message}</div>
            </div>
            <div className={s.likesCount}>
                <FontAwesomeIcon icon={faThumbsUp} className={s.thumb}/>
                {props.likesCount}
            </div>
        </div>
    )
}

export default PostItem;