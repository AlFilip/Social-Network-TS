import React, { useEffect } from 'react'
import './App.css'
import Header from "./components/Header/Header"
import { NavBar } from "./components/NavBar/NavBar"
import { BrowserRouter, Route } from "react-router-dom"
import { Login } from "./components/Login/Login"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { AppStateType, store } from './redux/redux-store'
import { Preloader } from './components/Common/Preloader/Preloader'
import { initApp } from './redux/appReducer'
import { selectIsInitialised } from './redux/selectors'
import { Profile } from './components/Profile/Profile'
import { SuspenseHOC } from './components/Common/hoc/SuspenseHOC'


const Dialogs = React.lazy( () => import( './components/Dialogs/Dialogs') )
const Users = React.lazy( () => import( './components/Users/Users') )
const Chat = React.lazy( () => import( './components/Chat/Chat') )


const App = () => {
    // const isAuth = useSelector<AppStateType, boolean>( selectIsAuth )
    const isInitialised = useSelector<AppStateType, boolean>( selectIsInitialised )
    const dispatch = useDispatch()

    useEffect( () => {
        dispatch( initApp() )
    }, [] )

    return (
        <>
            {
                isInitialised ? <div className="app-wrapper">
                        <Header/>
                        <NavBar/>
                        <div className={ 'app-wrapper-content' }>

                            <Route exact path={ '/' } render={ () => <Profile/> }/>
                            <Route path={ '/profile/:userId?' } render={ () => ( <Profile/> ) }/>

                            <Route path={ '/dialogs' } render={ SuspenseHOC( Dialogs ) }/>

                            <Route path={ '/users' } render={ SuspenseHOC( Users ) }/>
                            <Route path={ '/login' } render={ () => <Login/> }/>
                            <Route path={ '/chat' } render={ SuspenseHOC( Chat ) }/>

                        </div>
                    </div>

                    : <Preloader/>
            }
        </>
    )
}

const AppContainer = () => {
    return (
        <Provider store={ store }>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    )
}


export default AppContainer

