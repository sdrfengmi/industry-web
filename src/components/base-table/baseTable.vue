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
        stripe
        :row-style="getRowStyle"
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
          <!-- 只有当 item.formattedValue 是函数时才调用 -->
          <span>{{
              typeof item.formattedValue === 'function' ? item.formattedValue(scope.row) : scope.row[item.prop]
            }}</span>
        </template>

        <!-- 其他写法-->
        <!--        <template slot-scope="scope">-->
        <!--          <ul v-if="item.type === 'list'" class="cell-ul">-->
        <!--            <li v-for="(t, i) in scope.row[item.prop]" :key="i">-->
        <!--              {{ t.key }}: {{ t.value }}-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--          {{ !item.type ? scope.row[item.prop] : "" }}-->
        <!--        </template>-->

      </el-table-column>
      <slot name="opt"></slot>
    </el-table>
    <el-pagination
        v-if="pageOption"
        align="right"
        background
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="pageOption.total"
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
  created() {
  },
  methods: {
    // 更改行号
    handleSizeChange(val) {
      console.log("sizeChange", val)
      const pageOptionCopy = {...this.pageOption}
      pageOptionCopy.pageSize = val
      pageOptionCopy.pageNum = 1
      this.$emit("handleSizeChange", pageOptionCopy);
    },
    // 更改页数
    handleCurrentChange(val) {
      const pageOptionCopy = {...this.pageOption}
      pageOptionCopy.pageNum = val
      this.$emit("handleCurrentChange", pageOptionCopy);
    },
    // 选择每一行
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    // 根据行索引设置不同的颜色
    getRowStyle({rowIndex}) {
      // const colors = [
      //   '#F5DEB3', // 小麦色
      //   '#ADD8E6', // 浅蓝色
      //   '#FAEBD7', // 米黄色
      //   '#90EE90'  // 浅绿色
      // ];
      const colors = [
        '#FFD700',  // 金色
        '#FF6347',  // 西红柿色
        '#FF8C00',  // 暗橙色
        '#FFA07A',  // 浅珊瑚色
        '#32CD32',  // 酸橙绿
        '#4CAF50',  // 绿色
        '#00BFFF',  // 皇家蓝
        '#8A2BE2',  // 蓝紫罗兰
        '#DA70D6',  // 兰花紫
        '#FF69B4',  // 粉色
        '#CD5C5C',  // 印度红
        '#00FFFF',  // 浅蓝色（青色）
        '#9400D3',  // 深紫罗兰
      ];
      return {
        backgroundColor: colors[rowIndex % colors.length]
      };
    },
  },
  computed: {
    filteredColumns() {
      // 使用 map 来转换列定义，并为需要的字段增加一个字典函数
      return this.column.filter(column => column.visible == null || column.visible) // 过滤不展示的列
          .map(column => {
            // 创建新的对象以包含原始列定义和新的属性
            const newColumn = {...column};

            if (column.dict) {
              // 为字典字段增加一个格式化值的函数
              newColumn.formattedValue = (row) => {
                // 使用 find 方法查找当前属性值对应的字典标签
                const dictItem = column.dict.find(dict => dict.value === row[column.prop]);
                // 返回找到的字典标签，如果没有找到则返回原始值
                return dictItem ? dictItem.label : row[column.prop];
              };
            }
            // 返回新的对象，包含原始列定义和格式化函数（如果有）
            return newColumn;
          });
    },
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