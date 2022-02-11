import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {useDispatch} from "react-redux";

import s from "./PostItem.module.scss"
import defaultUserImage from '../../../../assets/images/defaultUserImg.png'
import {PostType, setLiked} from "../../../../redux/profileReducer";
import {useAppSelector} from "../../../../redux/redux-store";
import {
    selectAuthorisedUserId,
    selectCurrentProfileUserName,
    selectCurrentProfileUserPhotos
} from "../../../../redux/selectors";
import {SubHeader} from "../../../Common/SubHeader/SubHeader";


function PostItem({
                      isLiked,
                      likesCount,
                      message,
                      id
                  }: PostType) {
    const userName = useAppSelector(selectCurrentProfileUserName)
    const photos = useAppSelector(selectCurrentProfileUserPhotos)
    const authorisedUserId = useAppSelector(selectAuthorisedUserId)
    const dispatch = useDispatch()

    const thumbClickHandle = () => {
        dispatch(setLiked(id, !isLiked))
    }

    const thumbClassName = `${s.thumb} ${isLiked ? s.likedThumb : ''}`
    return (
        <div className={s.postItem}>
            <div className={s.senderInfo}>
                <img
                    src={photos?.small ? photos.small : defaultUserImage}
                    alt=""/>
                <SubHeader title={userName ? userName : ''}/>
            </div>
            <div className={s.postContent}>
                <div className={s.postMessage}>{message}</div>
            </div>
            <div className={s.likesCount}>
                <FontAwesomeIcon icon={faThumbsUp} className={thumbClassName} onClick={thumbClickHandle}/>
                {likesCount}
            </div>
        </div>
    )
}

export default PostItem;