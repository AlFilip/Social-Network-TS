import {getUsersParamsType, resultCodes, usersAPI} from "../api/usersApi"
import {ThunkType} from "./redux-store"
import {UserType} from "./usersReducer";


export type UsersStateType = typeof initState


const initState = {
    items: [] as Array<UserType>,
    totalItemsCount: 0,
    currentPage: 1,
    pageSize: 10,
    totalPagesCount: 1,
    term: '',
    friend: undefined as boolean | undefined,
    // isFetching: false,
}

const friendsReducer = (state: UsersStateType = initState, action: FriendsActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FRIENDS/UN_FOLLOW':
            return {...state, items: state.items.map(m => m.id === action.userId ? {...m, followed: false} : m)}
        case 'FRIENDS/SET_USERS':
            return {
                ...state,
                items: [...action.items],
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber,
            }
        case 'FRIENDS/SET_TOTAL_ITEMS_COUNT':
            return {
                ...state,
                totalItemsCount: action.totalItemsCount,
                totalPagesCount: Math.ceil(action.totalItemsCount / state.pageSize),
            }
        case 'FRIENDS/SET_SEARCH_PARAMS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type FriendsActionTypes =
    unFollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalItemsCountActionType
    | setTermActionType

export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type setTotalItemsCountActionType = ReturnType<typeof setTotalItemsCount>
export type setTermActionType = ReturnType<typeof setSearchParams>

export const unFollowAC = (userId: number) => ({type: 'FRIENDS/UN_FOLLOW', userId} as const)

export const setUsersAC = (items: Array<UserType>) => ({
    type: 'FRIENDS/SET_USERS',
    items,
} as const)

export const setCurrentPageAC = (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const)

export const setTotalItemsCount = (totalItemsCount: number) => ({
    type: 'FRIENDS/SET_TOTAL_ITEMS_COUNT',
    totalItemsCount,
} as const)

export const setSearchParams = (payload: { term?: string, friend?: boolean, currentPage?: number }) => ({
    type: 'FRIENDS/SET_SEARCH_PARAMS',
    payload,
} as const)

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    try {
        const {status, data: {resultCode, messages}} = await usersAPI.unFollow(userId)
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch(unFollowAC(userId))
            return 'OK'
        } else if (messages[0]) console.log(messages[0])
    } catch (e) {
        console.log(e)
    }
}

export const getFriends = (payload?: getUsersParamsType): ThunkType => async (dispatch, getState) => {
    try {
        const {currentPage, friend, pageSize, term} = getState().users
        const {data, status} = await usersAPI.getUsers({
            page: currentPage,
            count: pageSize,
            friend: true,
            term,
            ...payload,
        })
        if (status === 200 && data) {
            const {items, totalCount} = data
            dispatch(setTotalItemsCount(totalCount))
            dispatch(setUsersAC(items))
        }
    } catch (e) {
        console.log(e)
    }
}


export default friendsReducer