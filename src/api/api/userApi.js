import request from "@/api/request";

export function queryPage(data) {
    return request({
        url: '/industry-info/user/queryPage',
        method: 'post',
        data
    })
}
export function create(data) {
    return request({
        url: '/industry-info/user/create',
        method: 'post',
        data
    })
} export function update(data) {
    return request({
        url: '/industry-info/user/update',
        method: 'put',
        data
    })
}