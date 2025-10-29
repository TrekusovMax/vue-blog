<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
})
</script>

<template>
  <button
    :class="`mb-4 cursor-pointer rounded-md p-2 px-5 py-2 ${
      variant === 'primary'
        ? 'bg-blue-500 text-white hover:bg-blue-700'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`"
  >
    <slot></slot>
  </button>
</template>
