<script setup lang="ts">
  import { ref, shallowRef, toRaw, watchEffect } from 'vue'
  import { NModal, useDialog } from 'naive-ui'
  import FlowDesign from '@/components/FlowDesign/FlowDesign.vue'
  import { BaseNode } from '@/components/FlowDesign/types'

  const flowData = ref<BaseNode | undefined>()

  const activeNode = shallowRef<BaseNode | null>(null)

  const modalVisible = ref(false)
  const openModal = (node: BaseNode) => {
    activeNode.value = { ...node }
    modalVisible.value = true
  }

  watchEffect(() => console.log(toRaw(flowData).value))

  const removeValidator = (node: BaseNode) => {
    const strs = node.id.split('-') as string[]
    const num = Number(strs[1])
    return num % 3 !== 0
  }

  const dialog = useDialog()
  const removeConfirm = (node: BaseNode): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      dialog.warning({
        title: '警告',
        content: '你确定？',
        positiveText: '确定',
        negativeText: '不确定',
        onPositiveClick: () => {
          resolve(true)
        },
        onNegativeClick: () => {
          reject(false)
        }
      })
    })
  }
</script>

<template>
  <div class="flow-design-container">
    <flow-design
      v-model:flow-data="flowData"
      :can-remove="removeValidator"
      :remove-validator="removeConfirm"
      @click="openModal"
    />

    <n-modal
      v-model:show="modalVisible"
      preset="card"
      :title="activeNode?.name || 'Node Modal'"
      style="width: 400px"
    >
      <template v-if="activeNode">
        <p>Prev Node ID: {{ activeNode.prev?.id || 'null' }}</p>
        <p>Prev Node Name: {{ activeNode.prev?.name || 'null' }}</p>
        <hr />
        <p>Next Node ID: {{ activeNode.next?.id || 'null' }}</p>
        <p>Next Node Name: {{ activeNode.next?.name || 'null' }}</p>
      </template>
    </n-modal>
  </div>
</template>

<style scoped lang="scss">
  .flow-design-container {
    overflow: hidden;
  }
</style>
