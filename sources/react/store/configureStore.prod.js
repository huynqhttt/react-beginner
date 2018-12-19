import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import promise from 'redux-promise'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'

const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    return createStore (
        createRootReducer(history),
        preloadedState,
        applyMiddleware(routerMiddleware(history), thunk, promise)
    )
}
