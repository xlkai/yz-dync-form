import YzFormView from 'yz-dync-form/packages/view'

export default {
  name: 'YzFormDialogView',
  components: { YzFormView },
  props: {
    visible: Boolean,
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.show = val
      },
      immediate: true
    }
  },
  methods: {
    onVisible(val) {
      this.show = val
      this.$emit('update:visible', this.show)
    }
  },
  render(h) {
    const { show, onVisible, data } = this
    return (
      <el-dialog class="yz-form-view_dialog" visible={show} props={this.$attrs}
        on={{ 'update:visible': onVisible }}>
        <slot name="title" />
        <yz-form-view data={data} />
        <slot name="footer" />
      </el-dialog>
    )
  }
}
