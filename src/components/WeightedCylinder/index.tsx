import { computed, defineComponent, type PropType, type CSSProperties } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'WeightedCylinder',
  props: {
    data: {
      type: Number as PropType<number>,
      default: 0.2
    },
    max: {
      type: Number as PropType<number>,
      default: 1
    },
    title: {
      type: String as PropType<string>,
      default: '权重'
    },
    unit: {
      type: String as PropType<string>,
      default: ''
    },
    format: {
      type: Function as PropType<Function>
    },
    showData: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    showTitle: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    showUnit: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    reverse: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, { slots }) {
    const computedStyle = computed(() => {
      const style: CSSProperties = { height: `${(props.data / props.max) * 100}%` }
      if (props.reverse) {
        style.flexDirection = 'column-reverse'
      }
      return style
    })

    const computedData = computed(() => {
      let data: string = props.data.toString()
      if (props.format && typeof props.format === 'function') {
        data = props.format(data)
      }
      if (props.unit && props.showUnit) {
        data += props.unit
      }
      return data
    })

    return () => (
      <div class="weighted-cylinder">
        <div class="weighted-cylinder__header"></div>
        <div class="weighted-cylinder__content">
          <div class="cylinder__content-inner" style={computedStyle.value}>
            {props.showData && <div class="cylinder__content-data">{computedData.value}</div>}
            {props.showTitle && <div class="cylinder__content-data">{props.title}</div>}
          </div>
        </div>
        <div class="weighted-cylinder__footer"></div>
      </div>
    )
  }
})
