<script setup>
import { RouterView } from 'vue-router'
import LayoutHeader from './components/layout/LayoutHeader.vue'
import LayoutFooter from './components/layout/LayoutFooter.vue'
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <header class="fixed top-0 right-0 left-0 z-10 bg-white">
      <LayoutHeader />
    </header>
    <main class="mt-26 flex-1">
      <RouterView />
    </main>
    <footer class="bg-white">
      <LayoutFooter />
    </footer>
  </div>
</template>
