// 行业
const hyArr = [
    {
        text: "计算机软件",
        code: '01'
    },
    {
        text: "电子通讯",
        code: '02'
    },
    {
        text: "家政服务",
        code: '03'
    }
]
function getTextByCode(data, code) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].code == code) {
            return data[i].text;
        }
    }
}
function getOption(data) {
    let res = [];
    for (let i = 0; i < data.length; i++) {
        res.push({
            label: data[i].text,
            value: data[i].code
        })
    }
    return res;
}
export default {
    getTextByCode,
    getOption,
    hyArr,
}