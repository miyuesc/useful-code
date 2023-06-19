import { onBeforeUnmount, onMounted } from 'vue'
import EventEmitter from '@/functions/EventEmitter'

export default function (listenerType: string, listener: Function) {
  const thisListener = listener

  const removeListener = () => {
    EventEmitter.removeListener(listenerType, thisListener)
  }

  onMounted(() => {
    thisListener()
    if (EventEmitter.hasListener(listenerType, thisListener)) {
      return
    }
    EventEmitter.addListener(listenerType, thisListener)
  })
  onBeforeUnmount(() => removeListener())

  return [thisListener, removeListener]
}
