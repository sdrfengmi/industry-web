import request from "@/api/request";

export function queryForPage(params) {
    return request({
        url: 'api/baseDict/queryForPage',
        method: 'get',
        params
    })
}