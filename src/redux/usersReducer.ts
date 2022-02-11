import { getUsersParamsType, resultCodes, usersAPI } from "../api/usersApi"
import { ThunkType } from "./redux-store"


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
    term: '',
    friend: undefined as boolean | undefined,
    // isFetching: false,
}

const usersReducer = (state: UsersStateType = initState, action: UsersActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return { ...state, items: state.items.map( m => m.id === action.userId ? { ...m, followed: true } : m ) }
        case 'UN_FOLLOW':
            return { ...state, items: state.items.map( m => m.id === action.userId ? { ...m, followed: false } : m ) }
        case 'SET_USERS':
            return {
                ...state,
                items: [...action.items],
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.pageNumber,
            }
        case 'SET_TOTAL_ITEMS_COUNT':
            return {
                ...state,
                totalItemsCount: action.totalItemsCount,
                totalPagesCount: Math.ceil( action.totalItemsCount / state.pageSize ),
            }
        case 'SET_SEARCH_PARAMS':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export type UsersActionTypes =
    followActionType
    | unFollowActionType
    | setUsersActionType
    | setCurrentPageActionType
    | setTotalItemsCountActionType
    | setTermActionType

export type followActionType = ReturnType<typeof followAC>
export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>
export type setCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
export type setTotalItemsCountActionType = ReturnType<typeof setTotalItemsCount>
export type setTermActionType = ReturnType<typeof setSearchParams>

export const followAC = (userId: number) => ( { type: 'FOLLOW', userId } as const )

export const unFollowAC = (userId: number) => ( { type: 'UN_FOLLOW', userId } as const )

export const setUsersAC = (items: Array<UserType>) => ( {
    type: 'SET_USERS',
    items,
} as const )

export const setCurrentPageAC = (pageNumber: number) => ( { type: 'SET_CURRENT_PAGE', pageNumber } as const )

export const setTotalItemsCount = (totalItemsCount: number) => ( {
    type: 'SET_TOTAL_ITEMS_COUNT',
    totalItemsCount,
} as const )

export const setSearchParams = (payload: { term?: string, friend?: boolean, currentPage?: number }) => ( {
    type: 'SET_SEARCH_PARAMS',
    payload,
} as const )

export const follow = (userId: number): ThunkType => async (dispatch) => {
    try {
        const { status, data: { resultCode, messages } } = await usersAPI.follow( userId )
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( followAC( userId ) )
        } else if (messages[0]) {
            console.log( messages[0] )
        }
    } catch (e) {
        console.log( e )
    }
}

export const unFollow = (userId: number): ThunkType => async (dispatch) => {
    try {
        const { status, data: { resultCode, messages } } = await usersAPI.unFollow( userId )
        if (status === 200 && resultCode === resultCodes.SUCCESS) {
            dispatch( unFollowAC( userId ) )
            return 'OK'
        } else if (messages[0]) console.log( messages[0] )
    } catch (e) {
        console.log( e )
    }
}

export const getUsers = (payload?: getUsersParamsType): ThunkType => async (dispatch, getState) => {
    try {
        const { currentPage, friend, pageSize, term } = getState().users
        const { data, status } = await usersAPI.getUsers( {
            page: currentPage,
            count: pageSize,
            friend,
            term,
            ...payload,
        } )
        if (status === 200 && data) {
            const { items, totalCount } = data
            dispatch( setTotalItemsCount( totalCount ) )
            dispatch( setUsersAC( items ) )
        }
    } catch (e) {
        console.log( e )
    }
}


export default usersReducer