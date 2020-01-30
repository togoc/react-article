import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class ListItem extends Component {
    shouldComponentUpdate(nextProps,nexState){
        return (nextProps.children !== this.props.children)
   }
    render() {
        return (
            <Link {...this.props}>{this.props.children}</Link>
        )
    }
}
