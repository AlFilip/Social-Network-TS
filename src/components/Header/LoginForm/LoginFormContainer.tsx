import React, {Dispatch, useEffect} from "react";
import {useDispatch} from "react-redux";
import {authActionTypes, setUserData} from "../../../redux/authReducer";
import {authAPI} from "../../../api/authApi";
import {LoginForm} from "./LoginForm";


export const LoginFormContainer = () => {
    const dispatch = useDispatch<Dispatch<authActionTypes>>()

    useEffect(() => {
        authAPI.me()
            .then(data => {
                data
                && dispatch(setUserData({...data, isAuth: true}))
            })
    }, [dispatch])

    return <LoginForm/>
}