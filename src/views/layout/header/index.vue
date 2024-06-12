<template>
  <!--  <div style="display: flex;align-items:center">-->
  <div style="display: flex; justify-content: space-between; align-items: center;">
    <img src="../../../assets/logo.png" alt="">
    <!-- 顶部标题 -->
    <span style="margin-left: auto;">测试你的b班值不值水电费水电费水电费手动阀四大分三大放大时sdfsdfsdfsdfsdfsdsf
    </span>
    <el-button style="margin-left:1024px" type="info" @click="logout">
      退出
    </el-button>
  </div>
</template>

<script>
export default {
  components: {},
  name: "headerCom",
  data() {
    return {}
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
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
</style>