import {combineReducers, createStore} from 'redux'
import {profile} from "./profileReducer";
import {dialogs} from "./diaogsReducer";

const rootReducer = combineReducers({
    profile,
    dialogs
})

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)
