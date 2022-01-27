import axios, {AxiosResponse} from "axios"
import {baseRequestConfig} from './authApi'
import {commonResponseType} from "./usersApi";
import {photosType} from "../redux/profileReducer";

const dialogsRequestConfig = {
    ...baseRequestConfig,
    baseURL: `${baseRequestConfig.baseURL}dialogs/`,

}

const dialogsAxiosInstance = axios.create(dialogsRequestConfig)

export const dialogsApi = {
    getAllDialogs() {
        return dialogsAxiosInstance.get<DomainDialogType[]>('')
    },
    getNewMessagesCount() {
        return dialogsAxiosInstance.get<number>('messages/new/count')
    },
    getMessages(userId: number) {
        return dialogsAxiosInstance.get<getMessagesResponseType>(`${userId}/messages`)
    },
    startChat(userId: number) {
        return dialogsAxiosInstance.put<commonResponseType>(`${userId}`)
    },
    sendMessage(userId: number, message: string) {
        return dialogsAxiosInstance
            .post <{ body: string }, AxiosResponse<commonResponseType<{ "message": ReducedDomainMessageType }>>>
            (`${userId}/messages`, {body: message})
    },
    isMessageViewed(messageId: string) {
        return dialogsAxiosInstance.get<boolean>(`messages/${messageId}/viewed`)
    },
    sendMessageToSpam(messageId: string) {
        return dialogsAxiosInstance.post<commonResponseType>(`messages/${messageId}/spam`)
    },
    deleteMessage(messageId: string) {
        return dialogsAxiosInstance.delete<commonResponseType>(`messages/${messageId}`)
    },
    restoreMessage(messageId: string) {
        return dialogsAxiosInstance.put<commonResponseType>(`messages/${messageId}/restore`)
    },
    getMessagesByDate(userId: string, date: string) {
        return dialogsAxiosInstance.get(`${userId}/messages/new?newerThen=${date}`)
    },
}

export type ReducedDomainMessageType = {
    "id": string,
    "body": string,
    "translatedBody": null,
    "addedAt": string,
    "senderId": number,
    "senderName": string,
    "recipientId": number,
    "viewed": boolean
}

// type fullDomainMessageType = reducedDomainMessageType & {
//     "recipientName": string,
//     "deletedBySender": boolean,
//     "deletedByRecipient": boolean,
//     "isSpam": boolean,
//     "distributionId": null | number
// }

export type DomainDialogType = {
    "id": number,
    "userName": string,
    "hasNewMessages": boolean,
    "lastDialogActivityDate": string,
    "lastUserActivityDate": string,
    "newMessagesCount": number,
    "photos": photosType
}

export type getMessagesResponseType = {
    "items": ReducedDomainMessageType [],
    "totalCount": number,
    "error": null | string,
}
















