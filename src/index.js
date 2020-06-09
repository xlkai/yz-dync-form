import FormDesign from '../packages/design/index.js'
import FormView from '../packages/view/index.js'
import FormDialogView from '../packages/dialog-view/index.js'

const install = function (Vue, opts = {}) {
  Vue.use(FormDesign, opts)
  Vue.use(FormView, opts)
  Vue.use(FormDialogView, opts)
}

export default {
  install,
  FormDesign,
  FormView,
  FormDialogView
}
