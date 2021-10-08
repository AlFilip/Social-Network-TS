import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";

import {BrowserRouter, Route} from "react-router-dom"
import {ActionTypes} from "./redux/store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {profileStateType} from "./redux/profileReducer";
import {dialogsStateType} from "./redux/diaogsReducer";

export type AppType = {
    profile: profileStateType
    dialogs: dialogsStateType
    dispatch: (action: ActionTypes) => void
}

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={() => <Profile posts={props.profile.posts}
                                                                    newPostMessage={props.profile.newPostMessage}
                                                                    dispatch={props.dispatch}/>}/>
                    <Route path={'/dialogs'} render={() => <DialogsContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

