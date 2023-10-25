# vue-cron-editor-bootstrap

[![Version](https://img.shields.io/npm/v/@tenrok/vue-cron-editor-bootstrap.svg)](https://www.npmjs.com/package/@tenrok/vue-cron-editor-bootstrap)
[![License](https://img.shields.io/npm/l/@tenrok/vue-cron-editor-bootstrap.svg)](https://github.com/tenrok/vue-cron-editor-bootstrap/blob/main/LICENSE)
[![Vue.js](https://img.shields.io/badge/vue-2.7.15-brightgreen.svg?logo=vue.js)](https://github.com/vuejs/vue)
[![GitHub last commit](https://img.shields.io/github/last-commit/tenrok/vue-cron-editor-bootstrap.svg)](https://github.com/tenrok/vue-cron-editor-bootstrap)
[![Downloads](https://img.shields.io/npm/dm/@tenrok/vue-cron-editor-bootstrap.svg)](https://npmcharts.com/compare/@tenrok/vue-cron-editor-bootstrap?minimal=true)
[![Demo](https://img.shields.io/badge/demo-demo-blue.svg)](https://tenrok.github.io/vue-cron-editor-bootstrap/)

VueCronEditor is a component library built with Vue and Bootstrap-Vue allowing for easier editing of cron expressions.
Inspired by https://github.com/karoletrych/vue-cron-editor

# Requirements

- Vue ^2.0
- Bootstrap-Vue ^2.23.1

# Quickstart

Install using

```
npm install @tenrok/vue-cron-editor-bootstrap --save
```

Then, initalize the plugin in the starting point of your app (most likely src/main.js):

```js
// main.js
import { Plugin } from '@tenrok/vue-cron-editor-bootstrap'
Vue.use(Plugin)
```

The components will be registered globally and you can use them immediately.

You can also import individual components into .vue SFC (Single File Component):

```html
<!-- Vue component (.vue) -->
<template>
  <VueCronEditor v-model="cronExpression" />
  {{cronExpression}}
</template>

<script>
  import VueCronEditor from '@tenrok/vue-cron-editor-bootstrap'

  export default {
    name: 'App',
    components: {
      VueCronEditor,
    },
    data() {
      return {
        cronExpression: '*/1 * * * *',
      }
    },
  }
</script>
```

The editor tab will be set to the one which is able to represent an initial expression given to a `value` prop (**minutes** tab in the example above).
If none of the tabs can represent the given expression then **advanced** tab is selected.

To hide the **advanced** tab, set the `isAdvancedTabVisible` prop to `false`.
To preserve expression on switch to **advanced** tab set the `preserveStateOnSwitchToAdvanced` to `true`.

# i18n

The language of the component can be selected with the `locale` prop.

```html
<VueCronEditor v-model="expression" locale="pl" />
```

Currently supported languages:

- en
- pl

Custom locales can be provided via a `customLocales` prop:

<!-- prettier-ignore -->
```html
<VueCronEditor
  v-model="expression"
  locale="test"
  :custom-locales="{
    test: {
      every: "Every",
      mminutes: "minute(s)",
      hoursOnMinute: "hour(s) on minute",
      daysAt: "day(s) at",
      at: "at",
      onThe: "On the",
      dayOfEvery: "day, of every",
      monthsAt: "month(s), at",
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
      minutes: "MINUTES",
      hourly: "HOURLY",
      daily: "DAILY",
      weekly: "WEEKLY",
      monthly: "MONTHLY",
      advanced: "ADVANCED",
      cronExpression: "cron expression:",
      onlyOn: "Only on"
    }
  }"
/>
```

# Contributing

To build the samples app run in root directory:

```
npm install
npm run serve
```
