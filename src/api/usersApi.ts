import axios from "axios"
import { UserType } from "../redux/usersReducer"
import { baseRequestConfig } from "./authApi"


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

export const axiosInstance = axios.create( baseRequestConfig )

export const usersAPI = {
    getUsers: (page: number) => axiosInstance.get<responseType>( `/users`, { params: { page } } ),

    follow: (userId: number) => axiosInstance.post<commonResponseType>( `/follow/${ userId }` ),

    unFollow: async (userId: number) => axiosInstance.delete<commonResponseType>( `/follow/${ userId }` ),

}