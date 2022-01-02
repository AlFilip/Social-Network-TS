import axios, { AxiosResponse } from "axios"
import { photosType, profileType } from "../redux/profileReducer"
import { baseRequestConfig } from "./authApi"
import { commonResponseType, resultCodes } from "./usersApi"


const profileRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${ baseRequestConfig.baseURL }profile/`,
}
type setPhotoResponseType = {
    data: { photos: photosType }
    resultCode: resultCodes
    messages: string[]
}
const profileAxiosInstance = axios.create( profileRequestConfig )

export const profileApi = {
    getProfile: (userId: string) => profileAxiosInstance.get<profileType>( `${ userId }` ),

    getStatus: (userId: string) => profileAxiosInstance.get<string>( `status/${ userId }` ),

    setStatus: (newStatus: string) => profileAxiosInstance.put<{ status: string }, AxiosResponse<commonResponseType>>
    ( 'status', { status: newStatus } ),

    setPhoto(image: File) {
        const data = new FormData()
        data.append( 'image', image )

        return profileAxiosInstance.put<any, AxiosResponse<setPhotoResponseType>>( 'photo', data, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        } )
    },
    updateProfile(profile: Partial<profileType>) {
        return profileAxiosInstance.put( '', profile )
    },
}