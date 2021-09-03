import React, {RefObject} from "react";
import {ProfilePageType} from "../../../redux/state";
import Post from "./Post/Post";

function MyPosts(props: ProfilePageType) {

    const posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const textAreaRef: RefObject<HTMLTextAreaElement> = React.createRef()

    const addPost = () => {
        if ( textAreaRef.current ) alert(textAreaRef.current.value)
    }

    return (
        <div>
            My posts
            <div>
                <textarea ref={textAreaRef} name="" id=""/>
            </div>
            <div>
                <button onClick={addPost}>Add Post</button>
            </div>
            {posts}
        </div>
    )
}

export default MyPosts;