<template>
  <div class="layout-wrapper">
    <el-container>
      <el-aside width="200px">
        <Aside />
      </el-aside>
      <el-main class="layout-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Aside from "./aside/index.vue";
export default {
  components: { Aside },
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
</style>