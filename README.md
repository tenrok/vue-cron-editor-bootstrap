# vue-cron-editor-bootstrap

VueCronEditor is a component library built with Vue and Bootstrap-Vue allowing for easier editing of cron expressions.
Inspired by https://github.com/karoletrych/vue-cron-editor

# Demo
[vue-cron-editor-bootstrap.vercel.app](https://vue-cron-editor-bootstrap.vercel.app/)

# Requirements

- Vue ^2.0
- Bootstrap-Vue ^2.14.0

# Installation

- vue-cron-editor-bootstrap

```
npm install @tenrok/vue-cron-editor-bootstrap --save
```

# Usage

```
<template>
  <VueCronEditorBootstrap v-model="cronExpression" />
  {{cronExpression}}
</template>

<script>
import VueCronEditorBootstrap from '@tenrok/vue-cron-editor-bootstrap';

export default {
  name: 'App',
  components: {
    VueCronEditorBootstrap
  },
  data() {
    return {
      cronExpression: "*/1 * * * *"
    }
  },
};
</script>
```

The editor tab will be set to the one which is able to represent an initial expression given to a `value` prop (**minutes** tab in the example above).
If none of the tabs can represent the given expression then **advanced** tab is selected.

To hide the **advanced** tab, set the `isAdvancedTabVisible` prop to `false`.
To preserve expression on switch to **advanced** tab set the `preserveStateOnSwitchToAdvanced` to `true`.

# i18n

The language of the component can be selected with the `locale` prop.

```
<VueCronEditorBootstrap
    v-model="expression"
    locale="pl"
/>
```

Currently supported languages:

- en
- pl

Custom locales can be provided via a `customLocales` prop:

```
<VueCronEditorBootstrap
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
