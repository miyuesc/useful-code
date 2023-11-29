<script setup lang="ts">
  import { NButton, NPopover } from 'naive-ui'
  import { BaseNodeType } from '@/components/FlowDesign/types'
  import { getDragData } from '@/components/FlowDesign/utils'

  const emits = defineEmits(['click', 'drop'])

  const emitClick = (type: BaseNodeType) => {
    emits('click', type)
  }

  const emitDropNode = (ev: DragEvent) => {
    const node = getDragData(ev)
    if (node) {
      emits('drop', node)
    }
  }

  const validateDrop = (ev: DragEvent) => {
    ev.preventDefault()
  }
</script>

<template>
  <div class="flow-node__behavior">
    <div class="flow-node__behavior-btn" @drop.stop="emitDropNode" @dragover.stop="validateDrop">
      <n-popover trigger="click" placement="right">
        <template #trigger>
          <n-button circle type="info">＋</n-button>
        </template>
        <template #header>
          <span class="node-behavior__header">添加节点</span>
        </template>
        <div class="node-behavior__btn">
          <n-button circle size="large" @click="emitClick('task')">审批</n-button>
          <n-button circle size="large" @click="emitClick('cc')">抄送</n-button>
          <n-button circle size="large" @click="emitClick('condition')">条件</n-button>
        </div>
      </n-popover>
    </div>
  </div>
</template>
