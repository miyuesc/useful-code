<script setup lang="ts">
  import { ref } from 'vue'
  import {
    NTabs,
    NTabPane,
    NInput,
    NInputNumber,
    NSelect,
    NCheckbox,
    NCheckboxGroup,
    NRadio,
    NRadioGroup,
    NSpace
  } from 'naive-ui'
  import { useI18n } from 'vue-i18n'
  import { useCronExpression, WeekdayOptions } from '@/hooks/useCronExpression'

  defineOptions({ name: 'CronInput' })

  const { t } = useI18n()

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
    yearValue,
    initCronExpression
  } = useCronExpression(undefined, '0 0 12 ? * 2-6')

  const modalVisible = ref(false)
  const activeTab = ref<string>('second')
  const modalValues = ref<string>('')

  const secondsAndMinutes = new Array(60)
    .fill(0)
    .map((_, idx) => ({ label: `${idx}`.padStart(2, '0'), value: idx }))
  const hours = new Array(24)
    .fill(0)
    .map((_, idx) => ({ label: `${idx}`.padStart(2, '0'), value: idx }))
  const months = new Array(12)
    .fill(0)
    .map((_, idx) => ({ label: `${idx + 1}`.padStart(2, '0'), value: idx + 1 }))
  const days = new Array(31)
    .fill(0)
    .map((_, idx) => ({ label: `${idx + 1}`.padStart(2, '0'), value: idx + 1 }))
  const weekdays = WeekdayOptions.map((i) => ({ label: t(i.label), value: i.value }))
  const currentYear = new Date().getFullYear()
  const years = new Array(100)
    .fill(0)
    .map((_, idx) => ({ label: `${idx + currentYear}`, value: idx + currentYear }))

  defineExpose({ initCronExpression })
</script>

<template>
  <div class="page-container">
    <div class="cron-preview-card">
      <div class="cron-card_header">{{ $t('CRON Expression') }}</div>
      <div class="cron-card_expression">{{ cronExpression }}</div>
      <div class="cron-card_exp-header">
        <span @click="activeTab = 'second'">{{ $t('Second') }}</span>
        <span @click="activeTab = 'minute'">{{ $t('Minute') }}</span>
        <span @click="activeTab = 'hour'">{{ $t('Hour') }}</span>
        <span @click="activeTab = 'day'">{{ $t('Day') }}</span>
        <span @click="activeTab = 'month'">{{ $t('Month') }}</span>
        <span @click="activeTab = 'day'">{{ $t('Weekday') }}</span>
        <span @click="activeTab = 'year'">{{ $t('Year') }}</span>
      </div>
      <div class="cron-card_exp-content">
        <n-input :value="secondValue" readonly @focus="activeTab = 'second'" />
        <n-input :value="minuteValue" readonly @focus="activeTab = 'minute'" />
        <n-input :value="hourValue" readonly @focus="activeTab = 'hour'" />
        <n-input :value="dayWeekdayValue[0]" readonly @focus="activeTab = 'day'" />
        <n-input :value="monthValue" readonly @focus="activeTab = 'month'" />
        <n-input :value="dayWeekdayValue[1]" readonly @focus="activeTab = 'day'" />
        <n-input :value="yearValue" readonly @focus="activeTab = 'year'" />
      </div>
    </div>
    <n-tabs v-model:value="activeTab" type="segment" animated>
      <n-tab-pane name="second" :label="$t('Second')">
        <n-radio-group v-model:value="secondData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="every">每秒</n-radio>
            <n-radio value="range">
              <n-space>
                从
                <n-input-number
                  v-model:value="secondData.range.from"
                  :min="0"
                  :max="secondData.range.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="secondData.range.to"
                  :min="secondData.range.from"
                  :max="59"
                  :precision="0"
                  :step="1"
                />
                之间的每一秒
              </n-space>
            </n-radio>
            <n-radio value="average">
              <n-space>
                从第
                <n-input-number
                  v-model:value="secondData.average.from"
                  :min="0"
                  :max="59"
                  :precision="0"
                  :step="1"
                />
                秒开始每隔
                <n-input-number
                  v-model:value="secondData.average.step"
                  :min="1"
                  :max="59"
                  :precision="0"
                  :step="1"
                />
                秒
              </n-space>
            </n-radio>
            <n-radio value="specify"> 指定：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="secondData.specify">
                <n-checkbox
                  v-for="i in secondsAndMinutes"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                />
              </n-checkbox-group>
            </div>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="minute" :label="$t('Minute')">
        <n-radio-group v-model:value="minuteData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="every">每分钟</n-radio>
            <n-radio value="range">
              <n-space>
                从
                <n-input-number
                  v-model:value="minuteData.range.from"
                  :min="0"
                  :max="minuteData.range.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="minuteData.range.to"
                  :min="minuteData.range.from"
                  :max="59"
                  :precision="0"
                  :step="1"
                />
                之间的每一分钟
              </n-space>
            </n-radio>
            <n-radio value="average">
              <n-space>
                从第
                <n-input-number
                  v-model:value="minuteData.average.from"
                  :min="0"
                  :max="59 - minuteData.average.step"
                  :precision="0"
                  :step="1"
                />
                分钟开始每隔
                <n-input-number
                  v-model:value="minuteData.average.step"
                  :min="1"
                  :max="59 - minuteData.average.from"
                  :precision="0"
                  :step="1"
                />
                分钟
              </n-space>
            </n-radio>
            <n-radio value="specify"> 指定：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="minuteData.specify">
                <n-checkbox
                  v-for="i in secondsAndMinutes"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                />
              </n-checkbox-group>
            </div>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="hour" :label="$t('Hour')">
        <n-radio-group v-model:value="hourData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="every">每小时</n-radio>
            <n-radio value="range">
              <n-space>
                从
                <n-input-number
                  v-model:value="hourData.range.from"
                  :min="0"
                  :max="hourData.range.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="hourData.range.to"
                  :min="hourData.range.from"
                  :max="59"
                  :precision="0"
                  :step="1"
                />
                之间的每一小时
              </n-space>
            </n-radio>
            <n-radio value="average">
              <n-space>
                从第
                <n-input-number
                  v-model:value="hourData.average.from"
                  :min="1"
                  :max="24 - hourData.average.step"
                  :precision="0"
                  :step="1"
                />
                小时开始每隔
                <n-input-number
                  v-model:value="hourData.average.step"
                  :min="1"
                  :max="24 - hourData.average.from"
                  :precision="0"
                  :step="1"
                />
                小时
              </n-space>
            </n-radio>
            <n-radio value="specify"> 指定：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="hourData.specify">
                <n-checkbox v-for="i in hours" :key="i.value" :label="i.label" :value="i.value" />
              </n-checkbox-group>
            </div>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="day/week" :label="$t('Day/Weekday')">
        <n-radio-group v-model:value="dayWeekdayData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="everyDay">每天</n-radio>
            <n-radio value="dayRange">
              <n-space>
                从每月第
                <n-input-number
                  v-model:value="dayWeekdayData.dayRange.from"
                  :min="1"
                  :max="dayWeekdayData.dayRange.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="dayWeekdayData.weekdayRange.to"
                  :min="dayWeekdayData.weekdayRange.from"
                  :max="31"
                  :precision="0"
                  :step="1"
                />
                之间的每一天
              </n-space>
            </n-radio>
            <n-radio value="weekdayRange">
              <n-space>
                从每周
                <n-select v-model:value="dayWeekdayData.weekdayRange.from" :options="weekdays" />
                到
                <n-select v-model:value="dayWeekdayData.weekdayRange.to" :options="weekdays" />
                之间的每一天
              </n-space>
            </n-radio>
            <n-radio value="dayAverage">
              <n-space>
                从每月第
                <n-input-number
                  v-model:value="dayWeekdayData.dayAverage.from"
                  :min="1"
                  :max="31"
                  :precision="0"
                  :step="1"
                />
                天开始每隔
                <n-input-number
                  v-model:value="dayWeekdayData.dayAverage.step"
                  :min="1"
                  :max="31"
                  :precision="0"
                  :step="1"
                />
                天
              </n-space>
            </n-radio>
            <n-radio value="weekdayAverage">
              <n-space>
                从每周
                <n-select v-model:value="dayWeekdayData.weekdayAverage.from" :options="weekdays" />
                开始每隔
                <n-input-number
                  v-model:value="dayWeekdayData.weekdayAverage.step"
                  :min="0"
                  :max="7"
                  :precision="0"
                  :step="1"
                />
                天
              </n-space>
            </n-radio>
            <n-radio value="daySpecify">指定日期：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="dayWeekdayData.daySpecify">
                <n-checkbox v-for="i in days" :key="i.value" :label="i.label" :value="i.value" />
              </n-checkbox-group>
            </div>
            <n-radio value="weekdaySpecify">指定星期：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="dayWeekdayData.weekdaySpecify">
                <n-checkbox
                  v-for="i in weekdays"
                  :key="i.value"
                  :label="i.label"
                  :value="i.value"
                />
              </n-checkbox-group>
            </div>
            <n-radio value="lastWeekday">每月最后一个工作日</n-radio>
            <n-radio value="beforeEndSpacialDay">
              <n-space>
                每月倒数第
                <n-input-number
                  v-model:value="dayWeekdayData.beforeEndSpacialDay"
                  :min="1"
                  :max="31"
                  :precision="0"
                  :step="1"
                />
                天
              </n-space>
            </n-radio>
            <n-radio value="lastSpecialWeekday">
              <n-space>
                每月最后一个
                <n-select v-model:value="dayWeekdayData.lastSpecialWeekday" :options="weekdays" />
              </n-space>
            </n-radio>
            <n-radio value="nearestWeekdaySpecialDay">
              <n-space>
                每月离
                <n-input-number
                  v-model:value="dayWeekdayData.nearestWeekdaySpecialDay"
                  :min="1"
                  :max="31"
                  :precision="0"
                  :step="1"
                />
                最近的工作日
              </n-space>
            </n-radio>
            <n-radio value="specialAWeekday">
              <n-space>
                每月第
                <n-input-number
                  v-model:value="dayWeekdayData.specialAWeekday.idx"
                  :min="1"
                  :max="5"
                  :precision="0"
                  :step="1"
                />
                个
                <n-select
                  v-model:value="dayWeekdayData.specialAWeekday.weekday"
                  :options="weekdays"
                />
              </n-space>
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="month" :label="$t('Month')">
        <n-radio-group v-model:value="monthData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="every">每月</n-radio>
            <n-radio value="range">
              <n-space>
                从
                <n-input-number
                  v-model:value="monthData.range.from"
                  :min="0"
                  :max="monthData.range.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="monthData.range.to"
                  :min="monthData.range.from"
                  :max="12"
                  :precision="0"
                  :step="1"
                />
                之间的每一月
              </n-space>
            </n-radio>
            <n-radio value="average">
              <n-space>
                从第
                <n-input-number
                  v-model:value="monthData.average.from"
                  :min="0"
                  :max="12"
                  :precision="0"
                  :step="1"
                />
                月开始每隔
                <n-input-number
                  v-model:value="monthData.average.step"
                  :min="1"
                  :max="12"
                  :precision="0"
                  :step="1"
                />
                月
              </n-space>
            </n-radio>
            <n-radio value="specify"> 指定：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="monthData.specify">
                <n-checkbox v-for="i in months" :key="i.value" :label="i.label" :value="i.value" />
              </n-checkbox-group>
            </div>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
      <n-tab-pane name="year" :label="$t('Year')">
        <n-radio-group v-model:value="yearData.checkedType" direction="vertical">
          <n-space vertical>
            <n-radio value="none">不指定</n-radio>
            <n-radio value="every">每年</n-radio>
            <n-radio value="range">
              <n-space>
                从
                <n-input-number
                  v-model:value="yearData.range.from"
                  :min="currentYear"
                  :max="yearData.range.to"
                  :precision="0"
                  :step="1"
                />
                到
                <n-input-number
                  v-model:value="yearData.range.to"
                  :min="yearData.range.from"
                  :precision="0"
                  :step="1"
                />
                之间的每一年
              </n-space>
            </n-radio>
            <n-radio value="average">
              <n-space>
                从第
                <n-input-number
                  v-model:value="yearData.average.from"
                  :min="currentYear"
                  :precision="0"
                  :step="1"
                />
                年开始每隔
                <n-input-number
                  v-model:value="yearData.average.step"
                  :min="1"
                  :max="100"
                  :precision="0"
                  :step="1"
                />
                年
              </n-space>
            </n-radio>
            <n-radio value="specify"> 指定：</n-radio>
            <div class="specify-options">
              <n-checkbox-group v-model:value="yearData.specify">
                <n-checkbox v-for="i in years" :key="i.value" :label="i.label" :value="i.value" />
              </n-checkbox-group>
            </div>
          </n-space>
        </n-radio-group>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style lang="scss" scoped>
  .cron-preview-card {
    display: flex;
    flex-direction: column;
    .cron-card_header,
    .cron-card_expression {
      text-align: center;
      padding: 8px 24px;
      font-size: 1.4rem;
      font-weight: 500;
    }
    .cron-card_expression {
      background: rgb(240, 248, 255);
      border-radius: 2px;
    }
    .cron-card_exp-header,
    .cron-card_exp-content {
      padding: 8px 0;
      display: grid;
      gap: 4px;
      font-size: 1rem;
      grid-template-columns: repeat(7, 1fr);
    }
    .cron-card_exp-header {
      font-weight: 500;
      text-align: center;
      border-bottom: 2px solid var(--color-neutral-4);
    }
    .cron-card_exp-content {
      font-weight: 400;
      border-bottom: 1px solid var(--color-neutral-2);
    }
    .cron-card_exp-header span {
      cursor: pointer;
    }
  }
  .specify-options {
    box-sizing: border-box;
    padding-left: 22px;
    ::v-deep(.n-checkbox__label) {
      font-family: Consolas, Monaco, monospace, sans-serif;
    }
  }
</style>
