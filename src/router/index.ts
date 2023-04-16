import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import menusObject, { formatMenusObjectToArray } from '@/router/menu-util'
import PersonalHomePage from '@/staticViews/PersonalHomePage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PersonalHomePage
  },
  ...(formatMenusObjectToArray(menusObject) as RouteRecordRaw[])
]

localStorage.setItem('menusObject', JSON.stringify(menusObject))

export default createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/useful-code/' : '/'),
  routes
})
