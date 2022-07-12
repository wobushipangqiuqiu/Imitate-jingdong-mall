import axios from 'axios'

// 创建一个axios实例传入baseURL
const instanse = axios.create({
    baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
    timeout: 10000
})

export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        instanse.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}

export const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instanse.get(url, { params }
        ).then((response) => {
            resolve(response.data)
        }, err => {
            reject(err)
        })
    })
}
