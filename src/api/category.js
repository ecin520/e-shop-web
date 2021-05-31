import request from '../utils/request'

export function listProductCategories() {
    return request({
        url: '/api/product/web/category/list',
        method: 'GET'
    })
}

export function listRecommendCategories(pageNum, pageSize) {
    return request({
        url: '/api/product/web/category/recommend/list',
        method: 'GET',
        params: {
            pageNum, pageSize
        }
    })
}

export function listSpecVOsByCategoryDetailAndProductId(categoryDetailId, productId) {
    return request({
        url: '/api/product/web/category_spec/view/list/by/category_detail_product',
        method: 'GET',
        params: {
            categoryDetailId, productId
        }
    })
}