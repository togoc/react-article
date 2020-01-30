import axios from 'axios'
import apis from './apis'

const ajax = axios.create({
    baseURL: apis.baseURL,
})


export const getList = () => {
    return ajax.get(apis.list)
}


export const getDetail = (id) => {
    return ajax.get(apis.detail + id)
}
export const getComments = (id) => {
    return ajax.get(apis.comment + id)
}
export const getPeopleList = () => {
    return ajax.get(apis.people)
}

export const addComment = (id, comment) => {
    return ajax.post(apis.addcomment + id, comment)
}

export const like = (id, name) => {
    return ajax.get(apis.like + id+'?uname='+name)
}

export const dislike = (id, name) => {
    return ajax.get(apis.dislike + id+'?uname='+name)
}