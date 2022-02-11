import {ThunkType} from './redux-store'
import {getAuthUserData} from './authReducer'

type AppStatus = 'idle' | 'loading'
export type ScreenSizeTypes = 'XS' | 'XL' | 'L' | 'M' | 'S' | null

const initState = {
    isInitSuccess: false,
    appStatus: 'idle' as AppStatus,
    screenSize: null as ScreenSizeTypes,
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

export const setScreenSize = (screenSize: ScreenSizeTypes) => ({
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






















