import request from '../utils/request'

export function loginByUsername(username, password) {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('grant_type', 'password');
    data.append('client_id', 'e-shop-client');
    data.append('scope', 'all');
    data.append('client_secret', 'e-shop');
    data.append('client_type', 'USER');
    data.append('login_type', 'username');
    return request({
      url: '/api/auth/oauth/token',
      method: 'POST',
      data: data
    })
}

export function loginByTelephone(telephone, password) {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('telephone', telephone);
    data.append('password', password);
    data.append('grant_type', 'password');
    data.append('client_id', 'e-shop-client');
    data.append('scope', 'all');
    data.append('client_secret', 'e-shop');
    data.append('client_type', 'USER');
    data.append('login_type', 'telephone');
    return request({
        url: '/api/auth/oauth/token',
        method: 'POST',
        data: data
    })
}

export function logout(token) {
  return request({
    url: '/api/auth/oauth/logout',
    method: 'GET',
    params: {
      token: token
    }
  })
}

export function getUser() {
    return request({
      url: '/urp/user/username/nice',
      method: 'GET'
    })
}
