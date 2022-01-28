import React, {useEffect} from 'react'
import s from './App.module.scss'
import Header from "./components/Header/Header"
import {NavBar} from "./components/NavBar/NavBar"
import {HashRouter} from "react-router-dom"
import {Provider, useDispatch} from 'react-redux'
import {store, useAppSelector} from './redux/redux-store'
import {Preloader} from './components/Common/Preloader/Preloader'
import {initApp} from './redux/appReducer'
import {selectIsInitialised} from './redux/selectors'
import {MyRoutes} from './MyRoutes'
import {SideBar} from "./components/SideBar/SideBar";


const App = () => {
    // const isAuth = useSelector<AppStateType, boolean>( selectIsAuth )
    const isInitialised = useAppSelector(selectIsInitialised)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initApp())
    }, [dispatch])

    return (
        <>
            {
                isInitialised ? <div className={s.appWrapper}>
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

