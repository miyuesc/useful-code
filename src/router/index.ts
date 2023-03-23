import type { Component } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

type ComponentModules = Record<string, Component>

const classification = (modules: ComponentModules): ComponentModules => {
  const components: ComponentModules = {}
  // 把views文件夹下的所有vue文件自动生成映射关系
  Object.keys(modules).forEach((key: string) => {
    const nameMatch: string[] | null = key.match(/^\/src\/views\/(.+)\.vue/)

    if (!nameMatch) {
      return
    }
    // 如果页面以Index命名，则使用父文件夹作为name
    const indexMatch: string[] | null = nameMatch[1].match(/(.*)\/Index$/i)

    let name: string = indexMatch ? indexMatch[1] : nameMatch[1]

    ;[name] = name.split('/').splice(-1)
    components[name] = modules[key]
  })
  return components
}

const modules: ComponentModules = import.meta.glob('/src/views/**/**.vue')

const views: ComponentModules = classification(modules)

const routes: RouteRecordRaw[] = Object.keys(views).map((key: string): RouteRecordRaw => {
  const comp = views[key]
  return {
    path: `/${comp.name}`,
    name: comp.name,
    component: comp
  }
})

export default createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/useful-code/' : '/'),
  routes
})
