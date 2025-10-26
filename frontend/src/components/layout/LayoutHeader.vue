<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LayoutContainer from './LayoutContainer.vue'
import {
  faArrowRightFromBracket,
  faBackward,
  faCode,
  faFile,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const handlerLogout = async () => {
  const response = await userStore.logout()

  if (!response.error && route.meta.requireAuth) {
    router.push('/')
  }
}
</script>

<template>
  <LayoutContainer>
    <div class="flex items-center justify-between py-4">
      <div>
        <RouterLink to="/" class="hover:text-blue-500">
          <FontAwesomeIcon :icon="faCode" class="mr-2" />
          Блог веб-разработчика</RouterLink
        >
      </div>
      <div>
        <p>Веб-технологии</p>
        <p>Написание кода</p>
        <p>Разбор ошибок</p>
      </div>
      <div class="flex flex-col items-end">
        <div class="mb-3">
          <RouterLink
            v-if="!userStore.isAutorized"
            to="/login"
            class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Войти
          </RouterLink>
          <div class="text-right" v-else>
            <span>{{ userStore.user.login }}</span>
            &nbsp;|&nbsp;
            <button class="cursor-pointer hover:text-blue-500" @click="handlerLogout">
              <strong><FontAwesomeIcon :icon="faArrowRightFromBracket" /></strong>
            </button>
          </div>
        </div>
        <p>
          <a href="#" @click="$router.back()" aria-label="Назад" class="hover:text-blue-500"
            ><FontAwesomeIcon :icon="faBackward"
          /></a>
          &nbsp; &nbsp;
          <RouterLink
            v-if="userStore.isAutorized && userStore.isAdmin"
            to="/post"
            class="hover:text-blue-500"
            aria-label="Новая статья"
            ><FontAwesomeIcon :icon="faFile"
          /></RouterLink>
          &nbsp; &nbsp;
          <RouterLink
            v-if="userStore.isAutorized && userStore.isAdmin"
            to="/users"
            class="hover:text-blue-500"
            aria-label="Пользователи"
            ><FontAwesomeIcon :icon="faPeopleGroup"
          /></RouterLink>
        </p>
      </div>
    </div>
  </LayoutContainer>
</template>
