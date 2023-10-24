import { VueConstructor, PluginObject } from 'vue'
import VueCronEditor from './components/VueCronEditor.vue'

const components: { [key: string]: VueConstructor } = { VueCronEditor }

const VueCronEditorPlugin: PluginObject<any> = {
  install(Vue) {
    for (const key in components) {
      Vue.component(key, components[key])
    }
  },
}

export default VueCronEditor
export { VueCronEditor, VueCronEditorPlugin }
