import { defineComponent, PropType } from 'vue'

export type ScrollBarTrigger = 'hover' | 'always'

const scrollBarProps = {
  trigger: {
    type: String as PropType<ScrollBarTrigger>,
    default: 'hover'
  },
  allowX: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  allowY: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: {
    type: Number as PropType<number>,
    default: 8
  }
}

export default defineComponent({
  name: 'MScrollBar',
  props: scrollBarProps,
  setup() {},
  render() {
    return <div class="m-scroll-bar"></div>
  }
})
