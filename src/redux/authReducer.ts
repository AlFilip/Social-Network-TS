import {thunkType} from "./usersReducer";
import {authAPI} from "../api/authApi";

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

export const setUserData = (payload: authStateType) => ({
    type: 'SET_USER_DATA',
    payload
} as const)

export const initUserData = ():thunkType => (dispatch) => {
    authAPI.me()
        .then(data => {
            data
            && dispatch(setUserData({...data, isAuth: true}))
        })

}

export default authReducer