import React, { Component } from 'react'

import { Comment, Avatar, Form, Button, List, Input,Spin} from 'antd';
import CommentItem from './CommentItem'
const { TextArea } = Input;

class  CommentList extends Component{
  shouldComponentUpdate(nextProps,nextState){
    return true
  }
  render() {
      const {comments,like,dislike,loading} =this.props
      return(
        <List
        dataSource={comments}
        header={
          <h3>评论:</h3>
        }
        itemLayout="horizontal"
        renderItem={props => {
          return <CommentItem 
          loading={loading}
          props = {props}
          like = {like}
          dislike = {dislike}
          />
        }}
      />

      )
  }
}

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </div>
);



export default  class App extends React.Component {
  state = {
    comments: [],
    value: '',
  };
  shouldComponentUpdate(nextProps,nextState){
    return true
  }
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }
      const conment = {
        uid:Math.random(),
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: this.state.value,
      }
      this.props.addComment(conment)
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
  componentDidMount(){
  }
  render() {
    const { value } = this.state;
    const { comments,submitting } = this.props;
    return (
      <>
        {
        comments.length > 0 ? 
              <CommentList  
                loading={submitting}
                comments={comments}
                action={this.props.action}
                like={this.props.like} 
                dislike={this.props.dislike}
              />
            :
            <div
            style={{
              borderBottom:'1px solid #ccc',
              paddingTop:'14px',
              paddingBottom:'14px'
            }}
            ></div>
        }
        
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={this.props.submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

