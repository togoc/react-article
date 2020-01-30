import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Pagination,Spin } from 'antd'
import ListItem from './ListItem'
import './css/iconfont.css'
import './css/list.css'



export default class NewsList extends Component {
    onChange = (page, pageSize) =>{
        this.setState({
            page
        },()=>{
            this.paging()
        })
    }
    state = {
        currentPage:[],
        pageSize:8,
        page:1

    }
    paging =()=>{
        this.setState({
            currentPage:this.props.list.map((item,index)=>{
                if((this.state.page-1)*this.state.pageSize<=index&&index<(this.state.page)*this.state.pageSize){
                    return item
                }
            })
        })
        
    }
    reload(){
        if(this.props.location.search){
            this.onChange(Number(this.props.location.search.split('=')[1]), 30)
        }else{
            this.onChange(1,1)
        }
    }
    shouldComponentUpdate(nextProps,nexState){
         return (nexState.currentPage !==this.state.currentPage)
    }
    UNSAFE_componentWillReceiveProps(){
        this.reload()
    }
    componentDidMount(){
        this.reload()//无法判断是不是通过后退触发的
    }
    render() {
        return (
            <>  
                <p>NewsList</p>
                <Link to='/home/add'>Add</Link>
                <div className='list'>
                    {   
                        this.props.list.length === 0
                        ?
                        <div className='example'>
                            <Spin />
                        </div>
                        :
                        this.state.currentPage.map((item,index)=>{
                            if(item)
                            return (
                                <li key={item+index} className='list-item' style={{}}>
                                    <span className='poin' style={{fontFamily:'iconfont',fontWeight:'bold'}}>&#xec1e;</span>
                                    <ListItem
                                        className='link'
                                        style={{color:'#63A0D8'}} to={'/home/news/'+item._id+'?page='+this.state.page}
                                    >
                                        {item.title}
                                    </ListItem>
                                </li>
                            )
                        })
                    }
                </div>
                <div className='pagination'>
                    <Pagination 
                        current={this.state.page}      //当前页
                        pageSize={this.state.pageSize} //每页条数
                        total={this.props.list.length} //数据总数
                        onChange={this.onChange}
                        defaultCurrent={1}
                    />
                </div>
            </>
        )
    }
}

