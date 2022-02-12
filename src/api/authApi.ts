import axios, { AxiosResponse } from "axios"
import { commonResponseType } from "./usersApi"
import { loginValuesType } from "../components/Login/Login"


export enum loginResultCodes {
    SUCCESS = 0,
    ERROR = 1,
    CAPTCHA_IS_REQUIRED = 10
}


export const baseRequestConfig = {
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': process.env.API_KEY || '',
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
        return authInstance.post<loginValuesType, AxiosResponse<commonResponseType<loginDataType, loginResultCodes>>>( 'login', payload )
    },

    logOut: () => authInstance.delete<commonResponseType>( 'login' ),

}

























