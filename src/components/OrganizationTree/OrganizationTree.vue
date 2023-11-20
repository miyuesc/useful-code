<script setup lang="ts">
  import './index.scss'
  import { computed, PropType } from 'vue'
  import OrganizationTreeItem from './OrganizationTreeItem.js'

  type OrganizationTreeProp = {
    children?: string
    label?: string
    key?: string
  }

  const defaultProps: Required<OrganizationTreeProp> = {
    children: 'children',
    label: 'label',
    key: 'key'
  }

  const props = defineProps({
    data: {
      type: Array as PropType<any[]>,
      default: () => []
    },
    vertical: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    prop: {
      type: Object as PropType<OrganizationTreeProp>,
      default: () => ({
        children: 'children',
        label: 'label',
        key: 'key'
      })
    }
  })

  const computedProps = computed<Required<OrganizationTreeProp>>(() => ({
    ...defaultProps,
    ...props.prop
  }))
</script>

<template>
  <div class="organization-tree-content">
    <organization-tree-item v-for="item in data" :key="item[computedProps.key]" :data="item" />
  </div>
</template>
