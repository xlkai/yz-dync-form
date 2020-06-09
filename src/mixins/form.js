export default {
  props: {
    value: Object
  },
  data() {
    return {
      formData: {},
      labelWidth: '90px'
    }
  },
  /* created() {
    const { value, defaultProp } = this
    if (defaultProp) {
      this.formData = Object.assign({}, defaultProp, value)
    } else {
      this.formData = value || {}
    }
  }, */
  watch: {
    value: {
      handler(val) {
        if (val && val !== this.formData) {
          this.formData = val
        }
      },
      deep: true,
      immediate: true
    },
    formData: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    }
  },
  methods: {
    clearFormData(props, prop = {}) {
      if (props && props.length) {
        props.forEach(itm => {
          this.formData[itm] = prop[itm]
        })
      }
    },
    onValueChange(val) {
      this.$emit('value-change', val)
    }
  }
}
