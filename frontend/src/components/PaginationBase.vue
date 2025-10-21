<script setup>
const activeClass = 'underline hover:text-blue-500 cursor-pointer'
const disabledClass = 'text-gray-400 cursor-default'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  onPageChanges: {
    type: Function,
    required: true,
  },
})

const goToPage = (page) => {
  props.onPageChanges({ page })
}
</script>

<template>
  <ul class="flex items-center justify-center gap-4 pt-8 pb-12">
    <li>
      <button
        @click="goToPage(1)"
        :disabled="currentPage === 1"
        :class="currentPage === 1 ? disabledClass : activeClass"
      >
        В начало
      </button>
    </li>
    <li>
      <button
        @click="goToPage(currentPage - 1)"
        :class="currentPage === 1 ? disabledClass : activeClass"
      >
        Предыдущая
      </button>
    </li>
    <li>
      <button>{{ currentPage }}</button>
    </li>
    <li>
      <button
        @click="goToPage(currentPage + 1)"
        :class="totalPages === 1 ? disabledClass : activeClass"
      >
        Следующая
      </button>
    </li>
    <li>
      <button @click="goToPage(totalPages)" :class="totalPages === 1 ? disabledClass : activeClass">
        В конец
      </button>
    </li>
  </ul>
</template>
