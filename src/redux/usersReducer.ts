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
    users: [] as Array<UserType>
}

export const users = (state: UsersStateType = initState, action: UsersActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(m => m.id === action.userId ? {...m, followed: true} : m)}
        case 'UN_FOLLOW':
            return {...state, users: state.users.map(m => m.id === action.userId ? {...m, followed: false} : m)}
        case 'SET_USERS':
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state
    }
}

export type UsersActionTypes = followActionType | unFollowActionType | setUsersActionType

export type followActionType = ReturnType<typeof followAC>
export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>


export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unFollowAC = (userId: number) => ({type: 'UN_FOLLOW', userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)

