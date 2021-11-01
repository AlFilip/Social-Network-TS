import axios from "axios";
import {UserType} from "../redux/usersReducer";

const config = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    withCredentials: true,
}

const configWithKey = {
    ...config,
    headers: {
        'API-KEY': '8ac432b4-b12d-401e-8457-1e2c87c081fe'
    }
}

type responseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

const usersInstance = axios.create(config)
const usersInstanceWithKey = axios.create(configWithKey)

export const usersAPI = {
    getUsers: (currentPage: number) => usersInstance
        .get<responseType>(`/users`, {
            params: {
                page: currentPage
            }
        })
        .then(response => {
            if (response.status === 200) {
                return response.data
            }
            throw new Error("Check usersApi response");
        })
        .catch(err => console.log(err)
        ),
    follow: (userId: number) => {
        return usersInstanceWithKey
            .post(`/follow/${userId}`)
            .then(res => {
                if (res.status === 200) return res.data
                throw new Error('Check the "follow" request/response')
            })
            .catch(err => console.log(err))
    },
    unFollow: (userId: number) => {
        return usersInstanceWithKey
            .delete(`/follow/${userId}`)
            .then(res => {
                if (res.status === 200) return res.data
                throw new Error('Check the "follow" request/response')
            })
            .catch(err => console.log(err))
    },
}