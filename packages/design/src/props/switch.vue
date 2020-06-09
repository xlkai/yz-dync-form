<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="默认值" prop="value">
      <el-switch
        v-model="formData.value"
        :active-value="formData.activeValue"
        :inactive-value="formData.inactiveValue"
        @change="onValueChange" />
    </el-form-item>
    <el-form-item label="switch宽度" prop="width">
      <el-input-number v-model="formData.width" placeholder="switch 的宽度（像素）" />
    </el-form-item>
    <el-form-item label="选中图标" prop="activeIconClass">
      <el-input v-model="formData.activeIconClass" placeholder="打开时所显示图标的类名" />
    </el-form-item>
    <el-form-item label="关闭图标" prop="inactiveIconClass">
      <el-input v-model="formData.inactiveIconClass" placeholder="关闭时所显示图标的类名" />
    </el-form-item>
    <el-form-item label="选中文字" prop="activeText">
      <el-input v-model="formData.activeText" placeholder="打开时的文字描述" />
    </el-form-item>
    <el-form-item label="关闭文字" prop="inactiveText">
      <el-input v-model="formData.inactiveText" placeholder="关闭时的文字描述" />
    </el-form-item>
    <el-form-item label="选中值" prop="activeValue">
      <el-input v-model="formData.activeValue" placeholder="打开时的值" />
    </el-form-item>
    <el-form-item label="关闭值" prop="inactiveValue">
      <el-input v-model="formData.inactiveValue" placeholder="关闭时的值" />
    </el-form-item>
    <el-form-item label="选中颜色" prop="activeColor">
      <el-input v-model="formData.activeColor" placeholder="打开时的背景色" />
    </el-form-item>
    <el-form-item label="关闭颜色" prop="inactiveColor">
      <el-input v-model="formData.inactiveColor" placeholder="关闭时的背景色" />
    </el-form-item>
    <el-form-item label="是否禁用" prop="disabled">
      <el-switch
        v-model="formData.disabled"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
  </el-form>
</template>
<script>
import form from 'yz-dync-form/src/mixins/form'

export default {
  mixins: [form]
}
</script>
