import { computed, defineComponent, type PropType, type VNodeChild } from 'vue'
import { NGi, NGrid, NTooltip } from 'naive-ui'
import type { GridProps } from 'naive-ui/es/grid/src/Grid'

import './index.scss'

export type DetailPropItem = {
  label: string
  value?: string
  index?: number
  hidden?: boolean
  onlyRender?: boolean
  render?: (value: unknown) => VNodeChild
  format?: (propKey: string, value: unknown) => string
  html?: string
}

export type RenderDetailPropItem = Omit<DetailPropItem, 'format' | 'hidden'> & { index: number }

export default defineComponent({
  name: 'DetailsCard',
  props: {
    details: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => ({})
    },
    padding: {
      type: [String, Array] as PropType<string | string[]>,
      default: '8px 16px'
    },
    gridProps: {
      type: Object as PropType<GridProps>,
      default: () => ({})
    },
    prop: {
      type: Object as PropType<Record<string, string | DetailPropItem>>,
      default: () => ({})
    },
    labelPrefix: {
      type: String as PropType<string>,
      default: '：'
    }
  },
  setup(props, { slots }) {
    const detailInfoList = computed<RenderDetailPropItem[]>(() => {
      if (!props.details) return []
      const detailsInfoArr: RenderDetailPropItem[] = []
      return Object.keys(props.prop).reduce((list, propKey, index) => {
        let label, value, render, hidden, onlyRender
        const propItem: string | DetailPropItem = props.prop[propKey]
        if (typeof propItem === 'string') {
          label = propItem + props.labelPrefix
          value = (props.details[propKey] || '-').toString()
        } else {
          label = propItem.label + props.labelPrefix
          render = propItem.render
          hidden = propItem.hidden
          onlyRender = propItem.onlyRender
          const format = propItem.format
          value =
            format && typeof format === 'function'
              ? (format(propKey, props.details[propKey]) || '-').toString()
              : (props.details[propKey] || '-').toString()
        }
        !hidden && list.push({ index, label, value, render, onlyRender })
        return list
      }, detailsInfoArr)
    })

    const computedStyle = computed<Record<'padding', string>>(() => {
      const padding: string | string[] = props.padding
      if (typeof padding === 'string') return { padding }
      return { padding: padding.join(' ') }
    })

    return () => (
      <div class="detail-info-board" style={computedStyle.value}>
        <NGrid {...props.gridProps}>
          {slots.append && slots.append()}
          {detailInfoList.value.map((item) => {
            return item.onlyRender ? (
              <NGi class="info-item-content">{item.render && item.render(item)}</NGi>
            ) : (
              <NGi class="info-item-content">
                <div class="info-content_label">{item.label}</div>
                {item.value && item.value.length < 32 ? (
                  <div class="info-content_value">
                    {item.value}
                    {item.render && item.render(item)}
                  </div>
                ) : (
                  <div class="info-content_value">
                    <NTooltip
                      v-slots={{
                        default: () => item.value,
                        trigger: () => <div class="info-content_value">{item.value}</div>
                      }}
                    ></NTooltip>
                    {item.render && item.render(item)}
                  </div>
                )}
              </NGi>
            )
          })}
          {slots.prepend && slots.prepend()}
        </NGrid>
      </div>
    )
  }
})
