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
          :formModelF="form"
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
import {create, update} from "@/api/api/userApi";
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
          prop: "userName",
          label: "用户名",
          type: "input",
        },
        {
          prop: "age",
          label: "年龄",
          type: "input",
        },
        {
          prop: "workAge",
          label: "工龄",
          type: "input",
        },
        {
          prop: "sex",
          label: "性别",
          type: "input",
        },
        {
          prop: "workName",
          label: "工作名称",
          type: "input",
        },
        {
          prop: "industryName",
          label: "行业名称",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "cityName",
          label: "城市名称",
          type: "input",
        },
        {
          prop: "education",
          label: "学历",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "oppositeSexRatio",
          label: "异性比例",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "stressLevel",
          label: "压力程度",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "workRequire",
          label: "工作要求",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "commuterTime",
          label: "通勤时长h",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "restTime",
          label: "摸鱼时长h",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "workTime",
          label: "每天工时长",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "workDay",
          label: "每周工天数",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "moneyList",
          label: "钞能力",
          type: "select",
          options: enumeArr["getOption"](enumeArr["hyArr"]),
        },
        {
          prop: "monthSalary",
          label: "月薪",
          type: "input",
        },
        {
          prop: "yearSalary",
          label: "年薪",
          type: "input",
        },
      ],
      form: {
        userName: undefined,
        age: undefined,
        cityName: undefined,
        sex: undefined,
      },
      rules: {
        userName: [
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