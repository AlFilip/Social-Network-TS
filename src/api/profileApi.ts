import axios, {AxiosResponse} from "axios";
import {profileType} from "../redux/profileReducer";
import {baseRequestConfig} from "./authApi";
import {commonResponseType} from "./usersApi";

const profileRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${baseRequestConfig.baseURL}profile/`
}


const authInstance = axios.create(profileRequestConfig)

export const profileApi = {
    getProfile: async (userId: string) => {
        const {status, data} = await authInstance.get<profileType>(`${userId}`)

        return status === 200
            && data
    },
    getStatus: async (userId: string) => {
        const {data, status} = await authInstance.get<string>(`status/${userId}`)

        if (status === 200) {
            return data
        }
        return ''
    },
    setStatus: async (newStatus: string) => {
        const {status, data: {resultCode}} = await
            authInstance.put<{ status: string }, AxiosResponse<commonResponseType>>('status', {status: newStatus})
        return status === 200 && resultCode === 0
    }
}