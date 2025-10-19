<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCalendar, faComment } from '@fortawesome/free-solid-svg-icons'
import { RouterLink } from 'vue-router'
import { useArticlesStore } from '@/store/articles.js'
import { onBeforeMount } from 'vue'
import { formatDate } from '@/utils/dateFormaters'

const articlesStore = useArticlesStore()
onBeforeMount(() => {
  articlesStore.fetchArticles()
})
</script>

<template>
  <section class="my-8">
    <h2 class="sr-only">Последние статьи</h2>
    <ul v-if="articlesStore.articles.length" class="grid grid-cols-3 gap-8">
      <li class="flex" v-for="article in articlesStore.articles" :key="article.id">
        <article class="flex w-full">
          <RouterLink
            :to="`/post/${article.id}`"
            class="flex w-full flex-col rounded-md bg-white p-4 shadow hover:shadow-2xl"
            ><div class="mb-4">
              <img :src="article.imageUrl" class="h-48 w-full object-cover" :alt="article.title" />
            </div>
            <h3 class="mb-2 text-xl">{{ article.title }}</h3>
            <div class="mt-auto flex items-center justify-between">
              <p>
                <time :datetime="article.publishedAt"
                  ><FontAwesomeIcon :icon="faCalendar" />{{ formatDate(article.publishedAt) }}</time
                >
              </p>
              <p>
                <FontAwesomeIcon :icon="faComment" />{{ article.comments.length }}
                <span class="sr-only">комментариев</span>
              </p>
            </div>
          </RouterLink>
        </article>
      </li>
    </ul>
    <p v-else class="text-center text-gray-500">Нет статей для отображения</p>
  </section>
</template>
