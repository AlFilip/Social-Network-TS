import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {followAC, setUsersAC, unFollowAC, UsersActionTypes, UsersStateType, UserType} from "../../redux/usersReducer";


type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (users: Array<UserType>) => void
}

export type UsersPropsType = mapDispatchToPropsType & UsersStateType


const mapStateToProps = (state: AppStateType): UsersStateType => ({
    users: state.users.users
})

const mapDispatchToProps = (dispatch: Dispatch<UsersActionTypes>): mapDispatchToPropsType => ({
    follow: (id: number) => {
        dispatch(followAC(id))
    },
    unFollow: (id: number) => {
        dispatch(unFollowAC(id))
    },
    setUsers: (users: Array<UserType>) => {
        dispatch(setUsersAC(users))
    }
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
