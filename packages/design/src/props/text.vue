<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="大小" prop="size">
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
    <el-form-item label="占位文本" prop="placeholder">
      <el-input v-model="formData.placeholder" placeholder="输入框占位文本" />
    </el-form-item>
    <el-form-item label="默认值" prop="value">
      <el-input
        v-model="formData.value"
        :type="formData.type"
        :rows="formData.rows"
        :autosize="formData.autosize"
        :show-password="formData.showPassword"
        @input="onValueChange" />
    </el-form-item>
    <el-form-item label="最小长度" prop="minlength">
      <el-input-number v-model="formData.minlength" placeholder="最小长度" />
    </el-form-item>
    <el-form-item label="最大长度" prop="maxlength">
      <el-input-number v-model="formData.maxlength" placeholder="最大长度" />
    </el-form-item>
    <el-form-item label="字数统计" prop="showWordLimit">
      <el-switch
        v-model="formData.showWordLimit"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <template v-if="formData.type === 'textarea'">
      <el-form-item label="行数" prop="rows">
        <el-input-number v-model="formData.rows" placeholder="输入框行数：默认2行" />
      </el-form-item>
      <el-form-item label="自适应高度" prop="autosize">
        <el-switch
          v-model="formData.autosize"
          :active-value="true"
          :inactive-value="false" />
      </el-form-item>
    </template>
    <el-form-item label="头部图标" prop="prefixIcon">
      <el-input v-model="formData.prefixIcon" placeholder="输入框头部图标" />
    </el-form-item>
    <el-form-item label="尾部图标" prop="suffixIcon">
      <el-input v-model="formData.suffixIcon" placeholder="输入框尾部图标" />
    </el-form-item>
    <el-form-item label="是否清除" prop="clearable">
      <el-switch
        v-model="formData.clearable"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="是否只读" prop="readonly">
      <el-switch
        v-model="formData.readonly"
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
  mixins: [form]
}
</script>
