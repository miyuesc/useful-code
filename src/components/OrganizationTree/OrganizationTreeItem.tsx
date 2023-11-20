import { computed, defineComponent, PropType, ref, toRefs } from 'vue'

const props = {
  data: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  level: {
    type: Number as PropType<number>,
    default: 0
  },
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 20
  },
  iconSize: {
    type: [Number, String] as PropType<number | string>,
    default: 24
  },
  content: {
    type: Function as PropType<(data: any) => JSX.Element>
  }
}

const childrenVisible = ref<boolean>(false)

const OrganizationTreeItem = defineComponent({
  name: 'OrganizationTreeItem',
  props,
  setup(props, { emit }) {
    const { data } = toRefs(props)

    const hasChildren = computed<boolean>(() => {
      return data.value.children && data.value.children.length > 0
    })

    const computedStyle = computed(() => {
      return {
        '--gap': typeof props.gap === 'number' ? `${props.gap}px` : props.gap,
        '--icon-size': typeof props.iconSize === 'number' ? `${props.iconSize}px` : props.iconSize
      }
    })

    return () => (
      <div class="organization-tree-item" style={computedStyle.value}>
        <div class="org-tree-item_container">
          {hasChildren.value && (
            <div class="org-tree-item_ctr-icon">
              <i class="icon"></i>
            </div>
          )}
          <div class="org-tree-item_divider"></div>
          <div class="org-tree-item_content">
            {props.content ? props.content(data.value) : <div>{data.value.name}</div>}
          </div>
        </div>
        <div class="org-tree-item_children">
          {data.value.children &&
            data.value.children &&
            data.value.children.map((item: any) => (
              <OrganizationTreeItem key={item.key} data={item} level={props.level + 1} />
            ))}
        </div>
      </div>
    )
  }
})

export default OrganizationTreeItem
