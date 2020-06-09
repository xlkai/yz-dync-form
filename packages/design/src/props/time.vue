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

    <el-form-item label="默认值" prop="value">
      <el-time-picker
        v-model="formData.value"
        :is-range="formData.isRange"
        :value-format="formData.valueFormat"
        :format="formData.format"
        :picker-options="{format: formData.format}"
        @change="onValueChange" />
    </el-form-item>

    <template v-if="formData.isRange">
      <el-form-item label="开始占位" prop="startPlaceholder">
        <el-input v-model="formData.startPlaceholder" placeholder="开始时间占位文本" />
      </el-form-item>
      <el-form-item label="结束占位" prop="endPlaceholder">
        <el-input v-model="formData.endPlaceholder" placeholder="结束时间占位文本" />
      </el-form-item>
      <el-form-item label="分隔符" prop="rangeSeparator">
        <el-input v-model="formData.rangeSeparator" placeholder="分隔符：默认-" />
      </el-form-item>
    </template>
    <el-form-item
      v-else
      label="占位文本"
      prop="placeholder">
      <el-input v-model="formData.placeholder" />
    </el-form-item>
    <el-form-item label="对齐方式" prop="align">
      <el-radio-group v-model="formData.align" size="mini">
        <el-radio-button label="left">
          左对齐
        </el-radio-button>
        <el-radio-button label="center">
          居中
        </el-radio-button>
        <el-radio-button label="right">
          右对齐
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="箭头控制" prop="arrowControl">
      <el-switch
        v-model="formData.arrowControl"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="显示格式化" prop="format">
      <el-select
        v-model="formData.format"
        allow-create
        filterable>
        <el-option value="HH:mm:ss" />
        <el-option value="HH:mm" />
      </el-select>
    </el-form-item>
    <el-form-item label="值格式化" prop="valueFormat">
      <el-select
        v-model="formData.valueFormat"
        allow-create
        filterable>
        <el-option value="HH:mm:ss" />
        <el-option value="HH:mm" />
      </el-select>
    </el-form-item>

    <el-form-item label="头部图标" prop="prefixIcon">
      <el-input v-model="formData.prefixIcon" placeholder="自定义头部图标的类名" />
    </el-form-item>
    <el-form-item label="尾部图标" prop="suffixIcon">
      <el-input v-model="formData.suffixIcon" placeholder="自定义清空图标的类名" />
    </el-form-item>

    <el-form-item label="是否编辑" prop="editable">
      <el-switch
        v-model="formData.editable"
        :active-value="true"
        :inactive-value="false" />
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
