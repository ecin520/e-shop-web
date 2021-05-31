import axios from 'axios'
import { getToken, setToken } from './auth'
import router from "../router";
import store from "../store";

const service = axios.create({
    baseURL: 'http://127.0.0.1:10010',
    timeout: 18000
});

service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['Authorization'] = 'Bearer ' + getToken();
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error).then(r => console.log(r))
})

service.interceptors.response.use(response => {
    if (response.data.code === 4003 || response.data.code === 4000) {
        store.dispatch('logout')
        router.go(0)
        // router.push({path: '/'})
    }
    return response.data
}, error => {
    console.log(error);
    return Promise.reject(error)
})

export default service