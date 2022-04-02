import React, {useEffect} from 'react'
import s from './App.module.scss'
import Header from "./components/Header/Header"
import {NavBar} from "./components/NavBar/NavBar"
import {HashRouter} from "react-router-dom"
import {Provider, useDispatch} from 'react-redux'
import {store, useAppSelector} from './redux/redux-store'
import {Preloader} from './components/Common/Preloader/Preloader'
import {initApp, SCREEN_SIZES, setScreenSize} from './redux/appReducer'
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
            if (width < 480 && screenSize !== SCREEN_SIZES.EXTRA_SMALL) {
                dispatch(setScreenSize(SCREEN_SIZES.EXTRA_SMALL))
                return
            }
            if (width > 1440 && screenSize !== SCREEN_SIZES.EXTRA_LARGE) {
                dispatch(setScreenSize(SCREEN_SIZES.EXTRA_EXTRA_LARGE))
                return
            }
            if (width > 1280 && width <= 1440 && screenSize !== SCREEN_SIZES.LARGE) {
                dispatch(setScreenSize(SCREEN_SIZES.LARGE))
                return
            }
            if (width > 768 && width <= 1280 && screenSize !== SCREEN_SIZES.MEDIUM) {
                dispatch(setScreenSize(SCREEN_SIZES.MEDIUM))
                return
            }
            if (width > 480 && width <= 768 && screenSize !== SCREEN_SIZES.SMALL) {
                dispatch(setScreenSize(SCREEN_SIZES.SMALL))
            }
        }
        resizeHandle()
        window.addEventListener("resize", resizeHandle)
        return () => {
            window.removeEventListener('resize', resizeHandle)
        }
    }, [])

    return (
        <>
            {
                isInitialised
                    ? <div className={s.appWrapper}>
                        <Header/>
                        <NavBar/>
                        <SideBar/>
                        <div className={s.appWrapperContent}>
                            <div className={s.content}>

                                <MyRoutes/>
                            </div>
                        </div>
                    </div>

                    : <Preloader/>
            }
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

