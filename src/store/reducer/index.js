import { combineReducers } from 'redux'
import articleDetail from './Article/articleDetail'
import articleList from './Article/articleList'
import peopleList from './People/peopleList'
import comments from './Article/comments'

//处理多个Reducers
export default combineReducers({
    articleList,
    articleDetail,
    peopleList,
    comments,
})