import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {addPost, onPostChange} from "../../../redux/profileReducer";


type mapDispatchToPropsType = {
    addPost: () => void
    onPostChange: (value: string) => void
}

export type MyPostsPropsType = mapDispatchToPropsType & myPostsPropsType
type myPostsPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => ({
    posts: state.profile.posts,
    newPostMessage: state.profile.newPostMessage,
})


export const MyPostsContainer = connect(mapStateToProps, {addPost, onPostChange,})(MyPosts)
