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
        <el-button size="small" type="warning" @click="analysis">分 析</el-button>
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import BaseForm from "@/components/base-form/baseForm.vue";
import {analysis, create, update, queryDictionaryList} from "@/api/api/userApi";
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
          type: "integer",
        },
        {
          prop: "workAge",
          label: "工龄",
          type: "input",
        },
        {
          prop: "sex",
          label: "性别",
          type: "select",
          options: enumeArr["sexArr"],
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
          options: enumeArr["industryNameArr"],
        },
        {
          prop: "cityName",
          label: "城市名称",
          type: "select",
          options: enumeArr["cityNameArr"],
        },
        {
          prop: "education",
          label: "学历",
          type: "select",
          options: enumeArr["educationArr"],
        },
        {
          prop: "oppositeSexRatio",
          label: "异性比例",
          type: "select",
          options: enumeArr["oppositeSexRatioArr"],
        },
        {
          prop: "stressLevel",
          label: "压力程度",
          type: "select",
          options: enumeArr["stressLevelArr"],
        },
        {
          prop: "workSteady",
          label: "工作稳定性",
          type: "select",
          options: enumeArr["workSteadyArr"],
        },
        {
          prop: "workRequire",
          label: "工作要求",
          type: "select",
          options: enumeArr["workRequireArr"],
        },
        {
          prop: "commuterTime",
          label: "通勤时长m",
          type: "input",
        },
        {
          prop: "workDay",
          label: "每周工天数",
          type: "select",
          options: enumeArr["workDayArr"],
        },
        {
          prop: "workTime",
          label: "工作时长h",
          type: "select",
          options: enumeArr["workTimeArr"],
        },
        {
          prop: "restTime",
          label: "摸鱼时长h",
          type: "input",
        },

        {
          prop: "moneyAbility",
          label: "钞能力",
          type: "input",
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
        // id: this.listItem["id"],TODO 为什么这里获取不到属性报错
        sex: 1,
      },
      rules: {
        userName: [{required: true, message: "请输入用户名称", trigger: "blur"},],
        age: [{required: true, message: "请输入用户名称", trigger: "blur"},],
        restTime: [{required: true, message: "请输入摸鱼时长h", trigger: 'blur'}],
        industryName: [{required: true, message: "请选择所属行业", trigger: "change"},],
        monthSalary: [{required: true, message: "请输入月薪", trigger: "blur"}],
        yearSalary: [{required: true, message: "请输入工龄", trigger: 'blur'}],
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
  created() {
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
    createAndUpdate() {
      let params = {
        ...this.form,
        sshymc: enumeArr["getTextByCode"](enumeArr["hyArr"], this.form.sshy),
      };
      let formData = this.$refs.form.formModel;
      if (formData.id) {
        update(formData).then(() => {
          this.$message.success("修改成功！");
          this.dialogVisible = false;
          this.$emit("updateCallback", params);
        });
      } else {
        create(formData).then(() => {
          this.$message.success("创建成功！");
          this.dialogVisible = false;
          this.$emit("createCallback", params);
        });
      }
    },

    // 分析
    analysis() {
      let params = {
        ...this.form,
        sshymc: enumeArr["getTextByCode"](enumeArr["hyArr"], this.form.sshy),
      };
      let formData = this.$refs.form.formModel;
      let submit = false
      this.$refs.form.$refs.baseForm.validate((v) => {
        submit = v;
      });
      //分析
      console.log("是否提交" + submit)
      if (submit) {
        analysis(formData).then(response => {
          // this.$message.success("修改成功！");
          // this.dialogVisible = false;
          // this.$emit("updateCallback", params);
          console.log(response)
        });
      }
    },

    submit() {
      let self = this;
      this.$refs.form.$refs.baseForm.validate((v) => {
        if (v) {
          self.createAndUpdate();
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