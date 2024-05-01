import request from "@/api/request";

export function queryForPage(params) {
    return request({
        url: '/api/baseDict/queryForPage',
        method: 'get',
        params
    })
}
export function create(data) {
    return request({
        url: '/api/baseDict/queryForPage',
        method: 'post',
        data
    })
} export function update(data) {
    return request({
        url: '/api/baseDict/queryForPage',
        method: 'post',
        data
    })
}