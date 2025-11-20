import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 120000,
    headers: {
        'If-Modified-Since': 0
    }
})

instance.interceptors.response.use(
    res => {
        const result = res.data;
        return [result.data, null, res];
    },
    err => {
        return Promise.reject(err);
    }
)

async function get(url, params, config) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params,
            ...config
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

async function post(url, params, config) {
    return new Promise((resolve, reject) => {
        instance.post(url, params, config).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    post,
    get
}