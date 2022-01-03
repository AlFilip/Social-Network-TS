import { Navigate, Route, Routes } from 'react-router-dom'
import { Profile } from './components/Profile/Profile'
import Dialogs from './components/Dialogs/Dialogs'
import React from 'react'

const Chat = React.lazy( () => import('./components/Chat/Chat') )
const Users = React.lazy( () => import('./components/Users/Users') )
const Login = React.lazy( () => import('./components/Login/Login') )

export const MyRoutes = () => {
    return(
        <Routes>
            <Route path={ '/profile' } element={ <Profile/> }>
                <Route path={ ':userId' } element={ <Profile/> }/>
            </Route>
            <Route path='/dialogs' element={ <Dialogs/> }/>
            <Route path={ '/users' } element={ (
                <React.Suspense fallback={ <>...</> }>
                    <Users/>
                </React.Suspense> ) }
            />

            <Route path={ '/login' } element={ (
                <React.Suspense fallback={ <>...</> }>
                    <Login/>
                </React.Suspense> ) }
            />

            <Route path={ '/chat' } element={ (
                <React.Suspense fallback={ <>...</> }>
                    <Chat/>
                </React.Suspense> ) }
            />

            <Route path="*" element={ <Navigate to="/profile"/> }/>
        </Routes>
    )
}