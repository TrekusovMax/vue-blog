<script setup>
import { useArticleStore } from '@/stores/article'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { formatDate } from '@/utils/dateFormaters'
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import MessageBoxBase from '@/components/base/MessageBox.vue'
import { ref } from 'vue'

const props = defineProps({
  dateOptions: {
    type: Object,
    required: false,
  },
})
const articleStore = useArticleStore()
const userStore = useUserStore()
const modalStore = useModalStore()
const errorMessage = ref('')

const handleDeleteComment = (commentId) => {
  modalStore.open('Удалить коментарий?', async () => {
    const response = await articleStore.deleteComment(commentId)
    if (response.error) {
      errorMessage.value = response.error
    }
    errorMessage.value = ''
  })
}
</script>

<template>
  <div>
    <ul>
      <li
        v-for="comment in articleStore.article.comments"
        :key="comment.id"
        class="mb-4 rounded-md bg-white p-4 shadow-md"
      >
        <div class="mb-2.5 flex justify-between">
          <p class="font-bold"><FontAwesomeIcon :icon="faUser" />&nbsp;{{ comment.author }}</p>
          <button
            @click="handleDeleteComment(comment.id)"
            v-if="userStore.isAdmin || userStore.isModerator"
            class="cursor-pointer text-red-500 hover:text-red-700"
          >
            <FontAwesomeIcon :icon="faTrash" />&nbsp;Удалить
          </button>
        </div>
        <p class="mb-2 text-sm text-gray-500">
          <time datetime="comment.publishedAt">{{
            formatDate(comment.publishedAt, props.dateOptions)
          }}</time>
        </p>
        <div class="mb-2 whitespace-pre-wrap">{{ comment.content }}</div>
      </li>
    </ul>
    <MessageBoxBase v-if="errorMessage" type="error">{{ errorMessage }}</MessageBoxBase>
  </div>
</template>
