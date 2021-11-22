import React from 'react'
import './App.css'
import Header from "./components/Header/Header"
import { NavBar } from "./components/NavBar/NavBar"

import { BrowserRouter, Route } from "react-router-dom"
import { profileStateType } from "./redux/profileReducer"
import { dialogsStateType } from "./redux/diaogsReducer"
import { ActionTypes } from "./redux/store"
import ProfileContainer from './components/Profile/ProfileContainer'
import Dialogs from "./components/Dialogs/Dialogs"
import { Login } from "./components/Login/Login"
import { Users } from './components/Users/Users'


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
                <div className={ 'app-wrapper-content' }>
                    <Route path={ '/profile/:userId?' } render={ () => <ProfileContainer/> }/>
                    <Route path={ '/dialogs' } render={ () => <Dialogs/> }/>
                    <Route path={ '/users' } render={ () => <Users/> }/>
                    <Route path={ '/login' } render={ () => <Login/> }/>

                </div>
            </div>
        </BrowserRouter>
    )
}

export default App

