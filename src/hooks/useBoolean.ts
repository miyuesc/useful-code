import { ref } from 'vue'

export default function (defaultValue: boolean) {
  const value = ref<boolean>(defaultValue)

  const setValue = (val: boolean) => {
    value.value = val
  }

  const toggle = () => {
    value.value = !value.value
  }

  const setFalse = () => {
    value.value = false
  }

  const setTrue = () => {
    value.value = true
  }

  return {
    value,
    setFalse,
    setTrue,
    setValue,
    toggle
  } as const
}
