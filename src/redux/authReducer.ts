import { thunkType } from "./usersReducer"
import { authAPI, loginResultCodes } from "../api/authApi"
import { loginValuesType } from "../components/Login/Login"
import { resultCodes } from '../api/usersApi'


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

export const initUserData = (): thunkType => (dispatch) => {
    authAPI.me()
        .then( res => {
            const { status, data: { messages, resultCode, data } } = res
            if (status === 200 && resultCode === 0) {
                dispatch( setUserData( { ...data, isAuth: true } ) )
            } else {
                messages[0]
                && console.log( messages[0] )
            }
        } )
        .catch( console.log )
}

export const makeLogin = (loginData: loginValuesType): thunkType => dispatch => {

    authAPI.login( loginData )
        .then( res => {
                const { status, data: { messages, resultCode } } = res
                if (status === 200 && resultCode === loginResultCodes.SUCCESS) dispatch( initUserData() )
                else {
                    messages[0]
                    && console.log( messages[0] )
                }
            },
        ).catch( console.log )
}

export const makeLogout = (): thunkType => dispatch => {
    authAPI.logOut()
        .then( res => {
            const { status, data: { messages, resultCode, data } } = res
            if (status === 200 && resultCode === resultCodes.SUCCESS) {
                dispatch( setUserData( { id: null, login: null, email: null, isAuth: false } ) )
            } else {
                messages[0]
                && console.log( messages[0] )
            }
        } )
}


export default authReducer






















