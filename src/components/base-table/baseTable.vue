<template>
  <div class="baseTable">
    <el-table
      :height="height"
      :max-height="maxHeight"
      row-key="id"
      size="small"
      :header-cell-style="{
        backgroundColor: '#fafafa',
        fontSize: '14px',
        color: '#909399',
        textAlign: 'center',
      }"
      @selection-change="handleSelectionChange"
      :data="data"
    >
      <el-table-column
        v-if="selection"
        :align="'center'"
        type="selection"
        :selectable="selectable"
        width="55"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in filteredColumns"
        :key="index"
        :align="item.align || 'center'"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :show-overflow-tooltip="item.ellipsis"
        :width="item.width ? item.width : 100"
      >
        <template slot-scope="scope">
          <ul v-if="item.type === 'list'" class="cell-ul">
            <li v-for="(t, i) in scope.row[item.prop]" :key="i">
              {{ t.key }}: {{ t.value }}
            </li>
          </ul>
          {{ !item.type ? scope.row[item.prop] : "" }}
        </template>
      </el-table-column>
      <slot name="opt"></slot>
    </el-table>
    <el-pagination
      v-if="pageOption"
      align="right"
      background
      layout="total, sizes, prev, pager, next"
      :total="pageOption.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pageOption.pageSize"
      :current-page="pageOption.pageNum"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "baseTable",
  props: {
    maxHeight: [String, Number, undefined],
    height: [String, Number, undefined],
    column: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    pageOption: {
      type: Object,
      default() {
        return {
          total: 0,
          pageNum: 1,
          pageSize: 10,
        };
      },
    },
    selection: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Function,
      default: () => true,
    },
  },
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
  computed: {
    filteredColumns() {
      return this.column.filter(column => column.visible==null || column.visible);
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
:deep(.el-table .cell .el-button) {
  padding-top: 5px;
  padding-bottom: 5px;
}
:deep(.el-table .cell) {
  font-weight: 400;
  font-size: 14px;
  padding-left: 5px;
  padding-right: 5px;
}
:deep(.el-pagination) {
  padding: 15px 0px;
}
:deep(.el-table__empty-block) {
  width: 100% !important;
}
:deep(.el-table__body),
:deep(.el-table__header) {
  width: 100% !important;
}
:deep(.el-pagination__sizes .el-input__inner) {
  height: 28px;
  line-height: 28px;
}
:deep(.el-table__row .cell.el-tooltip) {
  width: 100% !important;
}
:deep(.el-table__fixed-right) {
  height: 100% !important;
}
:deep(.el-table__fixed) {
  height: 100% !important;
}
.cell-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
<style>
.el-tooltip__popper.is-dark {
  max-width: 500px;
}
</style>