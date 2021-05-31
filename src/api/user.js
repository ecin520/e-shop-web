import request from '../utils/request'

export function getUserByUsername(username) {
    return request({
        url: '/api/urp/web/user/' + username,
        method: 'GET'
    })
}

