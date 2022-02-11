import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk, { ThunkAction } from 'redux-thunk'
import profile, { ProfileActionsTypes } from "./profileReducer"
import dialogs, { DialogsActionTypes } from "./diaogsReducer"
import users, { UsersActionTypes } from "./usersReducer"
import friends, { FriendsActionTypes } from "./friendReducer"
import auth, { AuthActionTypes } from "./authReducer"
import app, { AppActionTypes } from './appReducer'
import { useSelector } from 'react-redux'


const rootReducer = combineReducers( {
    profile,
    dialogs,
    users,
    auth,
    app,
    friends,
} )

const middleware = [
    reduxThunk,
]

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore( rootReducer, composeWithDevTools( applyMiddleware( ...middleware ) ) )


//@ts-ignore
window.store = store


export type AllActionsType = UsersActionTypes
    | ProfileActionsTypes
    | DialogsActionTypes
    | AuthActionTypes
    | AppActionTypes
    | FriendsActionTypes

export type ThunkType = ThunkAction<any, AppStateType, any, AllActionsType>


export function useAppSelector<T>(selector: (state: AppStateType) => T): T {
    return useSelector<AppStateType, T>( selector )
}