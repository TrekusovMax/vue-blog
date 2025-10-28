<script setup>
import ButtonBase from '@/components/base/ButtonBase.vue'
import { useArticleStore } from '@/stores/article'
import { ref } from 'vue'

const articleStore = useArticleStore()
const newComment = ref('')
const errorMessage = ref('')

const handleCommentSubmit = async () => {
  errorMessage.value = ''

  if (!newComment.value.trim()) {
    errorMessage.value = 'Комментарий не может быть пустым.'
    return
  }

  const response = await articleStore.addComment(newComment.value)

  if (response.error) {
    errorMessage.value = response.error
  } else {
    newComment.value = ''
  }
}
</script>

<template>
  <form
    action=""
    class="mb-8 rounded-md bg-white p-4 shadow-md"
    @submit.prevent="handleCommentSubmit"
  >
    <label for="newComment" class="mb-2 block text-gray-700">Ваш коментарий</label>
    <textarea
      v-model="newComment"
      class="mb-4 h-[114px] w-full rounded-md border border-gray-300 p-2"
      name=""
      id="newComment"
    ></textarea>
    <div class="flex justify-between">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <ButtonBase type="submit" class="ml-auto w-xs">Отправить</ButtonBase>
    </div>
  </form>
</template>
