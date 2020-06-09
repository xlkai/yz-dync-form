import Vue from 'vue'
import { componentProp } from 'yz-dync-form/src/core.js'
import { getProps, clean } from 'yz-dync-form/src/utils/type.js'

const deepmerge = require('deepmerge')

export default Vue.extend({
  data() {
    return {
      activeTab: 'form',
      rows: [],
      form: {
        model: {},
        size: '',
        labelPosition: 'right'
      },
      active: {}
    }
  },

  methods: {
    setActive(rowIndex, colIndex) {
      if (this.active.rowIndex === rowIndex &&
        this.active.colIndex === colIndex) {
        return
      }

      const { getRow, getCols } = this

      const res = {
        rowIndex,
        colIndex
      }

      const row = getRow(rowIndex)
      let fieldType
      if (row.cols !== undefined) {
        res.row = row
        res.col = getCols(rowIndex)[colIndex]
        fieldType = 'row'
      } else {
        res.col = row
        fieldType = row.field.type
      }
      res.fieldType = fieldType
      this.active = res

      this.activeTab = 'property'
    },

    getRow(rowIndex) {
      const row = this.rows[rowIndex]
      if (!row) {
        console.warn('Not found data：rowIndex=' + rowIndex)
        return
      }
      return row
    },

    getCols(rowIndex) {
      const row = this.rows[rowIndex]
      if (row) {
        const cols = row.cols
        if (!cols) {
          console.warn('Not found "cols"：rowIndex=' + rowIndex)
          return
        }
        return cols
      }
    },

    removeItem(rowIndex, colIndex) {
      const row = this.getRow(rowIndex)
      if (row) {
        const removeActive = () => {
          this.active = {}
          this.activeTab = 'form'
        }
        if (row.cols === undefined || colIndex === undefined) {
          this.rows.splice(rowIndex, 1)
          if (this.active.rowIndex === rowIndex) {
            removeActive()
          }
        } else {
          row.cols.splice(colIndex, 1)
          if (this.active.rowIndex === rowIndex &&
            this.active.colIndex === colIndex) {
            removeActive()
          }
        }
      }
    },

    clone() {
      const result = clean(getProps(this.form, componentProp.form))
      result.rows = this.rows.map(row => {
        const prop = deepmerge({}, row, { clone: true })
        return clean(prop)
      })
      localStorage.setItem('localFormDesign', result)
      return result
    },

    clear() {
      this.activeTab = 'form'
      this.rows = []
      this.form = {
        model: {},
        size: '',
        labelPosition: 'right'
      }
      this.active = {}
    }

  }
})
