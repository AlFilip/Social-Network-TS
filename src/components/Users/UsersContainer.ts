import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {
    followAC,
    setCurrentPage,
    setUsersAC,
    unFollowAC,
    UsersActionTypes,
    UsersStateType,
    UserType
} from "../../redux/usersReducer";


type mapDispatchToPropsType = {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (items: Array<UserType>, totalItemsCount: number) => void
    setCurrentPage: (pageNumber: number) => void
}

export type UsersPropsType = mapDispatchToPropsType & UsersStateType


const mapStateToProps = (state: AppStateType): UsersStateType => ({
    items: state.users.items,
    currentPage: state.users.currentPage,
    pageSize: state.users.pageSize,
    totalItemsCount: state.users.totalItemsCount,
    totalPagesCount: state.users.totalPagesCount
})

const mapDispatchToProps = (dispatch: Dispatch<UsersActionTypes>): mapDispatchToPropsType => ({
    follow: (id: number) => {
        dispatch(followAC(id))
    },
    unFollow: (id: number) => {
        dispatch(unFollowAC(id))
    },
    setUsers: (items: Array<UserType>, totalItemsCount: number) => {
        dispatch(setUsersAC(items, totalItemsCount))
    },
    setCurrentPage: (pageNumber: number) => {
        dispatch(setCurrentPage(pageNumber))
    }
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
