import FormProp from './props/form.vue'
import RowProp from './props/row.vue'
import Property from './props/property.vue'

export default {
  components: { FormProp, RowProp, Property },
  props: {
    store: Object,
    height: Number
  },
  data() {
    return {
      tabs: [{
        label: '表单属性',
        name: 'form',
        render(h) {
          return (<form-prop v-model={this.store.form} />)
        },
        show() {
          return true
        }
      }, {
        label: '行属性',
        name: 'row',
        render(h) {
          return (<row-prop v-model={this.store.active.row} />)
        },
        show() {
          return this.store.active.fieldType === 'row'
        }
      }, {
        label: '字段属性',
        name: 'property',
        render(h) {
          const { col, fieldType } = this.store.active

          return (
            <property
              v-model={this.store.active.col}
              type={fieldType}
              on-value-change={value => this.$set(this.store.form.model, col.field.prop, value)}/>
          )
        },
        show() {
          return this.store.active.rowIndex !== undefined
        }
      }]
    }
  },
  render(h) {
    const { store, height, tabs } = this

    return (
      <el-tabs v-model={store.activeTab} stretch>
        {
          tabs.map(tab => {
            if (tab.show.call(this)) {
              return (
                <el-tab-pane label={tab.label} name={tab.name} key={tab.name}>
                  <el-scrollbar wrapStyle={'height:' + height + 'px;'}
                    viewStyle={{ boxSizing: 'border-box', padding: '10px 10px 0' }}>
                    {
                      tab.render.call(this, h)
                    }
                  </el-scrollbar>
                </el-tab-pane>
              )
            }
          })
        }
      </el-tabs>
    )
  }
}
