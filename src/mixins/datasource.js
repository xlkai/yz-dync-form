import form from './form'
import { configStore } from '../core'

export default {
  mixins: [form],
  computed: {
    datasource() {
      const { formData } = this
      if (formData.datasource && formData.datasource.config) {
        const datasource = configStore.getDataSource(formData.datasource.type)
        return datasource.getData(formData.datasource.config)
      }
      return {}
    },
    datas() {
      return this.datasource.datas || []
    },
    nameKey() {
      return this.datasource.nameKey || 'name'
    },
    valueKey() {
      return this.datasource.valueKey || 'value'
    }
  }
}
