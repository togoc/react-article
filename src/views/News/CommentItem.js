import { Comment, Icon, Tooltip,Spin } from 'antd';
import moment from 'moment';
import React from 'react'
export default  class App extends React.Component {
  shouldComponentUpdate(nextProps,nextState){
      return( (nextProps.props._id !== this.props.props._id)||
      (nextProps.props.likes!==this.props.props.likes)||
      (nextProps.props.dislikes!==this.props.props.dislikes)||
      (nextState.loading!==this.state.loading)
      )
  }
  state = {
    loading:false
  }
  like = (props) =>{
    this.setState({
      loading:true
    },()=>{
      if(props.likes.indexOf('Han Solo')===-1){
        this.props.like(props)
      }else{
        this.setState({
          loading:false
        })
      }
    })
  }
  dislike = (props) =>{
    this.setState({
      loading:true
    },()=>{
      if(props.dislikes.indexOf('Han Solo')===-1){
        this.props.dislike(props)
      }else{
        this.setState({
          loading:false
        })
      }
    })
  }
  UNSAFE_componentWillReceiveProps(nextProps){
    if(!nextProps.loading){
      this.setState({
        loading:false
      })
    }
  }
  render() {
    const {props} = this.props
    return (
        <>
           {  
           this.state.loading ?
             <Spin className='loading' delay={200}/>:<></>
           }
           <Comment 
          author= {props.author}
          avatar= {props.avatar}
          content= {<p>{props.content}</p>}
          datetime= {moment(props.datetime).fromNow()}
          actions = {[
            <span key="comment-basic-like">
              <Tooltip title="Like">
                <Icon
                  type="like"
                  theme={props.likes.indexOf('Han Solo') !== -1 ? 'filled' : 'outlined'}
                  onClick={ () =>this.like(props)}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.likes.length}</span>
            </span>,
            <span key=' key="comment-basic-dislike"'>
              <Tooltip title="Dislike">
                <Icon
                  type="dislike"
                  theme={props.dislikes.indexOf('Han Solo') !== -1 ? 'filled' : 'outlined'}
                  onClick={ () =>this.dislike(props)}
                />
              </Tooltip>
              <span style={{ paddingLeft: 8, cursor: 'auto' }}>{props.dislikes.length}</span>
            </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
          ]}
          />
        </>

    );
  }
}

