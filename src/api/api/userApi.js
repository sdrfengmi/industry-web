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
}

export function update(data) {
    return request({
        url: '/industry-info/user/update',
        method: 'put',
        data
    })
}

export async function queryDictionaryList(params) {
    const response = await request({
        url: '/industry-info/indDictionary/queryAll',
        method: 'get',
        params
    })
    console.log(response);
    return response.data;
}
export async function queryCityList(data) {
    const response = await request({
        url: '/industry-info/indCity/queryList',
        method: 'post',
        data
    })
    console.log(response);

    // 使用 map 方法转换数组
    const result = response.data.map(city => {
        return {
            label: city.cityName, // 将 city_name 转换为 label
            value: city.cityName,       // 将 id 转换为 value
        };
    });
    return result;
}