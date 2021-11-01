import React from "react";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {authStateType} from "../../../redux/authReducer";
import {NavLink} from "react-router-dom";


export const LoginForm = () => {
    const {id, login, email, isAuth} = useSelector<AppStateType, authStateType>(state => state.auth)

    return (
        <div>
            {
                isAuth
                    ? login
                    : <NavLink to={`/login`}>Login</NavLink>
            }
        </div>
    )
}