import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Switch, Route} from 'react-router'
import { createBrowserHistory } from 'history'

const store = configureStore()
const history = createBrowserHistory()

const App = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Routes history={history} />
            </ConnectedRouter>
        </Provider>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
