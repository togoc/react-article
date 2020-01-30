import actionType from '../../actions/article/actionType'
const init = {
    comments: [],
    loading: true
}

export default (state = init, action) => {
    switch (action.type) {
        case actionType.GET_COMMENTS:
            state = action.state
            return state
        case actionType.ADD_COMMENT:
            state = action.state
            return state
        case actionType.ADD_COMMENT_LOADING:
            state.loading = true
            let comments = state.comments
            return { loading: true, comments }
        case actionType.RESET_COMMENTS:
            state = init
            console.log(action)
            return state
        case actionType.ADD_COMMENT_LIKED:
            state.comments.map((item, index) => {
                if (action.commentId === item._id) {
                    state.comments[index] = action.data
                }
                return item
            })
            return { loading: false, comments: state.comments }
        case actionType.ADD_COMMENT_DISLIKED:
            state.comments.map((item, index) => {
                if (action.commentId === item._id) {
                    state.comments[index] = action.data
                }
                return item
            })
            return { loading: false, comments: state.comments }
        case actionType.RESET_ARTICLE_DETAIL:
            return { loading: false, comments: [] }
        default:
            return state
    }
}