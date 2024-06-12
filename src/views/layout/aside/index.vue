<template>
  <div class="aside-wrapper">
          <el-menu
              default-active="1"
              class="el-menu-vertical-customer"
              @select="handleSelect"
              @open="handleOpen"
              @close="handleClose"
              background-color="#333744"
              text-color="#fff"
              active-text-color="#409EFF"
              :router="true"
          >
            <!-- 遍历菜单数据生成 el-submenu 和 el-menu-item -->
            <el-submenu v-for="item in menuData" :key="item.index" :index="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                  v-for="subItem in item.subMenu"
                  :key="subItem.index"
                  :index="subItem.index"
                  @click="switchView(subItem.component)"
              >
                {{ subItem.title }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
            <!--
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/userManagement">用户列表</el-menu-item>
              <el-menu-item index="/userProfile">用户画像</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统管理</span>
              </template>
              <el-menu-item index="/userManagement">用户权限</el-menu-item>
              <el-menu-item index="/userProfile">用户画像</el-menu-item>
            </el-submenu>
            <el-menu-item index="/userProfile">
              <i class="el-icon-menu"></i>
              <span slot="title">用户画像</span>
            </el-menu-item>
          -->

  <!--    <el-main>-->
  <!--      <component :is="activeView"></component>-->
  <!--    </el-main>-->
  </div>
</template>
<script>
// 导入组件
import UserManagement from '../../userManagement';
import UserProfile from '../../userProfile';
import SystemSettings from '../../userProfile';
// import SystemSettings from '/src/views/userProfile';

export default {
  components: {
    UserManagement,
    UserProfile,
    SystemSettings
  },
  name: "asideCom",
  data() {
    return {
      // 按钮
      menuData: [
        {
          index: '1',
          title: '用户管理',
          icon: 'el-icon-location',
          subMenu: [
            {index: 'userManagement', title: '用户列表', component: 'UserManagement'},
            {index: 'userProfile', title: '用户画像', component: 'UserProfile'}
          ]
        },
        {
          index: '2',
          title: '系统管理',
          icon: 'el-icon-setting',
          subMenu: [
            {index: 'systemSettings', title: '系统设置', component: 'SystemSettings'}
          ]
        }
        // 可以根据需要添加更多的菜单项
      ],
      // 点击事件
      activeView: 'UserManagement' // 默认显示的用户管理组件
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // 可以在这里处理菜单选择的逻辑
      switch (key) {
        case 'userManagement':
          this.activeView = 'UserManagement';
          break;
        case 'userProfile':
          this.activeView = 'UserProfile';
          break;
        case 'systemSettings':
          this.activeView = 'SystemSettings';
          break;
        default:
          this.activeView = 'UserManagement';
      }
    },
    switchView(componentName) {
      this.activeView = componentName;
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
.home-container {
  height: 100%;
}

.el-header {
  //background-color: #373d41;
  background-color: #B3C0D1;
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