import {v1} from "uuid";

export {}
declare global {
    interface Window {
        store: StoreType
    }
}

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

type StoreType = {
    _state: StateType
    getState: () => StateType
    addMessage: () => void
    onNewMessageChange: (newValue:string) => void
    onNewPostChange: (newValue: string) => void
    addPost: () => void
    _rerenderEntireTree: () => void
    _subscribe: (observer:() => void) => void

}

const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: v1(), message: 'Hi man', likesCount: 50},
                {id: v1(), message: 'How are you', likesCount: 150}
            ],
            newPostMessage: '',
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
            newMessageValue: '',
        },
    },
    addMessage() {
        if (this._state.dialogsPage.newMessageValue.trim()) {
            const newMessage: MessageType = {id: v1(), text: this._state.dialogsPage.newMessageValue, owner: true}
            this._state.dialogsPage.messages.push(newMessage)
        }
        this._state.dialogsPage.newMessageValue = ''
        this._rerenderEntireTree()
    },
    getState() {
        return this._state
    },

    onNewMessageChange(newValue) {
        this._state.dialogsPage.newMessageValue = newValue
        this._rerenderEntireTree()
    },
    onNewPostChange(newValue) {
        this._state.profilePage.newPostMessage = newValue
        this._rerenderEntireTree()
    },
    addPost () {
        if (this._state.profilePage.newPostMessage.trim()) {
            const newPost: PostType = {
                id: v1(),
                message: this._state.profilePage.newPostMessage,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
        }
        this._state.profilePage.newPostMessage = ''
        this._rerenderEntireTree()
    },
    _rerenderEntireTree () {
        alert('Subscriber is not set')
    },
    _subscribe (observer)  {
        this._rerenderEntireTree = observer
        this._rerenderEntireTree()
    }
}

window.store = store;

export default store;
