<template>
  <b-tabs v-model="activeTabIndex" content-class="p-2" @input="reset">
    <b-tab :value="0" :title="translate('minutes')" class="minutes-tab">
      <b-row>
        <b-col class="d-flex align-items-center">
          <span class="mr-2">{{ translate('every') }}</span>
          <b-form-input
            v-model="editorData.minuteInterval"
            type="number"
            min="1"
            max="59"
            class="mr-2"
            style="width: 80px"
          />
          <span>{{ translate('mminutes') }}</span>
        </b-col>
      </b-row>
    </b-tab>
    <b-tab :value="1" :title="translate('hourly')" class="hourly-tab">
      <b-row>
        <b-col class="d-flex align-items-center">
          <span class="mr-2">{{ translate('every') }}</span>
          <b-form-input
            v-model="editorData.hourInterval"
            type="number"
            min="1"
            max="24"
            class="mr-2"
            style="width: 80px"
          />
          <span class="mr-2">{{ translate('hoursOnMinute') }}</span>
          <b-form-input v-model="editorData.minutes" type="number" min="0" max="59" style="width: 80px" />
        </b-col>
      </b-row>
    </b-tab>
    <b-tab :value="2" :title="translate('daily')" class="daily-tab">
      <b-row>
        <b-col class="d-flex align-items-center">
          <span class="mr-2">{{ translate('every') }}</span>
          <b-form-input v-model="editorData.dayInterval" type="number" class="mr-2" style="width: 80px" />
          <span class="mr-2">{{ translate('daysAt') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" style="width: auto" @input="setDateTime" />
        </b-col>
      </b-row>
    </b-tab>
    <b-tab :value="3" :title="translate('weekly')" class="weekly-tab">
      <b-row>
        <b-col class="d-flex align-items-center">
          <span class="mr-2">{{ translate('every') }}</span>
          <b-form-checkbox v-model="editorData.days" value="0" class="mr-2">{{ translate('sun') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="1" class="mr-2">{{ translate('mon') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="2" class="mr-2">{{ translate('tue') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="3" class="mr-2">{{ translate('wed') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="4" class="mr-2">{{ translate('thu') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="5" class="mr-2">{{ translate('fri') }}</b-form-checkbox>
          <b-form-checkbox v-model="editorData.days" value="6" class="mr-2">{{ translate('sat') }}</b-form-checkbox>
          <span class="mr-2">{{ translate('at') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" style="width: auto" @input="setDateTime" />
        </b-col>
      </b-row>
    </b-tab>
    <b-tab :value="4" :title="translate('monthly')" class="monthly-tab">
      <b-row>
        <b-col class="d-flex align-items-center">
          <span class="mr-2">{{ translate('onThe') }}</span>
          <b-form-input v-model="editorData.day" type="number" class="mr-2" style="width: 80px" />
          <span class="mr-2">{{ translate('dayOfEvery') }}</span>
          <b-form-input v-model="editorData.monthInterval" type="number" class="mr-2" style="width: 80px" />
          <span class="mr-2">{{ translate('monthsAt') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" style="width: auto" @input="setDateTime" />
        </b-col>
      </b-row>
    </b-tab>
    <b-tab :value="5" :title="translate('advanced')" class="advanced-tab">
      <b-row>
        <b-col class="d-flex" style="align-items: center">
          <span class="mr-2">{{ translate('cronExpression') }}</span>
          <b-form-input v-model="editorData.cronExpression" class="mr-2" style="width: auto" />
          <span>{{ explanation }}</span>
        </b-col>
      </b-row>
    </b-tab>
  </b-tabs>
</template>

<script>
import vueCronEditorMixin from './core/vueCronEditorMixin'
import { BTabs, BTab, BRow, BCol, BFormCheckbox, BFormInput, BFormTimepicker } from 'bootstrap-vue'

export default {
  name: 'VueCronEditorBootstrap',

  components: {
    BTabs,
    BTab,
    BRow,
    BCol,
    BFormCheckbox,
    BFormInput,
    BFormTimepicker,
  },

  mixins: [vueCronEditorMixin],

  data: () => ({
    activeTabIndex: null,
    tabs: [
      { idx: 0, key: 'minutes' },
      { idx: 1, key: 'hourly' },
      { idx: 2, key: 'daily' },
      { idx: 3, key: 'weekly' },
      { idx: 4, key: 'monthly' },
      { idx: 5, key: 'advanced' },
    ],
  }),

  computed: {
    dateTime() {
      return `${this.editorData.hours}:${this.editorData.minutes}:00`
    },
  },

  watch: {
    currentTab() {
      this.activeTabIndex = this.tabs.find(t => t.key === this.currentTab).idx
    },
  },

  created() {
    this.activeTabIndex = this.tabs.find(t => t.key === this.currentTab).idx
  },

  methods: {
    reset(tabIndex) {
      const tab = this.tabs.find(t => t.idx === tabIndex)
      if (tab) {
        this.resetToTab(tab.key)
      }
    },

    setDateTime(time) {
      if (time == null) {
        return
      }
      const splittedTime = time.split(':')
      this.editorData.hours = splittedTime[0]
      this.editorData.minutes = splittedTime[1]
    },
  },
}
</script>
