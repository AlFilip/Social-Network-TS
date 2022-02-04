import React, {useEffect} from 'react'
import s from './App.module.scss'
import Header from "./components/Header/Header"
import {NavBar} from "./components/NavBar/NavBar"
import {HashRouter} from "react-router-dom"
import {Provider, useDispatch} from 'react-redux'
import {store, useAppSelector} from './redux/redux-store'
import {Preloader} from './components/Common/Preloader/Preloader'
import {initApp, setScreenSize} from './redux/appReducer'
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
            if (width < 480 && screenSize !== 'XS') {
                dispatch(setScreenSize("XS"))
                return
            }
            if (width > 1440 && screenSize !== 'XL') {
                dispatch(setScreenSize("XL"))
                return
            }
            if (width > 1280 && width <= 1440 && screenSize !== 'L') {
                dispatch(setScreenSize("L"))
                return
            }
            if (width > 768 && width <= 1280 && screenSize !== 'M') {
                dispatch(setScreenSize("M"))
                return
            }
            if (width > 480 && width <= 768 && screenSize !== 'S') {
                dispatch(setScreenSize("S"))
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

