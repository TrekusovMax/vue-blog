import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useRolesStore = defineStore('roles', () => {
  const roles = ref([])

  const fetchUserRoles = async () => {
    try {
      const response = await fetch('/api/users/roles')
      if (!response.ok) {
        throw new Error('Ошибка запроса ролей пользователей')
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка получения ролей пользователей ', error)
    }
  }
  return { fetchUserRoles, roles }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRolesStore, import.meta.hot))
}
