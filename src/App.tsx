import React, { useEffect } from 'react'
import './App.css'
import Header from "./components/Header/Header"
import { NavBar } from "./components/NavBar/NavBar"
import { HashRouter } from "react-router-dom"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { AppStateType, store } from './redux/redux-store'
import { Preloader } from './components/Common/Preloader/Preloader'
import { initApp } from './redux/appReducer'
import { selectIsInitialised } from './redux/selectors'
import { MyRoutes } from './MyRoutes'


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

                            <MyRoutes/>

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

