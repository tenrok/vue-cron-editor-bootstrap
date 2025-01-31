/**
 * vueCronEditorMixin
 * Core logic of a component.
 * Functionality dependent on UI frameworks should be implemented in derived components
 */

import { buildExpression, parseExpression, TabUpdatedEvent, TabKey } from './cronExpressions'
import * as cronValidator from 'cron-validator'
import * as cronstrue from 'cronstrue/i18n'
import { createI18n } from './i18n'

import Vue from 'vue'

const initialData: Record<TabKey, TabUpdatedEvent> = {
  minutes: {
    type: 'minutes',
    minuteInterval: 1,
  },
  hourly: {
    type: 'hourly',
    minutes: 0,
    hourInterval: 1,
  },
  daily: {
    type: 'daily',
    minutes: 0,
    hours: 0,
    dayInterval: 1,
  },
  weekly: {
    type: 'weekly',
    minutes: 0,
    hours: 0,
    days: ['1'],
  },
  monthly: {
    type: 'monthly',
    hours: 0,
    minutes: 0,
    day: 1,
    monthInterval: 1,
  },
  advanced: {
    type: 'advanced',
    cronExpression: '',
  },
}

interface ComponentData {
  editorData: any
  currentTab: TabKey
  innerValue: string | null
  i18n: Record<string, string> | null
}

export default Vue.extend({
  props: {
    value: { type: String, default: '*/1 * * * *' },
    isAdvancedTabVisible: { type: Boolean, default: true },
    preserveStateOnSwitchToAdvanced: { type: Boolean, default: false },
    locale: { type: String, default: 'en' },
    customLocales: { type: Object, default: null },
  },

  data(): ComponentData {
    return {
      innerValue: '*/1 * * * *',
      editorData: Object.assign({}, initialData.minutes),
      currentTab: 'minutes',
      i18n: null,
    }
  },

  computed: {
    explanation(): string {
      if (!this.innerValue) {
        return ''
      }

      return (cronstrue as any).toString(this.innerValue, {
        locale: this.locale,
      })
    },
  },

  watch: {
    value: {
      handler() {
        if (this.value == this.innerValue) {
          return
        }
        this.loadDataFromExpression()
      },
    },

    editorData: {
      deep: true,
      handler(changedData) {
        this.updateCronExpression(changedData)
      },
    },
  },

  created() {
    this.i18n = createI18n(this.customLocales, this.locale)
    this.innerValue = this.value
    this.loadDataFromExpression()
  },

  methods: {
    translate(key: string) {
      return this.i18n![key]
    },

    loadDataFromExpression() {
      const tabData = parseExpression(this.value)
      this.editorData = { ...tabData }
      this.currentTab = tabData.type
    },

    updateCronExpression(event: TabUpdatedEvent) {
      const cronExpression = buildExpression({ ...event })

      if (cronValidator.isValidCron(cronExpression)) {
        this.innerValue = cronExpression
        this.$emit('input', cronExpression)
      } else {
        this.innerValue = null
        this.$emit('input', null)
      }
    },

    resetToTab(tabKey: TabKey) {
      this.currentTab = tabKey

      if (this.preserveStateOnSwitchToAdvanced && tabKey === 'advanced') {
        this.editorData = {
          type: 'advanced',
          cronExpression: this.innerValue,
        }
        return
      }

      const tabData = parseExpression(this.value)
      if (tabKey == tabData.type) {
        this.editorData = Object.assign({}, tabData)
        return
      }

      this.editorData = Object.assign({}, initialData[tabKey])
      this.updateCronExpression(initialData[tabKey])
    },
  },
})
