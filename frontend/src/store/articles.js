import { defineStore, acceptHMRUpdate } from 'pinia'
import { ref } from 'vue'

export const useArticlesStore = defineStore('articles', () => {
  const articles = ref([])

  const fetchArticles = async () => {
    try {
      const response = await fetch('/posts')
      if (!response.ok) {
        throw new Error('Posts request error')
      }
      const data = await response.json()
      articles.value = data.data.posts
      console.log(articles.value)
    } catch (error) {
      console.error(error)
    }
  }
  return { articles, fetchArticles }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticlesStore, import.meta.hot))
}
