import * as http from '../../../http'
import actionType from './actionType'


export const like = (commentId, uname = 'Han Solo') => dispatch => {
    http.like(commentId, uname).then(res => {
        if (res.status === 200) {
            dispatch({
                type: actionType.ADD_COMMENT_LIKED,
                commentId,
                data: res.data[0]
            })
        }
    }).catch(err => {
        console.log(err)
    })
}
export const dislike = (commentId, uname = 'Han Solo') => dispatch => {
    http.dislike(commentId, uname).then(res => {
        if (res.status === 200) {
            dispatch({
                type: actionType.ADD_COMMENT_LIKED,
                commentId,
                data: res.data[0]
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

export const item_loading = (commentId) => {
    return {
        type: actionType.ADD_COMMENT_DISLIKED,
        commentId
    }
}






export const addArticle = () => {
    return {
        type: actionType.ADD_ARTICLE,
    }
}

//ajax 根据文章id获取评论信息
export const getComments = (articleId) => dispatch => {
        http.getComments(articleId).then(comments => {
            if (comments.status === 200) {
                let state = {
                    loading: false,
                    comments: comments.data
                }
                dispatch({
                    type: actionType.GET_COMMENTS,
                    state
                })
            }
        }).catch(err => console.log(err))
    }
    //ajax 根据文章id 添加评论信息
export const addComment = (articleId, comment) => dispatch => {
    dispatch({
        type: actionType.ADD_COMMENT_LOADING
    })
    http.addComment(articleId, comment).then(comments => {
        if (comments.status === 200) {
            let state = {
                loading: false,
                comments: comments.data
            }
            dispatch({
                type: actionType.ADD_COMMENT,
                state
            })
        }
    })
}

export const commentLoading = () => {
    return {
        type: actionType.ADD_COMMENT_LOADING
    }
}




//ajax
export const getList = (id) => dispatch => {
    http.getList().then(res => {
        if (res.status === 200) {
            dispatch({
                type: actionType.GET_ARTICLE_LIST,
                list: res.data,
                payload: {
                    id
                }
            })
        }
    }).catch(err => {
        console.log(err)
    })

}

//ajax
export const getDetail = (id) => dispatch => {
    http.getDetail(id).then(res => {
        if (res.status === 200) {
            res.data.content = res.data.content.split('\n')
            res.data.translate = res.data.translate.split('\n')
            res.data.reference = res.data.reference.split('\n')
            dispatch({
                type: actionType.GET_ARTICLE_DETAIL,
                state: res.data
            })
        }
    }).catch(err => {
        console.log(err)
    })
}

export const resetDetail = () => {
    return {
        type: actionType.RESET_ARTICLE_DETAIL
    }
}



//ajax 获取people列表
export const getPeopleList = (id) => dispatch => {
    http.getPeopleList().then(res => {
        console.log('getPeopleList', res)
            // if (res.status === 200) {
            //     res.data.content = res.data.content.split('\n')
            //     res.data.translate = res.data.translate.split('\n')
            //     res.data.reference = res.data.reference.split('\n')
            //     dispatch({
            //         type: actionType.GET_ARTICLE_DETAIL,
            //         state: res.data
            //     })
            // }
    }).catch(err => {
        console.log(err)
    })
}