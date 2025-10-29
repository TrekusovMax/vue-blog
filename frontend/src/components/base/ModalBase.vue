<script setup>
import { useModalStore } from '@/stores/modal'
import ButtonBase from './ButtonBase.vue'

const modalStore = useModalStore()
</script>

<template>
  <div v-show="modalStore.isVisible" class="fixed top-0 right-0 bottom-0 left-0 z-50">
    <div
      class="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50"
      @click="modalStore.close"
    ></div>
    <div class="relative top-52 mx-auto w-lg rounded-md bg-white p-8">
      <p class="mt-4 mb-8 text-center">{{ modalStore.message }}</p>

      <div class="flex justify-end gap-4">
        <ButtonBase type="button" variant="secondary" @click="modalStore.close">
          Отмена
        </ButtonBase>
        <ButtonBase type="button" @click="modalStore.confirm">Да</ButtonBase>
      </div>
    </div>
  </div>
</template>
