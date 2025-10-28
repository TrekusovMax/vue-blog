<script setup>
import ArticlesList from '@/components/ArticlesList.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import PaginationBase from '@/components/base/PaginationBase.vue'
import SearchBase from '@/components/base/SearchBase.vue'

import { useArticlesStore } from '@/stores/articles.js'
const articlesStore = useArticlesStore()
</script>

<template>
  <main>
    <LayoutContainer>
      <SearchBase :on-search="articlesStore.fetchArticles" />
      <ArticlesList />
      <PaginationBase
        v-if="articlesStore.totalPage > 1"
        :current-page="articlesStore.currentPage"
        :total-pages="articlesStore.totalPage"
        :on-page-changes="articlesStore.fetchArticles"
      />
    </LayoutContainer>
  </main>
</template>
