<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="字段编码" prop="prop">
      <el-input v-model="formData.prop" placeholder="字段唯一标识" />
    </el-form-item>
    <el-form-item label="字段名称" prop="label">
      <el-input v-model="formData.label" placeholder="字段标签文本" />
    </el-form-item>
    <el-form-item label="标签宽度" prop="labelWidth">
      <el-input v-model="formData.labelWidth" placeholder="标签宽度，默认px" />
    </el-form-item>
    <el-form-item label="是否必填" prop="required">
      <el-switch
        v-model="formData.required"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-divider content-position="center">
      主要属性
    </el-divider>
    <component
      :is="getComponent(formData.type)"
      v-model="formData[fieldConfigName]"
      @value-change="onValueChange" />
  </el-form>
</template>
<script>
import form from 'yz-dync-form/src/mixins/form'
import { config, configStore } from 'yz-dync-form/src/core.js'
import { defaultProperty } from '../components/default.js'
import { isFunction } from 'yz-dync-form/src/utils/type.js'

export default {
  mixins: [form],
  props: {
    type: String
  },
  data() {
    return {
      fieldConfigName: config.fieldConfigName
    }
  },
  methods: {
    getComponent(type) {
      const component = configStore.getPropertyComponent(type) || defaultProperty(type)
      if (isFunction(component)) {
        return component()
      }
      return component
    }
  }
}
</script>
