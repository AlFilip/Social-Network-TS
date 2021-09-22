import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import {ActionTypes, AddPostAC, OnPostChangeAC, PostType} from "../../../redux/store";

export type MyPostsPropsType = {
    newPostMessage: string
    posts: Array<PostType>
    dispatch: (action: ActionTypes) => void
}


export function MyPosts(props: MyPostsPropsType) {

    const posts = props.posts.map(p => <Post id={p.id} key={p.id} message={p.message} likesCount={p.likesCount}/>)


    const addPost = (): void => {
        props.dispatch(AddPostAC())
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(OnPostChangeAC(e.currentTarget.value))

    }

    return (
        <div>
            My posts
            <div>
                <textarea value={props.newPostMessage} onChange={onPostChange} name="" id=""/>
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            {posts}
        </div>
    )
}
