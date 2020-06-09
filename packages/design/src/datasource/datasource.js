import { DataSource } from 'yz-dync-form/src/core.js'

const _import = (file) => require('yz-dync-form/packages/design/src/datasource/' + file + '.vue').default

export class CustomDataSource extends DataSource {
  constructor() {
    super('custom', '自定义')
  }

  getPage() {
    return _import('custom')
  }

  getData(config) {
    return {
      nameKey: 'label',
      valueKey: 'value',
      datas: config
    }
  }
}
