<script setup>
import ButtonBase from '@/components/base/ButtonBase.vue'
import { useArticleStore } from '@/stores/article'
import { ref } from 'vue'
import LabelBase from './base/LabelBase.vue'
import InputBase from './base/InputBase.vue'

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
    <LabelBase for="newComment">Ваш коментарий</LabelBase>
    <InputBase as="textarea" v-model="newComment" name="newComment" id="newComment" />
    <div class="flex justify-between">
      <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
      <ButtonBase type="submit" class="ml-auto w-xs">Отправить</ButtonBase>
    </div>
  </form>
</template>
