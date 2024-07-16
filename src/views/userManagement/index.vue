<template>
  <div>
    <div class="top">
      <div class="card-wrapper">
        <div class="card-label">当日最大</div>
        <div class="card-value">20000</div>
      </div>
      <div class="card-wrapper">
        <div class="card-label">当日平均</div>
        <div class="card-value">15000</div>
      </div>
      <div class="card-wrapper">
        <div class="card-label">当日最小</div>
        <div class="card-value">10000</div>
      </div>
    </div>
    <div class="container-wrapper mt10">
      <div class="top_button">
        <div class="button-wrapper">
          <el-button
              style="margin-right: 10px"
              type="primary"
              icon="el-icon-puls"
              size="small"
              @click="addUser"
          >添加用户
          </el-button>
        </div>
        <!-- 搜索 -->
        <div>
          <SearchForm
              class="main-search-form"
              :fileds="searchFileds"
              @submit="search"
          />
        </div>
      </div>
      <!--      table数据 全屏:maxHeight="'calc(100vh - 320px)'"  固定表头表格内容拉取 :height="250"-->
      <BaseTable
          :column="column"
          class="table-fixed-wrapper"
          :height="600"
          :data="tableData"
          :pageOption="searchFormObj"
          @submit="search"
          @handleSizeChange="handleSizeAndCurrentChange"
          @handleCurrentChange="handleSizeAndCurrentChange"
      >
        <template v-slot:opt>
          <el-table-column align="center" prop="opt" label="操作" width="150">
            <template slot-scope="scope">
              <el-button type="text" @click="editUser(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </template>
      </BaseTable>
    </div>
    <!-- 父类调用子组件   ref 是给这个组件起一个名字,ref="edit"  下面this.$refs.edit才能引用这个组件,  后面.showDialog能直接调用这个组件的方法-->
    <!-- 子组件调用父类   @createCallback="createCallback": 这是一个事件监听器(event listener)，它监听子组件Edit触发的createCallback事件。当子组件触发这个事件时，父组件中定义的createCallback方法会被调用。-->
    <Edit ref="edit" @createAndUpdateCallback="createAndUpdateCallback"/>
  </div>
</template>
<script>
import SearchForm from "@/components/base-search/searchForm.vue";
import BaseTable from '@/components/base-table/baseTable.vue'

// import tablePageMixin from "@/components/base-table/tablePageMixin";
// 导入子组件
import Edit from "./edit.vue";
import {queryPage} from "@/api/api/userApi";
import axios from 'axios';
import enumeArr from "@/utils/enumeArr.js";

export default {
  // 注册子组件 ,先导入后注册
  components: {SearchForm, BaseTable, Edit},
  // mixins: [tablePageMixin],
  name: "userManagement",
  data() {
    return {
      searchFileds: [
        {
          label: "用户名",
          prop: "userName",
          type: "input",
        },
        {
          label: "年龄",
          prop: "age",
          type: "input",
        },
        {
          label: "城市",
          prop: "cityName",
          type: "select",
          options: enumeArr["cityNameArr"],
        },
        {
          label: "性别",
          prop: "sex",
          type: "select",
          options: [
            {key: 1, value: 1, label: "男"},
            {key: 2, value: 2, label: "女"}
          ],
        },
      ],
      searchFormObj: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      column: [
        {
          prop: "id",
          label: "序号",
          width: 35,
          ellipsis: true,
        },
        {
          prop: "userName",
          label: "用户名",
          width: 60,
          ellipsis: true,
        },
        {
          prop: "age",
          label: "年龄",
          width: 50,
          ellipsis: true,
        },
        {
          prop: "workAge",
          label: "工龄",
          width: 50,
          ellipsis: true,
        },
        {
          prop: "sex",
          label: "性别",
          width: 40,
          ellipsis: true,
          dict: enumeArr["sexArr"]
        },
        {
          prop: "workName",
          label: "工作名称",
          width: 60,
          ellipsis: true,
        },
        {
          prop: "industryId",
          label: "行业id",
          width: 50,
          ellipsis: false,
          visible: false
        },
        {
          prop: "industryName",
          label: "行业名称",
          width: 50,
          ellipsis: true,
          visible: false
        },
        {
          prop: "cityId",
          label: "城市id",
          width: 50,
          ellipsis: false,
          visible: false
        },
        {
          prop: "cityName",
          label: "城市名称",
          width: 60,
          ellipsis: true,
        },
        {
          prop: "education",
          label: "学历",
          width: 50,
          ellipsis: true,
          dict: enumeArr["educationArr"]
        },
        {
          prop: "oppositeSexRatio",
          label: "异性比例",
          width: 50,
          ellipsis: true,
          dict: enumeArr["oppositeSexRatioArr"]
        },
        {
          prop: "stressLevel",
          label: "压力程度",
          width: 50,
          ellipsis: true,
          dict: enumeArr["stressLevelArr"]
        },
        {
          prop: "workRequire",
          label: "工作要求",
          width: 50,
          ellipsis: true,
          dict: enumeArr["workRequireArr"]
        },
        {
          prop: "commuterTime",
          label: "通勤时长h",
          width: 60,
          ellipsis: true,
        },
        {
          prop: "restTime",
          label: "摸鱼时长h",
          width: 60,
          ellipsis: true,
        },
        {
          prop: "workTime",
          label: "每天工作时长",
          width: 50,
          ellipsis: true,
          dict: enumeArr["workTimeArr"]
        },
        {
          prop: "workDay",
          label: "每周工作天数",
          width: 50,
          ellipsis: true,
          dict: enumeArr["workDayArr"]
        },
        {
          prop: "moneyAbility",
          label: "钞能力",
          width: 50,
          ellipsis: true,
        },
        {
          prop: "monthSalary",
          label: "月薪",
          width: 50,
          ellipsis: true,
        },
        {
          prop: "yearSalary",
          label: "年薪",
          width: 60,
          ellipsis: true,
        },
      ],
      tableData: [
        // {
        //   id: 10,
        //   userName: "张三",
        //   age: 18,
        //   workAge: 5,
        //   sex: "男",
        // },
      ],
      // pageOption: {
      //   total: 0,
      //   pageNum: 1,
      //   pageSize: 10,
      // }
    };
  },

  //启动界面钩子函数
  created() {
    const params = {"pageSize": 10, "pageNum": 0};
    this.queryPage()
  },
  methods: {
    queryPage() {
      // params.pageSize = this.pageOption.pageSize
      // params.pageNum = this.pageOption.pageNum
      queryPage(this.searchFormObj).then(response => {
        // this.tableData=response.data.records;
        // Array.prototype.push.apply(this.tableData, response.data.records);
        this.tableData = response.data.records
        this.searchFormObj.total = response.data.total
        this.searchFormObj.pageNum = response.data.current
        this.searchFormObj.pageSize = response.data.size
        console.log("结果")
        console.log(response.data.records)
        console.log(this.tableData)
      });
    },
    addUser() {
      this.$refs.edit.showDialog(null);
    },
    editUser(row) {
      //修改用户
      this.$refs.edit.showDialog(row);
    },
    search(form) {
      this.searchFormObj = {...form};
      this.queryPage()
      console.log(form);
    },
    handleSizeAndCurrentChange(val) {
      this.searchFormObj = {...val};
      console.log("翻页:" + val);
      this.queryPage()
    },
    createAndUpdateCallback() {
      this.queryPage();
    },
  },
};
</script>
<style lang="scss" scoped>
.top {
  display: flex;
}

.container-wrapper {
  padding-top: 0;
}

.top_button {
  margin: 0 -10px 0;
}

.card-wrapper {
  flex: 1;
  background-color: #fff;
  margin-right: 10px;
  border-radius: 4px;
  padding: 10px 40px;

  .card-label {
    color: #888;
    line-height: 28px;
  }

  .card-value {
    color: #333;
    font-size: 28px;
    line-height: 32px;
  }

  &:last-child {
    margin-right: 0;
  }
}
</style>