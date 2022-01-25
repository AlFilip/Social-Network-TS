import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk, { ThunkAction } from 'redux-thunk'
import profile, { profileActionsTypes } from "./profileReducer"
import dialogs, { dialogsActionTypes } from "./diaogsReducer"
import users, { usersActionTypes } from "./usersReducer"
import auth, { authActionTypes } from "./authReducer"
import app, { appActionTypes } from './appReducer'
import { useSelector } from 'react-redux'


const rootReducer = combineReducers( {
    profile,
    dialogs,
    users,
    auth,
    app,
} )

const middleware = [
    reduxThunk,
]

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore( rootReducer, composeWithDevTools( applyMiddleware( ...middleware ) ) )


//@ts-ignore
window.store = store


export type allActionsType = usersActionTypes
    | profileActionsTypes
    | dialogsActionTypes
    | authActionTypes
    | appActionTypes

export type ThunkType = ThunkAction<any, AppStateType, any, allActionsType>


export function useAppSelector<T>(selector: (state: AppStateType) => T): T {
    return useSelector<AppStateType, T>( selector )
}