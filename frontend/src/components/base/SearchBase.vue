<script setup lang="ts">
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref, watch } from 'vue'
import ButtonBase from './ButtonBase.vue'

const searchQuery = ref('')

const props = defineProps({
  onSearch: {
    type: Function,
    required: true,
  },
})

const handleSearch = () => {
  clearTimeout(debouncedTimer)
  props.onSearch({ search: searchQuery.value })
}

let debouncedTimer = null

const debouncedSearch = (query) => {
  clearTimeout(debouncedTimer)

  debouncedTimer = setTimeout(() => {
    props.onSearch({ search: query })
  }, 2000)
}

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})
</script>

<template>
  <form @submit.prevent="handleSearch" class="relative mt-12">
    <input
      type="text"
      class="w-full rounded-md border border-gray-300 bg-white p-2 pr-20"
      name="search"
      placeholder="Поиск по блогу"
      v-model="searchQuery"
    />
    <ButtonBase type="submit" class="absolute right-0 h-[100%] ring-0">
      <FontAwesomeIcon :icon="faMagnifyingGlass" />
    </ButtonBase>
  </form>
</template>
