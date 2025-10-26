<script setup>
import ButtonBase from '@/components/base/ButtonBase.vue'
import InputBase from '@/components/base/InputBase.vue'
import InputErrorBase from '@/components/base/InputErrorBase.vue'
import LabelBase from '@/components/base/LabelBase.vue'
import MessageBox from '@/components/base/MessageBox.vue'
import { useUserStore } from '@/stores/user'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import * as yup from 'yup'

const schema = yup.object({
  login: yup.string().required('Логин обязателен').min(3, 'Логин должен быть не менее 3 символов'),
  password: yup
    .string()
    .required('Пароль обязателен')
    .min(6, 'Пароль должен быть не менее 6 символов'),
  confirmedPassword: yup
    .string()
    .required('Повтор пароля обязателен')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})
const userStore = useUserStore()
const errorMessage = ref('')
const router = useRouter()

const handleSubmit = async (formdata) => {
  errorMessage.value = ''
  try {
    const data = await userStore.register(formdata.login, formdata.password)

    if (data?.error) {
      throw new Error(data?.error)
    }
    userStore.user = data.user
    router.push('/')
  } catch (error) {
    errorMessage.value = error
  }
}
</script>

<template>
  <div class="py-8">
    <h1 class="my-4 text-center text-2xl font-bold">Регистрация</h1>
    <Form
      action=""
      class="mx-auto w-full max-w-sm rounded-md bg-white p-6 shadow-md"
      :validation-schema="schema"
      @submit="handleSubmit"
    >
      <div class="mb-4">
        <LabelBase for="login">Логин</LabelBase>
        <InputBase type="text" name="login" id="login" />
        <InputErrorBase name="login" />
      </div>
      <div class="mb-4">
        <LabelBase for="password">Пароль</LabelBase>
        <InputBase type="password" name="password" id="password" />
        <InputErrorBase name="password" />
      </div>
      <div class="mb-4">
        <LabelBase for="confirmedPassword">Повтор пароля</LabelBase>
        <InputBase type="password" name="confirmedPassword" id="confirmedPassword" />
        <InputErrorBase name="confirmedPassword" />
      </div>
      <ButtonBase type="submit" class="w-full">Заргистрироваться</ButtonBase>
      <MessageBox type="error">{{ errorMessage }}</MessageBox>
    </Form>
  </div>
</template>
