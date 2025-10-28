<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import LayoutHeader from './components/layout/LayoutHeader.vue'
import LayoutFooter from './components/layout/LayoutFooter.vue'
import ModalBase from './components/base/ModalBase.vue'
import AccessDeniedView from './views/AccessDeniedView.vue'
import { useUserStore } from './stores/user'

const router = useRoute()
const userStore = useUserStore()

const canAccess = computed(() => {
  if (router?.meta.requireAdmin) {
    return userStore.isAdmin
  }

  return true
})
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-gray-100">
    <header class="fixed top-0 right-0 left-0 z-10 bg-white">
      <LayoutHeader />
    </header>
    <main class="mt-26 flex-1">
      <RouterView v-if="canAccess" />
      <AccessDeniedView v-else />
    </main>
    <footer class="bg-white">
      <LayoutFooter />
    </footer>
    <ModalBase />
  </div>
</template>
