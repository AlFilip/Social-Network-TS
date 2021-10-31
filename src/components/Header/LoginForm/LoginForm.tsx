import React, {Dispatch, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {authActionTypes, authStateType, setUserData} from "../../../redux/authReducer";
import axios from "axios";
import {NavLink} from "react-router-dom";

type getTasksResponseType = {
    resultCode: number
    data: {
        id: number | null
        login: string | null
        email: string | null
    }
}


export const LoginForm = () => {
    const {id, login, email, isAuth} = useSelector<AppStateType, authStateType>(state => state.auth)
    const dispatch = useDispatch<Dispatch<authActionTypes>>()

    useEffect(() => {
        axios.get<getTasksResponseType>(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200 && response.data.resultCode === 0) {
                    const {id, login, email} = response.data.data
                    dispatch(setUserData({id, login, email, isAuth: true}))
                }
            })
    }, [])

    return (
        <div>
            {
                isAuth
                    ? login
                    : <NavLink to={`/login`} >Login</NavLink>
            }
        </div>
    )
}