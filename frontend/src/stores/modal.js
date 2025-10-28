import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const message = ref('Вы уверены?')
  const isVisible = ref(false)
  const callback = ref(null)

  const open = (newMessage, cb) => {
    message.value = newMessage
    isVisible.value = true
    callback.value = cb
  }
  const close = () => {
    isVisible.value = false
  }
  const confirm = () => {
    callback.value()
    close()
  }
  return { message, isVisible, open, close, confirm }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalStore, import.meta.hot))
}
