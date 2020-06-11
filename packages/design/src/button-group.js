export default {
  props: {
    size: String,
    buttons: {
      type: Array,
      default() {
        return []
      }
    }
  },
  render(h) {
    const { buttons, size } = this
    return (
      <div class="yz-design_btngroup">
        {
          buttons.map(itm => {
            const prop = Object.assign({}, itm)
            if (size) {
              prop.size = size
            }
            return (<el-button props={prop} nativeOnClick={itm.onClick}>{itm.name}</el-button>)
          })
        }
      </div>
    )
  }
}
