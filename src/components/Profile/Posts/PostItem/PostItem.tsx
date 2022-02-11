import React from "react";

import s from "./PostItem.module.scss"
import defaultUserImage from '../../../../assets/images/defaultUserImg.png'
import {PostType} from "../../../../redux/profileReducer";
import {useAppSelector} from "../../../../redux/redux-store";
import {selectCurrentProfileUserName, selectCurrentProfileUserPhotos} from "../../../../redux/selectors";
import {SubHeader} from "../../../Common/SubHeader/SubHeader";
import {PostBottom} from "./PostBottom/PostBottom";


function PostItem({
                      isLiked,
                      likesCount,
                      message,
                      id
                  }: PostType) {
    const userName = useAppSelector(selectCurrentProfileUserName)
    const photos = useAppSelector(selectCurrentProfileUserPhotos)

    return (
        <div className={s.postItem}>
            <div className={s.senderInfo}>
                <img
                    src={photos?.small ? photos.small : defaultUserImage}
                    alt=""/>
                <SubHeader title={userName ? userName : ''} style={{marginLeft: '1rem'}}/>
            </div>
            <div className={s.postContent}>
                <div className={s.postMessage}>{message}</div>
            </div>

            <PostBottom postId={id} likesCount={likesCount} isLiked={isLiked}/>
        </div>
    )
}

export default PostItem;