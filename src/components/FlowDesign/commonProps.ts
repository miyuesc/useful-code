import { PropType } from 'vue'
import { CanRemove, UserSyncValidator } from '@/components/FlowDesign/types'

const PropsGenerator = <T>() => ({
  node: {
    type: Object as PropType<T>,
    default: () => null
  },
  canRemove: {
    type: [Boolean, Function] as PropType<CanRemove>,
    default: true
  },
  canAdd: {
    type: [Boolean, Function] as PropType<CanRemove>,
    default: true
  },
  canMove: {
    type: [Boolean, Function] as PropType<CanRemove>,
    default: true
  },

  removeValidator: {
    type: Function as PropType<UserSyncValidator>,
    default: () => async () => true
  }
})

export default PropsGenerator
