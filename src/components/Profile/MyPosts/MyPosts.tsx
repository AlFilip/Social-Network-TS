import React from "react";
import Post from "./Post/Post";

function MyPosts() {
    return (
        <div>
            My posts
            <div>
                <form>
                    <textarea name="" id=""/>
                    <button>Add Post</button>
                </form>
            </div>
            <Post message={'Hi man'} likesCount={50}/>
            <Post message={'How are you?'} likesCount={150}/>
        </div>
    )
}

export default MyPosts;