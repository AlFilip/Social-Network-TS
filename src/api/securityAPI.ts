import axios from 'axios'
import { baseRequestConfig } from './authApi'


export const securityAPI = {
    getCaptcha() {
        return axios.get<{ url: string }>( 'security/get-captcha-url', baseRequestConfig )
    },
}