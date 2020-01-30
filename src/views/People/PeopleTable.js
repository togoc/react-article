import React, { Component } from 'react'
import { Table } from 'antd';

export default class PeopleTable extends Component {
    render() {
        const {columns,dataSource} = this.props
        return (
            <div>
                <Table  columns={columns} dataSource={dataSource} />
            </div>
            )
    }
}
