import type { MenuItem } from '@/router/menu-util'

export type NavItem = Pick<MenuItem, 'name' | 'path' | 'children' | 'meta'>
export type NavAlign = 'start' | 'end'
export type NavHeight = number | `${number}px`
