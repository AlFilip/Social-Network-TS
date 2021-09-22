// import React, {useState} from 'react';
// import {Meta, Story} from '@storybook/react';
//
// import {MyPosts, MyPostsPropsType} from './MyPosts';
// import {v1} from "uuid";
// import {PostType} from "../../../redux/state";
//
// export default {
//     title: 'MyPosts',
//     component: MyPosts,
// } as Meta
//
// const Template: Story<MyPostsPropsType> = (args) => <MyPosts {...args}/>
//
// export const MyPostsExample = Template.bind({});
// MyPostsExample.args = {
//     posts: [
//         {id: v1(), message: 'Hi man', likesCount: 50},
//         {id: v1(), message: 'How are you', likesCount: 150}
//     ],
//     onNewPostChange:() => undefined,
//     addPost:() => undefined,
//     newPostMessage:'',
// }
//
// export const MyPostsExample2 = () => {
//     const [posts, setPosts ] = useState([
//         {id: v1(), message: 'Hi man', likesCount: 50},
//         {id: v1(), message: 'How are you', likesCount: 150}
//     ])
//
//     const [newMessage, setNewMessage] = useState('')
//
//     const addPost = () => {
//         const newPost:PostType = {id: v1(), message: newMessage, likesCount: 0}
//         setPosts([...posts, newPost])
//         setNewMessage('')
//     }
//     return <MyPosts newPostMessage={newMessage} posts={posts} addPost={addPost} onNewPostChange={setNewMessage}/>
// }