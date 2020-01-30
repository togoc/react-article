import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import NewsDetail from './NewsDetail'
import NewsList from './NewsList'

import { connect } from 'react-redux'
import * as Actions from '../../store/actions/article'

class News extends Component {
    componentDidMount() {
        this.props.getList()
    }
    render() {
        const { list } = this.props
        return (
            <div>
                <Router>
                    <Switch>
                        <Route
                            render={(props) =>
                                <NewsList {...props} list={list} {...Actions} />
                            }
                            path='/home/news' exact />
                        <Route component={NewsDetail} path='/home/news/:id' />
                    </Switch>
                </Router>
            </div>
        )
    }
}
const mapState = (state) => {
    return {
        list: state.articleList
    }
}
export default connect(mapState, { ...Actions })(News)
