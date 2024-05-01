<template>
  <div class="echart-wrapper">
    <div ref="echart" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
import china from "/public/json/china.json";
export default {
  name: "areaDistribution",
  props: {},
  data() {
    return {
      charts: null,
      option: null,
    };
  },
  components: {},
  created() {},
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      this.charts = this.$echarts.init(this.$refs.echart);
      this.$echarts.registerMap("CN", china, {});

      this.option = {
        title: {
          text: "",
          subtext: "",
          left: "right",
        },
        tooltip: {
          trigger: "item",
          showDelay: 0,
          transitionDuration: 0.2,
        },
        visualMap: {
          orient: "horizontal",
          left: "right",
          itemWidth: 8,
          itemHeight: 140,
          bottom: 20,
          min: 3000,
          max: 25000,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
          calculable: true,
        },
        toolbox: {
          show: false,
        },
        series: [
          {
            name: "CN",
            type: "map",
            roam: true,
            map: "CN",
            zoom: 1.2,
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              { name: "北京市", value: 23000 },
              { name: "天津市", value: 18000 },
              { name: "河北省", value: 3052 },
              { name: "山西省", value: 4022 },
              { name: "内蒙古自治区", value: 5022 },
              { name: "辽宁省", value: 6066 },
              { name: "吉林省", value: 7066 },
              { name: "黑龙江省", value: 6066 },
              { name: "上海市", value: 25066 },
              { name: "江苏省", value: 6033 },
              { name: "浙江省", value: 6033 },
              { name: "安徽省", value: 6033 },
              { name: "福建省", value: 6033 },
              { name: "江西省", value: 6033 },
              { name: "山东省", value: 6033 },
              { name: "河南省", value: 6033 },
              { name: "湖南省", value: 6033 },
              { name: "广东省", value: 19033 },
              { name: "广西壮族自治区", value: 4000 },
              { name: "贵州省", value: 8060 },
              { name: "湖北省", value: 8060 },
              { name: "海南省", value: 8060 },
              { name: "重庆市", value: 8060 },
              { name: "四川省", value: 8060 },
              { name: "云南省", value: 8060 },
              { name: "西藏自治区", value: 6022 },
              { name: "陕西省", value: 6023 },
              { name: "甘肃省", value: 6023 },
              { name: "青海省", value: 6023 },
              { name: "宁夏回族自治区", value: 6023 },
              { name: "新疆维吾尔自治区", value: 6023 },
              { name: "台湾省", value: 4023 },
              { name: "香港特别行政区", value: 6023 },
              { name: "澳门特别行政区", value: 6023 },
            ],
          },
        ],
      };
      this.charts.setOption(this.option, true);
    },
  },
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
</style>