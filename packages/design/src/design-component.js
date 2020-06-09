import draggable from 'vuedraggable'
import { configStore, config } from 'yz-dync-form/src/core.js'
import { defaultClone } from './components/default.js'

export default {
  components: { draggable },
  data() {
    return {
      fieldIndex: 0
    }
  },
  methods: {
    onClone(prop) {
      const getFieldIndex = () => this.fieldIndex++

      if (prop.clone) {
        return prop.clone.call(this, prop, getFieldIndex)
      }
      return defaultClone.call(this, prop, getFieldIndex)
    }
  },
  render(h) {
    const { onClone } = this

    return (
      <div>
        {
          configStore.groups.map(group => {
            const components = configStore.getComponentByGroup(group.type) || []

            const groupName = {
              name: config.groupName,
              pull: 'clone',
              put: false
            }

            return (
              <div class="yz-design_component" key={group.type}>
                <div class="yz-design_component_title">{group.name}</div>
                <draggable value={components} group={groupName} sort={false} clone={onClone}>
                  {
                    components.map(itm => {
                      return (
                        <div class="yz-design_component_item" key={itm.type}>
                          <i class={itm.icon}></i>
                          {itm.name}
                        </div>
                      )
                    })
                  }
                </draggable>
              </div>
            )
          })
        }
      </div>
    )
  }
}
