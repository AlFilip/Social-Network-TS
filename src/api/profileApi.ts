import axios, { AxiosResponse } from "axios"
import { profileType } from "../redux/profileReducer"
import { baseRequestConfig } from "./authApi"
import { commonResponseType } from "./usersApi"


const profileRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${ baseRequestConfig.baseURL }profile/`,
}


const authInstance = axios.create( profileRequestConfig )

export const profileApi = {
    getProfile: (userId: string) => authInstance.get<profileType>( `${ userId }` ),

    getStatus: (userId: string) => authInstance.get<string>( `status/${ userId }` ),

    setStatus: async (newStatus: string) => {
        return authInstance.put<{ status: string }, AxiosResponse<commonResponseType>>
        ( 'status', { status: newStatus } )
    },
}