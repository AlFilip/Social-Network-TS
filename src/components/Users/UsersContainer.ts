import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionTypes} from "../../redux/store";
import {AppStateType} from "../../redux/redux-store";
import {Users} from "./Users";
import {UsersStateType} from "../../redux/usersReducer";


type mapDispatchToPropsType = {

}

export type UsersPropsType = mapDispatchToPropsType & UsersStateType


const mapStateToProps = (state: AppStateType): UsersStateType => ({
    users: state.users.users
})

const mapDispatchToProps = (dispatch: Dispatch<ActionTypes>): mapDispatchToPropsType => ({

})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)
