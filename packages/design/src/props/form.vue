<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="表单尺寸" prop="size">
      <el-radio-group v-model="formData.size" size="mini">
        <el-radio-button label="">
          默认
        </el-radio-button>
        <el-radio-button label="medium">
          中等
        </el-radio-button>
        <el-radio-button label="small">
          较小
        </el-radio-button>
        <el-radio-button label="mini">
          迷你
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签位置" prop="labelPosition">
      <el-radio-group v-model="formData.labelPosition" size="mini">
        <el-radio-button label="right">
          右对齐
        </el-radio-button>
        <el-radio-button label="left">
          左对齐
        </el-radio-button>
        <el-radio-button label="top">
          顶部对齐
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="标签宽度" prop="labelWidth">
      <el-input v-model="formData.labelWidth" placeholder="单位默认：px" />
    </el-form-item>
    <el-form-item label="隐藏*号" prop="hideRequiredAsterisk">
      <el-switch
        v-model="formData.hideRequiredAsterisk"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="显示消息" prop="showMessage">
      <el-switch
        v-model="formData.showMessage"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="行显示" prop="inlineMessage">
      <el-switch
        v-model="formData.inlineMessage"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="显示图标" prop="statusIcon">
      <el-switch
        v-model="formData.statusIcon"
        :active-value="true"
        :inactive-value="false" />
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
  name: 'FormProp',
  mixins: [form]
}
</script>
