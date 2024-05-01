<template>
  <div class="user-profile">
    <div class="block-warpper">
      <div class="card-wrapper flex1">
        <div class="card-title">全国各省平均薪资</div>
        <AreaDistribution ref="areaDistribution" />
      </div>
      <div class="right">
        <div class="card-wrapper">
          <div class="card-title">钞能力TOP5</div>
          <Ranking ref="ranking" />
        </div>
        <div class="card-wrapper mt10">
          <div class="card-title">钞能力TOP5</div>
          <Ranking ref="ranking" />
        </div>
      </div>
    </div>

    <div class="card-wrapper mt10">
      <div class="card-title">工作经验平均薪资趋势</div>
      <Trend ref="trend" />
    </div>
  </div>
</template>

<script>
import AreaDistribution from "./areaDistribution.vue";
import Ranking from "./ranking.vue";
import Trend from "./trend.vue";
export default {
  components: { AreaDistribution, Ranking, Trend },
  mixins: [],
  name: "userProfile",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-profile {
  .block-warpper {
    display: flex;
    .right {
      max-width: 400px;
      width: 30%;
      margin-left: 10px;
    }
    .flex1 {
      flex: 1;
    }
  }
  .card-wrapper {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px 30px;
  }
  .card-title {
    font-weight: 600;
    font-size: 16px;
    line-height: 28px;
    position: relative;
    padding-left: 20px;
    &::before {
      content: "";
      position: absolute;
      top: 5px;
      left: 0px;
      height: 17px;
      width: 3px;
      background-color: #409eff;
    }
  }
}
</style>
