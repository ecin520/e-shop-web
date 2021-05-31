import request from '../utils/request'

export function confirmReceipt(deliveryNumber, orderId, userId) {
    return request({
        url: '/api/order/web/delivery/confirm',
        method: 'GET',
        params: {
            deliveryNumber, orderId, userId
        }
    })
}