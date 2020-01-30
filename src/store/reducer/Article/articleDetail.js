import actionType from '../../actions/article/actionType'
const init = null

export default (state = init, action) => {
    switch (action.type) {
        case actionType.GET_ARTICLE_DETAIL:
            state = action.state
            return state
        case actionType.RESET_ARTICLE_DETAIL:
            state = null
            return state
        default:
            return state
    }
}