import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Redirect} from "react-router-dom";
import React, {ComponentType} from "react";

export function redirectHOC<T> (Component: ComponentType<T>)  {
    return  (props: T) => {
        const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)

        if (!isAuth) {
            return <Redirect to={'/login'}/>
        }
        return <Component {...props as T}/>
    }
}