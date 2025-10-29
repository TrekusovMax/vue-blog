<script setup>
import { useArticleStore } from '@/stores/article'
import { useModalStore } from '@/stores/modal'
import { faFloppyDisk, faTrash, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import InputBase from './base/InputBase.vue'

const router = useRouter()
const articleStore = useArticleStore()
const modalStore = useModalStore()
const editedArticle = ref({ ...articleStore.article })

const handleArticleUpdate = async () => {
  try {
    const response = await articleStore.updateArticle(editedArticle.value)
    if (response === 'success') {
      articleStore.toggleEditMode()
    }
  } catch (error) {
    console.error(error)
  }
}

const handleDeleteArticle = () => {
  modalStore.open('Вы уверены, что хотите удалить эту статью?', async () => {
    const response = await articleStore.deleteArticle()
    if (!response.error) {
      router.push('/')
    }
  })
}
</script>

<template>
  <form @submit.prevent="handleArticleUpdate" class="mb-4 rounded-md bg-white p-8">
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-3xl font-bold">Редактировать статью</h1>
      <div class="flex gap-4 text-xl">
        <button
          type="button"
          area-label="Отменить изменения"
          class="cursor-pointer hover:text-blue-500"
          @click="articleStore.toggleEditMode"
        >
          <FontAwesomeIcon :icon="faArrowRotateLeft" />
        </button>
        <button
          type="submit"
          area-label="Сохранить статью"
          class="cursor-pointer hover:text-blue-500"
        >
          <FontAwesomeIcon :icon="faFloppyDisk" />
        </button>
        <button
          @click="handleDeleteArticle"
          type="button"
          area-label="Удалить статью"
          class="cursor-pointer hover:text-red-500"
        >
          <FontAwesomeIcon :icon="faTrash" />
        </button>
      </div>
    </div>
    <p class="mb-4">
      <InputBase
        name="imageUrl"
        type="text"
        v-model="editedArticle.imageUrl"
        placeholder="URL изображения"
      />
    </p>
    <p class="mb-4">
      <InputBase
        name="title"
        type="text"
        v-model="editedArticle.title"
        placeholder="Заголовок статьи"
      />
    </p>
    <p class="mb-4">
      <InputBase
        as="textarea"
        rows="15"
        name="content"
        v-model="editedArticle.content"
        placeholder="Содержание статьи"
      />
    </p>
  </form>
</template>
