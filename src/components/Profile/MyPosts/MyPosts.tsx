import React, { ChangeEvent } from "react"
import Post from "./Post/Post"
import { useDispatch, useSelector } from "react-redux"
import { addPost, onPostChange, PostType } from "../../../redux/profileReducer"
import { AppStateType } from "../../../redux/redux-store"
import { selectNewPostMessage, selectPosts } from '../../../redux/selectors'


export function MyPosts() {
    console.log('my posts')
    const newPostMessage = useSelector<AppStateType, string>( selectNewPostMessage )
    const posts = useSelector<AppStateType, PostType[]>( selectPosts )
    const dispatch = useDispatch()

    const onButtonClickHandler = () => dispatch( addPost() )
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        dispatch( onPostChange( value ) )
    }
    const mappedPosts = posts.map( p => <Post id={ p.id } key={ p.id } message={ p.message }
                                              likesCount={ p.likesCount }/> )

    return (
        <div>
            My posts
            <div>
                <textarea value={ newPostMessage } onChange={ onChangeHandler } name="" id=""/>
            </div>
            <div>
                <button onClick={ onButtonClickHandler }>Add Post</button>
            </div>
            { mappedPosts }
        </div>
    )
}