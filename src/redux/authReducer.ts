import { authAPI, loginResultCodes } from "../api/authApi"
import { formikActionsTypes, loginValuesType } from "../components/Login/Login"
import { resultCodes } from '../api/usersApi'
import { thunkType } from './redux-store'


export type authStateType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const initState: authStateType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}


const authReducer = (state = initState, action: authActionTypes): authStateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state

    }
}

export type authActionTypes = setUserDataActionType
type setUserDataActionType = ReturnType<typeof setUserData>

export const setUserData = (payload: authStateType) => ( {
    type: 'SET_USER_DATA',
    payload,
} as const )

export const getAuthUserData = (): thunkType => async (dispatch) => {
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


export const makeLogin = (loginData: loginValuesType, actions: formikActionsTypes): thunkType => async dispatch => {
    const { setErrors, setSubmitting } = actions
    try {
        const { status, data: { messages, resultCode } } = await authAPI.login( loginData )
        if (status === 200 && resultCode === loginResultCodes.SUCCESS) {
            dispatch( getAuthUserData() )
        } else if (resultCode === loginResultCodes.ERROR && messages[0] === 'Enter valid Email') {
            setErrors( { email: messages[0] } )
        } else {
            messages[0]
            && setErrors( { email: messages[0], password: messages[0] } )
        }
    } catch (err) {
        setSubmitting( false )
        console.log( err )
    }
}

export const makeLogout = (): thunkType => async dispatch => {
    try {
        const { status, data: { messages, resultCode, data } } = await authAPI.logOut()

        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( setUserData( { id: null, login: null, email: null, isAuth: false } ) )
        } else {
            messages[0]
            && console.log( messages[0] )
        }
    }catch (e) {
        console.log(e)
    }
}


export default authReducer






















