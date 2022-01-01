import { useAppSelector } from "../../../redux/redux-store"
import { Navigate } from "react-router-dom"
import React, { ComponentType } from "react"
import { selectIsAuth } from '../../../redux/selectors'


export function redirectHOC<T>(Component: ComponentType<T>) {
    return (props: T) => {
        const isAuth = useAppSelector<boolean>( selectIsAuth )

        if (!isAuth) {
            return <Navigate to={ '/login' }/>
        }
        return <Component { ...props as T }/>
    }
}
