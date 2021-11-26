import { thunkType } from './redux-store'
import { getAuthUserData } from './authReducer'


const initState = {
    isInitSuccess: false,
}


type appStateType = typeof initState

const appReducer = (state = initState, action: appActionTypes): appStateType => {
    switch (action.type) {
        case 'SET_INIT_SUCCESS':
            return {
                ...state,
                isInitSuccess: true,
            }

        default:
            return state
    }
}

export type appActionTypes = setInitSuccessActionType

type setInitSuccessActionType = ReturnType<typeof setInitSuccess>

const setInitSuccess = () => ( {
    type: 'SET_INIT_SUCCESS',
} as const )

export const initApp = (): thunkType => dispatch => {
    const getAuthPr = dispatch( getAuthUserData() )
    Promise.all( [getAuthPr] )
        .then( () => {
            dispatch( setInitSuccess() )
        } )
}


export default appReducer






















