import React from 'react'
import { UserCard } from './components/Users/UserCard/UserCard'
import { Provider } from 'react-redux'
import { store } from './redux/redux-store'
import { BrowserRouter } from 'react-router-dom'


const TestRenderer = require( 'react-test-renderer' ) // ES5 with npm


describe( 'component test', () => {
    it( 'should render without crash ', () => {
        const testRenderer = TestRenderer.create( <Provider store={ store }><BrowserRouter><UserCard id={ 213 }
                                                                                                     name={ 'asd' }
                                                                                                     photos={ {
                                                                                                         small: null,
                                                                                                         large: null,
                                                                                                     } }
                                                                                                     status={ 'statu' }
                                                                                                     followed={ false }/></BrowserRouter></Provider> )
        const inst = testRenderer.getInstance()
        const testInstance = testRenderer.root
        const button = testInstance.findByType( 'button' )
        button.props.onClick
        expect(button.props.children).toBe('Follow')

        // console.log(button)
        const divs = testInstance.findAllByType('div').filter(f => f.props.children.includes('status: '))
        console.log(divs[0].props.children)
        // const instance = component.getInstance()
        // expect( instance.state.name ).toBe( 'asd' )
    } )
} )

// function MyComponent() {
//     return (
//         <div>
//             <SubComponent foo="bar" />
//             <p className="my">Hello</p>
//         </div>
//     )
// }
//
// function SubComponent() {
//     return (
//         <p className="sub">Sub</p>
//     );
// }
//
// const testRenderer = TestRenderer.create(<MyComponent />);
// const testInstance = testRenderer.root;
//
// expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
// expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);