import axios from "axios";
import {profileType} from "../redux/profileReducer";

export const requestConfig = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
}


const authInstance = axios.create(requestConfig)

export const profileApi = {
    getProfile: async (userId: string) => {
        const {status, data} = await authInstance.get<profileType>(`profile/` + userId)
        return status === 200
            && data
    }
}