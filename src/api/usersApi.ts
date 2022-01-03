import axios from "axios"
import { UserType } from "../redux/usersReducer"
import { baseRequestConfig } from "./authApi"


export enum resultCodes {
    SUCCESS = 0,
    ERROR = 1,
}



export type commonResponseType<T = {}, R = resultCodes> = {
    resultCode: R
    messages: string[],
    data: T
}

type responseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type getUsersParamsType  = {
    page?: number
    count?: number
    term?: string
    friend?: boolean
}

export const axiosInstance = axios.create( baseRequestConfig )

export const usersAPI = {
    getUsers: (params:getUsersParamsType) => axiosInstance.get<responseType>( `/users`, { params }  ),

    follow: (userId: number) => axiosInstance.post<commonResponseType>( `/follow/${ userId }` ),

    unFollow: async (userId: number) => axiosInstance.delete<commonResponseType>( `/follow/${ userId }` ),

}