<template>
  <el-form :model="formData" :label-width="labelWidth">
    <template v-if="type === 'row'">
      <el-divider content-position="center">
        列属性
      </el-divider>
      <el-form-item label="占据列数" prop="span">
        <el-input-number v-model="formData.span" placeholder="栅格占据的列数" />
      </el-form-item>
      <el-form-item label="左间隔数" prop="offset">
        <el-input-number v-model="formData.offset" placeholder="栅格左侧的间隔格数" />
      </el-form-item>
      <el-form-item label="右移动数" prop="push">
        <el-input-number v-model="formData.push" placeholder="栅格向右移动格数" />
      </el-form-item>
      <el-form-item label="左移动数" prop="pull">
        <el-input-number v-model="formData.pull" placeholder="栅格向左移动格数" />
      </el-form-item>
    </template>
    <el-divider content-position="center">
      基本属性
    </el-divider>
    <base-prop
      v-model="formData.field"
      :type="type"
      @value-change="onValueChange" />
  </el-form>
</template>

<script>
import form from 'yz-dync-form/src/mixins/form'

import BaseProp from './base'

export default {
  components: { BaseProp },
  mixins: [form],
  props: {
    type: String
  }
}
</script>
