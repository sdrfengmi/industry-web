<template>
  <div class="echart-wrapper">
    <div ref="echart" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script>
export default {
  name: "etfAnalysisEchart",
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
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          show: false,
        },
        toolbox: {
          show: false,
        },
        grid: {
          left: "10px",
          right: "10px",
          bottom: "20px",
          top: "20px",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["1年", "2年", "3年", "4年", "5年", "6年", "7年", "8年"],
            axisLine: {
              show: true,
              lineStyle: {
                type: "dotted",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
              lineStyle: {
                type: "dotted",
              },
            },
            splitLine: {
              lineStyle: {
                color: "#ccc",
                type: "dotted",
              },
            },
            axisLabel: {
              show: true,
              lineStyle: {
                color: "#333",
              },
            },
          },
        ],
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
            areaStyle: {
              //右，下，左，上
              color: this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(84,112,198,.7)",
                    },
                    {
                      offset: 1,
                      color: "rgba(84,112,198,.0)",
                    },
                  ],
                  false
              ),
            },
          },
          {
            name: "电池etf",
            type: "line",
            stack: "Total",
            emphasis: {
              focus: "series",
            },
            data: [50, 60, 70, 80, 90, 100, 120, 120],
            areaStyle: {
              //右，下，左，上
              color: this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(84,112,198,.7)",
                    },
                    {
                      offset: 1,
                      color: "rgba(84,112,198,.0)",
                    },
                  ],
                  false
              ),
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