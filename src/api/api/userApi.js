import request from "@/api/request";

// data,和 params 区别
export function queryPage(data) {
    return request({
        url: '/industry-info/user/queryPage',
        method: 'post',
        data
    })
}
export function queryCurrentUserTop(data) {
    return request({
        url: 'industry-info/user/queryCurrentUserTop',
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

export function analysis(data) {
    return request({
        url: '/industry-info/user/analysis',
        method: 'post',
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
    // 使用 map 方法转换数组
    const cityLevelMap = {
        "0": "      一线",
        "1": "      新一线",
        "2": "      二线",
        "3": "      三线",
        "4": "      四线",
        "5": "      五线",
    }
    const result = response.data.map(city => {
        const cityLevelSuffix = cityLevelMap["" + city.cityLevel + ""];
        return {
            label: city.cityName + cityLevelSuffix, // 将 city_name 转换为 label
            value: city.cityName,       // 将 id 转换为 value
        };
    });
    return result;
}

export async function queryIndustryList(data) {
    const response = await request({
        url: '/industry-info/indIndustry/queryList',
        method: 'post',
        data
    })
    // 使用 map 方法转换数组
    const result = response.data.map(industry => {
        return {
            label: industry.bigCategory, // 将 bigCategory 转换为 label
            value: industry.bigCategory, // 将 bigCategory 转换为 value
        };
    });
    return result;
}