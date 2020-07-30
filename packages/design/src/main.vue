<template>
  <div class="yz-design">
    <div class="yz-design_main" :style="{ height: height+'px' }">
      <div class="yz-design_header">
        <div class="yz-design_title">
          <i class="el-icon-platform-eleme" />
          <span>表单设计器</span>
        </div>
        <button-group :buttons="buttons" size="mini" />
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
      append-to-body
      title="动态表单预览" />
  </div>
</template>
<script>
import DesignComponent from './design-component.js'
import DesignBody from './design-body.js'
import DesignProperty from './design-property.js'
import Store from './store'
import YzFormDialogView from 'yz-dync-form/packages/dialog-view'
import ButtonGroup from './button-group'

const deepmerge = require('deepmerge')
export default {
  name: 'YzFormDesign',
  components: { DesignComponent, DesignBody, DesignProperty, YzFormDialogView, ButtonGroup },
  props: {
    height: {
      type: Number,
      default: 600
    },
    clone: Function,

    // 默认表单加载数据：{ form: {}, rows: []}
    data: Object,

    // 自定义按钮
    customButton: [Array, Object]
  },
  data() {
    return {
      dialogVisible: false,
      previewData: {},
      store: null,
      buttons: [{
        name: '清空',
        type: 'danger',
        onClick: () => {
          // 清空
          this.$confirm('此操作将清空所有组件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(_ => {
            this.store.clear()
          })
        }
      }, {
        name: '预览',
        type: 'success',
        onClick: () => {
          // 预览
          this.dialogVisible = true
        }
      }, {
        name: '保存',
        type: 'primary',
        onClick: () => {
          // 保存
          this.$emit('submit', this.clone ? this.clone(this.previewData) : this.previewData)
        }
      }]
    }
  },
  watch: {
    'store._data': {
      handler(val) {
        this.previewData = this.store.clone()
      },
      deep: true
    },
    data: {
      handler(val) {
        // 初始化加载
        this.initData(val)
      }
    },
    customButton: {
      handler(val) {
        if (!val) {
          return
        }
        const addBtn = (btn) => {
          if (btn.index !== undefined && btn.index >= 0) {
            this.buttons.splice(btn.index, 0, btn)
          } else {
            this.buttons.push(btn)
          }
        }
        if (Array.isArray(val)) {
          val.forEach(itm => {
            addBtn(itm)
          })
        } else {
          addBtn(val)
        }
      },
      immediate: true
    }
  },
  created() {
    this.store = new Store()
    this.initData(this.data)
  },
  methods: {
    initData(val) {
      if (val) {
        const { form, rows } = val
        if (form) {
          deepmerge(this.store.form, form)
        }
        if (rows && rows.length) {
          this.store.rows = rows
        }
      }
    }
  }
}
</script>
