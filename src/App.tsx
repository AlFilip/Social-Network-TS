import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";

import {BrowserRouter, Route} from "react-router-dom"
import {AppType} from "./redux/state";

function App(props: AppType) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <NavBar/>
                <div className={'app-wrapper-content'}>
                    <Route path={'/profile'} render={() => <Profile posts={props.profilePage.posts}/>}/>
                    <Route path={'/dialogs'} render={() => <Dialogs messages={props.dialogsPage.messages}
                                                                    dialogs={props.dialogsPage.dialogs}
                                                                    addMessage={props.addMessage}
                                                                    newMessageValue={props.dialogsPage.newMessageValue}
                                                                    onNewMessageChange={props.onNewMessageChange}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

