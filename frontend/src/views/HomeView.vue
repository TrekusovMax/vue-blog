<script setup>
import ArticlesList from '@/components/ArticlesList.vue'
import LayoutContainer from '@/components/LayoutContainer.vue'
import SaerchBase from '@/components/SaerchBase.vue'

import { useArticlesStore } from '@/store/articles.js'
const articlesStore = useArticlesStore()
</script>

<template>
  <main>
    <LayoutContainer>
      <SaerchBase :on-search="articlesStore.fetchArticles" />
      <ArticlesList />
    </LayoutContainer>
  </main>
</template>
