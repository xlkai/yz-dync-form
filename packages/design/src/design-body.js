import draggable from 'vuedraggable'
import { config, configStore, componentProp } from 'yz-dync-form/src/core.js'
import { getProps } from 'yz-dync-form/src/utils/type.js'

import { defaultRender } from './components/default.js'

export default {
  components: { draggable },
  props: {
    store: Object,
    height: Number
  },
  data() {
    return {

    }
  },
  methods: {
    onDesignItemClick(rowIndex, colIndex) {
      this.store.setActive(rowIndex, colIndex)
    },
    onItemDelete(rowIndex, colIndex) {
      this.store.removeItem(rowIndex, colIndex)
    }
  },
  render(h) {
    const { store, onDesignItemClick, height, onItemDelete } = this

    const renderItem = (col, rowIndex, colIndex) => {
      const render = configStore.getRender(col.field.type) || defaultRender
      const isActive = store.active.rowIndex === rowIndex && store.active.colIndex === colIndex

      const model = {
        value: store.form.model[col.field.prop],
        callback: value => {
          this.$set(store.form.model, col.field.prop, value)
          this.$set(col.field[config.fieldConfigName], 'value', value)
        }
      }
      return (
        <el-form-item
          class={'yz-design_item' + (isActive ? ' is-active' : '')}
          props={getProps(col.field, componentProp.formItem)}
          key={rowIndex}
          nativeOnClick={e => { onDesignItemClick(rowIndex, colIndex); e.stopPropagation() }}
          nativeOnMouseover={e => { this.$set(col, 'showBtn', true) }}
          nativeOnMouseout={e => { this.$set(col, 'showBtn', false) }}>
          {render.call(this, h, col.field, model)}
          <div class="yz-design_btns" v-show={col.showBtn || isActive}>
            <i class="yz-design_btns__delete el-icon-delete"
              on-click={e => { onItemDelete(rowIndex, colIndex); e.stopPropagation() }} />
          </div>
        </el-form-item>
      )
    }

    const formData = {
      props: store.form
    }

    return (
      <el-scrollbar wrap-style={'height: ' + height + 'px;'}>
        <draggable v-model={store.rows}
          tag="el-form"
          group={config.groupName}
          component-data={formData}
          ghost-class="design-ghost"
          style={{ minHeight: (height - 17) + 'px' }}>

          {
            store.rows.map((row, rowIndex) => {
              if (row.cols !== undefined) {
                const rowData = {
                  props: getProps(row, componentProp.row)
                }
                let rowClass = 'yz-design_row is-row'
                if (store.active.rowIndex === rowIndex) {
                  rowClass += ' is-active'
                }
                return (
                  <draggable v-model={row.cols}
                    class={rowClass}
                    tag="el-row"
                    component-data={rowData}
                    group={config.groupName}
                    key={rowIndex}
                    ghost-class="design-ghost"
                    nativeOnMouseover={e => { this.$set(row, 'showBtn', true) }}
                    nativeOnMouseout={e => { this.$set(row, 'showBtn', false) }}>
                    {
                      row.cols.map((col, colIndex) => {
                        return (
                          <el-col props={getProps(col, componentProp.col)} key={colIndex}>{renderItem(col, rowIndex, colIndex)}</el-col>
                        )
                      })
                    }
                    <div class="yz-design_btns is-row" v-show={row.showBtn}>
                      <i class="yz-design_btns__delete el-icon-delete"
                        on-click={e => { onItemDelete(rowIndex); e.stopPropagation() }} />
                    </div>
                  </draggable>
                )
              } else {
                return (
                  <div class="yz-design_row">{ renderItem(row, rowIndex, 0) }</div>
                )
              }
            })
          }
        </draggable>
      </el-scrollbar>
    )
  }
}
