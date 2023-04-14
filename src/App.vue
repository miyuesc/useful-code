<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import type { NavItem } from '@/components/types'

  import NavHeader from '@/components/NavHeader/NavHeader.vue'
  import NavSlider from '@/components/NavSlider/NavSlider.vue'
  import { formatMenusObjectToArray, MenuItem } from '@/router/menu-util'

  const menusObject: Record<string, MenuItem> = JSON.parse(
    localStorage.getItem('menusObject') || '{}'
  )

  console.log(menusObject)

  const menus = ref<NavItem[]>(formatMenusObjectToArray(menusObject))
  const childMenus = ref<NavItem[] | undefined>()

  const activeNav = ref<string>('')
  const activeChildNav = ref<string>('')

  const router = useRouter()
  const pageToMainModule = (nav: NavItem) => {
    if (nav.children && nav.children.length) {
      activeNav.value = nav.name
      const path = `${nav.path}/${nav.children[0].path}`
      return router.push({ path })
    }
    router.push({ path: nav.path })
  }

  const route = useRoute()
  watch(
    () => route.path,
    (value, oldValue) => {
      if (value !== oldValue) {
        activeNav.value = ((route.meta.parent || route.name) as string | undefined) || ''
      }
    },
    { immediate: true }
  )

  watch(
    activeNav,
    (value, oldValue) => {
      if (value !== oldValue) {
        childMenus.value = (menusObject[value] && menusObject[value].children) || undefined
      }
    },
    { immediate: true }
  )
</script>

<template>
  <NavHeader :navs="menus" :active-nav="activeNav" @nav-click="pageToMainModule">
    <template #logo>
      <span class="logo-image"></span>
      <span class="logo-text">Useful Codes</span>
    </template>
  </NavHeader>
  <div class="useful-page-container">
    <NavSlider v-if="childMenus" :child-navs="childMenus" />
    <div class="page-content">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .logo-image {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-image: url('/logo.svg');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .logo-text {
    margin-left: 20px;
  }
</style>
