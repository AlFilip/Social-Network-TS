import axios, { AxiosResponse } from "axios"
import { commonResponseType } from "./usersApi"
import { loginValuesType } from "../components/Login/Login"
import { baseRequestConfig } from './authApi'

const dialogsRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${baseRequestConfig.baseURL}dialogs/`
}

const dialogsAxiosInstance = axios.create(dialogsRequestConfig)

export const authAPI = {
    // me: () => dialogsAxiosInstance.get<commonResponseType<authResponseDataType>>( `me` ),
    //
    // login: (payload: loginValuesType) => {
    //     return dialogsAxiosInstance.post<loginValuesType, AxiosResponse<commonResponseType<{ userId: number }, loginResultCodes>>>( 'login', payload )
    // },
    //
    // logOut: () => dialogsAxiosInstance.delete<commonResponseType>( 'login' ),
}

























