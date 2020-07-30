<template>
  <div id="app">
    <yz-form-design
      :height="height"
      :custom-button="customBtn"
      :data="form" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      height: 500,
      customBtn: {
        name: '自定义按钮',
        type: 'danger',
        index: 0,
        onClick: () => {
          this.$message({
            type: 'success',
            message: '我被点击了'
          })
        }
      },
      form: {
        form: { labelPosition: 'right' },
        rows: [{
          field: {
            type: 'text',
            prop: 'field0',
            label: '单行文本',
            _config: { type: 'text', placeholder: '请输入' }
          }
        },
        {
          field: {
            type: 'textarea',
            prop: 'field1',
            label: '多行文本',
            _config: { type: 'textarea', placeholder: '请输入' }
          }
        },
        {
          cols: [{
            field: {
              type: 'text',
              prop: 'field2',
              label: '单行文本',
              _config: { type: 'text', placeholder: '请输入', size: '', value: '' }
            }
          }],
          gutter: 15
        }]
      }
    }
  },
  mounted() {
    this.height = window.innerHeight
  }
}
</script>
<style lang="scss">
  body {
    margin: 0;
  }
</style>
