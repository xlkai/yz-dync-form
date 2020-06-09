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
      <el-radio-group v-model="formData.value" @change="onValueChange">
        <el-radio
          v-for="(itm, index) in datas"
          :key="index"
          :label="itm[valueKey]">
          {{ itm[nameKey] }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文本颜色" prop="textColor">
      <el-input v-model="formData.textColor" />
    </el-form-item>
    <el-form-item label="填充颜色" prop="fill">
      <el-input v-model="formData.fill" />
    </el-form-item>
    <el-form-item label="选项样式" prop="type">
      <el-radio-group v-model="formData.type" size="mini">
        <el-radio-button
          v-for="itm in optionTypes"
          :key="itm.value"
          :label="itm.value">
          {{ itm.name }}
        </el-radio-button>
      </el-radio-group>
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
  mixins: [datasource],
  data() {
    return {
      optionTypes: [{
        name: '默认',
        value: 'default'
      }, {
        name: '边框',
        value: 'border'
      }, {
        name: '按钮',
        value: 'button'
      }]
    }
  }
}
</script>
