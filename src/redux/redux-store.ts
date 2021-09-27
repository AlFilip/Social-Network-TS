import {combineReducers, createStore} from 'redux'
import {profile} from "./profileReducer";
import {dialogs} from "./diaogsReducer";

const reducers = combineReducers({
    profile,
    dialogs
})


export let store = createStore(reducers)
