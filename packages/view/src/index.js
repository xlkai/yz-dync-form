import { configStore, componentProp } from 'yz-dync-form/src/core.js'
import { getProps } from 'yz-dync-form/src/utils/type.js'
import { defaultRender } from '../../design/src/components/default.js'
import form from 'yz-dync-form/src/mixins/form.js'

export default {
  name: 'YzFormView',
  mixins: [form],
  props: {
    data: Object
  },
  computed: {
    formProp() {
      const prop = getProps(this.data, componentProp.form)
      prop.model = this.formData
      return prop
    },
    rows() {
      return this.data.rows
    }
  },
  render(h) {
    const { formProp, rows, formData } = this

    const renderItem = (field, rowIndex) => {
      const render = configStore.getRender(field.type) || defaultRender

      const model = {
        value: formData[field.type],
        callback: value => {
          this.$set(this.formData, field.type, value)
        }
      }

      return (
        <el-form-item props={getProps(field, componentProp.formItem)} key={rowIndex}>
          { render.call(this, h, field, model) }
        </el-form-item>
      )
    }

    if (rows && rows.length) {
      return (
        <el-form props={formProp} class="yz-form-view">
          {
            rows.map((row, rowIndex) => {
              if (row.cols !== undefined) {
                return (
                  <el-row props={getProps(row, componentProp.row)} key={rowIndex}>
                    {
                      row.cols.map((col, colIndex) => {
                        return (
                          <el-col props={getProps(col, componentProp.col)} key={colIndex}>
                            { renderItem(col.field) }
                          </el-col>
                        )
                      })
                    }
                  </el-row>)
              } else {
                return renderItem(row.field, rowIndex)
              }
            })
          }
        </el-form>
      )
    } else {
      const emptySlot = this.$slots.empty
      if (emptySlot) {
        return h(emptySlot)
      } else {
        return (<div class="yz-form-view_empty">未配置表单组件</div>)
      }
    }
  }
}
