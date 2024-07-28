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
          labelWidth="90px"
          :span="12"
          ref="form"
          :formModelF="form"
          :rules="rules"
          :fileds="fileds"
      />
      <div class="score-container">
        <el-row :gutter="20">
          <el-col :span="10">
            <div class="score-display">
              <div class="score-info">
                <div class="score-value">得分:{{ form.score }}</div>
              </div>
              <div class="score-bar-container">
                <!--  <div class="score-bar" :style="{ width: (form.score / 10 * 100) + '%', backgroundColor: barColor }"></div>-->
                <div class="score-bar" :style="{ width: (form.score / 10 * 100) + '%' }"></div>
              </div>
              <div class="score-value">称号:{{ form.title }}</div>
            </div>
          </el-col>
        </el-row>
      </div>

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
          type: "integer",
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
          type: "integer",
        },
        {
          prop: "workDay",
          label: "周工作天数d",
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
          label: "摸鱼时长m",
          type: "select",
          options: enumeArr["restTimeArr"],
        },
        {
          prop: "moneyAbility",
          label: "钞能力",
          type: "number",
        },
        {
          prop: "monthSalary",
          label: "月薪k",
          type: "number",
        },
        {
          prop: "yearSalary",
          label: "年薪w",
          type: "number",
        },
        // {
        //   prop: "score",
        //   label: "行业得分",
        //   width: 60,
        //   type: "number",
        //   disabled: true,
        // },
        // {
        //   prop: "title",
        //   label: "称号",
        //   width: 80,
        //   ellipsis: true,
        //   type: "input",
        //   disabled: true,
        // },
      ],
      form: {
        id: undefined,
        score: 0,
        title: null,
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
  computed: {
    barColor() {
      // 根据得分返回渐变色，颜色越来越红
      const redScale = Math.min(this.form.score / 10, 1); // 红色比例
      const redValue = Math.round(redScale * 255); // 红色值
      return `rgb(${redValue}, 128, 128)`; // 使用紫色作为示例，根据需要调整
    }
  },
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
        score: null,
        title: null,
        id: undefined,
        sex: 1,
      };
    },
    formatForm(listItem) {
      this.form = {
        ...this.form, // 保留原有的默认值
        // 其他属性...
        ...listItem,
        score: Math.max(0, Math.floor(listItem.score || 0)),
      };
    },
    showDialog(row) {
      if (row) {
        this.formatForm(row)
      }
      this.dialogVisible = true;
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
          this.$emit("createAndUpdateCallback", params);
        });
      } else {
        create(formData).then(() => {
          this.$message.success("创建成功！");
          this.dialogVisible = false;
          this.$emit("createAndUpdateCallback", params);
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
          this.form.score = response.data.score;
          this.form.title = response.data.title;
          console.log("得分" + this.form.score )
          console.log("标题" + this.form.title )
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

.score-display {
  display: flex;
  align-items: center;
  justify-content: space-between; //空间分配：使用 justify-content: space-between; 确保得分标题和得分值在柱状图两侧适当分布。
  width: 400px;
}

.score-container {
  padding: 20px;
  text-align: center;
}

.score-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.score-bar-container {
  width: 100%;
  height: 20px;
  //background-color: #eee;
  background-color: #e0e0e0; /* 更亮的背景色 */
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
}

.score-bar {
  height: 100%;
  //background: linear-gradient(to right, #ffdddd 0%, #ff5c5c 100%); /* 更亮的渐变色 */
  background: linear-gradient(to right, #fff 0%, #f00 100%);
  transition: width 0.5s ease;
}

.score-value {
  font-size: 16px;
  color: #333;
  width: 50px;
}

.score-info {
  flex-grow: 1; /* 确保得分和标题占据大部分空间 */
  display: flex;
  align-items: center;
  justify-content: center; /* 水平居中对齐 */
}
</style>