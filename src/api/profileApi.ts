import axios, { AxiosResponse } from "axios"
import { profileType } from "../redux/profileReducer"
import { baseRequestConfig } from "./authApi"
import { commonResponseType } from "./usersApi"


const profileRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${ baseRequestConfig.baseURL }profile/`,
}


const profileAxiosInstance = axios.create( profileRequestConfig )

export const profileApi = {
    getProfile: (userId: string) => profileAxiosInstance.get<profileType>( `${ userId }` ),

    getStatus: (userId: string) => profileAxiosInstance.get<string>( `status/${ userId }` ),

    setStatus: (newStatus: string) => profileAxiosInstance.put<{ status: string }, AxiosResponse<commonResponseType>>
    ( 'status', { status: newStatus } ),
}