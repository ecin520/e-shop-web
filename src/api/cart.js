import request from '../utils/request'

export function insertCartProduct(cartProduct) {
    return request({
        url: '/api/order/web/cart/insert',
        method: 'POST',
        data: cartProduct
    })
}

export function deleteCartProduct(cartProduct) {
    return request({
        url: '/api/order/web/cart/delete',
        method: 'DELETE',
        data: cartProduct
    })
}

export function listCartProducts(queryParam) {
    return request({
        url: '/api/order/web/cart/query',
        method: 'POST',
        data: queryParam
    })
}

export function updateCartProduct(cartProduct) {
    return request({
        url: '/api/order/web/cart/update',
        method: 'PUT',
        data: cartProduct
    })
}