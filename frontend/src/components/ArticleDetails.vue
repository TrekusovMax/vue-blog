<script setup>
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/dateFormaters'
import { faCalendar, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useModalStore } from '@/stores/modal'
import { useRouter } from 'vue-router'

const router = useRouter()
const modalStore = useModalStore()
const articleStore = useArticleStore()
const userStore = useUserStore()

const props = defineProps({
  dateOptions: {
    type: Object,
    required: false,
  },
})

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
  <div class="mb-4 rounded-md bg-white p-8">
    <div class="mb-4">
      <img
        :src="articleStore.article.imageUrl"
        alt=""
        class="h-72 w-full rounded-md object-cover"
      />
    </div>
    <p class="mb-4 text-gray-600">
      <time :datetime="articleStore.article.publishedAt"
        ><FontAwesomeIcon :icon="faCalendar" />&nbsp;
        {{ formatDate(articleStore.article.publishedAt, props.dateOptions) }}</time
      >
    </p>
    <div class="mb-4 flex items-center justify-between">
      <h1 class="text-3xl font-bold">{{ articleStore.article.title }}</h1>
      <div class="flex gap-4 text-xl" v-if="userStore.isAdmin">
        <button
          type="button"
          area-label="Редактировать статью"
          class="cursor-pointer hover:text-blue-500"
          @click="articleStore.toggleEditMode"
        >
          <FontAwesomeIcon :icon="faPenToSquare" />
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
    <div class="whitespace-pre-wrap">
      {{ articleStore.article.content }}
    </div>
  </div>
</template>
