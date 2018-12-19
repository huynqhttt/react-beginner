import React, { Component } from 'react'
import { Router, Route } from 'react-router'
import Home from '../components/Home'

class Routes extends Component {

    render() {
        let { history } = this.props
        return (
            <Router history={history}>
                <Route path='/' component={Home}>
                </Route>
            </Router>
        )
    }
}

export default Routes
