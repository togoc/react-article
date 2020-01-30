import React, { Component } from 'react'
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'

export default class Add extends Component {
    render() {
        return (
            <>
                <Breadcrumb style={{ margin: '16px 0',backgroundColor:'#F0F2F5',padding:'14px 5px' }}>
                    <Breadcrumb.Item><Link style={{color:'#63A9E3'}} to={'/home/news'}>List</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>add</Breadcrumb.Item>
                </Breadcrumb>
                Add
            </>
        )
    }
}
