import React, { Component } from 'react'

import { HashRouter as Router, Route,Redirect,Switch} from 'react-router-dom'
// # HashRouter
// History BrowserRouter
import NotFound from '../views/NotFound'
import Home from '../views/Home'


export default class index extends Component {
    render() {
        return (
            <Router>
              <Switch>
                  <Route component={NotFound} path='/404'/>
                  <Route component={Home} path='/home'/>
                  <Redirect to='/home/news' from="/" exact/>
                  <Redirect to='/404'/>
              </Switch>
            </Router>
        )
    }
}
