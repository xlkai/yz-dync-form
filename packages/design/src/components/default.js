import { isFunction } from 'yz-dync-form/src/utils/type.js'
import { ComponentGroup, config, configStore } from 'yz-dync-form/src/core.js'

export const defaultClone = function (prop, getFieldIndex) {
  const res = {}

  if (prop.type === 'row') {
    res.cols = []
    res.type = ''
    res.gutter = 15
  } else {
    const field = {
      type: prop.type,
      prop: 'field' + getFieldIndex(),
      label: prop.name
    }

    let fieldConfig
    if (prop.default) {
      fieldConfig = isFunction(prop.default) ? prop.default(prop) : prop.default
    } else {
      fieldConfig = {}
    }
    field[config.fieldConfigName] = fieldConfig
    res.field = field
  }
  return res
}

export const defaultRender = function (h, field, model) {
  const component = configStore.getComponent(field.type)
  let tag = component.tag
  if (isFunction(tag)) {
    tag = tag(field)
  }

  const attrs = Object.assign({}, field[config.fieldConfigName])
  // 特殊处理
  if (field.type === 'time' && attrs.format) {
    attrs.pickerOptions = {
      format: attrs.format
    }
  }

  let children = []
  if (component.renderChildren) {
    children = component.renderChildren(h, field)
  }
  return h(tag, {
    attrs: attrs,
    model: model
  }, children)
}

const typeConvert = {
  textarea: 'text',
  password: 'text',
  timerange: 'time',
  daterange: 'date',
  'multiple-select': 'select'
}

export const defaultProperty = function (type) {
  return require('yz-dync-form/packages/design/src/props/' + (typeConvert[type] || type) + '.vue').default
}

const renderChildren = (datasource, render) => {
  if (datasource && datasource.config) {
    const source = configStore.getDataSource(datasource.type)
    const { datas, nameKey, valueKey } = source.getData(datasource.config)

    const name = nameKey || 'name'
    const value = valueKey || 'value'
    return datas.map(itm => render(itm, name, value))
  }
}

export const components = {
  [ComponentGroup.INPUT.type]: [{
    type: 'text',
    icon: 'el-icon-edit',
    name: '单行文本',
    tag: 'el-input',
    default() {
      return {
        type: 'text',
        placeholder: '请输入',
        size: '',
        value: ''
      }
    }
  }, {
    type: 'textarea',
    icon: 'el-icon-edit-outline',
    name: '多行文本',
    tag: 'el-input',
    default() {
      return {
        type: 'textarea',
        placeholder: '请输入',
        size: '',
        value: ''
      }
    }
  }, {
    type: 'password',
    icon: 'el-icon-lock',
    name: '密 码',
    tag: 'el-input',
    default() {
      return {
        type: 'text',
        showPassword: true,
        placeholder: '请输入',
        size: '',
        value: ''
      }
    }
  }, {
    type: 'number',
    icon: 'el-icon-tickets',
    name: '计数器',
    tag: 'el-input-number',
    default() {
      return {
        step: 1,
        size: '',
        controlsPosition: '',
        controls: true,
        placeholder: '请输入',
        value: ''
      }
    }
  }],
  [ComponentGroup.SELECT.type]: [
    {
      type: 'select',
      icon: 'el-icon-arrow-down',
      name: '下拉单选',
      tag: 'el-select',
      default() {
        return {
          placeholder: '请选择',
          clearable: true,
          size: '',
          valueKey: 'value',
          value: ''
        }
      },
      renderChildren(h, field) {
        const _config = field[config.fieldConfigName]
        return renderChildren(_config.datasource, (itm, nameKey, valueKey) => {
          if (_config.valueKey !== valueKey) {
            _config.valueKey = valueKey
          }
          return (<el-option value={itm[valueKey]} label={itm[nameKey]} />)
        })
      }
    }, {
      type: 'multiple-select',
      icon: 'el-icon-arrow-down',
      name: '下拉多选',
      tag: 'el-select',
      default() {
        return {
          placeholder: '请选择',
          multiple: true,
          clearable: true,
          size: '',
          valueKey: 'value',
          value: []
        }
      },
      renderChildren(h, field) {
        const _config = field[config.fieldConfigName]
        return renderChildren(_config.datasource, (itm, nameKey, valueKey) => {
          if (_config.valueKey !== valueKey) {
            _config.valueKey = valueKey
          }
          return (<el-option value={itm[valueKey]} label={itm[nameKey]} />)
        })
      }
    }, {
      type: 'radio',
      icon: 'el-icon-circle-check',
      name: '单选框组',
      tag: 'el-radio-group',
      default() {
        return {
          border: false,
          size: '',
          type: 'default',
          value: ''
        }
      },
      renderChildren(h, field) {
        const tag = field.type === 'button' ? 'el-radio-button' : 'el-radio'
        return renderChildren(field[config.fieldConfigName].datasource, (itm, nameKey, valueKey) => {
          const prop = {
            border: field.type === 'border',
            label: itm[valueKey]
          }
          return h(tag, {
            props: prop
          }, itm[nameKey])
        })
      }
    }, {
      type: 'checkbox',
      icon: 'el-icon-copy-document',
      name: '多选框组',
      tag(prop) {
        const _config = prop[config.fieldConfigName]
        if (_config.sizeType === 'single') {
          return 'el-checkbox'
        } else {
          return 'el-checkbox-group'
        }
      },
      default() {
        return {
          border: false,
          sizeType: 'single',
          type: 'default',
          trueLabel: 'true',
          falseLabel: 'false',
          size: '',
          value: 'false'
        }
      },
      renderChildren(h, field) {
        const tag = field.type === 'button' ? 'el-checkbox-button' : 'el-checkbox'
        return renderChildren(field[config.fieldConfigName].datasource, (itm, nameKey, valueKey) => {
          const prop = {
            border: field.type === 'border',
            label: itm[valueKey]
          }
          return h(tag, {
            props: prop
          }, itm[nameKey])
        })
      }
    }, {
      type: 'time',
      icon: 'el-icon-time',
      name: '时间选择',
      tag: 'el-time-picker',
      default() {
        return {
          clearable: true,
          type: 'time',
          size: '',
          align: 'left',
          value: '',
          format: 'HH:mm:ss'
        }
      }
    }, {
      type: 'timerange',
      icon: 'el-icon-alarm-clock',
      name: '时间范围',
      tag: 'el-time-picker',
      default() {
        return {
          clearable: true,
          type: 'time',
          size: '',
          align: 'left',
          isRange: true,
          value: [],
          format: 'HH:mm:ss'
        }
      }
    }, {
      type: 'date',
      icon: 'el-icon-date',
      name: '日期选择',
      tag: 'el-date-picker',
      default() {
        return {
          clearable: true,
          type: 'date',
          size: '',
          align: 'left',
          value: '',
          format: 'yyyy-MM-dd'
        }
      }
    }, {
      type: 'daterange',
      icon: 'el-icon-c-scale-to-original',
      name: '日期范围',
      tag: 'el-date-picker',
      default() {
        return {
          clearable: true,
          type: 'daterange',
          size: '',
          align: 'left',
          value: [],
          format: 'yyyy-MM-dd'
        }
      }
    }, {
      type: 'switch',
      icon: 'el-icon-open',
      name: '开 关',
      tag: 'el-switch',
      default() {
        return {
          width: 40,
          value: '',
          activeValue: 'true',
          inactiveValue: 'false'
        }
      }
    }
  ],
  [ComponentGroup.LAYOUT.type]: [{
    type: 'row',
    icon: 'el-icon-document-copy',
    name: '行容器'
  }]
}
