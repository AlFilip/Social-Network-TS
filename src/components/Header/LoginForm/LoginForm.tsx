import React, {Dispatch, useCallback} from "react"
import {useDispatch} from "react-redux"
import {ThunkType, useAppSelector} from "../../../redux/redux-store"
import {makeLogout} from "../../../redux/authReducer"
import {NavLink} from "react-router-dom"
import {selectIsAuth, selectIsUserLogin} from '../../../redux/selectors'
import {Button} from "../../Button/Button";


export const LoginForm = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectIsUserLogin)
    const dispatch = useDispatch<Dispatch<ThunkType>>()

    const onLogoutButtonClickHandler = useCallback(() => {
        dispatch(makeLogout())
    }, [])

    const renderLoginBlock = () => {
        if (isAuth) return (
            <> {login}
                <Button onClick={onLogoutButtonClickHandler} variant={'secondary'} size={"small"} fit >Logout</Button>
            </>
        )

        return <NavLink to={`/login`}>Login</NavLink>
    }

    return (
        <div>
            {renderLoginBlock()}
        </div>
    )
}