import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";

import {BrowserRouter, Route} from "react-router-dom"
import {ActionTypes, DialogsPageType, ProfilePageType} from "./redux/store";
import DialogsContainer from "./components/Dialogs/DialogsContainer";

export type AppType = {
    profile: ProfilePageType
    dialogs: DialogsPageType
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
                    <Route path={'/dialogs'} render={() => <DialogsContainer messages={props.dialogs.messages}
                                                                             dialogs={props.dialogs.dialogs}
                                                                             newMessageValue={props.dialogs.newMessageValue}
                                                                             dispatch={props.dispatch}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

