import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import {PostType} from "../../../redux/state";

type MyPostsPropsType = {
    newPostMessage: string
    posts: Array<PostType>
    addPost: () => void
    onNewPostChange: (newValue: string) => void
}


function MyPosts(props: MyPostsPropsType) {

    const posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const textAreaRef = React.createRef<HTMLTextAreaElement>()

    const addPost = (): void => {
        if (textAreaRef.current && textAreaRef.current.value.trim()) {
            props.addPost()
        }
    }

    const onPostChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.onNewPostChange(e.currentTarget.value)

    }

    return (
        <div>
            My posts
            <div>
                <textarea ref={textAreaRef} value={props.newPostMessage} onChange={onPostChange} name="" id=""/>
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            {posts}
        </div>
    )
}

export default MyPosts;