<template>
  <el-form :model="formData" :label-width="labelWidth">
    <div v-if="title" class="yz-design-form__prop-title">
      <el-divider content-position="center">
        {{ title }}
      </el-divider>
    </div>
    <el-form-item label="数据来源" prop="type">
      <el-select v-model="formData.type" @change="handleTypeChange">
        <el-option
          v-for="itm in datasources"
          :key="itm.type"
          :label="itm.name"
          :value="itm.type" />
      </el-select>
    </el-form-item>
    <component
      :is="configPage"
      v-model="formData.config"
      :single="single" />
  </el-form>
</template>
<script>
import { configStore } from 'yz-dync-form/src/core.js'
import { isFunction } from 'yz-dync-form/src/utils/type.js'
import form from 'yz-dync-form/src/mixins/form'

export default {
  mixins: [form],
  props: {
    title: String,
    single: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      datasources: configStore.datasources,
      configPage: null
    }
  },
  created() {
    if (this.formData.type) {
      this.configPage = configStore.getDataSource(this.formData.type).getPage()
    }
  },
  methods: {
    handleTypeChange(val) {
      let component = configStore.getDataSource(val).getPage()
      if (isFunction(component)) {
        component = component()
      }
      this.configPage = component
    }
  }
}
</script>
