type stateType = {
    id: number | null
    login: string | null
    email: string | null
}

const initState: stateType = {
    id: null,
    login: null,
    email: null,
}


const authReducer = (state = initState, action: authActionTypes): stateType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state

    }
}

type authActionTypes = setUserDataActionType
type setUserDataActionType = ReturnType<typeof setUserData>

const setUserData = (payload: stateType) => ({
    type: 'SET_USER_DATA',
    payload
} as const)

export default authReducer