import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
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

const middleware = [
    reduxThunk,
];

export type AppStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))


//@ts-ignore
window.store = store