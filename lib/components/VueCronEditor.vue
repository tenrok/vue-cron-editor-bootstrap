<template>
  <b-tabs v-model="activeTabIndex" content-class="p-2" @input="reset">
    <b-tab :value="0" :title="translate('minutes')" class="minutes-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-1">{{ translate('every') }}</span>
          <b-form-input v-model="editorData.minuteInterval" type="number" min="1" max="59" class="mr-1" style="width: 80px" />
          <span>{{ translate('mminutes') }}</span>
        </div>
      </div>
    </b-tab>
    <b-tab :value="1" :title="translate('hourly')" class="hourly-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-1">{{ translate('every') }}</span>
          <b-form-input v-model="editorData.hourInterval" type="number" min="1" max="24" class="mr-1" style="width: 80px" />
          <span class="mr-1">{{ translate('hoursOnMinute') }}</span>
          <b-form-input v-model="editorData.minutes" type="number" min="0" max="59" style="width: 80px" />
        </div>
      </div>
    </b-tab>
    <b-tab :value="2" :title="translate('daily')" class="daily-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-1">{{ translate('every') }}</span>
          <b-form-input v-model="editorData.dayInterval" type="number" class="mr-1" style="width: 80px" />
          <span class="mr-1">{{ translate('daysAt') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" now-button style="width: auto" @input="setDateTime" />
        </div>
      </div>
    </b-tab>
    <b-tab :value="3" :title="translate('weekly')" class="weekly-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-3">{{ translate('onlyOn') }}</span>

          <div v-for="(ch, idx) in checkboxes" :key="`${ch.day}`" class="mr-3 custom-control custom-checkbox">
            <input :id="`${ch.id}`" v-model="editorData.days" type="checkbox" class="custom-control-input" :value="`${idx}`" />
            <label class="custom-control-label" :for="`${ch.id}`">{{ translate(ch.day) }}</label>
          </div>

          <span class="mr-1">{{ translate('at') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" now-button style="width: auto" @input="setDateTime" />
        </div>
      </div>
    </b-tab>
    <b-tab :value="4" :title="translate('monthly')" class="monthly-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-1">{{ translate('onThe') }}</span>
          <b-form-input v-model="editorData.day" type="number" min="1" max="31" class="mr-1" style="width: 80px" />
          <span class="mr-1">{{ translate('dayOfEvery') }}</span>
          <b-form-input v-model="editorData.monthInterval" type="number" min="1" class="mr-1" style="width: 80px" />
          <span class="mr-1">{{ translate('monthsAt') }}</span>
          <b-form-timepicker :value="dateTime" :hour12="false" now-button style="width: auto" @input="setDateTime" />
        </div>
      </div>
    </b-tab>
    <b-tab :value="5" :title="translate('advanced')" class="advanced-tab">
      <div class="row">
        <div class="col d-flex align-items-center">
          <span class="mr-2">{{ translate('cronExpression') }}</span>
          <b-form-input v-model="editorData.cronExpression" class="mr-2" style="width: auto" />
          <span>{{ explanation }}</span>
        </div>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts">
  import VueCronEditorMixin from '../core/vueCronEditorMixin'
  import { BTabs, BTab, BFormInput, BFormTimepicker } from 'bootstrap-vue'
  import { TabKey } from 'lib/core/cronExpressions'

  interface Data {
    activeTabIndex?: number
    tabs: { idx: number; key: string }[]
    checkboxes: { day: string; id: string }[]
  }

  export default VueCronEditorMixin.extend({
    components: {
      BTabs,
      BTab,
      BFormInput,
      BFormTimepicker,
    },

    data(): Data {
      return {
        activeTabIndex: undefined,
        tabs: [
          { idx: 0, key: 'minutes' },
          { idx: 1, key: 'hourly' },
          { idx: 2, key: 'daily' },
          { idx: 3, key: 'weekly' },
          { idx: 4, key: 'monthly' },
          { idx: 5, key: 'advanced' },
        ],
        checkboxes: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(day => ({ day, id: crypto.randomUUID() })),
      }
    },

    computed: {
      dateTime() {
        return `${this.editorData.hours}:${this.editorData.minutes}:00`
      },
    },

    watch: {
      currentTab() {
        this.activeTabIndex = this.tabs.find(t => t.key === this.currentTab)?.idx
      },
    },

    created() {
      this.activeTabIndex = this.tabs.find(t => t.key === this.currentTab)?.idx
    },

    methods: {
      reset(tabIndex: number) {
        const tab = this.tabs.find(t => t.idx === tabIndex)
        if (tab) {
          this.resetToTab(tab.key as TabKey)
        }
      },

      setDateTime(time: string) {
        if (time == null) {
          return
        }
        const splittedTime = time.split(':')
        this.editorData.hours = splittedTime[0]
        this.editorData.minutes = splittedTime[1]
      },
    },
  })
</script>
