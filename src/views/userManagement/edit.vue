<template>
  <div>
    <el-dialog
        :title="listItem && listItem.id ? '修改用户' : '添加用户'"
        :visible.sync="dialogVisible"
        append-to-body
        :close-on-click-modal="false"
        @close="reset"
        top="4vh"
        width="660px"
    >
      <BaseForm
          v-if="dialogVisible"
          labelWidth="85px"
          :span="12"
          ref="form"
          :formModel="form"
          :rules="rules"
          :fileds="fileds"
      />
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import BaseForm from "@/components/base-form/baseForm.vue";
import {create, update} from "@/api/api/index";
import enumeArr from "@/utils/enumeArr.js";

export default {
  name: "editUserManagement",
  props: {
    listItem: {
      type: Object,
      default: () => {
      },
    },
  },

  data() {
    return {
      dialogVisible: false,
      fileds: [
        {
          label: "用户名称",
          prop: "zyxh",
          type: "input",
        },
        {
          label: "所属行业",
          prop: "sshy",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          label: "月薪",
          prop: "yx",
          type: "input",
        },
        {
          label: "工龄",
          prop: "gl",
          type: "input",
        },
      ],
      form: {
        zyxh: undefined,
        sshy: undefined,
        yx: undefined,
        gl: undefined,
      },
      rules: {
        yhmc: [
          {required: true, message: "请输入用户名称", trigger: "change"},
        ],
        sshy: [
          {required: true, message: "请选择所属行业", trigger: "change"},
        ],
        yx: [{required: true, message: "请输入月薪", trigger: "change"}],
        gl: [{required: true, message: "请输入工龄", trigger: "change"}],
      },
    };
  },
  computed: {},
  components: {
    BaseForm,
  },
  mounted() {
    if (this.listItem && this.listItem.id) {
      this.formatForm(this.listItem);
    }
  },
  methods: {
    reset() {
      this.form = {
        yhmc: undefined,
        sshy: undefined,
        yx: undefined,
        gl: undefined,
      };
    },
    formatForm(listItem) {
      this.form = {
        yhmc: undefined,
        sshy: undefined,
        yx: undefined,
        gl: undefined,
        ...listItem,
      };
    },
    showDialog(row) {
      this.dialogVisible = true;
      if (row) {
        this.form = row;
      }
    },
    query() {
      let params = {
        ...this.form,
        sshymc: enumeArr["getTextByCode"](enumeArr["hyArr"], this.form.sshy),
      };
      if (params.id) {
        update(params).then(() => {
          this.$message.success("修改成功！");
          this.dialogVisible = false;
          this.$emit("updateCallback", params);
        });
      } else {
        create(params).then(() => {
          this.$message.success("创建成功！");
          this.dialogVisible = false;
          this.$emit("createCallback", params);
        });
      }
    },
    submit() {
      let self = this;
      this.$refs.form.$refs.baseForm.validate((v) => {
        if (v) {
          self.query();
        }
      });
    },
  },
  watch: {
    listItem: {
      deep: true,
      handler(newVal) {
        this.formatForm(newVal);
      },
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
:deep(.el-dialog .el-dialog__header) {
  border-bottom: 1px solid #f0f2f6;
}

:deep(.el-dialog__body) {
  padding: 15px 20px;
  max-height: calc(100vh - 200px);
  overflow: auto;
}
</style>