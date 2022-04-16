import {ThunkType} from './redux-store'
import {getAuthUserData} from './authReducer'

export enum APP_STATUSES {
    IDLE = 'IDLE',
    LOADING = 'LOADING',
}

export type Nullable<T> = T | null

export enum SCREEN_SIZE {
    EXTRA_SMALL ='EXTRA_SMALL',
    SMALL = 'SMALL',
    MEDIUM = 'MEDIUM',
    LARGE = 'LARGE',
    EXTRA_LARGE = 'EXTRA_LARGE',
    EXTRA_EXTRA_LARGE = 'EXTRA_EXTRA_LARGE'
}

const initState = {
    isInitSuccess: false,
    appStatus: APP_STATUSES.IDLE as APP_STATUSES,
    screenSize: null as Nullable<SCREEN_SIZE>,
}


type appStateType = typeof initState

const appReducer = (state = initState, action: AppActionTypes): appStateType => {
    switch (action.type) {
        case 'SET_INIT_SUCCESS':
            return {
                ...state,
                isInitSuccess: true,
            }
        case "SET_SCREEN_SIZE":
            return {
                ...state,
                screenSize: action.screenSize
            }
        default:
            return state
    }
}

export type AppActionTypes = setInitSuccessActionType
    | setScreenSizeActionType

type setInitSuccessActionType = ReturnType<typeof setInitSuccess>
type setScreenSizeActionType = ReturnType<typeof setScreenSize>

const setInitSuccess = () => ({
    type: 'SET_INIT_SUCCESS',
} as const)

export const setScreenSize = (screenSize: SCREEN_SIZE) => ({
    type: 'SET_SCREEN_SIZE', screenSize
} as const)

export const initApp = (): ThunkType => dispatch => {
    const getAuthPr = dispatch(getAuthUserData())
    Promise.all([getAuthPr])
        .then(() => {
            dispatch(setInitSuccess())
        })
}


export default appReducer






















