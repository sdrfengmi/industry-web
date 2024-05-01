<template>
  <div v-if="fileds.length > 0" class="search-form-wrapper">
    <el-form
      :model="formModel"
      label-position="right"
      ref="searchForm"
      class="searchForm"
    >
      <div class="form-wrapper">
        <el-popover
          v-if="moreFileds.length > 0"
          popper-class="search-popver"
          placement="bottom-start"
          ref="popover"
          :offset="0"
          trigger="click"
        >
          <div>
            <el-form
              :model="formModel"
              label-position="right"
              ref="searchForm"
              class="searchForm"
            >
              <el-form-item
                v-for="(item, index) in moreFileds"
                :key="index"
                :style="{ width: item.width || '300px' }"
                :label-width="
                  item.labelWidth
                    ? item.labelWidth + ' !important'
                    : '80px !important'
                "
                :label="item.label"
                :prop="item.prop"
              >
                <el-input
                  v-if="item.type == 'input'"
                  :placeholder="`请输入${item.label}`"
                  size="small"
                  :clearable="true"
                  v-model="formModel[item.prop]"
                ></el-input>
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
                <el-select
                  v-if="item.type == 'select'"
                  size="small"
                  clearable
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
              </el-form-item>
              <el-form-item
                :style="{
                  width: '173px',
                  textAlign: 'right',
                }"
                label=""
              >
                <el-button
                  size="small"
                  icon="el-icon-search"
                  type="primary"
                  @click="submit"
                  >搜 索</el-button
                >
                <el-button
                  size="small"
                  icon="el-icon-refresh-left"
                  @click="reset"
                  >重 置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div
            slot="reference"
            class="more-search-filed-icon"
            :class="{ active: flag }"
          >
            <img
              v-if="flag"
              src="@/assets/images/ri-filter-blue.png"
              alt=""
              srcset=""
            />
            <img
              v-else
              src="@/assets/images/ri-filter-line.png"
              alt=""
              srcset=""
            />
          </div>
        </el-popover>
        <el-form-item
          :style="{ width: showFileds.width || '200px' }"
          :label-width="'0px'"
          :label="''"
          :prop="showFileds.prop"
        >
          <el-input
            v-if="showFileds.type == 'input'"
            :placeholder="`${showFileds.label}`"
            size="small"
            :clearable="true"
            v-model="formModel[showFileds.prop]"
          ></el-input>
          <el-date-picker
            v-if="showFileds.type == 'daterange'"
            style="width: 100%"
            size="small"
            v-model="formModel[showFileds.prop]"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-select
            v-if="showFileds.type == 'select'"
            size="small"
            clearable
            style="width: 100%"
            v-model="formModel[showFileds.prop]"
            :placeholder="`${showFileds.label}`"
          >
            <el-option
              v-for="i in showFileds.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style="{ width: '76px', marginLeft: '10px' }" label="">
          <el-button
            style="display: block"
            size="small"
            icon="el-icon-search"
            type="primary"
            @click="submit"
            >搜 索</el-button
          >
        </el-form-item>
      </div>
    </el-form>
    <div></div>
  </div>
</template>


<script>
export default {
  name: "searchForm",
  props: {
    fileds: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showFileds: {},
      moreFileds: [],
      formModel: {},
      flag: false,
    };
  },
  components: {},
  created() {
    this.showFileds = this.fileds[0];
    this.moreFileds = this.fileds.slice(1);
  },
  mounted() {},
  methods: {
    reset() {
      let first = this.formModel[this.showFileds.prop];
      this.formModel = {
        [this.showFileds.prop]: first,
      };
      this.$emit("submit", { ...this.formModel });
    },
    submit() {
      for (let k in this.formModel) {
        if (
          this.formModel[k] === "" ||
          (typeof this.formModel[k] == "string" &&
            this.formModel[k].trim() === "") ||
          this.formModel[k] === undefined
        ) {
          delete this.formModel[k];
        }
      }
      let p = { ...this.formModel };
      for (let ks in p) {
        if (typeof p[ks] == "string") {
          p[ks] = p[ks].trim();
        }
      }
      this.$emit("submit", p);
      if (this.$refs.popover) {
        this.$refs.popover.doClose();
      }
    },
  },
  watch: {
    formModel: {
      deep: true,
      handler(val) {
        let keys = [];
        if (typeof val !== "object") return;
        for (let key in val) {
          if (
            Object.prototype.hasOwnProperty.call(val, "key") &&
            val[key] != undefined &&
            (val[key] !== "" ||
              (typeof val[key] == "string" && val[key].trim() !== ""))
          ) {
            keys.push(key);
          }
        }
        let flag = false;
        this.moreFileds.map((item) => {
          if (keys.indexOf(item.prop) > -1) {
            flag = true;
          }
        });
        this.flag = flag;
      },
    },
    fileds: {
      deep: true,
      handler(val) {
        this.showFileds = val[0];
        this.moreFileds = val.slice(1);
      },
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>