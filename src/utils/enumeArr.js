// 行业
const hyArr = [
    {text: "计算机软件", code: '01'}, {text: "电子通讯", code: '02'}, {text: "家政服务", code: '03'}
]
//性别
const sexArr = [{label: "男", value: 1}, {label: "女", value: 2}]
//工作天数
const workDayArr = [
    {label: "1天", value: 1}, {label: "1天", value: 2}, {label: "1天", value: 3}, {label: "1天", value: 4},
    {label: "5天", value: 5}, {label: "5.5天", value: 5.5}, {label: "1天", value: 6}, {label: "1天", value: 7}
]
//工作时长
const workTimeArr = [
    {label: "6h", value: 6}, {label: "7h", value: 7}, {label: "8h", value: 8},
    {label: "9h", value: 9}, {label: "10h", value: 10}
]
//异性比例
const oppositeSexRatioArr = [
    {label: "很少", value: 1}, {label: "五五开", value: 2}, {label: "很多", value: 3}, {label: "我有对象", value: 4}
]
// 压力程度
const stressLevelArr = [
    {label: "无压力", value: 1}, {label: "有点压力", value: 2}, {label: "压力很大", value: 3}, {label: "接近崩溃", value: 4}
]
// 工作稳定性(1:稳得一批,2:一般,3:不稳定,4:经常裁员)
const workSteadyArr = [
    {label: "稳得一批", value: 1}, {label: "一般", value: 2}, {label: "不稳定", value: 3}, {label: "经常裁员", value: 4}
]
// 工作要求,行业要求(1:无,2:学历,3:经验,4:从业资格证,5:学历+经验,6:学历+经验+从业资格)
const workRequireArr = [
    {label: "无", value: 1}, {label: "学历", value: 2}, {label: "经验", value: 3}, {label: "从业资格证", value: 4},
    {label: "学历+经验", value: 5}, {label: "学历+经验+从业资格", value: 6}
]
//学历
const educationArr = [
    {label: "家里蹲", value: 1}, {label: "大专", value: 2}, {label: "本科", value: 3}, {label: "211/985本科", value: 4},
    {label: "研究生", value: 5}, {label: "博士", value: 6}, {label: "博士后", value: 7}
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
    hyArr, sexArr, workDayArr, workTimeArr,educationArr,oppositeSexRatioArr,stressLevelArr,workSteadyArr,workRequireArr
}