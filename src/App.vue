<template>
  <div id="app">
    <div class="p-3">
      <vue-cron-editor v-model="sample1CronExpression" preserve-state-on-switch-to-advanced />
      <input v-model="sample1CronExpression" class="form-control" type="text" readonly />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
      sample1CronExpression: '4 4 * * 0,2,3,5',
    }),
  }
</script>
