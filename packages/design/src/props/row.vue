<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="栅格间隔" prop="gutter">
      <el-input-number v-model="formData.gutter" />
    </el-form-item>
    <el-form-item label="布局模式" prop="type">
      <el-radio-group
        v-model="formData.type"
        size="mini"
        @change="onTypeChange">
        <el-radio-button label="">
          默认
        </el-radio-button>
        <el-radio-button label="flex">
          flex
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
    <template v-if="formData.type === 'flex'">
      <el-form-item label="垂直排列" prop="align">
        <el-radio-group v-model="formData.align" size="mini">
          <el-radio-button label="top">
            top
          </el-radio-button>
          <el-radio-button label="middle">
            middle
          </el-radio-button>
          <el-radio-button label="bottom">
            bottom
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="水平排列" prop="justify">
        <el-select v-model="formData.justify">
          <el-option
            v-for="itm in justifyOptions"
            :key="itm"
            :value="itm"
            :label="itm" />
        </el-select>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import form from 'yz-dync-form/src/mixins/form'

export default {
  mixins: [form],
  data() {
    return {
      justifyOptions: ['start', 'end', 'center', 'space-around', 'space-between']
    }
  },
  methods: {
    onTypeChange(val) {
      if (val !== 'flex') {
        this.clearFormData(['align', 'justify'])
      } else {
        this.$set(this.formData, 'align', 'top')
        this.$set(this.formData, 'justify', this.justifyOptions[0])
      }
    }
  }
}
</script>
