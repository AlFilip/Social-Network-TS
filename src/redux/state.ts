import rerenderEntireTree from "../rerender";
import {v1} from "uuid";

export type PostType = {
    id: string
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
    newPostMessage: string
}

export type DialogType = {
    name: string
    id: number
}
export type MessageType = {
    id: string
    text: string
    owner: boolean
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageValue: string
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}


let state: StateType = {
    profilePage: {
        posts: [
            {id: v1(), message: 'Hi man', likesCount: 50},
            {id: v1(), message: 'How are you', likesCount: 150}
        ],
        newPostMessage: ''
    },
    dialogsPage: {
        dialogs: [
            {name: "Sergey", id: 1},
            {name: "Artem", id: 2},
            {name: "Nikolay", id: 3},
        ],
        messages: [
            {id: v1(), text: 'Здорово, корова', owner: false},
            {id: v1(), text: 'Здорово, сама', owner: true},
        ],
        newMessageValue: ''
    },
}

export const addMessage = (): void => {
    const newMessage:MessageType = {id: v1(), text: state.dialogsPage.newMessageValue, owner: true}
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageValue = ''
    rerenderEntireTree(state)
}

export const onNewMessageChange = (newValue: string): void => {
    state.dialogsPage.newMessageValue = newValue
    rerenderEntireTree(state)
}

export const onNewPostChange = (newValue: string): void => {
    state.profilePage.newPostMessage = newValue
    rerenderEntireTree(state)
}

export const addPost = () => {
    const newPost:PostType = {
        id: v1(),
        message: state.profilePage.newPostMessage,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostMessage = ''
    rerenderEntireTree(state)
}

export default state;
