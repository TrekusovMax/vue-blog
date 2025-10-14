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
import { RouterLink } from 'vue-router'
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
        <p class="mr-8 mb-2.5">
          <!-- Username | <strong><FontAwesomeIcon :icon="faArrowRightFromBracket" /></strong> -->
          <RouterLink
            to="/login"
            class="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          >
            Войти
          </RouterLink>
        </p>
        <p>
          <a href="#" @click="$router.back()" aria-label="Назад" class="hover:text-blue-500"
            ><FontAwesomeIcon :icon="faBackward"
          /></a>
          &nbsp; &nbsp;
          <RouterLink to="/post" class="hover:text-blue-500" aria-label="Новая статья"
            ><FontAwesomeIcon :icon="faFile"
          /></RouterLink>
          &nbsp; &nbsp;
          <RouterLink to="/users" class="hover:text-blue-500" aria-label="Пользователи"
            ><FontAwesomeIcon :icon="faPeopleGroup"
          /></RouterLink>
        </p>
      </div>
    </div>
  </LayoutContainer>
</template>
