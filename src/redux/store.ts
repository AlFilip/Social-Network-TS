import {v1} from "uuid";

export const ADD_POST = 'ADD-POST';
export const ADD_MESSAGE = "ADD-MESSAGE";
export const ON_MESSAGE_CHANGE = "ON-MESSAGE-CHANGE";
export const ON_POST_CHANGE = "ON-POST-CHANGE";

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
    _callSubscriber: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | AddMessageActionType | OnMessageChangeActionType | OnPostChangeActionType

type AddPostActionType = { type: 'ADD-POST' }
type AddMessageActionType = { type: "ADD-MESSAGE" }
type OnMessageChangeActionType = {
    type: "ON-MESSAGE-CHANGE"
    newValue: string
}
type OnPostChangeActionType = {
    type: "ON-POST-CHANGE"
    newValue: string
}

export const AddPostAC = (): AddPostActionType => ({type: ADD_POST})
export const AddMessageAC = (): AddMessageActionType => ({type: ADD_MESSAGE})
export const OnMessageChangeAC = (newValue: string): OnMessageChangeActionType => ({type: ON_MESSAGE_CHANGE, newValue})
export const OnPostChangeAC = (newValue: string): OnPostChangeActionType => ({type: ON_POST_CHANGE, newValue})

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
    getState() {
        return this._state
    },
    _callSubscriber() {
        alert('Subscriber is not set')
    },
    subscribe(observer) {
        this._callSubscriber = observer
        this._callSubscriber()
    },
    dispatch(action) {
        switch (action.type) {
            case ADD_POST:
                if (this._state.profilePage.newPostMessage.trim()) {
                    const newPost: PostType = {
                        id: v1(),
                        message: this._state.profilePage.newPostMessage,
                        likesCount: 0
                    }
                    this._state.profilePage.posts.push(newPost)
                }
                this._state.profilePage.newPostMessage = ''
                this._callSubscriber()
                break
            case ADD_MESSAGE:
                if (this._state.dialogsPage.newMessageValue.trim()) {
                    const newMessage: MessageType = {
                        id: v1(),
                        text: this._state.dialogsPage.newMessageValue,
                        owner: true
                    }
                    this._state.dialogsPage.messages.push(newMessage)
                }
                this._state.dialogsPage.newMessageValue = ''
                this._callSubscriber()
                break
            case ON_MESSAGE_CHANGE:
                this._state.dialogsPage.newMessageValue = action.newValue
                this._callSubscriber()
                break
            case ON_POST_CHANGE:
                this._state.profilePage.newPostMessage = action.newValue
                this._callSubscriber()
        }
    }
}

window.store = store;

export default store;
