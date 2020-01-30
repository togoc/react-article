import actionType from '../../actions/article/actionType'
const init = [
    // {    id: 231321,
    // title: '将进酒'}
]

export default (state = init, action) => {
    switch (action.type) {
        case actionType.GET_ARTICLE_LIST:
            if(state !== action.list){
                state = action.list
            }
            return state
        default:
            return state
    }
}