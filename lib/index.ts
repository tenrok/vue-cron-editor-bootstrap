import _Vue from 'vue'
import VueCronEditorBootstrap from './components/VueCronEditorBootstrap.vue'

const components = [VueCronEditorBootstrap]

class CronEditorPluginOptions {}

type CronEditorPlugin = {
	install(vue: typeof _Vue, options?: CronEditorPluginOptions): void
}

const instance: CronEditorPlugin = {
	install(vue) {
		components.forEach(component => vue.component(component.name, component))
	},
}

export default instance
