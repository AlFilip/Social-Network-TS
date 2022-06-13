import React, {useEffect} from 'react'
import s from './App.module.scss'
import Header from "./components/Header/Header"
import {NavBar} from "./components/NavBar/NavBar"
import {HashRouter} from "react-router-dom"
import {Provider, useDispatch} from 'react-redux'
import {store, useAppSelector} from './redux/redux-store'
import {Preloader} from './components/Common/Preloader/Preloader'
import {initApp, SCREEN_SIZE, setScreenSize} from './redux/appReducer'
import {selectIsInitialised, selectScreenSize} from './redux/selectors'
import {MyRoutes} from './MyRoutes'
import {SideBar} from "./components/SideBar/SideBar";


const App = () => {
    const isInitialised = useAppSelector(selectIsInitialised)
    const screenSize = useAppSelector(selectScreenSize)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initApp())
    }, [dispatch])

    useEffect(() => {
        const resizeHandle = () => {
            const width = window.innerWidth
            if (width < 480 && screenSize !== SCREEN_SIZE.EXTRA_SMALL) {
                dispatch(setScreenSize(SCREEN_SIZE.EXTRA_SMALL))
                return
            }
            if (width > 1440 && screenSize !== SCREEN_SIZE.EXTRA_LARGE) {
                dispatch(setScreenSize(SCREEN_SIZE.EXTRA_EXTRA_LARGE))
                return
            }
            if (width > 1280 && width <= 1440 && screenSize !== SCREEN_SIZE.LARGE) {
                dispatch(setScreenSize(SCREEN_SIZE.LARGE))
                return
            }
            if (width > 768 && width <= 1280 && screenSize !== SCREEN_SIZE.MEDIUM) {
                dispatch(setScreenSize(SCREEN_SIZE.MEDIUM))
                return
            }
            if (width > 480 && width <= 768 && screenSize !== SCREEN_SIZE.SMALL) {
                dispatch(setScreenSize(SCREEN_SIZE.SMALL))
            }
        }
        resizeHandle()
        window.addEventListener("resize", resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])

    const renderApp = () => {
        if (!isInitialised) return <Preloader/>
        return (
            <div className={s.appWrapper}>
                <Header/>
                <NavBar/>
                <SideBar/>
                <div className={s.appWrapperContent}>
                    <div className={s.content}>

                        <MyRoutes/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {renderApp()}
        </>
    )
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </Provider>
    )
}


export default AppContainer

