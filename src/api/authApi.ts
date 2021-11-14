import axios, {AxiosResponse} from "axios";
import {commonResponseType} from "./usersApi";
import {loginValuesType} from "../components/Login/Login";

export const baseRequestConfig = {
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe'
    }
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

type loginDataType= {
    isSuccess: boolean
    failMessage: string | undefined
    userId: number | undefined
}

const authInstance = axios.create(authRequestConfig)

export const authAPI = {
    me: async () => {
        const {status, data: {messages, resultCode, data}} = await
            authInstance.get<commonResponseType<authResponseDataType>>(`me`)

        messages[0]
        && console.log(messages[0])
        return (status === 200 && resultCode === 0) && data
    },
    login: async (payload: loginValuesType):Promise<loginDataType> => {
        const {status, data: {data: {userId}, messages, resultCode}} = await
            authInstance.post<loginValuesType, AxiosResponse<commonResponseType<{ userId: number }>>>('login', payload)

        return {
            isSuccess: status === 200 && resultCode === 0,
            failMessage: messages[0],
            userId
        }
    },
    logOut: async () => {
        const {status, data:{resultCode, messages}} = await authInstance.delete<commonResponseType>('login')

        if (status === 200 && resultCode === 0) {
            return true
        }
        alert(messages[0])
    }
}

























