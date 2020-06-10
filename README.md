# yz-dync-form

>基于element-ui 2.x开发的动态表单设计器组件，以及表单查看组件。[点击查看](https://xlkai.github.io/yz-dync-form)

## 丰富特性
>1.基于element-ui 2.x；<br>
>2.内含丰富表单组件；<br>
>3.可以实现自定义新增或删除表单组件；<br>
>4.可以自定义实现部分组件的数据来源操作<br>

## 内含组件
表单设计器，包含以下组件：
>* 输入型组件：单行文本、多行文本、密码框、计数器
>* 选择型组件：下拉单选、下拉多选、单选框组、多选框组、时间选择、时间范围、日期选择、日期范围、开关
>* 布局型组件：行容器

## Install
```shell
npm install element-ui -S
npm install vuedraggable -S
npm install yz-dync-form -S
```

## Quick Start
```javascript
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import YzDyncForm from 'yz-dync-form'
import 'yz-dync-form/lib/styles/index.css'
// or 
import 'yz-dync-form/packages/styles/src/index.scss'

Vue.use(Element)
Vue.use(YzDyncForm)

// or
import {
  FormDesign,
  FormView,
  FormDialogView
  // ...
} from 'yz-dync-form'

Vue.use(FormDesign)
Vue.use(FormView)
Vue.use(FormDialogView)
```

## 表单设计器
>内含丰富组件

```vue
<template>
  <yz-form-design
    :height="domHeight"
    :clone="clone"
    @submit="onSubmit"/>
</template>

<script>
export default {
  data() {
    return {
      domHeight: 600 //表单设计器整体高度
    }
  },
  methods: {
    clone(form) {
      // 表单配置自定义格式化
      return form
    },
    onSubmit(form) {
      console.log(form)
      //表单提交按钮点击事件
    }
  }
}
</script>
```

## 表单查看

```html
<template>
  <div>
    <!-- 普通表单查看 -->
    <yz-form-view :data="form" :rules="rules" />

    <!-- 自带Dialog表单查看 -->
    <yz-form-dialog-view :data="form" :rules="rules" v-bind="dialogProp">
      <template slot="title">
        <!-- dialog标题slot -->
      </template>

      <template slot="footer">
        <!-- dialog底部slot -->
      </template>
    </yz-form-dialog-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rules: {
        //表单校验规则
      },
      form: {
        rows: [],
        //...
        //el-form配置属性
      },
      dialogProp: {
        //支持el-dialog所有配置属性
      }
    }
  }
}
</script>
```

## 自定义操作
>自定义实现组件注册、部分组件的数据源注册、组件自定义渲染等

```javascript
import { configStore, config } from 'yz-dync-form/lib/core.js'

/**
 * 注册组件类别
 */
const groupIndex = 0 //参数可选，若定义则表示新增的组件类别所排序的位置
configStore.registerGroup({
  name: '组别名称',
  type: '组别编号（唯一）'
}, groupIndex)


/**
 * 注册组件 
 */
const groupType = '' //组别编号，可选值：input, select, layout, 自定义的组别编号
const component = {
  type: '组件唯一标识',
  icon: '组件图标class名称',
  name: '组件名称',
  tag: '渲染组件的标签，可以是字符串类型，也可以是一个函数，函数参数为组件默认属性，例如：e-input',
  default() { //组件默认属性
    return {}
  },
  render(h, field, model) {
    // 组件渲染函数。可选，不传则使用默认渲染函数，但是不传时，tag参数必填
    // 例子
    return h('el-input', {
      attrs: field[config.fieldConfigName],
      model: model
    })
  },
  renderChildren(h, field) {
    // 渲染子组件。可选，如果组件下有子组件，则必传，比如el-select下有el-option
    // 例子
    return (<el-option />)
  }
}
const sortable = true //是否重新排序，默认true，设置排序条件，可在组件中新增getOrder()方法，返回值越小排序越前
configStore.registerComponent(groupType, component, sortable)


/**
 * 注册组件render
 */
configStore.registerRender('组件唯一标识', (h, field, model) => {
  // 例子
  return h('el-input', {
    attrs: field[config.fieldConfigName],
    model: model
  })
})


/**
 * 注册组件属性配置页面
 */
import TextProp from 'yz-dync-form/packages/design/src/props/text'
configStore.registerPropertyComponent('组件唯一标识', TextProp) 
```

## 自定义数据源
>部分组件，包含子组件，例如下拉选择框，需要配置下拉选项。组件里面已经包含手动新增选项功能，如果想要从网络接口获取数据作为下拉选项，则可以用到以下功能

```javascript
import { configStore, DataSource } from 'yz-dync-form/lib/core.js'

// 例子
import Custom from 'yz-dync-form/packages/design/src/datasource/custom'

class CustomDataSource extends DataSource {
  constructor() {
    super('数据源唯一标识', '数据源名称')
  }

  getPage() {
    //数据源配置页面
    return Custom
  }

  getData(config) {
    // config为数据源配置页面返回的配置项
    // ps: 返回结果咱不支持异步操作，需同步返回结果，后续再更新
    return {
      nameKey: 'label', 
      valueKey: 'value',
      datas: config //结果
    }
  }
}

const index = -1 //数据源的位置，系统默认注册了一个数据源
configStore.registerDataSource(new CustomDataSource(), index)
```

## Browser Support
>Modern browsers and Internet Explorer 10+.

## Changelog
>Detailed changes for each release are documented in the [release notes](https://github.com/xlkai/yz-dync-form/releases).
