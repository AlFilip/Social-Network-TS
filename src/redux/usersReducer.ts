export type UsersStateType = typeof initState

type UserType = {
    name: string
    id: number
    photos: {
        small: null | string,
        large: null | string
    },
    status: null | string,
    followed: boolean
}

const initState = {
    users: [
        {
            id: 1,
            name: 'Nastya',
            photos: {small: null, large: null},
            status: 'Hey',
            followed: true
        },
        {
            id: 2,
            name: 'Artem',
            photos: {small: null, large: null},
            status: 'DSFSFD',
            followed: true
        },
    ] as Array<UserType>
}

export const users = (state: UsersStateType = initState, action: UsersActionTypes): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {...state, users: state.users.map(m => m.id === action.userId ? {...m, followed: true} : m)}
        case 'UN_FOLLOW':
            return {...state, users: state.users.map(m => m.id === action.userId ? {...m, followed: false} : m)}
        case 'SET_USERS':
            return {users: action.users}
        default:
            return state
    }
}

type UsersActionTypes = followActionType | unFollowActionType | setUsersActionType

export type followActionType = ReturnType<typeof followAC>
export type unFollowActionType = ReturnType<typeof unFollowAC>
export type setUsersActionType = ReturnType<typeof setUsersAC>


export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unFollowAC = (userId: number) => ({type: 'UN_FOLLOW', userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)

