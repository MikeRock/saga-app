import React, {Component} from 'react'
import {applyMiddleware, createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import ReactDOM from 'react-dom'
import saga from './sagas/rootSaga'

class App extends Component {
    constructor(props){
        super(props)
        this.changeName = this.changeName.bind(this)
    }
    changeName(name) {
        this.props.dispatch({type:"CHANGE",payload:{name: name}})
    }

    render() {
        return (
        <div>
        <button onClick={() =>{this.changeName('Bill')}}>Click</button>    
        {this.props.name} 
        </div>
        )
    }
}
const rootReducer = (state={name:'Mike'}, action) => {
    switch(action.type)
    {
        case 'CHANGE': return Object.assign({},...state,{name: action.payload.name})
        case 'SAGA_CHANGE': return Object.assign({},...state,{name: action.payload.name})
        default: return state
    }
}
const sagaMiddleware = createSagaMiddleware()
App = connect((state,props) => ({name: state.name}),(dispatch) => ({dispatch:dispatch}))(App)
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(saga)

ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('app'))