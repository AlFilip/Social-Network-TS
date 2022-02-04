import React from "react"

import s from './Posts.module.scss'
import PostItem from "./PostItem/PostItem"
import {useAppSelector} from "../../../redux/redux-store"
import {selectAuthorisedUserId, selectPosts} from '../../../redux/selectors'
import {AddPostForm} from "./AddPostForm/AddPostForm";
import {useParams} from "react-router-dom";


export function Posts() {
    const posts = useAppSelector(selectPosts)
    let {userId} = useParams()
    const authUserId = useAppSelector(selectAuthorisedUserId)

    const mappedPosts = posts.map(p => <PostItem id={p.id} key={p.id} message={p.message}
                                                 likesCount={p.likesCount}/>)

    return (
        <div className={s.posts}>
            {
                (!userId || +userId === authUserId)
                && <AddPostForm/>
            }
            {mappedPosts}
        </div>
    )
}