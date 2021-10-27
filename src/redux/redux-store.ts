import {combineReducers, createStore} from 'redux'
import profile from "./profileReducer";
import dialogs from "./diaogsReducer";
import users from "./usersReducer";
import auth from "./authReducer";

const rootReducer = combineReducers({
    profile,
    dialogs,
    users,
    auth,
})

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer)


//@ts-ignore
window.store = store