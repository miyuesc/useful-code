import { Component } from 'vue'
import translator from '@/i18n/translator'

export type ComponentModules = Record<string, Component>
export type MenuItem = {
  name: string
  path: string
  component: Component | Function
  meta?: Record<string, unknown>
  children?: MenuItem[]
}

const modules: ComponentModules = import.meta.glob([
  '/src/views/**/**.{vue,tsx}',
  '!/src/views/**/components/**.{vue,tsx}'
])
const menusObject: Record<string, MenuItem> = {}

const addChild = (name: string, moduleKey: string, parent?: string) => {
  const childMenu = {
    name,
    path: `${name}`,
    component: modules[moduleKey]
  }
  if (parent) {
    const meta = {
      parent,
      translateName: translator('menus', name)
    }
    if (menusObject[parent] && menusObject[parent].children) {
      menusObject[parent].children!.push({ ...childMenu, meta })
    } else {
      menusObject[parent] = {
        name: parent,
        path: `/${parent}`,
        component: modules[moduleKey] || (() => import('@/personalInfo/personalHomePage.vue')),
        meta: { translateName: translator('menus', parent) },
        children: [{ ...childMenu, meta }]
      }
    }
  } else {
    console.log('name', name, translator('menus', name))
    menusObject[name] = {
      ...childMenu,
      path: `/${name}`,
      meta: { translateName: translator('menus', name) }
    }
  }
}

const classification = (modules: ComponentModules) => {
  console.log('modules', modules)
  // 把views文件夹下的所有vue文件自动生成映射关系
  Object.keys(modules).forEach((key: string) => {
    const nameMatch: string[] | null = key.match(/^\/src\/views\/(.+)\.(vue|tsx)/)

    if (!nameMatch) {
      return
    }
    // 处理菜单和页面组件名称
    const componentPath: string = nameMatch[1]
    const [parent, child] = componentPath.split('/')
    if (!child) {
      addChild(parent, key)
    } else {
      addChild(child, key, parent)
    }
  })
}

classification(modules)

export const formatMenusObjectToArray = (menusObject: Record<string, MenuItem>): MenuItem[] => {
  return Object.keys(menusObject).map((key) => ({
    path: `/${key}`,
    name: key,
    meta: menusObject[key].meta,
    component: menusObject[key].component,
    children: menusObject[key].children || undefined
  }))
}

export default menusObject
