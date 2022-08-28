import React, {Dispatch, useMemo} from "react"
import {useDispatch} from "react-redux"
import {ThunkType, useAppSelector} from "../../../redux/redux-store"
import {makeLogout} from "../../../redux/authReducer"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {selectIsAuth, selectIsUserLogin} from '../../../redux/selectors'
import {Button} from "../../Button/Button";
import {Wrapper} from "./AuthBlock.styled"
import {ButtonSize, ButtonVariant} from "../../Button/types";


export const AuthBlock = () => {
    const isAuth = useAppSelector(selectIsAuth)
    const login = useAppSelector(selectIsUserLogin)
    const dispatch = useDispatch<Dispatch<ThunkType>>()
    let {pathname} = useLocation();
    const isLoginForm = useMemo(() => pathname === '/login', [pathname])


    return useMemo(() => {
            if (isLoginForm) return null
            const onLogoutButtonClickHandler = () => dispatch(makeLogout())
            if (isAuth) return (
                <Wrapper> {login}
                    <Button onClick={onLogoutButtonClickHandler}
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.SMALL}
                            fit>
                        Logout
                    </Button>
                </Wrapper>
            )
            return (
                <NavLink to={'/login'}>
                    <Button variant={ButtonVariant.SECONDARY} size={ButtonSize.SMALL} fit>Login</Button>
                </NavLink>
            )
        }, [isAuth, login, isLoginForm]
    )
}