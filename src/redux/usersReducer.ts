import {usersAPI} from "../api/usersApi";
import {AppStateType} from "./redux-store";
import {profileActionsTypes} from "./profileReducer";
import {authActionTypes} from "./authReducer";
import {dialogsActionTypes} from "./diaogsReducer";
import {ThunkAction} from "redux-thunk";

export type UsersStateType = typeof initState

export type UserType = {
    id: number
    name: string
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean
}

const initState = {
    items: [] as Array<UserType>,
    totalItemsCount: 0,
    currentPage: 1,
    pageSize: 10,
    totalPagesCount: 1,
    isFetching: false,
}

const usersReducer = (state: UsersStateType = initState, action: usersActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, items: state.items.map(m => m.id === action.userId ? {...m, followed: true} : m)}
        case 'UN_FOLLOW':
            return {...state, items: state.items.map(m => m.id === action.userId ? {...m, followed: false} : m)}
        case 'SET_USERS':
            return {
                ...state,
                items: [...action.items],
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.pageNumber
            }
        case "SET_TOTAL_ITEMS_COUNT":
            return {
                ...state,
                totalItemsCount: action.totalItemsCount,
                totalPagesCount: Math.ceil(action.totalItemsCount / state.pageSize)
            }
        case "SET_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export type usersActionTypes =
    followActionType
    | unFollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalItemsCountActionType
    | setIsFetchingActionType

export type allActionsType = usersActionTypes | profileActionsTypes | dialogsActionTypes | authActionTypes

export type followActionType = ReturnType<typeof followAC>
export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type setTotalItemsCountActionType = ReturnType<typeof setTotalItemsCount>
export type setIsFetchingActionType = ReturnType<typeof setIsFetching>

export type thunkType = ThunkAction<any, AppStateType, any, allActionsType>

export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)

export const unFollowAC = (userId: number) => ({type: 'UN_FOLLOW', userId} as const)

export const setUsersAC = (items: Array<UserType>) => ({
    type: 'SET_USERS',
    items
} as const)

export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const)

export const setTotalItemsCount = (totalItemsCount: number) => ({
    type: 'SET_TOTAL_ITEMS_COUNT',
    totalItemsCount
} as const)

export const setIsFetching = (isFetching: boolean) => ({
    type: 'SET_IS_FETCHING',
    isFetching
} as const)

export const followTC = (userId: number): thunkType => async (dispatch) => {
    const isSuccess = await usersAPI.follow(userId)
    isSuccess
    && dispatch(followAC(userId))
}

export const unFollowTC = (userId: number): thunkType => async (dispatch) => {
    const isSuccess = await usersAPI.unFollow(userId)
    isSuccess
    && dispatch(unFollowAC(userId))
}

export const getUsersTC = (currentPage: number): thunkType => async (dispatch) => {
    dispatch(setIsFetching(true))
    const data = await usersAPI.getUsers(currentPage)
    if (data) {
        const {items, totalCount} = data
        dispatch(setUsersAC(items))
        dispatch(setTotalItemsCount(totalCount))
    }
    dispatch(setIsFetching(false))
}


export default usersReducer