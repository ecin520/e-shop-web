import request from '../utils/request'

export function generateOrder(orderParamDTO) {
    return request({
        url: '/api/order/web/order/generate',
        method: 'POST',
        data: orderParamDTO
    })
}

export function listUserOrders(pageNum, pageSize) {
    return request({
        url: '/api/order/web/order/view/list',
        method: 'GET',
        params: {
            pageNum, pageSize
        }
    })
}

export function getMemberOrderVO(orderId) {
    return request({
        url: '/api/order/web/order/detail/' + orderId,
        method: 'GET'
    })
}
