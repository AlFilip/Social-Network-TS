import React, { useEffect } from 'react'
import './App.css'
import Header from "./components/Header/Header"
import { NavBar } from "./components/NavBar/NavBar"
import { HashRouter, Route, Routes } from "react-router-dom"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { AppStateType, store } from './redux/redux-store'
import { Preloader } from './components/Common/Preloader/Preloader'
import { initApp } from './redux/appReducer'
import { selectIsInitialised } from './redux/selectors'
import { Profile } from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'


const Chat = React.lazy( () => import('./components/Chat/Chat') )
const Users = React.lazy( () => import('./components/Users/Users') )
const Login = React.lazy( () => import('./components/Login/Login') )

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
                            <Routes>
                                <Route path={ '/' } element={ <Profile/> }/>
                                <Route path={ '/profile' } element={ <Profile/> }>
                                    <Route path={ ':userId' } element={ <Profile/> }/>
                                </Route>
                                <Route path='/dialogs' element={ <Dialogs/> }/>
                                <Route path={ '/users' } element={ (
                                    <React.Suspense fallback={ <>...</> }>
                                        <Users/>
                                    </React.Suspense> ) }/>

                                <Route path={ '/login' } element={ (
                                    <React.Suspense fallback={ <>...</> }>
                                        <Login/>
                                    </React.Suspense> ) }/>

                                <Route path={ '/chat' } element={ (
                                    <React.Suspense fallback={ <>...</> }>
                                        <Chat/>
                                    </React.Suspense> ) }/>
                            </Routes>
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
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    )
}


export default AppContainer

