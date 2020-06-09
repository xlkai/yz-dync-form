<template>
  <div class="yz-design_option">
    <draggable
      v-model="datas"
      handle=".yz-design_option__drage"
      draggable=".yz-design_option__item"
      @change="onDrageEnd">
      <div
        v-for="(itm, index) in datas"
        :key="index"
        class="yz-design_option__item">
        <span class="yz-design_option__drage"><i class="el-icon-s-operation" /></span>
        <el-input
          v-model="itm.label"
          placeholder="选项名称"
          @input="onChange" />
        <el-input
          v-model="itm.value"
          placeholder="选项值"
          @input="onChange" />
        <i class="el-icon-remove-outline" @click="handleDelete(itm, index)" />
      </div>
    </draggable>

    <div class="yz-design_option__add">
      <el-button
        type="text"
        icon="el-icon-circle-plus-outline"
        @click="handleAdd">
        新增选项
      </el-button>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  props: {
    value: Array
  },
  data() {
    return {
      datas: [{}]
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val && val.length) {
          this.datas = val
        }
      },
      immediate: true
    }
  },
  methods: {
    onChange() {
      this.$emit('input', this.datas)
    },
    handleDelete(itm, index) {
      this.datas.splice(index, 1)
      this.onChange()
    },
    handleAdd() {
      this.datas.push({})
      this.onChange()
    },
    onDrageEnd() {
      this.onChange()
    }
  }
}
</script>
