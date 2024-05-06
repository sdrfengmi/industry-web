<template>
  <div class="aside-wrapper">
    <el-menu
      default-active="1"
      class="el-menu-vertical-customer"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/userManagement">用户管理</el-menu-item>
        <el-menu-item index="/userProfile">用户画像</el-menu-item>
      </el-submenu>
      <el-menu-item index="/userProfile">
        <i class="el-icon-menu"></i>
        <span slot="title">用户画像</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  components: {},
  name: "asideCom",
  data() {
    return {};
  },
  methods: {
    onClick(row) {
      console.log(row);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
<style lang="scss" scoped>
.aside-wrapper {
  height: 100vh;
  overflow: auto;
  background: #545c64;
  .el-menu-vertical-customer {
  }
}
:deep(.el-menu-vertical-customer) {
  border-right: none;
  .el-submenu {
    .el-menu-item {
      padding-left: 49px !important;
      padding-right: 40px;
    }
  }
}
</style>