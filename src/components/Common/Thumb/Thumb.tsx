import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons";
import {faThumbsUp as faFatThumb} from "@fortawesome/free-solid-svg-icons";

import s from './Thumb.module.scss'
import {useDispatch} from "react-redux";
import {setLiked} from "../../../redux/profileReducer";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type ThumbPropsType = {
    postId: string
    likesCount: number
    isLiked: boolean
}

export const Thumb = ({
                          postId,
                          likesCount,
                          isLiked,
                      }: ThumbPropsType) => {

    const dispatch = useDispatch()

    const thumbClickHandle = () => {
        dispatch(setLiked(postId, !isLiked))
    }
    const thumbClassName = `${s.thumb} ${isLiked ? s.likedThumb : ''}`

    const icon = (isLiked ? faFatThumb : faThumbsUp) as IconProp
    return (

        <div className={s.likesCount}>
            <span className={s.thumbLike}>
                <FontAwesomeIcon icon={icon} className={thumbClassName} onClick={thumbClickHandle}/>
                Like
            </span>
            <span className={s.count}>
                {likesCount}
            </span>
        </div>
    )
}