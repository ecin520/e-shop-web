import request from '../utils/request'

export function pay(alipayDTO) {
    return request({
        url: '/api/order/web/order/pay',
        method: 'POST',
        data: alipayDTO
    })
}