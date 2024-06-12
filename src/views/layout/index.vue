<template>
  <div class="layout-wrapper">
    <el-container class="home-container" style="height: 100vh;">
      <!-- 头部区域 -->
      <el-header>
<!--        <div>-->
<!--          <img src="src/assets/logo.png" alt="">-->
<!--          &lt;!&ndash; 顶部标题 &ndash;&gt;-->
<!--          <span>测试你的b班值不值</span>-->
<!--        </div>-->
        <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <el-main class="layout-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from "./aside/index.vue";
import Header from "./header/index.vue";

export default {
  components: {
    Aside,
    Header
  },
  name: "layOut",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.layout-wrapper {
  max-height: 100vh;
  overflow: auto;

  .layout-main {
    background: #eef3fe;
    padding: 10px;
    overflow: auto;
    max-height: 100vh;
  }
}
.el-header {
  background-color: #373d41;
  //background-color: #B3C0D1;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  line-height: 60px;
  font-size: 20px;
  width: 100%; /* 宽度 */
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  // 点击展开边框会突出来,没有边框线
  .el-menu {
    border-right: none;
  }
}

</style>