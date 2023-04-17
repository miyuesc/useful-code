<script lang="ts" setup>
  import { ref, h, VNodeChild } from 'vue'
  import { NButton } from 'naive-ui'
  import type { DetailPropItem } from '@/components/DetailsCard'
  import DetailsCard from '@/components/DetailsCard'

  const objectDetailProps = ref<Record<string, string | DetailPropItem>>({
    productId: '产品ID',
    nodeType: { label: '节点类型' },
    protocolType: { label: '接入协议' },
    reserveProductNo: '接入产品ID',
    netWorkMethod: { label: '联网方式' },
    syncState: {
      label: '同步状态',
      hidden: false,
      render: (): VNodeChild => h(NButton, {}, '同步')
    },
    connectType: { label: '连接方式' },
    prdCode: { label: '产品类别' },
    placeType: { label: '内外场类型' },
    cipher: '产品密钥',
    createDt: '创建时间',
    updateDt: '修改时间',
    description: '产品描述'
  })
  const objectDetails = ref({
    cmiotExistFlag: false,
    syncToCmiot: false,
    productId: 'Pro20220900013',
    reserveProductNo: '20220900013',
    productName: '车道信息',
    nodeType: 4,
    netWorkMethod: 1,
    protocolType: 1,
    authenticationMethod: null,
    deviceNum: 0,
    description: null,
    createDt: '2022-09-19 17:09:18',
    prdCode: '1536',
    connectType: 0,
    picUrl: null,
    placeType: null,
    cipher: '96lcV0jvG2wsvD31azSFac743xLByx10eexOwj4k',
    syncState: null,
    updateDt: '2022-09-19 17:09:18',
    otherFlag: true,
    icon: null
  })
</script>

<template>
  <div class="demo-page-container">
    <DetailsCard
      :details="objectDetails"
      :prop="objectDetailProps"
      :grid-props="{ cols: '4 s:2 m:2 l:3 xl:4 2xl:6', responsive: 'screen' }"
    ></DetailsCard>
  </div>
</template>

<style lang="scss"></style>
