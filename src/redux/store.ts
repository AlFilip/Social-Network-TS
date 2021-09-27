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
    profile: ProfilePageType
    dialogs: DialogsPageType
}

export type StoreType = {
    state?: StateType
    getState: () => StateType
    callSubscriber?: () => void
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionTypes) => void
}

export type ActionTypes = AddPostActionType | AddMessageActionType | OnMessageChangeActionType | OnPostChangeActionType

export type AddPostActionType = { type: 'ADD-POST' }
export type AddMessageActionType = { type: "ADD-MESSAGE" }
export type OnMessageChangeActionType = {
    type: "ON-MESSAGE-CHANGE"
    newValue: string
}
export type OnPostChangeActionType = {
    type: "ON-POST-CHANGE"
    newValue: string
}


// const store: StoreType = {
//     _state: {
//         profilePage: {
//             posts: [
//                 {id: v1(), message: 'Hi man', likesCount: 50},
//                 {id: v1(), message: 'How are you', likesCount: 150}
//             ],
//             newPostMessage: '',
//         },
//         dialogsPage: {
//             dialogs: [
//                 {name: "Sergey", id: 1},
//                 {name: "Artem", id: 2},
//                 {name: "Nikolay", id: 3},
//             ],
//             messages: [
//                 {id: v1(), text: 'Здорово, корова', owner: false},
//                 {id: v1(), text: 'Здорово, сама', owner: true},
//             ],
//             newMessageValue: '',
//         },
//     },
//     getState() {
//         return this._state
//     },
//     _callSubscriber() {
//         alert('Subscriber is not set')
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer
//         this._callSubscriber()
//     },
//     dispatch(action) {
//         this._state.profilePage = profile(this.getState().profilePage, action)
//         this._state.dialogsPage = dialogs(this.getState().dialogsPage, action)
//
//         this._callSubscriber()
//
//     }
// }

// window.store = store;
//
// export default store;
