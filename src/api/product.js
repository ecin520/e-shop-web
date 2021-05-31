import request from '../utils/request'

export function listFlashSaleProducts(queryParam) {
    return request({
        url: '/api/product/web/product/flash_sale/list',
        method: 'POST',
        data: queryParam
    })
}

export function listNewProducts(pageNum, pageSize) {
    return request({
        url: '/api/product/web/product/new/list',
        method: 'GET',
        params: {
            pageNum,pageSize
        }
    })
}

export function listRecommendProducts(pageNum, pageSize) {
    return request({
        url: '/api/product/web/product/recommend/list',
        method: 'GET',
        params: {
            pageNum,pageSize
        }
    })
}

export function listCarouselProducts() {
    return request({
        url: '/api/product/web/product/carousel/list',
        method: 'GET'
    })
}

export function getProductWebVO(queryParam) {
    return request({
        url: '/api/product/web/product/view/query',
        method: 'POST',
        data: queryParam
    })
}

export function getShopByParam(queryParam) {
    return request({
        url: '/api/product/web/shop/query',
        method: 'POST',
        data: queryParam
    })
}

export function getSkuProductByParam(productId, specDetailIds) {
    return request({
        url: '/api/product/web/product/sku/' + productId,
        method: 'POST',
        data: specDetailIds
    })
}

export function getSkuProductById(id) {
    return request({
        url: '/api/product/web/product/sku/' + id,
        method: 'GET'
    })
}

export function getProductByParam(queryParam) {
    return request({
        url: '/api/product/web/product/query',
        method: 'POST',
        data: queryParam
    })
}