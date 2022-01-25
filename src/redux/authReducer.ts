import { authAPI, loginResultCodes } from "../api/authApi"
import { loginValuesType } from "../components/Login/Login"
import { resultCodes } from '../api/usersApi'
import { ThunkType } from './redux-store'
import { securityAPI } from '../api/securityAPI'


const initState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    captcha: null as string | null,
    isAuth: false as boolean,
    error: null as string | null
}
type authStateType = typeof initState

const authReducer = (state = initState, action: authActionTypes): authStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }
        case 'SET_ERROR':
            return {
                ...state, error: action.error
            }
        default:
            return state
    }
}

export type authActionTypes = setUserDataActionType | setErrorActionType
type setUserDataActionType = ReturnType<typeof setUserData>
type setErrorActionType = ReturnType<typeof setError>

export const setUserData = (payload: Partial<authStateType>) => ( {
    type: 'SET_USER_DATA',
    payload,
} as const )

export const setError = (error: string) => ({
    type: 'SET_ERROR',
    error
} as const)

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    try {
        const { status, data: { messages, resultCode, data } } = await authAPI.me()
        if (status === 200 && resultCode === 0) {
            dispatch( setUserData( { ...data, isAuth: true } ) )
        }
        messages[0]
        && console.log( messages[0] )
    } catch (e) {
        console.log( e )
    }
}


export const makeLogin = (loginData: loginValuesType): ThunkType => async dispatch => {
    try {
        const { status, data: { messages, resultCode } } = await authAPI.login( loginData )
        if (status === 200 && resultCode === loginResultCodes.SUCCESS) {
            dispatch( getAuthUserData() )
        } else if (resultCode === loginResultCodes.ERROR && messages[0]) {
            dispatch(setError(messages[0]))
        }else if (resultCode === loginResultCodes.CAPTCHA_IS_REQUIRED) {
            dispatch(setError(messages[0]))
            dispatch(getCaptcha())
        }
        return
    } catch (err) {
        console.log( err )
    }
}

export const makeLogout = (): ThunkType => async dispatch => {
    try {
        const { status, data: { messages, resultCode } } = await authAPI.logOut()

        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( setUserData( initState) )
        } else {
            messages[0]
            && console.log( messages[0] )
        }
    } catch (e) {
        console.log( e )
    }
}

export const getCaptcha = (): ThunkType => async dispatch => {
    try {
        const { data: { url } } = await securityAPI.getCaptcha()
        dispatch(setUserData({captcha: url}))
    } catch (e) {
        console.log( e )
    }
}


export default authReducer






















