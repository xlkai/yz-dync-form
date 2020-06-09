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
      <el-select
        ref="select"
        v-model="formData.value"
        :multiple="formData.multiple"
        @change="onValueChange">
        <el-option
          v-for="itm in datas"
          :key="itm[valueKey]"
          :value="itm[valueKey]"
          :label="itm[nameKey]" />
      </el-select>
    </el-form-item>
    <el-form-item label="值字段" prop="valueKey">
      <el-input v-model="formData.valueKey" placeholder="默认：value" />
    </el-form-item>
    <template v-if="formData.multiple">
      <el-form-item label="选择限制" prop="multipleLimit">
        <el-input-number v-model="formData.multipleLimit" placeholder="0不限制" />
      </el-form-item>
      <el-form-item
        label="是否展示"
        prop="collapseTags">
        <el-switch
          v-model="formData.collapseTags"
          :active-value="true"
          :inactive-value="false" />
      </el-form-item>
    </template>
    <el-form-item label="是否搜索" prop="filterable">
      <el-switch
        v-model="formData.filterable"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>
    <el-form-item label="允许创建" prop="allowCreate">
      <el-switch
        v-model="formData.allowCreate"
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

    <data-source
      v-model="formData.datasource"
      title="选项" />
  </el-form>
</template>

<script>
import datasource from 'yz-dync-form/src/mixins/datasource'
import DataSource from '../datasource/index'

export default {
  components: { DataSource },
  mixins: [datasource]
}
</script>
