import React, { Component } from 'react'
import { Collapse,Breadcrumb,Spin } from 'antd';

import {  Link} from 'react-router-dom'

import AddComment from './AddComment'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions/article'
import './css/detail.css'
const { Panel } = Collapse;
class NewsDetail extends Component {
    componentDidMount(){
            this.props.getDetail(this.props.match.params.id)
            this.setState({
                lastPage:this.props.location.search.slice(1).split('=')[1]
                },()=>{
                    this.props.getComments(this.props.match.params.id)
                })
    }
    shouldComponentUpdate(props,state){
        return true
    }
    componentWillUnmount(){
        this.props.resetDetail()
        this.props.commentLoading()
    }
    state = {
            lastPage:Number,
            value:'togoc',
            action: null,
            title:'将进酒'
        }
    like = (item,uname='Han Solo') => {
        this.props.like(item._id)
    }
    
    dislike = (item,uname='Han Solo') => {
        this.props.dislike(item._id)
    }
    //查看翻译
    callback(key) {
        // console.log(key);
    }
    addComment = (comment)=>{
        this.props.addComment(this.props.match.params.id,comment)
    }
    render() {
        const people = this.props.location.search.indexOf('people')!==-1
         return (
            <>
                <Breadcrumb style={{ margin: '16px 0',backgroundColor:'#F0F2F5',padding:'14px 5px' }}>
                    <Breadcrumb.Item><Link style={{color:'#63A9E3'}} to={people?'/home/people':'/home/news?page='+this.state.lastPage}>{people?'people':'List'}</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{
                        (!this.props.articleDetail)? <div className="example">
                        <Spin />
                        </div>:this.props.articleDetail.title
                    }</Breadcrumb.Item>
                </Breadcrumb>
                <div className='detail'>
                   { (!this.props.articleDetail) ?
                    <div className="example">
                    <Spin />
                    </div>
                    :
                    <>
                    <h2 style={{fontWeight:'bolder'}}>{this.props.articleDetail.title}</h2>
                    <p>{this.props.articleDetail.author}</p>
                    <Collapse onChange={this.callback}>
                        {
                            this.props.articleDetail.content.map((item,index)=>{
                                return (
                                    <Panel header={item} key={index+1}>
                                        <p>{this.props.articleDetail.translate[index]}</p>
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                    <div style={{marginTop:'14px',color:'#c1c1c1'}}>
                        <p>参考资料:</p>
                        {
                            this.props.articleDetail.reference.map(item => {
                                return <p style={{margin:'5px'}} key={item}>{item}</p>
                            })
                        }
                    </div>
                    <>
                        {
                            <AddComment
                            like={this.like}
                            dislike={this.dislike}
                            comments={this.props.comments.comments||[]}
                            addComment={this.addComment}
                            submitting={this.props.comments.loading?true:false}
                            />
                        }
                    </>
                    </>
                    }
                </div>
            </>
        )
    }
}

//这个state就是在index那里传入的store
const mapState = (state) => {
    return {
        articleDetail:state.articleDetail,
        comments:state.comments
    }
}

//选用 传入方法
// const mapDispatch = dispatch => {
//     return {
//         add: (id) => dispatch(increment(id)),
//         reduce: (id) => dispatch(decrement(id)),
//     }
// }
// export default connect(mapState,mapDispatch)(index)

//选用 传入方法
// export default connect(mapState,{increment,decrement})(index)
export default connect(mapState,{ ...Actions })(NewsDetail)