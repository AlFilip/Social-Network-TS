import { AppStateType } from './redux-store'


// auth
export const selectIsAuth = (state: AppStateType) => state.auth.isAuth

export const selectIsUserLogin = (state: AppStateType) => state.auth.login

export const selectAuthorisedUserId = (state: AppStateType) => state.auth.id

export const selectCaptcha = (state: AppStateType) => state.auth.captcha

export const selectAuthError = (state: AppStateType) => state.auth.error


// app
export const selectIsInitialised = (state: AppStateType) => state.app.isInitSuccess


// users
export const selectItems = (state: AppStateType) => state.users.items

export const selectCurrentPage = (state: AppStateType) => state.users.currentPage

export const selectTotalPagesCount = (state: AppStateType) => state.users.totalPagesCount

export const selectUsersSearchTerm = (state: AppStateType) => state.users.term

export const selectUsersSearchFriend = (state: AppStateType) => state.users.friend


// profile
export const selectCurrentProfile = (state: AppStateType) => state.profile.currentProfile

export const selectStatus = (state: AppStateType) => state.profile.status

export const selectCurrentProfileUserId = (state: AppStateType) => state.profile.currentProfile?.userId

export const selectNewPostMessage = (state: AppStateType) => state.profile.newPostMessage

export const selectPosts = (state: AppStateType) => state.profile.posts

export const selectAdditionalUserInfo = (state: AppStateType) => state.profile.additionalUserInfo


// dialogs
export const selectDialogs = (state: AppStateType) => state.dialogs.dialogs

export const selectMessages = (state: AppStateType) => state.dialogs.messages

export const selectNewMessageValue = (state: AppStateType) => state.dialogs.newMessageValue
