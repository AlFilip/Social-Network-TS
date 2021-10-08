import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import {MyPostsPropsType} from "./MyPostsContainer";


export function MyPosts(props: MyPostsPropsType) {
    const addPost = (): void => props.addPost()
    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => props.onPostChange(e.currentTarget.value)
    const posts = props.posts.map(p => <Post id={p.id} key={p.id} message={p.message} likesCount={p.likesCount}/>)

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