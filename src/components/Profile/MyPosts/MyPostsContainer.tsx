import {AddPostAC, OnPostChangeAC, profileStateType} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";
import {ActionTypes} from "../../../redux/store";


type mapDispatchToPropsType = {
    addPost: () => void
    onPostChange: (value: string) => void
}

export type MyPostsPropsType = mapDispatchToPropsType & profileStateType


const mapStateToProps = (state: AppStateType): profileStateType => ({
    posts: state.profile.posts,
    newPostMessage: state.profile.newPostMessage,
})


const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): mapDispatchToPropsType => ({
    addPost: () => {
        dispatch(AddPostAC())
    },
    onPostChange: (value: string) => {
        dispatch(OnPostChangeAC(value))
    }
})

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
