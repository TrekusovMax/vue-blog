import ROLES from '@/constants/roles'
import { defineStore, acceptHMRUpdate } from 'pinia'
import { computed, ref } from 'vue'

const initUser = {
  id: '',
  login: '',
  roleId: null,
  registeredAt: '',
}
const getUserData = () => {
  const data = localStorage.getItem('user')
  if (!data) {
    return initUser
  }
  return JSON.parse(data)
}

export const useUserStore = defineStore('user', () => {
  const user = ref(getUserData())

  const isAutorized = computed(() => !!user.value.id)
  const isAdmin = computed(() => user.value.id && user.value.roleId === ROLES.ADMIN)
  const isModerator = computed(() => user.value.id && user.value.roleId === ROLES.MODERATOR)

  const register = async (login, password) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        throw new Error('Ошибка регистрации пользователя')
      }
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (error) {
      console.error(error)
    }
  }
  const login = async (login, password) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok) {
        throw new Error('Ошибка авторизации пользователя')
      }

      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
      return data
    } catch (error) {
      console.error(error)
    }
  }
  const logout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Ошибка выхода пользователя')
      }

      const data = await response.json()
      if (!data.error) {
        user.value = initUser
      }
      localStorage.removeItem('user')
      return data
    } catch (error) {
      console.error(error)
    }
  }

  return { user, register, login, isAutorized, logout, isAdmin, isModerator }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
