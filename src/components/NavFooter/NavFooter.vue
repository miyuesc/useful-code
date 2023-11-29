<script setup lang="ts">
  import { shallowRef } from 'vue'

  type Contact = {
    name: string
    address: string
  }

  const contactList = shallowRef<Contact[]>([
    { name: 'GitHub', address: 'https://github.com/miyuesc' },
    { name: 'Gitee', address: 'https://gitee.com/miyuesc' },
    { name: '掘金', address: 'https://juejin.cn/user/747323639208391/posts' },
    { name: '知乎', address: 'https://www.zhihu.com/people/miyuesc/posts' }
  ])

  const openNewTab = (item: Contact) => {
    window.open(item.address, '__blank')
  }
</script>

<template>
  <div class="nav-footer">
    <div class="nav-contact">
      <span class="contact-label">联系方式:</span>
      <span v-for="i in contactList" :key="i.address" class="contact-item" @click="openNewTab(i)">
        {{ i.name }}
      </span>
    </div>
    <div class="nav-copyright">Copyright © 2023 MiyueFE.</div>
  </div>
</template>

<style scoped lang="scss">
  .nav-footer {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    --btn-bg: #4ec0e9;
  }
  .nav-contact {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .contact-item {
    width: 80px;
    text-align: center;
    position: relative;
    border: none;
    white-space: nowrap;
    cursor: pointer;
    line-height: 1.15;
    padding: 8px 12px;
    transition: 0.3s;
    color: var(--btn-bg);
    &:hover {
      letter-spacing: 5px;

      &::before,
      &::after {
        opacity: 1;
        transform: scaleX(1.2);
      }
    }
    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--btn-bg);
      opacity: 0;
      transform: scaleX(0);
      transition: 0.4s ease-in-out;
    }
    &::before {
      top: 0;
    }
    &::after {
      bottom: 0;
    }
  }
</style>
