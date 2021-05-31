import request from '../utils/request'

export function getFlashSaleProductByParam(queryParam) {
    return request({
        url: '/api/sale/web/flash_sale/query',
        method: 'POST',
        data: queryParam
    })
}