<script setup>
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import MessageBoxBase from '@/components/base/MessageBox.vue'
import { useUsersStore } from '@/stores/users'
import { faFloppyDisk, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'
import { formatDate } from '@/utils/dateFormaters'
import { useRolesStore } from '@/stores/roles'
import InputBase from '@/components/base/InputBase.vue'
const usersStore = useUsersStore()
const rolesStore = useRolesStore()
const errorMessage = ref('')
const userMessage = ref({})
const userMessageType = ref({})
const users = ref([])

onBeforeMount(async () => {
  Promise.all([usersStore.fetchUsers(), rolesStore.fetchUserRoles()]).then(
    ([userResponse, rolesResponse]) => {
      if (rolesResponse.error || userResponse.error) {
        errorMessage.value = 'ошибка загрузки данных'
      }

      rolesStore.roles = rolesResponse.data
      usersStore.users = JSON.parse(JSON.stringify(userResponse.data))
      users.value = JSON.parse(JSON.stringify(userResponse.data))
    },
  )
})
const handleUserDelete = async (userId) => {
  const response = await usersStore.deleteUser(userId)
  if (response.error) {
    console.error(response.error)
    errorMessage.value = response.error
  } else {
    usersStore.users = usersStore.users.filter((user) => user.id !== userId)
    users.value = users.value.filter((user) => user.id !== userId)
  }
}

const handleUserRole = async (user) => {
  const storedUser = usersStore.users.find((u) => u.id === user.id)
  if (user.roleId === storedUser.roleId) {
    return
  }
  const response = await usersStore.changeUserRole(user.id, user.roleId)
  if (response.error) {
    console.error(response.error)
    errorMessage.value = response.error
    user.roleId = storedUser.roleId
    userMessage.value[user.id] = 'Не удалоль обновить роль'
    userMessageType.value[user.id] = 'error'
  } else {
    storedUser.roleId = user.roleId
    userMessage.value[user.id] = 'Обновлено'
    userMessageType.value[user.id] = 'success'

    setTimeout(() => {
      userMessage.value[user.id] = ''
      userMessageType.value[user.id] = ''
    }, 3000)
  }
}
</script>

<template>
  <LayoutContainer>
    <h1 class="my-10 text-center text-3xl font-bold">Пользователи</h1>

    <div class="mb-10 rounded-md bg-white p-8 shadow-md">
      <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }} </MessageBoxBase>
      <table v-if="users.length" class="min-w-full table-fixed">
        <thead>
          <tr>
            <th class="p-2">Логин</th>
            <th class="p-2">Дата регистрации</th>
            <th class="p-2">Роль</th>
            <th class="p-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="p-2 text-center">{{ user.login }}</td>
            <td class="p-2 text-center">
              {{
                formatDate(user.registeredAt, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })
              }}
            </td>
            <td class="p-2">
              <form action="" @submit.prevent="" class="flex gap-2">
                <InputBase
                  as="select"
                  :name="`user-${user.id}-role`"
                  v-model="user.roleId"
                  class="w-full appearance-none rounded-md border border-gray-300 p-2"
                >
                  <option
                    v-for="role in rolesStore.roles"
                    :key="`${user.id}-${role.id}`"
                    :value="role.id"
                  >
                    {{ role.name }}
                  </option>
                </InputBase>
                <button
                  @click.prevent="handleUserRole(user)"
                  type="submit"
                  class="cursor-pointer rounded-md bg-blue-500 p-2 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <FontAwesomeIcon :icon="faFloppyDisk" />
                </button>
              </form>
              <MessageBoxBase v-if="userMessage[user.id]" :type="userMessageType[user.id]">{{
                userMessage[user.id]
              }}</MessageBoxBase>
            </td>
            <td class="p-2 text-right">
              <button
                class="cursor-pointer text-red-500 hover:text-red-700"
                @click="handleUserDelete(user.id)"
              >
                <FontAwesomeIcon :icon="faTrash" />&nbsp; Удалить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </LayoutContainer>
</template>
