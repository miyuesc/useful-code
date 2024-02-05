<script setup lang="ts">
  import { ref, shallowRef } from 'vue'
  import { NButton, NSpace } from 'naive-ui'
  import { Chance } from 'chance'
  import MVirtualList from '@/components/VirtualList/index.vue'

  interface ListItem {
    id: string
    index: number
    name: string
    gender: string
    age: number
    email: string
    phone: string
    address: string
    company: string
    height: number
  }

  let idx = 0
  let chance = new Chance(0)
  function generateRandomItem(): ListItem {
    return {
      height: Math.floor(Math.random() * 100 + 40),
      id: crypto.randomUUID(),
      index: idx++,
      name: chance.name(),
      gender: chance.gender(),
      age: chance.age(),
      email: chance.email(),
      phone: chance.phone(),
      address: `${chance.address()}, ${chance.city()}, ${chance.state()}, ${chance.zip()}`,
      company: chance.company()
    }
  }

  function generateMultipleRandomItems(count: number): ListItem[] {
    let result = Array(count)
    for (let i = 0; i < count; ++i) {
      result[i] = generateRandomItem()
    }

    return result
  }

  const items = generateMultipleRandomItems(10000)

  const filteredList = ref<ListItem[]>(items)
  const visualListRef = shallowRef<InstanceType<typeof MVirtualList> | null>(null)
  const hVisualListRef = shallowRef<InstanceType<typeof MVirtualList> | null>(null)
  const mVisualListRef = shallowRef<InstanceType<typeof MVirtualList> | null>(null)

  const scrollToIdx = () => {
    visualListRef.value?.scrollToIndex(50)
    hVisualListRef.value?.scrollToIndex(50)
    mVisualListRef.value?.scrollToIndex(50)
  }

  const scrollToPx = () => {
    visualListRef.value?.scrollToPosition(1500)
    hVisualListRef.value?.scrollToPosition(1500)
    mVisualListRef.value?.scrollToPosition(1500)
  }

  const prependData = () => {
    filteredList.value.splice(0, 0, ...generateMultipleRandomItems(10))
  }
  const appendData = () => {
    filteredList.value.splice(filteredList.value.length, 0, ...generateMultipleRandomItems(10))
  }
</script>

<template>
  <div class="page-container">
    <div class="btns">
      <NSpace>
        <NButton type="info" size="small" @click="scrollToIdx">滚动到 idx 50</NButton>
        <NButton type="info" size="small" @click="scrollToPx">滚动到 1500px</NButton>
        <NButton type="info" size="small" @click="prependData">前方插入10条数据</NButton>
        <NButton type="info" size="small" @click="appendData">后方插入10条数据</NButton>
      </NSpace>
    </div>
    <div class="list-demo-content">
      <m-virtual-list ref="visualListRef" :items="filteredList" style="height: 100%; width: 100%">
        <template #default="{ item }">
          <div class="list-item" :style="{ height: `${item.height}px` }">
            <div class="avatar">{{ item.index }}</div>
            <div class="item-content">
              <div class="name">{{ item.name }}</div>
              <div>
                <span class="badge">{{ item.gender }}</span>
                <span>{{ item.email }}{{ item.phone }}</span>
              </div>
              <div>{{ item.address }}</div>
            </div>
          </div>
        </template>
      </m-virtual-list>
    </div>
    <div class="list-demo-content">
      <m-virtual-list
        ref="hVisualListRef"
        :items="filteredList"
        horizontal
        style="height: 100%; width: 100%"
      >
        <template #default="{ item }">
          <div class="list-item-h" :style="{ width: `${item.height}px` }">
            <div class="avatar">{{ item.index }}</div>
            <div class="item-content">
              <div class="name">{{ item.name }}</div>
              <div>
                <span class="badge">{{ item.gender }}</span>
                <span>{{ item.email }}{{ item.phone }}</span>
              </div>
              <div>{{ item.address }}</div>
            </div>
          </div>
        </template>
      </m-virtual-list>
    </div>
    <div class="list-demo-content">
      <m-virtual-list
        ref="mVisualListRef"
        :items="filteredList"
        :buffer-amount="20"
        style="height: 100%; width: 100%"
      >
        <template #default="{ item }">
          <div class="list-item-m" :style="{ height: `${item.height}px` }">
            <div class="avatar">{{ item.index }}</div>
            <div class="item-content">
              <div class="name">{{ item.name }}</div>
              <div>
                <span class="badge">{{ item.gender }}</span>
                <span>{{ item.email }}{{ item.phone }}</span>
              </div>
              <div>{{ item.address }}</div>
            </div>
          </div>
        </template>
      </m-virtual-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .list-demo-content {
    flex: 1;
    overflow: hidden;
    border: 1px solid #eeeeee;
  }
  .list-item,
  .list-item-h,
  .list-item-m {
    box-sizing: border-box;
    display: block;
    border-bottom: 1px solid #d1dadf;
    background: #fff;
    font-size: 1em;
    padding: 20px;
    line-height: 1.2em;
    overflow: hidden;
  }
  .list-item {
    width: 100%;
  }
  .list-item-h {
    height: 100%;
  }
  .list-item-m {
    width: 25%;
    display: inline-block;
    vertical-align: top;
  }
  .avatar {
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    vertical-align: top;
    margin-top: 5px;
    display: inline-block;
    border-radius: 100%;
    background: #3d4f5d;
    color: #fff;
  }
  .item-content {
    display: inline-block;
    padding: 5px;
    vertical-align: middle;
  }
</style>
