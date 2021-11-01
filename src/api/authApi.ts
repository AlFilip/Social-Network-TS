import axios from "axios";

export const requestConfig = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true
}

type responseType = {
    data: {
        id: number
        login: string
        email: string
    },
    resultCode: number
}

const authInstance = axios.create(requestConfig)

export const authAPI = {
    me: () => authInstance
        .get<responseType>(`/auth/me`)
        .then(response => {
            if (response.status === 200 && response.data.resultCode === 0) {
                return response.data.data
            }
            throw new Error("Check auth response");
        })
        .catch(err => console.log(err))
}