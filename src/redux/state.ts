import rerenderEntireTree from "../rerender";

export type PostType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostType>
}

export type DialogType = {
    name: string
    id: number
}
export type MessageType = {
    id: number
    text: string
    owner: boolean
}

export type DialogsPageType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageValue: string
}
export type DialogsPagePropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    addMessage: (postMessage: string) => void
    newMessageValue: string
    onNewMessageChange: (newValue: string) => void
}

export type StateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}
export type AppType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    addMessage: (postMessage: string) => void
    onNewMessageChange: (newValue: string) => void
}

let state: StateType = {
    profilePage: {
        posts: [
            {id: 1, message: 'Hi man', likesCount: 50},
            {id: 2, message: 'How are you', likesCount: 150}
        ],
    },
    dialogsPage: {
        dialogs: [
            {name: "Sergey", id: 1},
            {name: "Artem", id: 2},
            {name: "Nikolay", id: 3},
        ],
        messages: [
            {id: 1, text: 'Здорово, корова', owner: false},
            {id: 2, text: 'Здорово, сама', owner: true},
        ],
        newMessageValue: ''
    },
}

export const addMessage = (postMessage: string): void => {
    const newMessage = {id: 4, text: postMessage, owner: true}
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageValue = ''
    rerenderEntireTree(state)
}

export const onNewMessageChange = (newValue: string): void => {
    state.dialogsPage.newMessageValue = newValue
    rerenderEntireTree(state)
}

export default state;
