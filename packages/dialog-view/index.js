import FormDialogView from './src/index'

FormDialogView.install = function (Vue, opts = {}) {
  Vue.component(FormDialogView.name, FormDialogView)
}

export default FormDialogView
