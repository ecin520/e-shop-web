import request from '../utils/request'

export function listReceiverAddresses(queryParam) {
    return request({
        url: '/api/order/web/receiver_address/list',
        method: 'POST',
        data: queryParam
    })
}

export function deleteReceiverAddressById(id) {
    return request({
        url: '/api/order/web/receiver_address/delete/' + id,
        method: 'DELETE'
    })
}

export function insertReceiverAddress(receiverAddress) {
    return request({
        url: '/api/order/web/receiver_address/insert',
        method: 'POST',
        data: receiverAddress
    })
}

export function updateReceiverAddress(receiverAddress) {
    return request({
        url: '/api/order/web/receiver_address/update',
        method: 'PUT',
        data: receiverAddress
    })
}