import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {NavBar} from "./components/NavBar/NavBar";
import {Profile} from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";

import {BrowserRouter, Route} from "react-router-dom"
import {ActionTypes, DialogsPageType, ProfilePageType} from "./redux/state";

export type AppType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    dispatch: (action: ActionTypes) => void
}

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={() => <Profile posts={props.profilePage.posts}
                                                                    newPostMessage={props.profilePage.newPostMessage}
                                                                    dispatch={props.dispatch}/>}/>
                    <Route path={'/dialogs'} render={() => <Dialogs messages={props.dialogsPage.messages}
                                                                    dialogs={props.dialogsPage.dialogs}
                                                                    newMessageValue={props.dialogsPage.newMessageValue}
                                                                    dispatch={props.dispatch}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

