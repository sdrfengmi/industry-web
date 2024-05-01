<template>
  <div class="home">
    <BaseTable
      :column="column"
      class="table-fixed-wrapper"
      :maxHeight="'calc(100vh - 320px)'"
      :data="tableData"
      :pageOption="pageOption"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    >
      <template v-slot:opt>
        <el-table-column align="center" prop="opt" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="onClick(scope.row)">整改</el-button>
            <el-button type="text" @click="onClick(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </template>
    </BaseTable>
  </div>
</template>
<script>
import tablePageMixin from "@/components/base-table/tablePageMixin";
export default {
  components: {},
  mixins: [tablePageMixin],
  name: "homeComponent",
  data() {
    return {
      column: [
        {
          prop: "zyxh",
          label: "检查人",
          width: 150,
          ellipsis: true,
        },
        {
          prop: "ctdsl",
          label: "检查时间",
          width: 150,
          ellipsis: true,
        },
        {
          prop: "jydw",
          label: "检查意见",
          width: 150,
          ellipsis: true,
        },
      ],
      tableData: [
        {
          zyxh: "张三",
          ctdsl: "2024-04-03 12:23:22",
          jydw: "同意",
        },
      ],
    };
  },
  methods: {
    onClick(row) {
      console.log(row);
    },
  },
};
</script>