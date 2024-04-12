<script setup lang="ts">
  import {
    NTabs,
    NTabPane,
    NAlert,
    NGrid,
    NGi,
    NSpace,
    NInput,
    NRadio,
    NRadioGroup,
    NCheckbox,
    NCheckboxGroup
  } from 'naive-ui'
  import useCronExpression from '@/hooks/useCronExpression'

  defineOptions({ name: 'CronTabs' })

  const {
    cronExpression,
    secondData,
    minuteData,
    hourData,
    dayWeekdayData,
    monthData,
    yearData,
    secondValue,
    minuteValue,
    hourValue,
    dayWeekdayValue,
    monthValue,
    yearValue
  } = useCronExpression(undefined, '0 0 12 ? * 2-6')
</script>

<template>
  <div class="page-container">
    <n-tabs type="segment" animated>
      <n-tab-pane name="second" tab="秒">
        <n-radio-group v-model:value="secondData.checkedType">
          <n-space vertical>
            <n-radio value="every">every</n-radio>
            <n-radio value="specify">specify</n-radio>
            <n-radio value="range">range</n-radio>
            <n-radio value="average">average</n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="minute" tab="分">
        <n-radio-group v-model:value="minuteData.checkedType">
          <n-space vertical>
            <n-radio value="every">every</n-radio>
            <n-radio value="specify">specify</n-radio>
            <n-radio value="range">range</n-radio>
            <n-radio value="average">average</n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="hour" tab="时">
        <n-radio-group v-model:value="hourData.checkedType">
          <n-space vertical>
            <n-radio value="every">every</n-radio>
            <n-radio value="specify">specify</n-radio>
            <n-radio value="range">range</n-radio>
            <n-radio value="average">average</n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="day" tab="日/周">日/周</n-tab-pane>
      <n-tab-pane name="month" tab="月">
        <n-radio-group v-model:value="monthData.checkedType">
          <n-space vertical>
            <n-radio value="every">every</n-radio>
            <n-radio value="specify">specify</n-radio>
            <n-radio value="range">range</n-radio>
            <n-radio value="average">average</n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="year" tab="年">
        <n-radio-group v-model:value="yearData.checkedType">
          <n-space vertical>
            <n-radio value="every">every</n-radio>
            <n-radio value="specify">specify</n-radio>
            <n-radio value="range">range</n-radio>
            <n-radio value="average">average</n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
    </n-tabs>

    <n-grid :cols="7" :x-gap="20" :y-gap="10">
      <n-gi style="text-align: center">秒</n-gi>
      <n-gi style="text-align: center">分</n-gi>
      <n-gi style="text-align: center">时</n-gi>
      <n-gi style="text-align: center">日</n-gi>
      <n-gi style="text-align: center">月</n-gi>
      <n-gi style="text-align: center">周</n-gi>
      <n-gi style="text-align: center">年</n-gi>
      <n-gi><n-input :value="secondValue" /></n-gi>
      <n-gi><n-input :value="minuteValue" /></n-gi>
      <n-gi><n-input :value="hourValue" /></n-gi>
      <n-gi><n-input :value="dayWeekdayValue[0]" /></n-gi>
      <n-gi><n-input :value="monthValue" /></n-gi>
      <n-gi><n-input :value="dayWeekdayValue[1]" /></n-gi>
      <n-gi><n-input :value="yearValue" /></n-gi>
      <n-gi :span="24">
        <n-alert :show-icon="false">
          {{ cronExpression }}
        </n-alert>
      </n-gi>
    </n-grid>
  </div>
</template>
