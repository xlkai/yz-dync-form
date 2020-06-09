import FormView from './src/index'

FormView.install = function (Vue, opts = {}) {
  Vue.component(FormView.name, FormView)
}

export default FormView
