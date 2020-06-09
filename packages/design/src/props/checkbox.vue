<template>
  <el-form :model="formData" :label-width="labelWidth">
    <el-form-item label="选框类型" prop="sizeType">
      <el-radio-group
        v-model="formData.sizeType"
        size="mini"
        @change="onTypeChange">
        <el-radio-button label="single">
          单个
        </el-radio-button>
        <el-radio-button label="multiple">
          多个
        </el-radio-button>
      </el-radio-group>
    </el-form-item>

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

    <!-- 单个选框 -->
    <template v-if="formData.sizeType === 'single'">
      <el-form-item label="选中值" prop="trueLabel">
        <el-input v-model="formData.trueLabel" placeholder="默认为true" />
      </el-form-item>
      <el-form-item label="未选中值" prop="falseLabel">
        <el-input v-model="formData.falseLabel" placeholder="默认为false" />
      </el-form-item>
      <el-form-item label="提示文本" prop="label">
        <el-input v-model="formData.label" />
      </el-form-item>
      <el-form-item label="默认选中" prop="checked">
        <el-switch
          v-model="formData.checked"
          :active-value="true"
          :inactive-value="false"
          @change="onCheckedChange" />
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item
        v-show="datas.length"
        label="默认值"
        prop="value">
        <el-checkbox-group v-model="formData.value">
          <el-checkbox
            v-for="(itm, index) in datas"
            :key="index"
            :label="itm[valueKey]">
            {{ itm[nameKey] }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="文本颜色" prop="textColor">
        <el-input v-model="formData.textColor" />
      </el-form-item>
      <el-form-item label="填充颜色" prop="fill">
        <el-input v-model="formData.fill" />
      </el-form-item>
    </template>

    <el-form-item label="是否禁用" prop="disabled">
      <el-switch
        v-model="formData.disabled"
        :active-value="true"
        :inactive-value="false" />
    </el-form-item>

    <data-source
      v-if="formData.sizeType === 'multiple'"
      v-model="formData.datasource"
      title="选项"
      :single="false" />
  </el-form>
</template>
<script>
import datasource from 'yz-dync-form/src/mixins/datasource'
import DataSource from '../datasource/index'
import { configStore } from 'yz-dync-form/src/core.js'

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
  },
  computed: {
    component() {
      return configStore.getComponent('checkbox')
    }
  },
  watch: {
    'formData.value'(val) {
      this.onValueChange(val)
    }
  },
  methods: {
    onTypeChange(val) {
      if (val === 'single') {
        this.formData = this.component.default()
      } else if (val === 'multiple') {
        this.formData.value = []
        this.clearFormData(['trueLabel', 'falseLabel', 'checked', 'label', 'value'], { value: [] })
      }
    },
    onCheckedChange(val) {
      if (val === true) {
        this.formData.value = this.formData.trueLabel || 'true'
      } else {
        this.formData.value = this.formData.falseLabel || 'false'
      }
    }
  }
}
</script>
