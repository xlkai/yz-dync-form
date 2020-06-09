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
      <el-input-number v-model="formData.value" @change="onValueChange" />
    </el-form-item>
    <el-row :gutter="10">
      <el-col :span="14">
        <el-form-item label="值限制" prop="minlength">
          <el-input-number v-model="formData.minlength" placeholder="最小值" />
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="maxlength" label-width="0">
          <el-input-number v-model="formData.maxlength" placeholder="最大值" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="计数步长" prop="step">
      <el-input-number v-model="formData.step" placeholder="计数器步长" />
    </el-form-item>
    <el-form-item label="只输倍数" prop="stepStrictly">
      <el-switch
        v-model="formData.stepStrictly"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="数值精度" prop="precision">
      <el-input-number v-model="formData.precision" placeholder="数值精度" />
    </el-form-item>
    <el-form-item label="显示按钮" prop="controls">
      <el-switch
        v-model="formData.controls"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="按钮位置" prop="controlsPosition">
      <el-radio-group v-model="formData.controlsPosition" size="mini">
        <el-radio-button label="">
          默认
        </el-radio-button>
        <el-radio-button label="right">
          右对齐
        </el-radio-button>
      </el-radio-group>
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
