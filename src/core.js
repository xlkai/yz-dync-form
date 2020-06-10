
/**
 * 组件组别
 */
export const ComponentGroup = Object.freeze({
  INPUT: {
    name: '输入型组件',
    type: 'input'
  },
  SELECT: {
    name: '选择型组件',
    type: 'select'
  },
  LAYOUT: {
    name: '布局型组件',
    type: 'layout'
  }
})

/**
 * 数据源
 */
export class DataSource {
  constructor(type, name) {
    this.type = type
    this.name = name
  }

  getPage() {
    throw new Error("The 'getPage' method is not implemented")
  }

  getData(config) {
    throw new Error("The 'getData' method is not implemented", config)
  }
}

/**
 * 核心
 */
class Store {
  constructor() {
    // 组别
    this.groups = []
    Object.keys(ComponentGroup)
      .forEach(key => this.groups.push(ComponentGroup[key]))

    // 组件
    this.componentGroup = new Map()

    this.components = new Map()

    // 组件render
    this.componentRenders = new Map()

    // 属性组件
    this.propertyComponents = new Map()

    // 数据源
    this.datasources = []
  }

  /**
   * 注册组件类别
   * @param {*} group 类别对象
   * @param {*} index 位置
   */
  registerGroup(group, index) {
    if (!group.name || !group.type) {
      console.warn("Failed to register group,  because 'name' or 'type' attribute is missing.", group)
      return
    }
    if (index && index >= 0) {
      this.groups.splice(index, 0, group)
    } else {
      this.groups.push(group)
    }
  }

  /**
   * 注册组件
   * @param {*} groupType 组件组别
   * @param {*} component 组件对象
   * @param {*} sortable 是否需要进行排序
   */
  registerComponent(groupType, component, sortable = true) {
    let components = this.componentGroup.get(groupType)
    if (!components) {
      components = [component]
      this.componentGroup.set(groupType, components)
    } else {
      const index = components.findIndex(itm => itm.type === component.type)
      if (index < 0) {
        components.push(component)
        if (sortable) {
          // 排序
          components.sort((a, b) => {
            if (a.getOrder() > b.getOrder()) {
              return 1
            } else if (a.getOrder() < b.getOrder()) {
              return -1
            }
            return 0
          })
        }
      } else {
        console.warn('Failed to register component, Component already exists.', component)
      }
    }
    this.components.set(component.type, component)

    // 注册render
    if (component.render) {
      this.registerRender(component.type, component.render)
    }
  }

  /**
   * 注册组件自定义render
   * @param {*} type 组件类型
   * @param {Function} render render对象
   */
  registerRender(type, render) {
    this.componentRenders.set(type, render)
  }

  /**
   * 注册组件属性配置
   * @param {*} type 组件类型
   * @param {*} component
   */
  registerPropertyComponent(type, component) {
    this.propertyComponents.set(type, component)
  }

  /**
   * 注册数据源
   * @param {*} datasource 数据源对象
   * @param {*} index
   */
  registerDataSource(datasource, index) {
    const itm = this.getDataSource(datasource.type)
    if (!itm) {
      if (index && index >= 0) {
        this.datasources.splice(index, 0, datasource)
      } else {
        this.datasources.push(datasource)
      }
    } else {
      console.warn(`Datasource[type=${itm.type}] already exists.`, itm)
    }
  }

  /**
   * 根据数据源类型获取数据源对象
   * @param {*} type
   */
  getDataSource(type) {
    return this.datasources.find(itm => itm.type === type)
  }

  /**
   * 根据组件组别获取该组别下的所有组件
   * @param {*} groupType
   */
  getComponentByGroup(groupType) {
    return this.componentGroup.get(groupType)
  }

  /**
   * 获取组件自定义render
   * @param {*} type
   */
  getRender(type) {
    return this.componentRenders.get(type)
  }

  /**
   * 获取组件对象
   * @param {*} type
   */
  getComponent(type) {
    return this.components.get(type)
  }

  /**
   * 获取组件属性对象
   * @param {*} type
   */
  getPropertyComponent(type) {
    return this.propertyComponents.get(type)
  }
}

export const configStore = new Store()

/**
 * 组别保存
 */
class GroupStore {
  constructor() {
    this.datas = []
    // 默认组件
    Object.keys(ComponentGroup)
      .forEach(key => {
        this.datas.push(ComponentGroup[key])
      })
  }

  register(group, index) {
    // 检查group是否有效
    if (!group.name || !group.type) {
      console.warn("Failed to register group,  because 'name' or 'type' attribute is missing.", group)
      return
    }
    if (index && index >= 0) {
      this.datas.splice(index, 0, group)
    } else {
      this.datas.push(group)
    }
  }
}

export const groupStore = new GroupStore()

/**
 * 配置项
 */
export const config = {
  groupName: 'designForm',
  fieldConfigName: '_config'
}

export const componentProp = {
  row: ['gutter', 'type', 'justify', 'align', 'tag'],
  col: ['span', 'offset', 'push', 'pull', 'tag'],
  formItem: ['prop', 'label', 'labelWidth', 'required', 'rules'],
  form: ['size', 'labelPosition', 'labelWidth', 'hideRequiredAsterisk', 'showMessage', 'inlineMessage', 'statusIcon', 'disabled']
}
