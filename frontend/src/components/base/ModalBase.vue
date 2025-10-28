<script setup>
import { useModalStore } from '@/stores/modal'

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
        <button
          type="button"
          class="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          @click="modalStore.close"
        >
          Отмена
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
          @click="modalStore.confirm"
        >
          Да
        </button>
      </div>
    </div>
  </div>
</template>
