import React from "react";
import { ProfilePageType } from "../../../redux/state";
import Post from "./Post/Post";

function MyPosts(props: ProfilePageType) {

    const posts = props.posts.map(p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            My posts
            <div>
                <form>
                    <textarea name="" id=""/>
                    <button>Add Post</button>
                </form>
            </div>
            {posts}
        </div>
    )
}

export default MyPosts;