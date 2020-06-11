<template>
  <div class="yz-design">
    <div class="yz-design_main" :style="{ height: height+'px' }">
      <div class="yz-design_header">
        <div class="yz-design_title">
          <i class="el-icon-platform-eleme" />
          <span>表单设计器</span>
        </div>
        <div class="yz-design_btngroup">
          <el-button
            type="danger"
            size="mini"
            @click="onClear">
            清空
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="onPreview">
            预览
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="onSave">
            保存
          </el-button>
        </div>
      </div>
      <div class="yz-design_content">
        <div class="yz-design_components">
          <el-scrollbar
            :wrap-style="'height: '+ (height - 45)+'px;'"
            view-style="padding: 8px; box-sizing: border-box;">
            <design-component />
          </el-scrollbar>
        </div>
        <div class="yz-design_body">
          <design-body :store="store" :height="height - 45" />
        </div>
      </div>
    </div>
    <div class="yz-design_property">
      <design-property :store="store" :height="height - 45" />
    </div>

    <YzFormDialogView
      :visible.sync="dialogVisible"
      :data="previewData"
      title="动态表单预览" />
  </div>
</template>
<script>
import DesignComponent from './design-component.js'
import DesignBody from './design-body.js'
import DesignProperty from './design-property.js'
import Store from './store'
import YzFormDialogView from 'yz-dync-form/packages/dialog-view'

const deepmerge = require('deepmerge')
export default {
  name: 'YzFormDesign',
  components: { DesignComponent, DesignBody, DesignProperty, YzFormDialogView },
  props: {
    height: {
      type: Number,
      default: 600
    },
    clone: Function,
    data: Object
  },
  data() {
    return {
      dialogVisible: false,
      previewData: {},
      store: null
    }
  },
  watch: {
    'store._data': {
      handler(val) {
        this.previewData = this.store.clone()
      },
      deep: true
    }
  },
  created() {
    this.store = new Store()
    // 初始化加载
    if (this.data) {
      const { form, rows } = this.data
      if (form) {
        deepmerge(this.store.form, form)
      }
      if (rows && rows.length) {
        this.store.rows = rows
      }
    }
  },
  methods: {
    onClear() {
      // 清空
      this.$confirm('此操作将清空所有组件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        this.store.clear()
      })
    },
    onSave() {
      // 保存
      this.$emit('submit', this.clone ? this.clone(this.previewData) : this.previewData)
    },
    onPreview() {
      // 预览
      this.dialogVisible = true
    }
  }
}
</script>
