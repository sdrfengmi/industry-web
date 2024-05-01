<template>
  <div>
    <el-form
      :model="formModel"
      :rules="rules"
      label-position="right"
      ref="baseForm"
      :label-width="labelWidth"
      class="baseForm"
    >
      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in fileds"
          :key="index"
          :span="item.span || span"
        >
          <el-form-item :label="item.label" :prop="item.prop">
            <el-input
              :disabled="item.disabled"
              v-if="item.type == 'input'"
              :placeholder="`请输入${item.label}`"
              size="small"
              :type="item.inputType || 'text'"
              autocomplete="on"
              v-model="formModel[item.prop]"
            >
              <template v-if="item.unit" slot="append">{{
                item.unit
              }}</template>
              <template v-if="item.prefix" slot="prepend">{{
                item.prefix
              }}</template>
            </el-input>
            <el-input
              v-if="item.type == 'integer'"
              type="text"
              @input="(v) => integerFormat(v, `${item.prop}`)"
              :disabled="item.disabled"
              :placeholder="`请输入${item.label}`"
              size="small"
              autocomplete="off"
              v-model="formModel[item.prop]"
            >
              <template v-if="item.append" slot="append">{{
                item.append
              }}</template>
            </el-input>
            <el-input
              v-if="item.type == 'number'"
              type="text"
              @input="(v) => positiveFormat(v, `${item.prop}`)"
              :disabled="item.disabled"
              :placeholder="`请输入${item.label}`"
              size="small"
              autocomplete="off"
              v-model="formModel[item.prop]"
            >
              <template v-if="item.append" slot="append">{{
                item.append
              }}</template>
            </el-input>
            <el-autocomplete
              size="small"
              v-if="item.type == 'autocomplete'"
              v-model="formModel[item.prop]"
              :fetch-suggestions="(s, f) => querySearch(s, f, item.localKey)"
              :disabled="item.disabled"
              :placeholder="`请输入${item.label}`"
              @select="(i) => handleSelect(i, item.localKey)"
              @blur="(e) => handleBlur(formModel[item.prop], item.localKey)"
            ></el-autocomplete>
            <el-date-picker
              v-if="item.type == 'daterange'"
              style="width: 100%"
              size="small"
              v-model="formModel[item.prop]"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-date-picker
              v-if="item.type == 'dateTimerange'"
              type="datetimerange"
              popper-class="form-date-time"
              format="yyyy-MM-dd HH:mm"
              :default-time="['09:00:00', '18:00:00']"
              style="width: 100%"
              size="small"
              v-model="formModel[item.prop]"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            >
            </el-date-picker>
            <el-cascader
              v-if="item.type == 'cascader'"
              size="small"
              style="width: 100%"
              :placeholder="`请选择${item.label}`"
              :show-all-levels="item.showAllLevel || false"
              :props="{ checkStrictly: item.checkStrictly || false }"
              v-model="formModel[item.prop]"
              :options="item.options"
            ></el-cascader>
            <el-cascader
              v-if="item.type == 'cascaderAll'"
              size="small"
              style="width: 100%"
              :placeholder="`请选择${item.label}`"
              v-model="formModel[item.prop]"
              :options="item.options"
            ></el-cascader>
            <el-select
              v-if="item.type == 'select'"
              :disabled="item.disabled"
              size="small"
              style="width: 100%"
              v-model="formModel[item.prop]"
              :placeholder="`请选择${item.label}`"
            >
              <el-option
                v-for="i in item.options"
                :key="i.value"
                :label="i.label"
                :value="i.value"
              >
              </el-option>
            </el-select>
            <textarea
              v-if="item.type == 'textarea'"
              class="el-textarea__inner"
              :rows="3"
              :placeholder="`请输入${item.label}`"
              :maxlength="200"
              v-model="formModel[item.prop]"
            ></textarea>
            <el-date-picker
              v-if="item.type == 'date'"
              size="small"
              v-model="formModel[item.prop]"
              type="date"
              :placeholder="`请选择${item.label}`"
            >
            </el-date-picker>
            <el-date-picker
              v-if="item.type == 'datetime'"
              size="small"
              popper-class="form-date-time"
              format="yyyy-MM-dd HH:mm"
              :default-time="'09:00:00'"
              v-model="formModel[item.prop]"
              type="datetime"
              :placeholder="`请选择${item.label}`"
            >
            </el-date-picker>
            <el-radio-group
              v-if="item.type == 'radio'"
              v-model="formModel[item.prop]"
            >
              <el-radio
                v-for="(i, index) in item.options"
                :label="i.value"
                :key="index"
              >
                {{ i.label }}
              </el-radio>
            </el-radio-group>
            <el-upload
              v-if="item.type == 'uploadList'"
              :file-list="formModel[item.prop]"
              :action="item.action"
              :headers="{ Authorization: token }"
              list-type="picture-card"
              :before-upload="beforeAvatarUpload"
              :on-success="
                (e, file, fileList) =>
                  uploadImageHandleSuccess(item, e, file, fileList)
              "
              :on-remove="(f, fl) => uploadImageHandleRemove(item, f, fl)"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              v-if="item.type == 'uploadAvatar'"
              class="avatar-uploader"
              :action="item.action"
              :headers="{ Authorization: token }"
              :show-file-list="false"
              :on-success="(res, file) => handleAvatarSuccess(item, res, file)"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="formModel[item.prop]"
                :src="formModel[item.prop]"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="list-wrapper" v-if="item.type == 'jsonList'">
              <div class="list-header">
                <el-row :gutter="20">
                  <el-col :span="9">参数名</el-col>
                  <el-col :span="13">参数值</el-col>
                  <el-col :span="2"></el-col>
                </el-row>
              </div>
              <div class="list-body">
                <el-row
                  :gutter="20"
                  v-for="(i, iindex) in formModel[item.prop]"
                  :key="iindex"
                >
                  <el-col :span="9">
                    <el-input
                      :placeholder="`参数名称`"
                      size="small"
                      v-model="i.key"
                    ></el-input>
                  </el-col>
                  <el-col :span="13">
                    <el-input
                      :placeholder="`参数值`"
                      size="small"
                      v-model="i.value"
                    ></el-input>
                  </el-col>
                  <el-col :span="2">
                    <el-button
                      @click="deleteItem(item, iindex)"
                      type="text"
                      style="color: red"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </div>
              <div class="list-footer">
                <el-row :gutter="20">
                  <el-col :span="22">
                    <el-button
                      class="list-footer-btn"
                      size="small"
                      @click="addItem(item)"
                      icon="el-icon-plus"
                      plain
                      >添加</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
import { cloneDeep, uniqWith, isEqual } from "lodash";
export default {
  name: "baseForm",
  props: {
    span: {
      type: Number,
      default: 24,
    },
    formModelF: {
      type: Object,
      default: () => {
        return {};
      },
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    labelWidth: {
      type: String,
      default: "80px",
    },
    fileds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      token: "",
      formModel: {},
    };
  },
  components: {},
  mounted() {
    this.formModel = { ...this.formModelF };
  },
  methods: {
    integerFormat(v, props) {
      let newVal = v.replace(/^(0+)|[^\d]+|/g, "");
      this.$set(this.formModel, props, newVal);
    },

    positiveFormat(v, props) {
      let newVal = v.replace(/^\D*(\d*(?:\.\d{0,2})?).*$/g, "$1");
      if (newVal > 100) {
        newVal = 100;
      }
      this.$set(this.formModel, props, newVal);
    },
    uploadImageHandleRemove(item, file) {
      if (file.response) file = file.response.data;
      let imgs = cloneDeep(this.formModel[item.prop]);
      for (let i = 0; i < imgs.length; i++) {
        let fileName = imgs[i].fileName;
        if (imgs[i].response) fileName = imgs[i].response.data.fileName;
        if (fileName === file.fileName) {
          imgs.splice(i, 1);
          this.$set(this.formModel, item.prop, imgs);
          return;
        }
      }
    },
    uploadImageHandleSuccess(item, response, file) {
      if (this.formModel[item.prop].length > 0) {
        this.$set(
          this.formModel[item.prop],
          this.formModel[item.prop].length,
          file
        );
      } else {
        this.$set(this.formModel, item.prop, [file]);
      }
    },
    handleAvatarSuccess(item, res, file) {
      this.$set(this.formModel, item.prop, URL.createObjectURL(file.raw));
      this.formModel[item.prop + "F"] = res.data;
    },
    beforeAvatarUpload(file) {
      // 后续扩展上传文件类型控制
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isLt2M;
    },
    deleteItem(item, index) {
      this.formModel[item.prop].splice(index, 1);
    },
    addItem(item) {
      this.$set(this.formModel[item.prop], this.formModel[item.prop].length, {
        key: "",
        value: "",
      });
    },
    wangEditorChange(prop, text, fileList) {
      this.formModel[prop] = text;
      this.$set(this.formModel, prop + "FileList", fileList);
    },

    querySearch(queryString, cb, key) {
      let str = localStorage.getItem(key) || "[]";
      let restaurants = JSON.parse(str);
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item, key) {
      if (!item) return;
      let str = localStorage.getItem(key) || "[]";
      let restaurants = JSON.parse(str);
      restaurants.unshift(item);
      restaurants = uniqWith(restaurants, isEqual);
      localStorage.setItem(key, JSON.stringify(restaurants.slice(0, 10)));
    },
    handleBlur(e, key) {
      if (!e) return;
      let str = localStorage.getItem(key) || "[]";
      let restaurants = JSON.parse(str);
      restaurants.unshift({
        value: e,
      });
      restaurants = uniqWith(restaurants, isEqual);
      localStorage.setItem(key, JSON.stringify(restaurants.slice(0, 10)));
    },
  },
  watch: {
    formModelF: {
      deep: true,
      handler(val) {
        this.formModel = { ...val };
      },
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
:deep(div.el-select) {
  display: block;
}
:deep(.el-input.el-date-editor) {
  display: block;
}
:deep(.el-form-item__content .el-input) {
  display: block;
}
:deep(.el-form-item__content .el-autocomplete) {
  display: block;
}
:deep(.el-form-item__content .el-input-group) {
  display: inline-table;
  vertical-align: middle;
  margin-top: -3px;
}
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: #409eff;
}
:deep(.el-date-editor.el-input) {
  width: 100%;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.list-wrapper {
  text-align: center;
}
.list-footer-btn {
  width: 100%;
  border: 1px dashed #dcdfe6;
}
</style>
<style lang="scss">
.form-date-time {
  .el-time-spinner__wrapper {
    width: 50%;
  }
}
</style>