<script setup>
import ButtonBase from '@/components/base/ButtonBase.vue'
import InputBase from '@/components/base/InputBase.vue'
import InputErrorBase from '@/components/base/InputErrorBase.vue'
import LabelBase from '@/components/base/LabelBase.vue'
import MessageBox from '@/components/base/MessageBox.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useArticleStore } from '@/stores/article'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import * as yup from 'yup'

const articleStore = useArticleStore()
const router = useRouter()

const schema = yup.object({
  imageUrl: yup.string().required('URL изображения обязателен').url('Введите корректный URL'),
  title: yup.string().required('Заголовок обязателен'),
  content: yup.string().required('Содержимое статьи обязательно'),
})

const handleAddArticle = async (formdata) => {
  errorMessage.value = ''
  const response = await articleStore.addArticle(formdata)

  if (response.error) {
    errorMessage.value = response.error
  } else {
    router.push(`/post/${response.data.id}`)
  }
}

const errorMessage = ref('')
</script>

<template>
  <LayoutContainer class="py-8">
    <h1 class="mb-4 text-center text-2xl font-bold">Новая статья</h1>
    <Form
      class="mx-auto w-full rounded-md bg-white p-6 shadow-md"
      :validation-schema="schema"
      @submit="handleAddArticle"
    >
      <div class="mb-4">
        <LabelBase for="imageUrl">URL изображения</LabelBase>
        <InputBase type="text" name="imageUrl" id="imageUrl" />
        <InputErrorBase name="imageUrl" />
      </div>
      <div class="mb-4">
        <LabelBase for="title">Заголовок</LabelBase>
        <InputBase type="text" name="title" id="title" />
        <InputErrorBase name="title" />
      </div>
      <div class="mb-4">
        <LabelBase for="content">Заголовок</LabelBase>
        <InputBase as="textarea" name="content" id="content" rows="15" />
        <InputErrorBase name="content" />
      </div>
      <div class="mb-4 flex items-center justify-between">
        <MessageBox v-if="errorMessage" type="error">{{ errorMessage }}</MessageBox>
        <ButtonBase class="ml-auto" type="submit">Создать</ButtonBase>
      </div>
    </Form>
  </LayoutContainer>
</template>
