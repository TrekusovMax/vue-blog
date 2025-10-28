<script setup>
import ArticleDetails from '@/components/ArticleDetails.vue'
import ArticleDetailsForm from '@/components/ArticleDetailsForm.vue'
import CommentsForm from '@/components/CommentsForm.vue'
import CommentsList from '@/components/CommentsList.vue'
import LayoutContainer from '@/components/layout/LayoutContainer.vue'
import { useArticleStore } from '@/stores/article'
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'

const articleStore = useArticleStore()
const userStore = useUserStore()
const props = defineProps({
  id: {
    type: String,
    required: false,
  },
})

onBeforeMount(async () => {
  try {
    await articleStore.fetchArticle(props.id)
  } catch (error) {
    console.error(error)
  }
})

const formatDateOprions = {
  year: 'numeric',
  day: 'numeric',
  month: 'long',
  hour: 'numeric',
  minute: 'numeric',
}
</script>

<template>
  <LayoutContainer class="mt-4">
    <ArticleDetailsForm v-if="articleStore.isInEditMode" />
    <ArticleDetails v-else :date-options="formatDateOprions" />
    <div
      v-if="
        !articleStore.isInEditMode &&
        (userStore.isAutorized || articleStore.article?.comments.length > 0)
      "
    >
      <h2 class="mb-4 text-2xl font-bold">Коментарии</h2>
      <CommentsList :date-options="formatDateOprions" />
      <CommentsForm v-if="userStore.isAutorized" />
    </div>
  </LayoutContainer>
</template>
