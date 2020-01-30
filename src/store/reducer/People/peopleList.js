import actionType from '../../actions/people/actionType'
const init = [{
    name: '李白',
    age: '唐代:李白',
    content: [
        { title: '', _id: '' }
    ]
}]

export default (state = init, action) => {
    switch (action.type) {
        case actionType.GET_PEOPLE_LIST:
            state = action.state
            return state
        default:
            return state
    }
}