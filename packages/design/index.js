import FormDesign from './src/main'
import { configStore } from 'yz-dync-form/src/core.js'
import { components } from './src/components/default.js'
import { CustomDataSource } from './src/datasource/datasource.js'

FormDesign.install = function (Vue, opts = {}) {
  // 默认
  for (const group in components) {
    const cols = components[group]
    if (cols.length) {
      cols.forEach(col => {
        configStore.registerComponent(group, col, false)
      })
    }
  }

  // 注册数据源
  configStore.registerDataSource(new CustomDataSource())
  if (opts.datasource && opts.datasource.length) {
    opts.datasource.forEach(datasource => {
      if (datasource.index !== undefined) {
        configStore.registerDataSource(datasource, datasource.index)
      } else {
        configStore.registerDataSource(datasource)
      }
    })
  }

  Vue.component(FormDesign.name, FormDesign)
}

export default FormDesign
