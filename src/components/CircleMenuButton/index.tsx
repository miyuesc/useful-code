import { defineComponent, PropType, ref, VNodeChild, VNodeRef } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import { MdCheckboxOutline } from '@vicons/ionicons4'

import './index.scss'

type IconRender = () => VNodeChild

export type CircleMenuItem = {
  name: string
  icon: string | IconRender
}

export default defineComponent({
  name: 'CircleMenuButton',
  props: {
    menus: {
      type: Array as PropType<CircleMenuItem[]>,
      default: () => []
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const isActive = ref<boolean>(false)

    const iconStyle = (idx: number) => {
      const length = props.menus.length
      const transitionStep = 0.3 / (props.menus.length - 1)
      return {
        transform: `rotate(${Math.floor((idx * 360) / length)}deg)`,
        transitionDelay: `${transitionStep * idx}s`
      }
    }

    const targetEl = ref<HTMLDivElement | undefined>(undefined)
    onClickOutside(targetEl, (event) => {
      isActive.value = false
    })
    const menuItemClick = (menu: unknown) => {
      emit('click', menu)
    }

    return () => (
      <div class="circle-menu-button">
        <div class={{ menu: true, active: isActive.value }} ref={targetEl as VNodeRef}>
          <label class="menu-dots" for="menu" onClick={() => (isActive.value = !isActive.value)}>
            <span class="menu-dot"></span>
            <span class="menu-dot"></span>
            <span class="menu-dot"></span>
          </label>
          <ul class="menu-items">
            {props.menus?.map((m, idx) => (
              <li class="menu-item" style={iconStyle(idx)} onClick={() => menuItemClick(m)}>
                {typeof m.icon === 'string' ? (
                  <NIcon component={MdCheckboxOutline}></NIcon>
                ) : (
                  m.icon()
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
})
