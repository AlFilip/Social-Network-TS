import { v1 } from 'uuid'
import profileReducer, { addPost, PostType, profileStateType, profileType } from './profileReducer'

// let startState: profileStateType = {
//     posts: [
//         { id: v1(), message: 'Hi man', likesCount: 50 },
//         { id: v1(), message: 'How are you', likesCount: 150 },
//     ] as Array<PostType>,
//     newPostMessage: '',
//     currentProfile: null as profileType,
//     status: '',
// }

let startState: profileStateType

beforeEach(() =>{
    let startState: profileStateType = {
        posts: [
            { id: v1(), message: 'Hi man', likesCount: 50 },
            { id: v1(), message: 'How are you', likesCount: 150 },
        ] as Array<PostType>,
        newPostMessage: '',
        currentProfile: null as profileType,
        status: '',
    }
})
test( 'adding new post', () => {

    const newMessage = 'new post message'

    startState.newPostMessage = newMessage
    const action = addPost()

    const resultState = profileReducer( startState, action )
    expect( startState ).not.toEqual( resultState )
    expect( startState ).not.toBe( resultState )
    expect( resultState.newPostMessage ).toBe( '' )
    expect( startState.currentProfile ).toBe( resultState.currentProfile )
    expect( startState.status ).toBe( resultState.status )
    expect( startState.posts ).not.toBe( resultState.posts )
    expect( startState.posts ).not.toEqual( resultState.posts.slice(-1) )
} )