import * as http from '../../../http'
import actionType from './actionType'

// ({
//     name: '李白',
//     age: '唐代',
//     content: [
//         { title: '', _id: '' }
//     ]
// })

//ajax 获取people列表
export const getPeopleList = (id) => dispatch => {
    http.getPeopleList().then(res => {
        let author = []
        let list = []
        res.data.map((item) => {
            let content = []
            let obj = {}
            let content_item = {}
            if (author.indexOf(item.author) === -1) {
                let age_name = item.author.replace(/\s+/g, '').split('：')
                obj.name = age_name[1]
                obj.age = age_name[0]
                obj.key = item.author
                content_item._id = item._id
                content_item.title = item.title.replace(/\s+/g, '')
                content.push(content_item)
                obj.content = content
                list.push(obj)
                author.push(item.author)
            } else {
                list.map((aitem) => {
                    if ((aitem.age + '：' + aitem.name) === item.author) {
                        content_item._id = item._id
                        content_item.title = item.title.replace(/\s+/g, '')
                        aitem.content.push(content_item)
                    }
                    return aitem
                })
            }
        })
        if (res.status === 200) {
            dispatch({
                type: actionType.GET_PEOPLE_LIST,
                state: list
            })
        }
    }).catch(err => {
        console.log(err)
    })
}