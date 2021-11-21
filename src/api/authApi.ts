import axios, { AxiosResponse } from "axios"
import { commonResponseType } from "./usersApi"
import { loginValuesType } from "../components/Login/Login"


export const baseRequestConfig = {
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe',
    },
}

const authRequestConfig = {
    ...baseRequestConfig,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/auth/',
}

type authResponseDataType = {
    id: number
    login: string
    email: string
}

type loginDataType = {
    isSuccess: boolean
    failMessage: string | undefined
    userId: number | undefined
}

const authInstance = axios.create( authRequestConfig )

export const authAPI = {
    me: () => authInstance.get<commonResponseType<authResponseDataType>>( `me` ),

    login: (payload: loginValuesType) => {
        return authInstance.post<loginValuesType, AxiosResponse<commonResponseType<{ userId: number }>>>( 'login', payload )
    },

    logOut: () => authInstance.delete<commonResponseType>( 'login' ),

}

























