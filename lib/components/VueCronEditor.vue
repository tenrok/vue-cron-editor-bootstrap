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

          <!-- <b-form-checkbox v-model="editorData.days" value="0" class="mr-3">{{ translate('sun') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="1" class="mr-3">{{ translate('mon') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="2" class="mr-3">{{ translate('tue') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="3" class="mr-3">{{ translate('wed') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="4" class="mr-3">{{ translate('thu') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="5" class="mr-3">{{ translate('fri') }}</b-form-checkbox> -->
          <!-- <b-form-checkbox v-model="editorData.days" value="6" class="mr-3">{{ translate('sat') }}</b-form-checkbox> -->

          <div v-for="(a, idx) in uids" :key="`${a[0]}`" class="mr-3 custom-control custom-checkbox">
            <input :id="`${a[1]}`" v-model="editorData.days" type="checkbox" class="custom-control-input" :value="`${idx}`" />
            <label class="custom-control-label" :for="`${a[1]}`">{{ translate(a[0]) }}</label>
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
  import { BTabs, BTab, BFormInput, BFormTimepicker } from '@tenrok/bootstrap-vue'
  import { TabKey } from 'lib/core/cronExpressions'

  interface Tab {
    idx: number
    key: string
  }

  interface Data {
    activeTabIndex?: number
    tabs: Tab[]
    uids: string[][]
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
        uids: ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map(x => [x, crypto.randomUUID()]),
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
