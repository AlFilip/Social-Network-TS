import axios from "axios";
import {UserType} from "../redux/usersReducer";
import {baseRequestConfig} from "./authApi";


export type commonResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    data: T
}

type responseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const axiosInstance = axios.create(baseRequestConfig)

export const usersAPI = {
    getUsers: async (page: number) => {
        const {data, status} = await axiosInstance.get<responseType>(`/users`, {params: {page}})

        if (status === 200) {
            return data
        }
        console.log('Check usersApi response')
    },

    follow: async (userId: number) => {
        const {status, data: {resultCode, messages}} = await axiosInstance.post<commonResponseType>(`/follow/${userId}`)
        if (status === 200 && resultCode === 0) {
            return true
        }
        console.log(messages[0])
    },

    unFollow: async (userId: number) => {
        const {status, data: {resultCode, messages}} = await axiosInstance.delete<commonResponseType>(`/follow/${userId}`)
        if (status === 200 && resultCode === 0) {
            return true
        }
        console.log(messages[0])
    },
}