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
    totalItemsCount: 0 as number,
    currentPage: 1 as number,
    pageSize: 10 as number,
    totalPagesCount: 1 as number,
}

export const users = (state: UsersStateType = initState, action: UsersActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, items: state.items.map(m => m.id === action.userId ? {...m, followed: true} : m)}
        case 'UN_FOLLOW':
            return {...state, items: state.items.map(m => m.id === action.userId ? {...m, followed: false} : m)}
        case 'SET_USERS':
            return {
                ...state,
                items: [...action.items],
                totalItemsCount: action.totalItemsCount,
                totalPagesCount: Math.ceil(action.totalItemsCount / state.pageSize)
            }
        case "SET_CURRENT_PAGE":
            debugger
            return {
                ...state,
                currentPage: action.pageNumber
            }
        default:
            return state
    }
}

export type UsersActionTypes = followActionType | unFollowActionType | setUsersActionType | setCurrentPageType

export type followActionType = ReturnType<typeof followAC>
export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>
export type setCurrentPageType = ReturnType<typeof setCurrentPage>


export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unFollowAC = (userId: number) => ({type: 'UN_FOLLOW', userId} as const)
export const setUsersAC = (items: Array<UserType>, totalItemsCount: number) => ({
    type: 'SET_USERS',
    items,
    totalItemsCount
} as const)

export const setCurrentPage = (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const)
