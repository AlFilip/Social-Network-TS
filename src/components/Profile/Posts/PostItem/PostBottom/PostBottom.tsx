import React from "react";

import s from './PostBottom.module.scss'
import {Thumb} from "../../../../Common/Thumb/Thumb";
import {Comment} from "../../../../Common/Comment/Comment";
import {Share} from "../../../../Common/Share/Share";

type PostBottomPropsType = {
    postId: string
    likesCount: number
    isLiked: boolean
}

export const PostBottom = ({
                               postId,
                               likesCount,
                               isLiked,
                           }: PostBottomPropsType) => {

    return (
        <ul className={s.postBottom}>
            <li>
                <Thumb postId={postId} likesCount={likesCount} isLiked={isLiked}/>
            </li>
            <li>
                <Comment/>
            </li>
            <li>
                <Share/>
            </li>
        </ul>
    )
}