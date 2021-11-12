import axios from "axios";
import {axiosInstance, commonResponseType} from "./usersApi";

export const baseRequestConfig = {
    withCredentials: true,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe'
    }
}

const authRequestConfig = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/auth/',
    ...baseRequestConfig
}
type authResponseDataType = {
    id: number
    login: string
    email: string
}

const authInstance = axios.create(authRequestConfig)

export const authAPI = {
    me: async () => {
        const {status, data: {messages, resultCode, data}} = await authInstance.get<commonResponseType<authResponseDataType>>(`me`)
        messages[0]
        && console.log(messages[0])
        return (status === 200 && resultCode === 0) && data
    }
}