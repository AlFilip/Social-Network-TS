import React, {Dispatch, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {authActionTypes, authStateType, setUserData} from "../../../redux/authReducer";
import {NavLink} from "react-router-dom";
import {authAPI} from "../../../api/auth";


export const LoginForm = () => {
    const {id, login, email, isAuth} = useSelector<AppStateType, authStateType>(state => state.auth)
    const dispatch = useDispatch<Dispatch<authActionTypes>>()

    useEffect(() => {
        authAPI.me()
            .then(data => {
                data
                && dispatch(setUserData({...data, isAuth: true}))
            })
    }, [dispatch])

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