<template>
  <div class="echart-wrapper">
    <div ref="echart" style="width: 100%; height: 270px"></div>
  </div>
</template>

<script>
export default {
  name: "rankingEchart",
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

      this.option = {
        title: {
          show: false,
          text: "",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          top: "3%",
          left: "3%",
          right: "35px",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          axisLine: {
            show: true,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
          data: ["四川省", "天津市", "广东省", "上海市", "北京市"],
        },
        series: [
          {
            name: "2024",
            type: "bar",
            barWidth: 15,
            data: [8600, 15004, 19666, 21543, 23489],
            label: {
              show: true,
              position: "right",
            },
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